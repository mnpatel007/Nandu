"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/* ============================================================================
   BackgroundGlow
   ----------------------------------------------------------------------------
   A fixed atmospheric layer that sits behind everything. Four soft radial
   masses drift and breathe on long, prime-ish loops so they never visibly
   resync. As the page is scrolled the whole field warms up — cool indigo at
   the top of the story, rose and gold by the end of it.
   ========================================================================== */

type BlobProps = {
  className: string;
  color: string;
  size: number;
  x: [number, number, number];
  y: [number, number, number];
  scale: [number, number, number];
  duration: number;
  delay?: number;
  still: boolean;
};

function Blob({ className, color, size, x, y, scale, duration, delay = 0, still }: BlobProps) {
  return (
    <motion.div
      aria-hidden
      className={`absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 68%)`,
        filter: "blur(72px)",
        willChange: "transform, opacity",
      }}
      animate={
        still
          ? undefined
          : {
              x,
              y,
              scale,
              opacity: [0.55, 0.9, 0.55],
            }
      }
      transition={
        still
          ? undefined
          : {
              duration,
              delay,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }
      }
    />
  );
}

export default function BackgroundGlow() {
  const reduced = useReducedMotion();
  const still = Boolean(reduced);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 24,
    restDelta: 0.001,
  });

  /* The field warms as the story deepens. */
  const warmth = useTransform(progress, [0, 0.45, 0.78, 1], [0, 0.25, 0.62, 0.92]);
  const coolFade = useTransform(progress, [0, 0.6], [0.75, 0.15]);
  const vignette = useTransform(progress, [0, 0.7, 1], [0.55, 0.75, 0.92]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void grain"
      aria-hidden="true"
    >
      {/* --- cool base, strongest at the beginning --- */}
      <motion.div className="absolute inset-0" style={{ opacity: coolFade }}>
        <Blob
          className="left-[-18%] top-[-14%]"
          color="rgba(60, 84, 180, 0.42)"
          size={780}
          x={[0, 90, 0]}
          y={[0, 60, 0]}
          scale={[1, 1.18, 1]}
          duration={23}
          still={still}
        />
        <Blob
          className="right-[-22%] top-[18%]"
          color="rgba(38, 52, 128, 0.4)"
          size={860}
          x={[0, -70, 0]}
          y={[0, 110, 0]}
          scale={[1.05, 0.88, 1.05]}
          duration={31}
          delay={2}
          still={still}
        />
      </motion.div>

      {/* --- warm masses, strongest at the end --- */}
      <motion.div className="absolute inset-0" style={{ opacity: warmth }}>
        <Blob
          className="left-[6%] bottom-[-24%]"
          color="rgba(242, 128, 155, 0.5)"
          size={900}
          x={[0, 120, 0]}
          y={[0, -80, 0]}
          scale={[1, 1.22, 1]}
          duration={27}
          still={still}
        />
        <Blob
          className="right-[-10%] bottom-[4%]"
          color="rgba(243, 201, 139, 0.42)"
          size={700}
          x={[0, -90, 0]}
          y={[0, -50, 0]}
          scale={[1.1, 0.92, 1.1]}
          duration={19}
          delay={1.5}
          still={still}
        />
      </motion.div>

      {/* --- a single slow ether wash across the middle --- */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,246,236,0.10) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={still ? undefined : { scale: [1, 1.3, 1], opacity: [0.4, 0.75, 0.4] }}
        transition={
          still
            ? undefined
            : { duration: 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
        }
      />

      {/* --- vignette, deepening toward the end --- */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: vignette,
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 30%, rgba(4,4,6,0.75) 78%, #040406 100%)",
        }}
      />
    </div>
  );
}
