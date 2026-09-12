"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ALL_MEMORIES, type Memory, type MemoryCategory } from "@/lib/memories";

const CATEGORIES: Array<{ key: MemoryCategory; label: string; count: number }> = [
  { key: "all", label: "All Moments", count: ALL_MEMORIES.length },
  {
    key: "smile",
    label: "Her Radiant Smile",
    count: ALL_MEMORIES.filter((m) => m.category === "smile").length,
  },
  {
    key: "saree",
    label: "Saree & Grace",
    count: ALL_MEMORIES.filter((m) => m.category === "saree").length,
  },
  {
    key: "candid",
    label: "Quiet Candids",
    count: ALL_MEMORIES.filter((m) => m.category === "candid").length,
  },
  {
    key: "balcony",
    label: "Balcony & Light",
    count: ALL_MEMORIES.filter((m) => m.category === "balcony").length,
  },
  {
    key: "video",
    label: "Video Memories",
    count: ALL_MEMORIES.filter((m) => m.category === "video").length,
  },
];

export default function MemoryVault() {
  const [selectedCategory, setSelectedCategory] = useState<MemoryCategory>("all");
  const [activeMemoryIndex, setActiveMemoryIndex] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [isCinemaMode, setIsCinemaMode] = useState(false);

  // Filter memories
  const filteredMemories = useMemo(() => {
    if (selectedCategory === "all") return ALL_MEMORIES;
    return ALL_MEMORIES.filter((m) => m.category === selectedCategory);
  }, [selectedCategory]);

  const toggleFlip = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setActiveMemoryIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setActiveMemoryIndex(null);
    setIsCinemaMode(false);
  }, []);

  const nextMemory = useCallback(() => {
    if (activeMemoryIndex === null) return;
    setActiveMemoryIndex((activeMemoryIndex + 1) % filteredMemories.length);
  }, [activeMemoryIndex, filteredMemories.length]);

  const prevMemory = useCallback(() => {
    if (activeMemoryIndex === null) return;
    setActiveMemoryIndex(
      (activeMemoryIndex - 1 + filteredMemories.length) % filteredMemories.length
    );
  }, [activeMemoryIndex, filteredMemories.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeMemoryIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextMemory();
      if (e.key === "ArrowLeft") prevMemory();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMemoryIndex, closeLightbox, nextMemory, prevMemory]);

  // Cinema Mode Autoplay
  useEffect(() => {
    if (!isCinemaMode || activeMemoryIndex === null) return;
    const timer = setTimeout(() => {
      nextMemory();
    }, 4500);
    return () => clearTimeout(timer);
  }, [isCinemaMode, activeMemoryIndex, nextMemory]);

  const activeMemory = activeMemoryIndex !== null ? filteredMemories[activeMemoryIndex] : null;

  return (
    <section
      id="vault"
      aria-label="The Memory Vault"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-[11px] font-light uppercase tracking-[0.45em] text-rose/85 mb-3"
        >
          The Complete Archive
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-[clamp(2.2rem,6vw,4rem)] font-light text-ether text-glow leading-tight"
        >
          The Memory Vault
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-sm sm:text-base font-light italic text-haze"
        >
          50 captured moments that will forever live inside my heart. Tap any photo to enlarge or flip for a secret note.
        </motion.p>

        {/* Cinema Reel Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex justify-center gap-3"
        >
          <button
            type="button"
            onClick={() => {
              setActiveMemoryIndex(0);
              setIsCinemaMode(true);
            }}
            className="glass flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-light text-gold border border-gold/40 hover:bg-gold/10 transition-all shadow-[0_0_20px_rgba(243,201,139,0.2)]"
          >
            <span>▶</span>
            <span>Play Cinematic Memory Reel</span>
          </button>
        </motion.div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-12 max-w-4xl mx-auto">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs transition-all flex items-center gap-1.5 ${
                isSelected
                  ? "bg-rose/25 text-ether border border-rose/60 shadow-[0_0_15px_rgba(242,128,155,0.3)] font-medium"
                  : "glass-soft text-haze hover:text-ether hover:border-white/20"
              }`}
            >
              <span>{cat.label}</span>
              <span className="text-[10px] opacity-70 px-1.5 py-0.5 rounded-full bg-white/10">
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Responsive Masonry / Polaroid Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
      >
        <AnimatePresence>
          {filteredMemories.map((memory, index) => {
            const isFlipped = flippedCards[memory.id] || false;
            const isVideo = memory.kind === "video";

            return (
              <motion.div
                key={memory.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                {/* Polaroid Frame */}
                <div
                  className={`polaroid relative rounded-2xl p-3 flex flex-col justify-between transition-all duration-500 transform hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.9)] hover:border-rose/40 min-h-[380px] ${
                    isFlipped ? "bg-[#16121f]" : ""
                  }`}
                  style={{
                    perspective: "1000px",
                  }}
                >
                  {/* Decorative Washi Tape Effect at the top */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/10 backdrop-blur-sm border-t border-b border-white/20 rotate-[-2deg] rounded-sm pointer-events-none z-10 shadow-sm" />

                  {!isFlipped ? (
                    /* FRONT: The Photo */
                    <div className="flex flex-col h-full justify-between">
                      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-black/50">
                        {isVideo ? (
                          <div className="relative w-full h-full">
                            <video
                              src={memory.src}
                              poster={memory.poster}
                              muted
                              playsInline
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 grid place-items-center bg-black/30">
                              <span className="h-12 w-12 rounded-full glass grid place-items-center text-white text-xl">
                                ▶
                              </span>
                            </div>
                          </div>
                        ) : (
                          <img
                            src={memory.src}
                            alt={memory.alt}
                            loading="lazy"
                            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                              memory.rotate ? "rotate-[-90deg] scale-125" : ""
                            }`}
                          />
                        )}

                        {/* Date badge */}
                        {memory.date && (
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] text-ether/80 font-mono">
                            {memory.date}
                          </span>
                        )}
                      </div>

                      {/* Caption & Flip CTA */}
                      <div className="pt-3 pb-1 px-1 flex items-center justify-between gap-2">
                        <p className="font-display text-xs italic text-haze group-hover:text-ether transition-colors line-clamp-1">
                          {memory.caption || "Nandini"}
                        </p>

                        <button
                          type="button"
                          onClick={(e) => toggleFlip(memory.id, e)}
                          title="Flip for secret note"
                          className="text-[10px] px-2 py-1 rounded-full glass-soft text-rose hover:text-white transition-colors flex-shrink-0"
                        >
                          Flip ↺
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* BACK: Handwritten Secret Note */
                    <div className="flex flex-col h-full justify-between p-4 text-ether">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <span className="text-[10px] tracking-widest uppercase text-gold">
                            Secret Note
                          </span>
                          <span className="text-xs">💌</span>
                        </div>
                        <p className="font-display italic text-sm leading-relaxed text-gold/90 pt-2">
                          "{memory.backNote || "Tari sathe viteleli har ek pal anmol che."}"
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-haze">
                          — Meet
                        </span>
                        <button
                          type="button"
                          onClick={(e) => toggleFlip(memory.id, e)}
                          className="text-[10px] px-2 py-1 rounded-full glass-soft text-haze hover:text-ether transition-colors"
                        >
                          Flip back ↻
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8"
            onClick={closeLightbox}
          >
            {/* Top Toolbar */}
            <div
              className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between text-ether z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono tracking-widest text-gold">
                  {activeMemoryIndex! + 1} / {filteredMemories.length}
                </span>
                {isCinemaMode && (
                  <span className="px-2.5 py-0.5 rounded-full bg-rose/30 border border-rose/60 text-[10px] text-white animate-pulse">
                    Cinema Mode Active
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsCinemaMode(!isCinemaMode)}
                  className="px-3 py-1.5 rounded-full glass text-xs text-ether hover:bg-white/10 transition-colors"
                >
                  {isCinemaMode ? "Pause Reel ❚❚" : "Play Reel ▶"}
                </button>
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="h-9 w-9 rounded-full glass grid place-items-center text-sm text-haze hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Previous Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevMemory();
              }}
              className="absolute left-2 sm:left-6 z-20 h-12 w-12 rounded-full glass grid place-items-center text-xl text-ether hover:border-rose/50 transition-all"
              aria-label="Previous image"
            >
              ‹
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextMemory();
              }}
              className="absolute right-2 sm:right-6 z-20 h-12 w-12 rounded-full glass grid place-items-center text-xl text-ether hover:border-rose/50 transition-all"
              aria-label="Next image"
            >
              ›
            </button>

            {/* Lightbox Media Presentation */}
            <motion.div
              key={activeMemory.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden max-h-[70vh] flex items-center justify-center shadow-[0_0_80px_rgba(242,128,155,0.25)] border border-white/15">
                {activeMemory.kind === "video" ? (
                  <video
                    src={activeMemory.src}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[70vh] w-auto rounded-2xl bg-black"
                  />
                ) : (
                  <img
                    src={activeMemory.src}
                    alt={activeMemory.alt}
                    className={`max-h-[70vh] w-auto object-contain rounded-2xl ${
                      activeMemory.rotate ? "rotate-[-90deg]" : ""
                    }`}
                  />
                )}
              </div>

              {/* Caption & Backnote below lightbox */}
              <div className="mt-4 text-center max-w-xl px-4">
                <p className="font-display text-base sm:text-lg italic text-ether">
                  {activeMemory.caption}
                </p>
                {activeMemory.backNote && (
                  <p className="mt-1 text-xs sm:text-sm font-light text-gold/90 italic">
                    "{activeMemory.backNote}"
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

