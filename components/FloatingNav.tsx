"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "prologue", label: "Shuruaat", icon: "🕊️" },
  { id: "letter", label: "Prem Patra", icon: "📜" },
  { id: "memories", label: "Yaadein", icon: "🎞️" },
  { id: "reasons", label: "100 Reasons", icon: "💖" },
  { id: "open-when", label: "Open When", icon: "💌" },
  { id: "promises", label: "Promises", icon: "✨" },
  { id: "climax", label: "The Vow", icon: "💬" },
  { id: "secret-vault", label: "Secret Box", icon: "🔐" },
  { id: "outro", label: "7 October", icon: "🎂" },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState<string>("prologue");
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 200);

      // Detect active section based on scroll position
      const scrollPos = latest + window.innerHeight * 0.35;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    });
  }, [scrollY]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 0.61, 0.24, 1] }}
      className="fixed top-3 inset-x-0 z-40 flex justify-center px-4 pointer-events-none"
    >
      <nav
        aria-label="Chapters of Us"
        className={`pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border transition-all duration-500 overflow-x-auto max-w-[96vw] ${
          isScrolled
            ? "glass border-rose/30 shadow-[0_10px_35px_-10px_rgba(242,128,155,0.25)]"
            : "bg-black/30 backdrop-blur-md border-white/10"
        }`}
      >
        <span className="hidden md:inline-block pl-2 pr-1 text-[11px] font-display italic tracking-widest text-gold/90 uppercase select-none">
          Nandini
        </span>
        <span className="hidden md:inline-block h-3 w-px bg-white/20 mr-1" />

        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-light transition-all whitespace-nowrap ${
                isActive
                  ? "text-ether font-medium"
                  : "text-haze hover:text-ether hover:bg-white/5"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activePill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-rose/35 via-gold/30 to-rose/35 border border-rose/40 -z-10 shadow-[0_0_14px_rgba(242,128,155,0.3)]"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <span className="text-[13px]">{item.icon}</span>
              <span className="hidden sm:inline text-[11px] tracking-wide">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </motion.header>
  );
}

