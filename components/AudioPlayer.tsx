"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

/* ============================================================================
   AudioPlayer — Generative Romantic Symphony & Soundscapes
   ============================================================================ */

const USE_FILE = false;
const FILE_SRC = "/media/song.mp3";

type SoundMode = "celestial" | "piano" | "rain";

const SOUND_MODES: Array<{ id: SoundMode; label: string; icon: string }> = [
  { id: "celestial", label: "Celestial Dream", icon: "✨" },
  { id: "piano", label: "Lovers' Piano", icon: "🎹" },
  { id: "rain", label: "Midnight Rain", icon: "🌧️" },
];

const SCALE = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21];
const ROOT = 207.65; // G#3
const TARGET_VOLUME = 0.28;

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [hint, setHint] = useState(true);
  const [mode, setMode] = useState<SoundMode>("celestial");
  const [showMenu, setShowMenu] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const nodesRef = useRef<Array<OscillatorNode | AudioNode>>([]);
  const elementRef = useRef<HTMLAudioElement | null>(null);

  // Teardown
  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      nodesRef.current.forEach((n) => {
        try {
          if ("stop" in n && typeof n.stop === "function") (n as OscillatorNode).stop();
        } catch {
          // already stopped
        }
      });
      nodesRef.current = [];
      elementRef.current?.pause();
      void ctxRef.current?.close();
      ctxRef.current = null;
    };
  }, []);

  // Fade hint
  useEffect(() => {
    const id = window.setTimeout(() => setHint(false), 8000);
    return () => window.clearTimeout(id);
  }, []);

  // SFX Synth (chimes, bells, pops)
  const playSfx = useCallback((type: string) => {
    if (!ctxRef.current) return;
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") void ctx.resume();

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === "bell" || type === "chime") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.exponentialRampToValueAtTime(1760, t + 0.1);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
    } else if (type === "pop") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.08);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
    } else {
      osc.type = "sine";
      osc.frequency.setValueAtTime(659.25, t);
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 1.3);
  }, []);

  // Listen for SFX events across components
  useEffect(() => {
    const handleSfx = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      playSfx(customEvent.detail || "chime");
    };
    window.addEventListener("nandini:sfx", handleSfx);
    return () => window.removeEventListener("nandini:sfx", handleSfx);
  }, [playSfx]);

  // Build Procedural Audio Engine
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
    lowpass.Q.value = 0.5;

    const delay = ctx.createDelay(2.5);
    delay.delayTime.value = 0.68;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.38;
    const wet = ctx.createGain();
    wet.gain.value = 0.42;

    master.connect(lowpass);
    lowpass.connect(ctx.destination);
    lowpass.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(wet);
    wet.connect(ctx.destination);

    // Warm multi-oscillator pad
    [0, 0.05, -0.05].forEach((detune, i) => {
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

    // Melody generator
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
      shimmer.type = "triangle";
      shimmer.frequency.value = freq * 2.004;

      const env = c.createGain();
      env.gain.setValueAtTime(0.0001, t);
      env.gain.linearRampToValueAtTime(0.09, t + 0.5);
      env.gain.exponentialRampToValueAtTime(0.0005, t + 3.8);

      const shimmerGain = c.createGain();
      shimmerGain.gain.value = 0.18;

      voice.connect(env);
      shimmer.connect(shimmerGain);
      shimmerGain.connect(env);
      env.connect(m);

      voice.start(t);
      shimmer.start(t);
      voice.stop(t + 4);
      shimmer.stop(t + 4);

      step += 1;
      timerRef.current = window.setTimeout(playNote, 1400 + Math.random() * 1600);
    };

    playNote();
    setReady(true);
  }, []);

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
      fadeTo(0, 1.2);
      setPlaying(false);
    } else {
      fadeTo(TARGET_VOLUME, 2.5);
      setPlaying(true);
    }
  }, [build, fadeTo, playing]);

  // Duck audio when video plays
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
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3">
      {/* Sound On Hint */}
      <AnimatePresence>
        {hint && !playing && (
          <motion.button
            type="button"
            onClick={toggle}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="glass-soft hidden sm:flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-light tracking-wider text-ether uppercase border border-rose/30 shadow-[0_0_20px_rgba(242,128,155,0.2)]"
          >
            <span>🎵 Tap for romantic music</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Music Button */}
      <motion.button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Music mute karo" : "Music play karo"}
        className="glass relative grid h-12 w-12 place-items-center rounded-full text-ether transition-all hover:border-rose/50 shadow-[0_8px_30px_rgba(0,0,0,0.8)]"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        {playing ? (
          <span className="flex h-4 items-end gap-[3px]" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-[2px] rounded-full bg-rose"
                animate={{ height: ["30%", "100%", "45%", "80%", "30%"] }}
                transition={{
                  duration: 1.4 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }}
                style={{ height: "40%" }}
              />
            ))}
          </span>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-[18px] w-[18px] text-haze"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 5 6 9H3v6h3l5 4V5Z" />
            <path d="m17 9 4 6M21 9l-4 6" />
          </svg>
        )}

        {playing && (
          <motion.span
            className="absolute inset-0 rounded-full border border-rose/50"
            animate={{ scale: [1, 1.45], opacity: [0.6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>
    </div>
  );
}
