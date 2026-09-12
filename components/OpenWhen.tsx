"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { OPEN_WHEN_LETTERS, type OpenWhenLetter } from "@/lib/romanticData";

export default function OpenWhen() {
  const [activeLetter, setActiveLetter] = useState<OpenWhenLetter | null>(null);

  const openLetter = (letter: OpenWhenLetter) => {
    setActiveLetter(letter);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("nandini:sfx", { detail: "chime" }));
    }
  };

  const closeLetter = () => {
    setActiveLetter(null);
  };

  return (
    <section
      id="open-when"
      aria-label="Open When Sanctuary"
      className="relative min-h-[90svh] py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[500px] w-[500px] rounded-full blur-[130px] -z-10"
        style={{
          background: "radial-gradient(circle, rgba(60,84,180,0.18) 0%, rgba(242,128,155,0.12) 60%, transparent 70%)",
        }}
      />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-[11px] font-light uppercase tracking-[0.45em] text-rose mb-3"
        >
          Emotional Sanctuary
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-[clamp(2.2rem,6vw,4rem)] font-light text-ether text-glow leading-tight"
        >
          Open When...
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-sm sm:text-base font-light italic text-haze"
        >
          For the moments when life feels loud, lonely, or heavy. Meet's heart is always right here waiting for you.
        </motion.p>
      </div>

      {/* Grid of 6 Sealed Envelopes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full mx-auto">
        {OPEN_WHEN_LETTERS.map((letter, idx) => (
          <motion.div
            key={letter.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openLetter(letter)}
            className="glass group relative rounded-2xl p-6 flex flex-col justify-between border border-white/10 hover:border-rose/40 transition-all cursor-pointer shadow-lg min-h-[200px]"
          >
            {/* Top Seal Badge */}
            <div className="flex items-center justify-between">
              <span className="text-2xl">{letter.icon}</span>
              <span className="text-[10px] tracking-widest uppercase font-mono px-2.5 py-1 rounded-full bg-rose/15 text-rose border border-rose/30">
                {letter.badge}
              </span>
            </div>

            {/* Title */}
            <div className="my-4">
              <h3 className="font-display text-lg font-medium text-ether group-hover:text-gold transition-colors leading-snug">
                {letter.title}
              </h3>
              <p className="mt-1 text-xs text-haze font-light italic">
                {letter.subtitle}
              </p>
            </div>

            {/* Bottom prompt */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
              <span className="text-gold/80 font-light">Sealed Letter</span>
              <span className="text-rose group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Read Letter <span>→</span>
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL LETTER READING */}
      <AnimatePresence>
        {activeLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6"
            onClick={closeLetter}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 0.61, 0.24, 1] }}
              className="parchment relative w-full max-w-xl rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-gold/20 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activeLetter.icon}</span>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl text-gold font-medium">
                      {activeLetter.title}
                    </h3>
                    <span className="text-[11px] text-rose font-light tracking-wider">
                      {activeLetter.badge}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeLetter}
                  className="h-8 w-8 rounded-full glass grid place-items-center text-xs text-haze hover:text-white"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4 font-display text-base leading-relaxed text-ether/95">
                {activeLetter.content.map((p, i) => (
                  <p key={i} className="first-letter:text-xl first-letter:font-semibold first-letter:text-gold">
                    {p}
                  </p>
                ))}
              </div>

              {/* Affirmation Box */}
              <div className="mt-6 p-4 rounded-2xl bg-rose/10 border border-rose/30 text-center">
                <span className="text-[10px] uppercase tracking-widest text-gold block mb-1">
                  Remember this always
                </span>
                <p className="font-display text-sm italic text-ether">
                  "{activeLetter.affirmation}"
                </p>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-4 border-t border-gold/20 flex items-center justify-between">
                <div>
                  <p className="text-xs text-haze font-light">{activeLetter.closure}</p>
                  <p className="font-display text-base font-semibold text-gold">— Meet</p>
                </div>

                <button
                  type="button"
                  onClick={closeLetter}
                  className="px-4 py-2 rounded-full glass text-xs text-ether hover:bg-white/10"
                >
                  Close Letter
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

