"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

/* ============================================================================
   AudioPlayer
   ----------------------------------------------------------------------------
   There was no soundtrack to work from, so the music is written in code: a
   warm three-oscillator pad under a slow, randomised major-pentatonic figure,
   fed through a long feedback delay. It never repeats exactly and it never
   fights the page.

   Everything is created lazily inside the click handler, because browsers only
   allow an AudioContext to start from a real user gesture.

   WANT A REAL SONG INSTEAD?
   Drop an mp3 at /public/media/song.mp3 and set USE_FILE to true.
   ========================================================================== */

const USE_FILE = false;
const FILE_SRC = "/media/song.mp3";

/** Major pentatonic across two octaves, in semitones from the root. */
const SCALE = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21];
/** G#3 — low enough to sit under everything. */
const ROOT = 207.65;
const TARGET_VOLUME = 0.26;

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [hint, setHint] = useState(true);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const nodesRef = useRef<OscillatorNode[]>([]);
  const elementRef = useRef<HTMLAudioElement | null>(null);

  /* --- teardown ---------------------------------------------------------- */
  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      nodesRef.current.forEach((n) => {
        try {
          n.stop();
        } catch {
          /* already stopped */
        }
      });
      nodesRef.current = [];
      elementRef.current?.pause();
      void ctxRef.current?.close();
      ctxRef.current = null;
    };
  }, []);

  /* --- the hint fades on its own ---------------------------------------- */
  useEffect(() => {
    const id = window.setTimeout(() => setHint(false), 9000);
    return () => window.clearTimeout(id);
  }, []);

  /* --- build the instrument once ---------------------------------------- */
  const build = useCallback(() => {
    if (ctxRef.current) return;

    const Ctor: typeof AudioContext | undefined =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;

    const ctx = new Ctor();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    masterRef.current = master;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 1800;
    lowpass.Q.value = 0.4;

    const delay = ctx.createDelay(2.5);
    delay.delayTime.value = 0.62;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.36;
    const wet = ctx.createGain();
    wet.gain.value = 0.4;

    master.connect(lowpass);
    lowpass.connect(ctx.destination);
    lowpass.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(wet);
    wet.connect(ctx.destination);

    /* The pad: three detuned voices, each breathing on its own slow LFO. */
    [0, 0.06, -0.05].forEach((detune, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 1 ? "triangle" : "sine";
      osc.frequency.value = (ROOT / 2) * (i === 2 ? 1.5 : 1);
      osc.detune.value = detune * 100;

      const gain = ctx.createGain();
      gain.gain.value = 0.05;

      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.045 + i * 0.017;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.03;

      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      osc.connect(gain);
      gain.connect(master);

      osc.start();
      lfo.start();
      nodesRef.current.push(osc, lfo);
    });

    /* The figure on top: one soft note at a time, loosely timed. */
    let step = 0;
    const playNote = () => {
      const c = ctxRef.current;
      const m = masterRef.current;
      if (!c || !m) return;

      const anchor = [0, 2, 4];
      const degree =
        step % 4 === 0
          ? anchor[Math.floor(Math.random() * anchor.length)]
          : SCALE[Math.floor(Math.random() * SCALE.length)];

      const freq = ROOT * Math.pow(2, degree / 12) * 2;
      const t = c.currentTime;

      const voice = c.createOscillator();
      voice.type = "sine";
      voice.frequency.value = freq;

      const shimmer = c.createOscillator();
      shimmer.type = "sine";
      shimmer.frequency.value = freq * 2.002;

      const env = c.createGain();
      env.gain.setValueAtTime(0.0001, t);
      env.gain.linearRampToValueAtTime(0.1, t + 0.55);
      env.gain.exponentialRampToValueAtTime(0.0008, t + 3.6);

      const shimmerGain = c.createGain();
      shimmerGain.gain.value = 0.22;

      voice.connect(env);
      shimmer.connect(shimmerGain);
      shimmerGain.connect(env);
      env.connect(m);

      voice.start(t);
      shimmer.start(t);
      voice.stop(t + 3.9);
      shimmer.stop(t + 3.9);

      step += 1;
      timerRef.current = window.setTimeout(playNote, 1500 + Math.random() * 1700);
    };

    playNote();
    setReady(true);
  }, []);

  /* --- fades ------------------------------------------------------------- */
  const fadeTo = useCallback((value: number, seconds: number) => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), t);
    master.gain.linearRampToValueAtTime(value, t + seconds);
  }, []);

  const toggle = useCallback(() => {
    setHint(false);

    if (USE_FILE) {
      if (!elementRef.current) {
        const el = new Audio(FILE_SRC);
        el.loop = true;
        el.volume = 0.45;
        elementRef.current = el;
      }
      const el = elementRef.current;
      if (playing) {
        el.pause();
        setPlaying(false);
      } else {
        void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      }
      return;
    }

    if (!ctxRef.current) build();
    const ctx = ctxRef.current;
    if (!ctx) return;

    if (ctx.state === "suspended") void ctx.resume();

    if (playing) {
      fadeTo(0, 1.1);
      setPlaying(false);
    } else {
      fadeTo(TARGET_VOLUME, 3);
      setPlaying(true);
    }
  }, [build, fadeTo, playing]);

  /* --- duck the music while a video is playing --------------------------- */
  useEffect(() => {
    const onDuck = () => fadeTo(0.03, 0.5);
    const onRestore = () => {
      if (playing) fadeTo(TARGET_VOLUME, 1.2);
    };
    window.addEventListener("nandini:duck", onDuck);
    window.addEventListener("nandini:unduck", onRestore);
    return () => {
      window.removeEventListener("nandini:duck", onDuck);
      window.removeEventListener("nandini:unduck", onRestore);
    };
  }, [fadeTo, playing]);

  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-50 flex items-center gap-3">
      <AnimatePresence>
        {hint && !playing && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.24, 1] }}
            className="glass-soft hidden rounded-full px-4 py-2 text-[11px] font-light tracking-[0.18em] text-haze uppercase sm:block"
          >
            sound on karo
          </motion.span>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Music band karo" : "Music chaalu karo"}
        className="glass relative grid h-12 w-12 place-items-center rounded-full text-ether transition-colors hover:border-white/25"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        {playing ? (
          <span className="flex h-4 items-end gap-[3px]" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-[2px] rounded-full bg-rose"
                animate={{ height: ["30%", "100%", "45%", "80%", "30%"] }}
                transition={{
                  duration: 1.6 + i * 0.25,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.12,
                }}
                style={{ height: "40%" }}
              />
            ))}
          </span>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-[18px] w-[18px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M11 5 6 9H3v6h3l5 4V5Z" />
            <path d="m17 9 4 6M21 9l-4 6" />
          </svg>
        )}

        {playing && ready && (
          <motion.span
            className="absolute inset-0 rounded-full border border-rose/40"
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            aria-hidden
          />
        )}
      </motion.button>
    </div>
  );
}
