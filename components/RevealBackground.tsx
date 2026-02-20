"use client";

import { useEffect, useRef } from "react";

interface RevealBackgroundProps {
  image: string;
  radius?: number;
  softness?: number;
  className?: string;
}

export default function RevealBackground({
  image,
  radius = 140,
  softness = 260,
  className = "",
}: RevealBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    let mouseX = container.offsetWidth / 2;
    let mouseY = container.offsetHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;

    const lerp = (start: number, end: number, amt: number) =>
      start + (end - start) * amt;

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const animate = () => {
      currentX = lerp(currentX, mouseX, 0.12);
      currentY = lerp(currentY, mouseY, 0.12);

      img.style.setProperty("--mx", `${currentX}px`);
      img.style.setProperty("--my", `${currentY}px`);

      requestAnimationFrame(animate);
    };

    container.addEventListener("mousemove", handleMove);

    animate();

    return () => {
      container.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        ref={imgRef}
        className="absolute inset-0 pointer-events-none w-full h-full"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          opacity: 0.2,
          WebkitMaskImage: `radial-gradient(
            circle ${softness}px at var(--mx, 50%) var(--my, 50%),
            rgba(255,255,255,1) 0px,
            rgba(255,255,255,0.9) ${radius}px,
            rgba(255,255,255,0.4) ${softness - 60}px,
            rgba(255,255,255,0) ${softness}px
          )`,
          maskImage: `radial-gradient(
            circle ${softness}px at var(--mx, 50%) var(--my, 50%),
            rgba(255,255,255,1) 0px,
            rgba(255,255,255,0.9) ${radius}px,
            rgba(255,255,255,0.4) ${softness - 60}px,
            rgba(255,255,255,0) ${softness}px
          )`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />
    </div>
  );
}