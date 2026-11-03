"use client";

import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface CrowdCanvasProps {
  /** Sprite sheet of people (rows x cols grid). Self-host it in /public for production. */
  src: string;
  rows?: number;
  cols?: number;
  /** Radius in px of the colour spotlight that follows the cursor. */
  spotlight?: number;
  /** Violet tint (0-1) applied to people inside the spotlight. */
  tint?: number;
  className?: string;
}

type Stage = { width: number; height: number };

type Peep = {
  rect: number[];
  width: number;
  height: number;
  x: number;
  y: number;
  anchorY: number;
  scaleX: number;
  scale: number;
  walk: gsap.core.Timeline | null;
};

const randomRange = (min: number, max: number) => min + Math.random() * (max - min);
const randomIndex = <T,>(array: T[]) => randomRange(0, array.length) | 0;
const removeFromArray = <T,>(array: T[], i: number) => array.splice(i, 1)[0];
const removeItemFromArray = <T,>(array: T[], item: T) =>
  removeFromArray(array, array.indexOf(item));

const CrowdCanvas = ({
  src,
  rows = 15,
  cols = 7,
  spotlight = 150,
  tint = 0.26,
  className,
}: CrowdCanvasProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const base = baseRef.current;
    const reveal = revealRef.current;
    if (!wrap || !base || !reveal) return;
    const baseCtx = base.getContext("2d");
    const revealCtx = reveal.getContext("2d");
    if (!baseCtx || !revealCtx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;

    const img = new Image();
    const stage: Stage = { width: 0, height: 0 };
    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    // Calculate calm, balanced crowd size according to canvas width
    const getTargetCrowdSize = () => Math.max(5, Math.min(13, Math.floor(stage.width / 100)));

    // ---------- walking setup with subtle depth & natural variation ----------
    const resetPeep = (peep: Peep) => {
      const direction = Math.random() > 0.5 ? 1 : -1;

      // Subtle vertical depth: people in background are slightly higher and smaller
      const depthFactor = Math.random(); // 0 = closest, 1 = farthest
      const offsetY = 60 - 160 * depthFactor;
      const scale = 0.88 + 0.2 * (1 - depthFactor); // 0.88 to 1.08

      const actualWidth = peep.width * scale;
      const actualHeight = peep.height * scale;
      const startY = stage.height - actualHeight + offsetY;
      const startX = direction === 1 ? -actualWidth - 30 : stage.width + 30;
      const endX = direction === 1 ? stage.width + 30 : -actualWidth - 30;

      peep.scaleX = direction;
      peep.scale = scale;
      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;
      return { startY, endX };
    };

    const normalWalk = (peep: Peep, { startY, endX }: { startY: number; endX: number }) => {
      // Calmer, gentler walk duration
      const xDuration = 16;
      const yDuration = 0.35;
      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.75, 1.05));
      tl.to(peep, { duration: xDuration, x: endX, ease: "none" }, 0);
      tl.to(
        peep,
        { duration: yDuration, repeat: Math.ceil(xDuration / yDuration), yoyo: true, y: startY - 5 },
        0,
      );
      return tl;
    };

    const addPeepToCrowd = () => {
      if (!availablePeeps.length) return null;
      const peep = removeFromArray(availablePeeps, randomIndex(availablePeeps));
      const walk = normalWalk(peep, resetPeep(peep)).eventCallback("onComplete", () => {
        removeItemFromArray(crowd, peep);
        availablePeeps.push(peep);
        const targetSize = getTargetCrowdSize();
        if (!disposed && crowd.length < targetSize) {
          gsap.delayedCall(randomRange(0.5, 2), () => {
            if (!disposed && crowd.length < getTargetCrowdSize()) {
              addPeepToCrowd();
            }
          });
        }
      });
      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      return peep;
    };

    const initCrowd = () => {
      const targetSize = getTargetCrowdSize();
      for (let i = 0; i < targetSize; i++) {
        const peep = addPeepToCrowd();
        if (peep && peep.walk) {
          // Evenly distribute starting progress across canvas to avoid clusters
          const progress = (i + 0.3 * Math.random()) / targetSize;
          peep.walk.progress(progress % 1);
        }
      }
      if (reduceMotion) crowd.forEach((p) => p.walk?.pause());
    };

    const createPeeps = () => {
      const { naturalWidth, naturalHeight } = img;
      const rectWidth = naturalWidth / rows;
      const rectHeight = naturalHeight / cols;
      for (let i = 0; i < rows * cols; i++) {
        allPeeps.push({
          rect: [(i % rows) * rectWidth, ((i / rows) | 0) * rectHeight, rectWidth, rectHeight],
          width: rectWidth,
          height: rectHeight,
          x: 0,
          y: 0,
          anchorY: 0,
          scaleX: 1,
          scale: 1,
          walk: null,
        });
      }
    };

    // ---------- drawing ----------
    const draw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, tintAlpha = 0) => {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);
      crowd.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.scale(p.scaleX * p.scale, p.scale);
        ctx.drawImage(img, p.rect[0], p.rect[1], p.rect[2], p.rect[3], 0, 0, p.width, p.height);
        ctx.restore();
      });
      ctx.restore();
      if (tintAlpha) {
        // Soft violet tint only over the drawn figures
        ctx.save();
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = `rgba(139, 92, 246, ${tintAlpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
      }
    };

    // ---------- cursor spotlight ----------
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let seen = false;

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      if (!seen) {
        current.x = target.x;
        current.y = target.y;
        seen = true;
      }
      reveal.style.opacity = "1";
    };
    const onLeave = () => {
      reveal.style.opacity = "0";
    };

    const render = () => {
      current.x += (target.x - current.x) * 0.14;
      current.y += (target.y - current.y) * 0.14;
      reveal.style.setProperty("--mx", `${current.x}px`);
      reveal.style.setProperty("--my", `${current.y}px`);
      draw(baseCtx, base);
      draw(revealCtx, reveal, tint);
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      stage.width = base.clientWidth;
      stage.height = base.clientHeight;
      [base, reveal].forEach((c) => {
        c.width = stage.width * dpr;
        c.height = stage.height * dpr;
      });
      crowd.forEach((p) => p.walk?.kill());
      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);
      initCrowd();
    };

    img.onload = () => {
      if (disposed) return;
      createPeeps();
      resize();
      gsap.ticker.add(render);
    };
    img.src = src;

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      disposed = true;
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      gsap.ticker.remove(render);
      crowd.forEach((p) => p.walk?.kill());
    };
  }, [src, rows, cols, tint]);

  const mask = `radial-gradient(circle ${spotlight}px at var(--mx, -999px) var(--my, -999px), #000 25%, transparent 100%)`;

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {/* Layer 1: the crowd, calm, colourless with gentle opacity */}
      <canvas ref={baseRef} className="absolute inset-0 h-full w-full opacity-65 grayscale" />
      {/* Layer 2: same crowd in colour, revealed smoothly around the cursor */}
      <canvas
        ref={revealRef}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500 ease-out"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      />
    </div>
  );
};

export { CrowdCanvas };
export default CrowdCanvas;
