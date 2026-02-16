"use client";

import { useEffect, useRef, FC, ReactNode } from "react";
import { gsap } from "gsap";

interface GridMotionProps {
  items?: (string | ReactNode)[];
  gradientColor?: string;
  active?: boolean; // hover control from parent
}

const ROWS = 4;
const COLS = 7;
const TOTAL_ITEMS = ROWS * COLS;

type MotionProfile = {
  phase: number;
  speed: number;
  amplitude: number;
};

const GridMotion: FC<GridMotionProps> = ({
  items = [],
  gradientColor = "black",
  active = false,
}) => {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const motionProfiles = useRef<MotionProfile[] | null>(null);
  const hoverStrengthRef = useRef(0);
  const mouseXRef = useRef(0);

  /** Normalize items so grid is always filled */
  const combinedItems =
    items.length > 0
      ? Array.from({ length: TOTAL_ITEMS }, (_, i) => {
          const offset = Math.floor(i / COLS);
          return items[(i + offset) % items.length];
        })
      : Array.from({ length: TOTAL_ITEMS }, (_, i) => `Item ${i + 1}`);

  useEffect(() => {
    if (typeof window === "undefined") return;

    /** Initialize motion profiles ONCE */
    if (!motionProfiles.current) {
      motionProfiles.current = Array.from({ length: ROWS }, () => ({
        phase: Math.random() * Math.PI * 2,
        speed: 0.15 + Math.random() * 0.25,
        amplitude: 80 + Math.random() * 140,
      }));
    }

    mouseXRef.current = 0;
    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX / window.innerWidth - 0.5;
    };

    const update = () => {
      const t = performance.now() * 0.001;

      rowRefs.current.forEach((row, index) => {
        if (!row || !motionProfiles.current) return;

        const { phase, speed, amplitude } =
          motionProfiles.current[index];

        const direction = index % 2 === 0 ? 1 : -1;

        // 🟢 Idle motion
        const idleX =
          Math.sin(t * speed + phase) *
          amplitude *
          direction;

        // 🟣 Hover motion (mouse driven)
        const hoverX =
          mouseXRef.current * 300 * direction;

        // 🎯 Blend
        const x =
          idleX +
          hoverX * hoverStrengthRef.current;

        gsap.set(row, { x });
      });
    };

    gsap.ticker.add(update);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  /** Smooth hover blending */
  useEffect(() => {
    gsap.to(hoverStrengthRef, {
      current: active ? 1 : 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }, [active]);

  return (
    <section
      className="relative w-full h-full overflow-hidden flex items-center justify-center"
      style={{
        background: `radial-gradient(circle, ${gradientColor} 0%, transparent 70%)`,
      }}
    >
      <div className="gap-4 flex-none relative w-[120vw] h-[120vh] grid grid-rows-4 grid-cols-1 rotate-[-15deg] origin-center z-[2]">
        {Array.from({ length: ROWS }, (_, rowIndex) => (
          <div
            key={rowIndex}
            ref={(el) => {
              if (el) rowRefs.current[rowIndex] = el;
            }}
            className="grid grid-cols-7 gap-4 will-change-transform"
          >
            {Array.from({ length: COLS }, (_, colIndex) => {
              const content =
                combinedItems[rowIndex * COLS + colIndex];

              return (
                <div
                  key={colIndex}
                  className="relative rounded-xl overflow-hidden bg-[#111]"
                >
                  {typeof content === "string" &&
                  (content.startsWith("/") ||
                    content.startsWith("http")) ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${content})` }}
                    />
                  ) : (
                    <div className="relative z-10 flex items-center justify-center h-full text-white text-sm p-4 text-center">
                      {content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default GridMotion;