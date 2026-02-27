"use client";

import Magnet from "@/components/Magnet";
import { TEMPLATES } from "@/lib/templateMetadata";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function HeroPreviewLoop() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (paused) return;

    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % TEMPLATES.length);
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  const current = TEMPLATES[index];

  return (
    <div
      className="absolute top-12 left-1/2 -translate-x-1/2 translate-y-2 z-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
        <Magnet padding={50} disabled={false} magnetStrength={10}>
            <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={378}
                height={756}
                priority={index === 0}
                className="w-94 h-189 object-contain rounded-lg transition-opacity duration-700 ease-in-out"
            />
        </Magnet>
    </div>
  );
}