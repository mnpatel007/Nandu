"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SACRED_PROMISES, type SacredPromise } from "@/lib/romanticData";

export default function ConstellationPromises() {
  const [selectedPromise, setSelectedPromise] = useState<SacredPromise>(SACRED_PROMISES[0]);

  const selectStar = (p: SacredPromise) => {
    setSelectedPromise(p);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("nandini:sfx", { detail: "bell" }));
    }
  };

  return (
    <section
      id="promises"
      aria-label="Constellation of Promises"
      className="relative min-h-[95svh] py-24 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Starry Sky Canvas Simulation */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_#0b0d1a_0%,_#040406_80%)]"
      />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-[11px] font-light uppercase tracking-[0.45em] text-gold mb-3"
        >
          Written In The Stars
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-[clamp(2.2rem,6vw,4rem)] font-light text-ether text-glow leading-tight"
        >
          Constellation of Promises
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-sm sm:text-base font-light italic text-haze"
        >
          Each glowing star holds a sacred promise made by Meet to Nandini. Tap any star to unveil its eternal vow.
        </motion.p>
      </div>

      {/* Interactive Constellation Sky Frame */}
      <div className="relative w-full max-w-4xl h-[420px] sm:h-[480px] rounded-3xl glass border border-gold/20 overflow-hidden p-6 flex flex-col justify-between shadow-[0_0_80px_rgba(243,201,139,0.15)]">
        {/* SVG Constellation lines connecting stars */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {SACRED_PROMISES.map((star, idx) => {
            if (idx === SACRED_PROMISES.length - 1) return null;
            const next = SACRED_PROMISES[idx + 1];
            return (
              <line
                key={`line-${star.id}`}
                x1={`${star.coordinates.x}%`}
                y1={`${star.coordinates.y}%`}
                x2={`${next.coordinates.x}%`}
                y2={`${next.coordinates.y}%`}
                stroke="rgba(243, 201, 139, 0.25)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            );
          })}
        </svg>

        {/* Stars */}
        <div className="absolute inset-0 z-10">
          {SACRED_PROMISES.map((star) => {
            const isSelected = selectedPromise.id === star.id;
            return (
              <button
                key={star.id}
                type="button"
                onClick={() => selectStar(star)}
                style={{
                  left: `${star.coordinates.x}%`,
                  top: `${star.coordinates.y}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                aria-label={star.starName}
              >
                {/* Glowing Outer Rings */}
                <div
                  className={`relative flex items-center justify-center rounded-full transition-all ${
                    isSelected ? "scale-150" : "group-hover:scale-125"
                  }`}
                >
                  <span
                    className={`absolute inset-0 rounded-full animate-ping ${
                      isSelected ? "bg-rose/50" : "bg-gold/30"
                    }`}
                  />
                  <span
                    className={`h-4 w-4 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? "bg-rose border-ether shadow-[0_0_20px_#f2809b]"
                        : "bg-gold/80 border-gold/40 shadow-[0_0_12px_#f3c98b]"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                </div>

                {/* Star Label */}
                <span
                  className={`absolute top-5 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-wider whitespace-nowrap transition-opacity ${
                    isSelected
                      ? "text-rose font-medium opacity-100"
                      : "text-haze opacity-60 group-hover:opacity-100"
                  }`}
                >
                  Star {star.id}
                </span>
              </button>
            );
          })}
        </div>

        {/* Promise Detail Box Floating at the bottom */}
        <div className="relative z-20 mt-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPromise.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="glass p-5 sm:p-6 rounded-2xl border border-rose/30 bg-black/70 backdrop-blur-md max-w-2xl mx-auto text-center"
            >
              <span className="text-[10px] font-mono tracking-widest uppercase text-gold">
                ✦ {selectedPromise.starName} ✦
              </span>
              <p className="mt-2 font-display text-lg sm:text-xl text-ether text-glow leading-snug">
                "{selectedPromise.promise}"
              </p>
              <p className="mt-2 text-xs sm:text-sm italic text-rose font-light">
                {selectedPromise.whisper}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

