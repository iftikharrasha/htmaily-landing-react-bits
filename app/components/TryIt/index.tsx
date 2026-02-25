"use client";

import { useReducer, useRef, useEffect, useState } from "react";
import Playground from "./Playground";
import RevealBackground from "@/components/RevealBackground";
import { initialTryItState, tryItReducer } from "@/lib/tryit/tryIt.reducer";
import { SimulationTargetCursorHandle } from "@/components/SimulationTargetCursor";
import { useSimulation } from "@/lib/tryit/useSimulation";
import { Progress } from "@/components/ui/progress";

export default function TryIt() {
  const [state, dispatch] = useReducer(tryItReducer, initialTryItState);
  const cursorRef = useRef<SimulationTargetCursorHandle>(null);
  const playgroundRef = useRef<HTMLDivElement | null>(null);
  const [hoveredInstanceId, setHoveredInstanceId] = useState<string | null>(null);

  // Initialize simulation (your custom hook)
  const { progress } = useSimulation(state, dispatch, cursorRef);

  // Scroll lock + smooth scroll effect
  useEffect(() => {
  if (state.mode !== "SIMULATE") return;

  const container = playgroundRef.current;
  if (!container) return;

  // 1️⃣ Calculate exact target scroll
  const rect = container.getBoundingClientRect();
  const targetScroll = window.scrollY + rect.top - 40;

  // 2️⃣ Instantly move there (NO smooth scroll)
  window.scrollTo(0, targetScroll);

  // 3️⃣ Lock immediately
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.top = `-${targetScroll}px`;
  document.body.style.width = "100%";
  document.body.style.left = "0";
  document.body.style.right = "0";

  return () => {
    const lockedScrollY =
      parseInt(document.body.style.top || "0") * -1;

    // 4️⃣ Unlock cleanly
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.left = "";
    document.body.style.right = "";

    window.scrollTo(0, lockedScrollY);
  };
}, [state.mode]);

  return (
    <section className="relative w-full min-h-[85vh]">
      <RevealBackground image="/reveal.png" radius={120} softness={200} className="h-288" />

      <div className="mx-auto w-full max-w-280 px-4 py-32 flex flex-col items-center justify-center mb-20 z-10">
        {/* Header */}
        <div className="mx-auto w-full max-w-280 mb-4 md:mb-12">
          <h2 className="text-2xl lg:text-4xl font-bold text-[#FAFAFA] mb-4 md:mb-12">
            No <span className="line-through font-normal">code</span> Way
            <br />
            <span className="relative italic font-normal text-white/60">
              Try it Out!
              <svg
                viewBox="0 0 200 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-1 left-0 h-2 w-full text-[#18E299] md:h-3"
              >
                <path
                  d="M2.00025 6.99997C25.7602 3.86993 116.326 -1.82944 198.006 2.05929"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* Playground */}
        <div className="relative mx-auto max-w-225" ref={playgroundRef}>
          {state.mode === "SIMULATE" && (
            <div className="fixed top-0 left-1/2 -translate-x-1/2 z-10000 bg-black/80 backdrop-blur px-6 py-4 rounded-xl shadow-xl w-[320px]">
              <div className="flex justify-between text-white text-sm mb-2">
                <span>🎬 Simulation Mode - Scroll Locked</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}
            
          <Playground
            state={state}
            dispatch={dispatch}
            cursorRef={cursorRef}
            hoveredInstanceId={hoveredInstanceId}
            setHoveredInstanceId={setHoveredInstanceId}
          />
        </div>
      </div>
    </section>
  );
}