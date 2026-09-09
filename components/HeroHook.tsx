"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/* ============================================================================
   HeroHook — Scene 1
   ----------------------------------------------------------------------------
   A dark screen that breathes. Two lines arrive, hold, and leave. Then her
   name settles in and the page invites her to scroll.

   The sequence is a simple, fully cleaned-up timer chain, so it cannot leak or
   double-fire under React Strict Mode.
   ========================================================================== */

const LINES = [
  { text: "Ek lambo shwaas le, Nandini.", hold: 3400 },
  { text: "Tu ahiyan safe che.", hold: 3200 },
];

const FADE = 1.4;

export default function HeroHook() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const settled = step >= LINES.length;

  useEffect(() => {
    if (reduced) {
      setStep(LINES.length);
      return;
    }
    if (settled) return;

    const id = window.setTimeout(() => setStep((s) => s + 1), LINES[step].hold);
    return () => window.clearTimeout(id);
  }, [step, settled, reduced]);

  return (
    <section
      className="relative flex min-h-[100svh] scene items-center justify-center overflow-hidden px-6"
      aria-label="Shuruaat"
    >
      {/* The two opening lines ------------------------------------------- */}
      <div className="relative flex w-full max-w-3xl items-center justify-center">
        <AnimatePresence mode="wait">
          {!settled && (
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 18, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(14px)" }}
              transition={{ duration: FADE, ease: [0.22, 0.61, 0.24, 1] }}
              className="text-center font-display text-[clamp(1.6rem,5.4vw,3.1rem)] font-light italic leading-[1.25] text-ether text-glow-strong balance"
            >
              {LINES[step].text}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Her name, and the invitation --------------------------------- */}
        <AnimatePresence>
          {settled && (
            <motion.div
              key="settled"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-center"
            >
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 1.2, ease: [0.22, 0.61, 0.24, 1] }}
                className="text-[11px] font-light uppercase tracking-[0.55em] text-rose/80"
              >
                Trailer
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 26, filter: "blur(18px)", letterSpacing: "0.18em" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: "-0.02em" }}
                transition={{ delay: 0.5, duration: 2, ease: [0.22, 0.61, 0.24, 1] }}
                className="text-ember animate-ember font-display text-[clamp(3.4rem,15vw,9rem)] font-medium leading-[0.95]"
              >
                Nandini
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15, duration: 1.4, ease: [0.22, 0.61, 0.24, 1] }}
                className="max-w-md font-display text-[clamp(1rem,3.2vw,1.35rem)] font-light italic text-haze balance"
              >
                ek nani si vaat — bas tara mate
              </motion.p>

              {/* Scroll invitation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1.4 }}
                className="mt-10 flex flex-col items-center gap-3"
              >
                <span className="text-[10px] font-light uppercase tracking-[0.42em] text-haze/70">
                  neeche scroll kar
                </span>
                <motion.span
                  className="block h-12 w-px origin-top bg-gradient-to-b from-rose/90 to-transparent"
                  animate={reduced ? undefined : { scaleY: [0.2, 1, 0.2], opacity: [0.4, 1, 0.4] }}
                  transition={
                    reduced
                      ? undefined
                      : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
                  }
                  aria-hidden
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
