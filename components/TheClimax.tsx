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
   TheClimax — Scene 3
   ----------------------------------------------------------------------------
   A tall scroll track with a sticky viewport pinned inside it. The page keeps
   moving but the frame does not, so the quote appears to assemble itself out
   of the dark one word at a time. Each word owns a slice of the scroll and
   travels from blurred and dim to sharp and lit.

   The words are driven directly by scroll position rather than by a timer, so
   she can go back and forth and the line breathes with her.
   ========================================================================== */

const QUOTE =
  "Tum humse pyar karo na karo hum sirf tumse pyar karte hain, tum hamari taraf dekho na dekho hum sirf aur sirf tumhari taraf dekhenge.";

const WORDS = QUOTE.split(" ");

/** Words start revealing here and finish here, as a fraction of the track. */
const REVEAL_START = 0.14;
const REVEAL_END = 0.74;

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
  const end = start + per * 2.6; // generous overlap keeps it flowing, not clacking

  const opacity = useTransform(progress, [start, end], reduced ? [1, 1] : [0.08, 1]);
  const blur = useTransform(progress, [start, end], reduced ? [0, 0] : [10, 0]);
  const y = useTransform(progress, [start, end], reduced ? [0, 0] : [16, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  /* The comma is the hinge of the sentence — give it a breath. */
  const isHinge = word.endsWith(",");

  return (
    <motion.span
      style={{ opacity, filter, y }}
      className={`inline-block ${isHinge ? "mr-[0.5em]" : "mr-[0.28em]"}`}
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
    stiffness: 90,
    damping: 30,
    restDelta: 0.0005,
  });

  /* The world outside the quote falls away. */
  const veil = useTransform(progress, [0, 0.22, 0.85, 1], [0, 0.85, 0.9, 0.55]);
  const introOpacity = useTransform(progress, [0, 0.06, 0.16], [1, 1, 0]);
  const closerOpacity = useTransform(progress, [0.78, 0.92], [0, 1]);
  const closerY = useTransform(progress, [0.78, 0.92], [18, 0]);

  return (
    <section id="climax" aria-label="Ek vaat" className="relative">
      {/* The scroll track. Its height is what gives the quote room to build. */}
      <div ref={trackRef} className="relative h-[420svh]">
        {/* The veil that blurs the world behind the quote */}
        <motion.div
          aria-hidden
          className="pointer-events-none sticky top-0 -mb-[100svh] h-[100svh] w-full"
          style={{ opacity: veil }}
        >
          <div className="h-full w-full bg-void/85 backdrop-blur-2xl" />
        </motion.div>

        {/* The pinned frame */}
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden px-6">
          <div className="relative w-full max-w-4xl text-center">
            {/* A quiet hand-off from the gallery */}
            <motion.p
              style={{ opacity: introOpacity }}
              className="absolute inset-x-0 -top-24 text-[11px] font-light uppercase tracking-[0.5em] text-rose/70"
            >
              ne chhelle, bas aatlu
            </motion.p>

            <blockquote className="font-display text-[clamp(1.35rem,4.4vw,2.9rem)] font-light leading-[1.5] text-ether text-glow balance">
              <span className="sr-only">{QUOTE}</span>
              <span aria-hidden className="inline">
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

            <motion.p
              style={{ opacity: closerOpacity, y: closerY }}
              className="mx-auto mt-16 max-w-md font-display text-[clamp(0.95rem,2.7vw,1.15rem)] font-light italic leading-relaxed text-haze"
            >
              Aa line me nathi lakhi.
              <br />
              Pan aa lagni poori mari che.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
