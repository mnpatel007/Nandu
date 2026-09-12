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
import { GALLERY, type Interlude, type Memory } from "@/lib/memories";

/* ============================================================================
   MemoryGallery — Scene 2
   ----------------------------------------------------------------------------
   Glassmorphic cards that float up through the viewport, each one tilting in
   3D and skewing very slightly according to where it sits in the scroll. The
   tilt direction depends on which side of the page the card lives on, so the
   whole column reads as one piece of parallax rather than a list of effects.

   Comforting lines are interleaved between the photographs.
   ========================================================================== */

const SIZE_CLASS: Record<NonNullable<Memory["size"]>, string> = {
  sm: "max-w-[230px] sm:max-w-[280px]",
  md: "max-w-[300px] sm:max-w-[380px]",
  lg: "max-w-[360px] sm:max-w-[460px]",
};

const SIDE_CLASS: Record<NonNullable<Memory["side"]>, string> = {
  left: "mr-auto sm:ml-[4%]",
  right: "ml-auto sm:mr-[4%]",
  center: "mx-auto",
};

/* -------------------------------------------------------------------------- */
/* One floating card                                                          */
/* -------------------------------------------------------------------------- */

function MemoryCard({ memory, index }: { memory: Memory; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const eased = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    restDelta: 0.001,
  });

  const side = memory.side ?? (index % 2 === 0 ? "left" : "right");
  const lean = side === "left" ? 1 : side === "right" ? -1 : 0.45;

  /* Everything below is a no-op when the viewer asked for reduced motion. */
  const y = useTransform(eased, [0, 1], reduced ? [0, 0] : [110, -110]);
  const rotateY = useTransform(eased, [0, 0.5, 1], reduced ? [0, 0, 0] : [9 * lean, 0, -9 * lean]);
  const rotateX = useTransform(eased, [0, 0.5, 1], reduced ? [0, 0, 0] : [7, 0, -7]);
  const skewY = useTransform(eased, [0, 0.5, 1], reduced ? [0, 0, 0] : [1.6 * lean, 0, -1.6 * lean]);
  const scale = useTransform(eased, [0, 0.5, 1], reduced ? [1, 1, 1] : [0.93, 1, 0.93]);
  const opacity = useTransform(eased, [0, 0.16, 0.84, 1], reduced ? [1, 1, 1, 1] : [0.32, 1, 1, 0.32]);

  const isVideo = memory.kind === "video";

  return (
    <div
      ref={ref}
      className={`scene w-full px-2 ${SIZE_CLASS[memory.size ?? "md"]} ${SIDE_CLASS[side]}`}
    >
      <motion.figure
        style={{ y, rotateX, rotateY, skewY, scale, opacity, transformStyle: "preserve-3d" }}
        whileHover={reduced ? undefined : { scale: 1.045, rotateX: 0, rotateY: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        className="glass group relative rounded-[26px] p-2.5 will-change-transform"
      >
        {/* Soft light that leaks out from behind the card on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(242,128,155,0.35), transparent 70%)",
          }}
        />

        <div
          className={`relative overflow-hidden rounded-[18px] bg-abyss ${
            memory.rotate ? "aspect-[16/9]" : ""
          }`}
        >
          {isVideo ? (
            <video
              src={memory.src}
              poster={memory.poster}
              controls
              playsInline
              preload="metadata"
              className="block w-full rounded-[18px] bg-black"
              onPlay={() => window.dispatchEvent(new Event("nandini:duck"))}
              onPause={() => window.dispatchEvent(new Event("nandini:unduck"))}
              onEnded={() => window.dispatchEvent(new Event("nandini:unduck"))}
            />
          ) : memory.rotate ? (
            /* Shot lying down: the source is 9:16 with the top of the head at
               the right edge, so it is turned a quarter turn anticlockwise
               inside a 16:9 frame, with the axes swapped to fill it exactly. */
            <img
              src={memory.src}
              alt={memory.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 m-auto h-[177.7778%] w-[56.25%] max-w-none object-cover"
              style={{ transform: "rotate(-90deg)" }}
            />
          ) : (
            <img
              src={memory.src}
              alt={memory.alt}
              loading="lazy"
              decoding="async"
              className="block w-full rounded-[18px] object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
          )}
        </div>

        {memory.caption && (
          <figcaption className="px-3 pb-2 pt-3.5 text-center font-display text-[0.9rem] font-light italic leading-snug text-haze">
            {memory.caption}
          </figcaption>
        )}
      </motion.figure>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* A line of comfort between the photographs                                  */
/* -------------------------------------------------------------------------- */

function InterludeBlock({ interlude }: { interlude: Interlude }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial="rest"
      whileInView="shown"
      viewport={{ once: true, amount: 0.55 }}
      variants={{
        rest: {},
        shown: { transition: { staggerChildren: 0.22, delayChildren: 0.08 } },
      }}
      className="mx-auto max-w-2xl px-6 py-[16vh] text-center"
    >
      {interlude.lines.map((line, i) => (
        <motion.p
          key={i}
          variants={{
            rest: reduced
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0.25, y: 26, filter: "blur(12px)" },
            shown: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 1.5, ease: [0.22, 0.61, 0.24, 1] }}
          className="font-display text-[clamp(1.7rem,6vw,3.3rem)] font-light leading-[1.2] text-ether text-glow balance"
        >
          {line}
        </motion.p>
      ))}

      {interlude.soft && (
        <motion.p
          variants={{
            rest: reduced ? { opacity: 1, y: 0 } : { opacity: 0.2, y: 18 },
            shown: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 1.5, ease: [0.22, 0.61, 0.24, 1] }}
          className="mx-auto mt-8 max-w-lg text-[clamp(0.95rem,2.6vw,1.1rem)] font-light leading-relaxed text-haze/85 pretty"
        >
          {interlude.soft}
        </motion.p>
      )}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* The section                                                                */
/* -------------------------------------------------------------------------- */

export default function MemoryGallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="memories" ref={ref} className="relative py-[10vh]" aria-label="Yaadein">
      <RailLine progress={scrollYProgress} />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-[14vh]">
        {GALLERY.map((block, i) =>
          block.type === "memory" ? (
            <MemoryCard key={`m-${i}`} memory={block.data} index={i} />
          ) : (
            <InterludeBlock key={`i-${i}`} interlude={block.data} />
          ),
        )}
      </div>
    </section>
  );
}

/* A thin thread of light down the centre that fills as she reads. */
function RailLine({ progress }: { progress: MotionValue<number> }) {
  const scaleY = useSpring(progress, { stiffness: 80, damping: 30, restDelta: 0.001 });

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/[0.06] lg:block"
    >
      <motion.div
        style={{ scaleY, transformOrigin: "top" }}
        className="h-full w-full bg-gradient-to-b from-rose/70 via-gold/50 to-transparent"
      />
    </div>
  );
}
