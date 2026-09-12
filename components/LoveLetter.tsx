"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LOVE_LETTER } from "@/lib/romanticData";

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setHasOpenedOnce(true);
    // Dispatch sound event for audio player
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("nandini:sfx", { detail: "chime" }));
    }
  };

  return (
    <section
      id="letter"
      aria-label="Prem Patra"
      className="relative min-h-[90svh] flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[500px] w-[500px] rounded-full blur-[100px] -z-10"
        style={{
          background: "radial-gradient(circle, rgba(225,75,108,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="text-center mb-10 max-w-xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-[11px] font-light uppercase tracking-[0.45em] text-rose/85 mb-3"
        >
          An Intimate Letter
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-[clamp(2rem,6vw,3.6rem)] font-light leading-tight text-ether text-glow"
        >
          A Letter For Nandini
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-sm sm:text-base font-light italic text-haze"
        >
          Ek aevi vaat je shabdo ma samavay evi nathi, pan aaje lakhi che.
        </motion.p>
      </div>

      {/* The Envelope & Letter Container */}
      <div className="relative w-full max-w-2xl flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* SEALED ENVELOPE */
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.24, 1] }}
              className="relative w-full max-w-md mx-auto aspect-[1.45/1] rounded-2xl glass p-6 sm:p-8 flex flex-col items-center justify-between border border-rose/30 shadow-[0_20px_60px_-15px_rgba(242,128,155,0.25)] cursor-pointer group"
              onClick={handleOpen}
            >
              {/* Envelope flap aesthetic lines */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1/2 border-b border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent [clip-path:polygon(0_0,100%_0,50%_100%)]" />
              </div>

              <div className="text-center pt-3">
                <span className="text-[10px] tracking-[0.3em] uppercase text-gold/80 font-light">
                  Strictly Confidential · For Her Eyes Only
                </span>
                <p className="mt-2 font-display text-lg italic text-ether">
                  To: Mara Vhala Nandini
                </p>
              </div>

              {/* The Wax Seal Button */}
              <motion.div
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                className="relative z-10 wax-seal h-16 w-16 sm:h-20 sm:w-20 rounded-full flex flex-col items-center justify-center border-2 border-[#ff8ca3] shadow-lg cursor-pointer transition-transform"
              >
                <span className="font-display text-2xl sm:text-3xl text-gold-deep font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  N
                </span>
                <span className="text-[8px] uppercase tracking-widest text-white/90 -mt-1 font-semibold">
                  MEET
                </span>
              </motion.div>

              <div className="text-center pb-2">
                <p className="text-xs text-rose/90 font-light tracking-wider animate-pulse">
                  Click the seal to open Meet's letter 💌
                </p>
              </div>
            </motion.div>
          ) : (
            /* OPENED LETTER ON GLOWING PARCHMENT */
            <motion.article
              key="letter-content"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.8, ease: [0.22, 0.61, 0.24, 1] }}
              className="parchment relative w-full rounded-3xl p-6 sm:p-12 text-ether border border-gold/30"
            >
              {/* Header inside parchment */}
              <div className="flex items-center justify-between border-b border-gold/20 pb-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="gold-seal h-10 w-10 rounded-full flex items-center justify-center text-abyss font-display font-bold text-lg">
                    N
                  </div>
                  <div>
                    <h3 className="font-display text-lg sm:text-xl text-gold font-medium">
                      {LOVE_LETTER.salutation}
                    </h3>
                    <p className="text-[11px] text-haze tracking-wider uppercase">
                      From Meet with all my soul
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1 rounded-full text-xs font-light text-haze hover:text-ether hover:bg-white/10 transition-colors border border-white/10"
                >
                  Fold Letter ✕
                </button>
              </div>

              {/* Letter Paragraphs */}
              <div className="space-y-6 font-display text-base sm:text-lg leading-relaxed text-ether/95 tracking-wide">
                {LOVE_LETTER.paragraphs.map((p, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + idx * 0.1, duration: 0.7 }}
                    className="first-letter:text-2xl first-letter:font-semibold first-letter:text-gold"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              {/* Signoff */}
              <div className="mt-10 pt-6 border-t border-gold/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-display italic text-sm text-gold/80">
                    {LOVE_LETTER.signOff}
                  </p>
                  <p className="font-display text-2xl font-bold text-ember animate-ember">
                    {LOVE_LETTER.author}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs italic text-haze max-w-xs">
                    {LOVE_LETTER.postScript}
                  </p>
                </div>
              </div>

              {/* Bottom replay/fold bar */}
              <div className="mt-8 pt-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-rose hover:text-white font-light underline underline-offset-4 tracking-wider transition-colors"
                >
                  Re-seal letter in the envelope
                </button>
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

