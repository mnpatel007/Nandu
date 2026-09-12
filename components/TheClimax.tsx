"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

/* ============================================================================
   TheClimax — Scene 3: The Sacred Vow
   ----------------------------------------------------------------------------
   A responsive, fluid scroll track where the quote illuminates with grace.
   Pacing is calibrated to feel fast, effortless, and deeply emotional.
   ========================================================================== */

const QUOTE =
  "Tum humse pyar karo na karo hum sirf tumse pyar karte hain, tum hamari taraf dekho na dekho hum sirf aur sirf tumhari taraf dekhenge.";

const WORDS = QUOTE.split(" ");

/** Calibrated for snappy, responsive reveal without sluggish dragging */
const REVEAL_START = 0.02;
const REVEAL_END = 0.52;

function Word({
  word,
  index,
  total,
  progress,
  reduced,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const span = REVEAL_END - REVEAL_START;
  const per = span / total;
  const start = REVEAL_START + index * per;
  const end = Math.min(0.9, start + per * 1.8);

  const opacity = useTransform(progress, [start, end], reduced ? [1, 1] : [0.25, 1]);
  const blur = useTransform(progress, [start, end], reduced ? [0, 0] : [3, 0]);
  const y = useTransform(progress, [start, end], reduced ? [0, 0] : [8, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  const isHinge = word.endsWith(",");

  return (
    <motion.span
      style={{ opacity, filter, y }}
      className={`inline-block transition-opacity duration-150 ${
        isHinge ? "mr-[0.45em]" : "mr-[0.26em]"
      }`}
    >
      {word}
    </motion.span>
  );
}

export default function TheClimax() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = Boolean(useReducedMotion());

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 24,
    restDelta: 0.001,
  });

  const introOpacity = useTransform(progress, [0, 0.06, 0.16], [1, 0.8, 0]);
  const closerOpacity = useTransform(progress, [0.42, 0.62], [0, 1]);
  const closerY = useTransform(progress, [0.42, 0.62], [14, 0]);

  const scrollToClimaxEnd = () => {
    if (trackRef.current) {
      const top = trackRef.current.offsetTop + trackRef.current.offsetHeight * 0.6;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="climax" aria-label="Ek vaat" className="relative">
      {/* Tightened track height so words reveal effortlessly */}
      <div ref={trackRef} className="relative h-[180svh] sm:h-[190svh]">
        {/* Soft atmospheric backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none sticky top-0 -mb-[100svh] h-[100svh] w-full bg-void/70 backdrop-blur-md"
        />

        {/* Pinned Viewport Frame */}
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden px-6">
          <div className="relative w-full max-w-4xl text-center">
            {/* Introductory whisper */}
            <motion.p
              style={{ opacity: introOpacity }}
              className="absolute inset-x-0 -top-20 sm:-top-24 text-[11px] font-light uppercase tracking-[0.5em] text-rose/85"
            >
              ne chhelle, bas aatlu
            </motion.p>

            {/* The Quote */}
            <blockquote className="font-display text-[clamp(1.5rem,4.8vw,3.2rem)] font-light leading-[1.4] text-ether text-glow balance">
              <span className="sr-only">{QUOTE}</span>
              <span aria-hidden="true" className="inline">
                {WORDS.map((word, i) => (
                  <Word
                    key={`${word}-${i}`}
                    word={word}
                    index={i}
                    total={WORDS.length}
                    progress={progress}
                    reduced={reduced}
                  />
                ))}
              </span>
            </blockquote>

            {/* The Devotion from Meet */}
            <motion.div
              style={{ opacity: closerOpacity, y: closerY }}
              className="mx-auto mt-12 sm:mt-16 max-w-md space-y-2"
            >
              <p className="font-display text-[clamp(1rem,2.9vw,1.25rem)] font-light italic leading-relaxed text-gold/90 text-glow">
                Aa line me nathi lakhi.
                <br />
                Pan aa lagni poori mari che.
              </p>
              <span className="text-[10px] font-mono tracking-widest text-rose uppercase block pt-1">
                — Meet
              </span>
            </motion.div>

            {/* Subtle tap prompt to reveal faster if on mobile */}
            <motion.button
              type="button"
              style={{ opacity: introOpacity }}
              onClick={scrollToClimaxEnd}
              className="mt-8 text-[10px] uppercase tracking-[0.3em] text-haze/60 hover:text-gold transition-colors inline-block sm:hidden"
            >
              Scroll down or tap to reveal ↓
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
