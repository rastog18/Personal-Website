"use client"

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type Orb = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const prefersDark = () => document.documentElement.classList.contains("dark");

    const orbs: Orb[] = [
      { x: 0.22, y: 0.18, r: 0.28, vx: 0.00018, vy: 0.00014 },
      { x: 0.78, y: 0.24, r: 0.22, vx: -0.00016, vy: 0.00011 },
      { x: 0.56, y: 0.82, r: 0.26, vx: 0.00012, vy: -0.00015 }
    ];

    const resize = () => {
      dpr = clamp(window.devicePixelRatio || 1, 1, 2);
      w = Math.floor(window.innerWidth);
      h = Math.floor(window.innerHeight);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawOnce = () => {
      ctx.clearRect(0, 0, w, h);

      // Very subtle base wash
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = prefersDark() ? "rgba(9, 9, 11, 0.55)" : "rgba(255, 255, 255, 0.55)";
      ctx.fillRect(0, 0, w, h);

      // Orbs
      ctx.globalCompositeOperation = "lighter";
      ctx.filter = "blur(42px)";

      const alpha = prefersDark() ? 0.16 : 0.12;

      for (const o of orbs) {
        const cx = o.x * w;
        const cy = o.y * h;
        const rr = o.r * Math.min(w, h);

        // Accent-ish teal
        const g = ctx.createRadialGradient(cx, cy, rr * 0.2, cx, cy, rr);
        g.addColorStop(0, `rgba(20, 184, 166, ${alpha})`);
        g.addColorStop(1, "rgba(20, 184, 166, 0)");

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.filter = "none";
      ctx.globalCompositeOperation = "source-over";
    };

    const step = () => {
      // pause animation when tab not visible
      if (document.visibilityState !== "visible") {
        raf = requestAnimationFrame(step);
        return;
      }

      // drift slowly
      for (const o of orbs) {
        o.x += o.vx;
        o.y += o.vy;

        // bounce in normalized space
        if (o.x < 0.08 || o.x > 0.92) o.vx *= -1;
        if (o.y < 0.08 || o.y > 0.92) o.vy *= -1;

        o.x = clamp(o.x, 0.06, 0.94);
        o.y = clamp(o.y, 0.06, 0.94);
      }

      drawOnce();
      raf = requestAnimationFrame(step);
    };

    resize();
    drawOnce();

    if (!reduced) {
      raf = requestAnimationFrame(step);
    }

    window.addEventListener("resize", resize);

    // Repaint if theme changes (user toggles)
    const themeObs = new MutationObserver(() => drawOnce());
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("resize", resize);
      themeObs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="h-full w-full opacity-90" />
      {/* subtle vignette to keep readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/40 dark:to-zinc-950/45" />
    </div>
  );
}
