"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useCountdown } from "@/lib/useCountdown";

/* ============================================================================
   TrailerOutro — Scene 4
   ----------------------------------------------------------------------------
   The quote dissolves into a drifting particle field, three lines surface out
   of the dark, the date lands, and a single heartbeat button waits at the end.

   The button is real: it opens the last line of the trailer.
   ========================================================================== */

/* -------------------------------------------------------------------------- */
/* Particles                                                                  */
/* -------------------------------------------------------------------------- */

type Particle = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  life: number;
  maxLife: number;
  hue: "rose" | "gold" | "ether";
};

const HUES: Record<Particle["hue"], string> = {
  rose: "242, 128, 155",
  gold: "243, 201, 139",
  ether: "255, 246, 236",
};

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];

    const makeParticle = (seeded: boolean): Particle => {
      const maxLife = 260 + Math.random() * 420;
      const hues: Particle["hue"][] = ["rose", "rose", "gold", "ether"];
      return {
        x: Math.random() * width,
        y: seeded ? Math.random() * height : height + 20,
        r: 0.6 + Math.random() * 1.9,
        vy: -(0.12 + Math.random() * 0.42),
        vx: (Math.random() - 0.5) * 0.24,
        life: seeded ? Math.random() * maxLife : 0,
        maxLife,
        hue: hues[Math.floor(Math.random() * hues.length)],
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 640 ? 46 : 96;
      particles = Array.from({ length: count }, () => makeParticle(true));
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.life += 1;
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.life * 0.008) * 0.16;

        if (p.life > p.maxLife || p.y < -20) {
          Object.assign(p, makeParticle(false));
          continue;
        }

        const t = p.life / p.maxLife;
        const alpha = Math.sin(t * Math.PI) * 0.72;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${HUES[p.hue]}, ${alpha.toFixed(3)})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      // Draw a single still frame instead of animating.
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${HUES[p.hue]}, 0.4)`;
        ctx.fill();
      }
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Countdown                                                                  */
/* -------------------------------------------------------------------------- */

const UNIT_LABELS: Array<[keyof NonNullable<ReturnType<typeof useCountdown>["time"]>, string]> = [
  ["days", "divas"],
  ["hours", "kalak"],
  ["minutes", "minute"],
  ["seconds", "second"],
];

function Countdown() {
  const { time, isToday } = useCountdown();
  const pad = (n: number) => n.toString().padStart(2, "0");

  if (isToday) {
    return (
      <p className="font-display text-[clamp(1.3rem,4vw,2rem)] font-light italic text-ember animate-ember">
        Aaje j che. Janamdivas ni khoob khoob shubhkamnao, Nandini.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-4 sm:gap-x-10">
      {UNIT_LABELS.map(([key, label]) => (
        <div key={key} className="flex min-w-[62px] flex-col items-center gap-1.5">
          <span className="font-display text-[clamp(2rem,7vw,3.4rem)] font-light leading-none text-ether tabular-nums">
            {time ? pad(time[key]) : "--"}
          </span>
          <span className="text-[10px] font-light uppercase tracking-[0.28em] text-rose/75">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* The scene                                                                  */
/* -------------------------------------------------------------------------- */

const RISE = {
  rest: { opacity: 0.22, y: 30, filter: "blur(12px)" },
  shown: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const RISE_REDUCED = {
  rest: { opacity: 1, y: 0, filter: "blur(0px)" },
  shown: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function TrailerOutro() {
  const reduced = Boolean(useReducedMotion());
  const variants = reduced ? RISE_REDUCED : RISE;
  const [opened, setOpened] = useState(false);

  return (
    <section
      className="relative flex min-h-[110svh] flex-col items-center justify-center overflow-hidden px-6 py-[16vh]"
      aria-label="Aage shu"
    >
      <ParticleField />

      <motion.div
        initial="rest"
        whileInView="shown"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.4 }}
        className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-9 text-center"
      >
        <motion.p
          variants={variants}
          transition={{ duration: 1.5, ease: [0.22, 0.61, 0.24, 1] }}
          className="font-display text-[clamp(1.4rem,5vw,2.4rem)] font-light italic leading-snug text-haze balance"
        >
          Aa to bas ek jhalak hati…
        </motion.p>

        <motion.p
          variants={variants}
          transition={{ duration: 1.5, ease: [0.22, 0.61, 0.24, 1] }}
          className="font-display text-[clamp(1.6rem,6vw,3rem)] font-light leading-snug text-ether text-glow balance"
        >
          Aakhi vaarta hajii baaki che.
        </motion.p>

        <motion.div
          variants={variants}
          transition={{ duration: 1.6, ease: [0.22, 0.61, 0.24, 1] }}
          className="flex flex-col items-center gap-5"
        >
          <span className="h-px w-24 bg-gradient-to-r from-transparent via-rose/70 to-transparent" />
          <p className="text-ember animate-ember font-display text-[clamp(2.6rem,11vw,6rem)] font-medium leading-none tracking-tight">
            7 October
          </p>
          <span className="h-px w-24 bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
        </motion.div>

        <motion.div
          variants={variants}
          transition={{ duration: 1.5, ease: [0.22, 0.61, 0.24, 1] }}
          className="glass w-full max-w-lg rounded-[26px] px-7 py-8"
        >
          <p className="mb-6 text-[10px] font-light uppercase tracking-[0.4em] text-haze/70">
            hajii etli vaar
          </p>
          <Countdown />
        </motion.div>

        <motion.p
          variants={variants}
          transition={{ duration: 1.5, ease: [0.22, 0.61, 0.24, 1] }}
          className="max-w-md font-display text-[clamp(1rem,3vw,1.3rem)] font-light italic leading-relaxed text-haze"
        >
          Tyaan sudhi bas ek kaam karje — hasti rehje.
          <br />
          Ae tane sauthi vadhare suit thay che.
        </motion.p>

        {/* ---- the button. it works. ---- */}
        <motion.div
          variants={variants}
          transition={{ duration: 1.5, ease: [0.22, 0.61, 0.24, 1] }}
          className="flex flex-col items-center gap-8"
        >
          <motion.button
            type="button"
            onClick={() => setOpened((v) => !v)}
            aria-expanded={opened}
            aria-controls="final-word"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className={`glass animate-heartbeat rounded-full px-11 py-4 font-display text-[clamp(1rem,3vw,1.2rem)] font-light italic tracking-wide text-ether ${
              opened ? "opacity-70" : ""
            }`}
          >
            {opened ? "bas, etlu j" : "Raah jo"}
          </motion.button>

          {/* The reveal animates opacity and position only — never height.
              If the animation engine ever stalls, the text is still laid out
              and still readable, so the button can never look broken. */}
          <AnimatePresence initial={false}>
            {opened && (
              <motion.div
                id="final-word"
                key="final"
                initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                transition={{ duration: 1, ease: [0.22, 0.61, 0.24, 1] }}
              >
                <div className="flex flex-col items-center gap-5 pt-2">
                  <p className="max-w-md font-display text-[clamp(1.15rem,3.6vw,1.6rem)] font-light leading-relaxed text-ether text-glow balance">
                    Hu kyanya nathi jato.
                    <br />
                    Ahiyan j chu — chup chaap, koi shart vagar.
                  </p>
                  <span className="text-[10px] font-light uppercase tracking-[0.5em] text-rose/80">
                    — Meet
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
