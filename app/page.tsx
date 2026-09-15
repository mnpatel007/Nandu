"use client";

import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import { useMotionSafety } from "@/lib/useMotionSafety";
import AudioPlayer from "@/components/AudioPlayer";
import BackgroundGlow from "@/components/BackgroundGlow";
import PetalRain from "@/components/PetalRain";
import FloatingNav from "@/components/FloatingNav";
import HeroHook from "@/components/HeroHook";
import LoveLetter from "@/components/LoveLetter";
import MemoryGallery from "@/components/MemoryGallery";
import MemoryVault from "@/components/MemoryVault";
import ReasonsDeck from "@/components/ReasonsDeck";
import OpenWhen from "@/components/OpenWhen";
import ConstellationPromises from "@/components/ConstellationPromises";
import TheClimax from "@/components/TheClimax";
import SecretVault from "@/components/SecretVault";
import TrailerOutro from "@/components/TrailerOutro";

/* ============================================================================
   NANDINI — A SANCTUARY OF ETERNAL LOVE
   Orchestrated by Meet.
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
      {/* Dynamic Cosmic Background Atmosphere */}
      <BackgroundGlow />

      {/* Falling Rose Petals & Mouse/Touch Sparkle Trail */}
      <PetalRain />

      {/* Floating Glass Navigation Dock */}
      <FloatingNav />

      {/* Hairline Reading Progress Bar across the top */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress, transformOrigin: "left" }}
        className="fixed inset-x-0 top-0 z-50 h-[2px] bg-gradient-to-r from-rose via-gold to-ether shadow-[0_0_12px_rgba(242,128,155,0.8)]"
      />

      {/* Main Narrative Odyssey */}
      <main className="relative">
        {/* Chapter 1: The Portal & Her Name */}
        <HeroHook />

        {/* Chapter 2: The Wax-Sealed Love Letter */}
        <LoveLetter />

        {/* Chapter 3: Curated Memory Narrative Scroll */}
        <MemoryGallery />

        {/* Chapter 4: Complete 50-Item Photo & Video Vault */}
        <MemoryVault />

        {/* Chapter 5: 100 Reasons Why You Are My Life */}
        <ReasonsDeck />

        {/* Chapter 6: Open When Emotional Care Kit */}
        <OpenWhen />

        {/* Chapter 7: Constellation of Sacred Promises */}
        <ConstellationPromises />

        {/* Chapter 8: The Vow & Word-by-Word Dialogue Reveal */}
        <TheClimax />

        {/* Chapter 9: The Secret Vault & Wishing Star */}
        <SecretVault />

        {/* Chapter 10: The Grand Countdown to 7 October & Heartbeat Reveal */}
        <TrailerOutro />

        {/* Footer */}
        <footer className="pb-[max(3rem,env(safe-area-inset-bottom))] pt-12 text-center border-t border-white/5 relative z-10">
          <div className="flex flex-col items-center gap-3">
            <span className="text-xl">♥</span>
            <p className="text-xs font-display italic text-ether/90">
              Made with every single beat of my heart for Nandini
            </p>
            <p className="text-[10px] font-light uppercase tracking-[0.45em] text-haze/50">
              Taro Safe Space · Kaayam ahiyan j chu, koi shart vagar · Meet
            </p>
          </div>
        </footer>
      </main>

      {/* Ambient Procedural Music Synthesizer & Sound FX Engine */}
      <AudioPlayer />
    </MotionConfig>
  );
}
