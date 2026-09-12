"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { REASONS_WHY, type ReasonLove } from "@/lib/romanticData";

export default function ReasonsDeck() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [discoveredCount, setDiscoveredCount] = useState(1);
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [showAllGrid, setShowAllGrid] = useState(false);

  const drawNext = () => {
    const nextIdx = (currentIndex + 1) % REASONS_WHY.length;
    setCurrentIndex(nextIdx);
    setDiscoveredCount((prev) => Math.min(REASONS_WHY.length, Math.max(prev, nextIdx + 1)));

    // Trigger floating heart effect
    const newHearts = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 160,
      y: -40 - Math.random() * 80,
    }));
    setHearts((prev) => [...prev.slice(-10), ...newHearts]);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("nandini:sfx", { detail: "pop" }));
    }
  };

  const shuffle = () => {
    const randomIdx = Math.floor(Math.random() * REASONS_WHY.length);
    setCurrentIndex(randomIdx);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("nandini:sfx", { detail: "shuffle" }));
    }
  };

  const currentReason = REASONS_WHY[currentIndex];

  return (
    <section
      id="reasons"
      aria-label="Reasons Why You Are My Life"
      className="relative min-h-[90svh] py-24 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[600px] w-[600px] rounded-full blur-[120px] -z-10"
        style={{
          background: "radial-gradient(circle, rgba(243,201,139,0.15) 0%, rgba(242,128,155,0.12) 50%, transparent 70%)",
        }}
      />

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-[11px] font-light uppercase tracking-[0.45em] text-gold mb-3"
        >
          Infinite Devotion
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-[clamp(2.2rem,6vw,3.8rem)] font-light text-ether text-glow leading-tight"
        >
          Why You Are My Life
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-sm sm:text-base font-light italic text-haze"
        >
          Tap the deck to draw reasons why every breath I take belongs to you.
        </motion.p>
      </div>

      {!showAllGrid ? (
        /* 3D FLOATING CARD STACK */
        <div className="relative w-full max-w-md flex flex-col items-center">
          {/* Heart burst animations */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
            {hearts.map((h) => (
              <motion.span
                key={h.id}
                initial={{ opacity: 1, scale: 0.8, x: 0, y: 0 }}
                animate={{ opacity: 0, scale: 1.6, x: h.x, y: h.y }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute text-rose text-2xl"
              >
                💖
              </motion.span>
            ))}
          </div>

          {/* Under-cards for physical deck look */}
          <div className="absolute inset-x-4 top-4 h-[320px] rounded-3xl glass opacity-30 rotate-[3deg] -z-20 pointer-events-none" />
          <div className="absolute inset-x-2 top-2 h-[320px] rounded-3xl glass opacity-50 rotate-[-2deg] -z-10 pointer-events-none" />

          {/* Active Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReason.id}
              initial={{ opacity: 0, y: 30, rotateY: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, rotateY: 15, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.22, 0.61, 0.24, 1] }}
              whileHover={{ scale: 1.02 }}
              onClick={drawNext}
              className="glass relative w-full min-h-[340px] sm:min-h-[360px] rounded-3xl p-8 flex flex-col justify-between border border-rose/30 shadow-[0_25px_60px_-15px_rgba(242,128,155,0.3)] cursor-pointer select-none"
            >
              {/* Card top banner */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-gold bg-gold/10 border border-gold/30 uppercase">
                  Reason #{currentReason.id}
                </span>
                <span className="text-xs text-rose/90 font-light tracking-wider">
                  {currentReason.tag}
                </span>
              </div>

              {/* Reason Body */}
              <div className="my-6 space-y-4 text-center">
                <p className="font-display text-lg sm:text-xl font-normal leading-relaxed text-ether text-glow">
                  "{currentReason.text}"
                </p>
                {currentReason.gujarati && (
                  <p className="font-display italic text-sm sm:text-base text-gold/90">
                    {currentReason.gujarati}
                  </p>
                )}
              </div>

              {/* Card bottom hint */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-haze">
                <span>Discovered: {discoveredCount}/{REASONS_WHY.length}</span>
                <span className="text-rose font-light flex items-center gap-1">
                  Tap for next <span>→</span>
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action buttons */}
          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              onClick={drawNext}
              className="glass px-6 py-2.5 rounded-full text-xs font-light text-ether border border-rose/40 hover:bg-rose/15 transition-all shadow-[0_0_20px_rgba(242,128,155,0.25)] flex items-center gap-2"
            >
              <span>💌 Draw Next Reason</span>
            </button>

            <button
              type="button"
              onClick={shuffle}
              className="glass px-4 py-2.5 rounded-full text-xs font-light text-haze hover:text-ether transition-all"
            >
              <span>🔀 Shuffle</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAllGrid(true)}
              className="glass-soft px-4 py-2.5 rounded-full text-xs font-light text-haze hover:text-ether transition-all"
            >
              <span>View All</span>
            </button>
          </div>
        </div>
      ) : (
        /* ALL REASONS GRID VIEW */
        <div className="w-full max-w-5xl">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs text-gold uppercase tracking-widest">
              All {REASONS_WHY.length} Reasons Catalog
            </span>
            <button
              type="button"
              onClick={() => setShowAllGrid(false)}
              className="px-4 py-1.5 rounded-full glass text-xs text-ether hover:bg-white/10"
            >
              ← Back to Card Deck
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REASONS_WHY.map((reason) => (
              <div
                key={reason.id}
                className="glass rounded-2xl p-5 border border-white/10 flex flex-col justify-between hover:border-rose/40 transition-colors"
              >
                <div>
                  <div className="flex justify-between text-[11px] text-gold mb-2 font-mono">
                    <span>#{reason.id}</span>
                    <span className="text-rose/80">{reason.tag}</span>
                  </div>
                  <p className="font-display text-sm text-ether leading-snug">
                    "{reason.text}"
                  </p>
                </div>
                {reason.gujarati && (
                  <p className="mt-3 text-xs italic text-gold/80 pt-2 border-t border-white/5">
                    {reason.gujarati}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

