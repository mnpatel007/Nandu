"use client";

import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import { useMotionSafety } from "@/lib/useMotionSafety";
import AudioPlayer from "@/components/AudioPlayer";
import BackgroundGlow from "@/components/BackgroundGlow";
import HeroHook from "@/components/HeroHook";
import MemoryGallery from "@/components/MemoryGallery";
import TheClimax from "@/components/TheClimax";
import TrailerOutro from "@/components/TrailerOutro";

/* ============================================================================
   The orchestrator.

   Scene 1  HeroHook       — the dark, the breath, her name
   Scene 2  MemoryGallery  — the floating photographs and the comfort
   Scene 3  TheClimax      — the quote, built word by word out of the dark
   Scene 4  TrailerOutro   — the dissolve, the date, the heartbeat

   BackgroundGlow and AudioPlayer sit above all of it and never unmount.
   ========================================================================== */

export default function Page() {
  useMotionSafety();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <MotionConfig reducedMotion="user">
      <BackgroundGlow />

      {/* A hairline of light across the top that fills as she moves through it */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress, transformOrigin: "left" }}
        className="fixed inset-x-0 top-0 z-50 h-[2px] bg-gradient-to-r from-rose via-gold to-ether"
      />

      <main className="relative">
        <HeroHook />
        <MemoryGallery />
        <TheClimax />
        <TrailerOutro />

        <footer className="pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-6 text-center">
          <p className="text-[10px] font-light uppercase tracking-[0.4em] text-haze/45">
            bas atlu j · hamna maate
          </p>
        </footer>
      </main>

      <AudioPlayer />
    </MotionConfig>
  );
}
