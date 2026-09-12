"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angularSpeed: number;
  opacity: number;
  color: string;
  sway: number;
  swaySpeed: number;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
}

const PETAL_COLORS = [
  "rgba(242, 128, 155, ", // rose
  "rgba(255, 175, 195, ", // light rose
  "rgba(243, 201, 139, ", // gold stardust
  "rgba(225, 75, 108, ",  // deep petal
];

export default function PetalRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const sparklesRef = useRef<Sparkle[]>([]);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let petals: Petal[] = [];

    const createPetal = (seeded = false): Petal => {
      const color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
      return {
        x: Math.random() * width,
        y: seeded ? Math.random() * height : -20,
        size: 5 + Math.random() * 8,
        speedY: 0.5 + Math.random() * 0.9,
        speedX: (Math.random() - 0.5) * 0.4,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.02,
        opacity: 0.25 + Math.random() * 0.45,
        color,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.01 + Math.random() * 0.02,
      };
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 640 ? 18 : 34;
      petals = Array.from({ length: count }, () => createPetal(true));
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse / Touch Sparkle Trail
    const addSparkle = (clientX: number, clientY: number) => {
      if (sparklesRef.current.length > 40) return;
      sparklesRef.current.push({
        x: clientX + (Math.random() - 0.5) * 12,
        y: clientY + (Math.random() - 0.5) * 12,
        size: 1.5 + Math.random() * 3,
        alpha: 0.8,
        life: 0,
        maxLife: 20 + Math.random() * 20,
        color: Math.random() > 0.4 ? "243, 201, 139" : "242, 128, 155",
      });
    };

    const handlePointerMove = (e: MouseEvent) => {
      addSparkle(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        addSparkle(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      // Draw an organic petal shape
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.7, p.size * 0.8, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.5, -p.size * 0.8, -p.size * 0.7, 0, -p.size);
      ctx.fillStyle = `${p.color}${p.opacity})`;
      ctx.fill();
      ctx.restore();
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      // Update & Draw Petals
      for (const p of petals) {
        p.sway += p.swaySpeed;
        p.x += p.speedX + Math.sin(p.sway) * 0.8;
        p.y += p.speedY;
        p.angle += p.angularSpeed;

        if (p.y > height + 25 || p.x < -25 || p.x > width + 25) {
          Object.assign(p, createPetal(false));
          continue;
        }

        drawPetal(p);
      }

      // Update & Draw Sparkles
      for (let i = sparklesRef.current.length - 1; i >= 0; i--) {
        const s = sparklesRef.current[i];
        s.life += 1;
        const progress = s.life / s.maxLife;
        const currentAlpha = (1 - progress) * s.alpha;

        if (progress >= 1) {
          sparklesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (1 - progress * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${currentAlpha.toFixed(2)})`;
        ctx.shadowColor = `rgba(${s.color}, 0.8)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 h-full w-full"
    />
  );
}

