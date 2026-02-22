"use client";

import { useReducer, useState, useRef, useEffect } from "react";
import LeftPanel from "./LeftPanel";
import { initialTryItState, tryItReducer } from "@/lib/tryit/tryIt.reducer";
import { PreviewPanel } from "./PreviewPanel";
import { useSimulation } from "@/lib/tryit/useSimulation";
import SimulationTargetCursor, { SimulationTargetCursorHandle } from "@/components/SimulationTargetCursor";

export default function TryItShell() {
  const [state, dispatch] = useReducer(
    tryItReducer,
    initialTryItState
  );
  
  const cursorRef = useRef<SimulationTargetCursorHandle>(null);
  const [hoveredInstanceId, setHoveredInstanceId] = useState<string | null>(null);
  const scrollPositionRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize simulation
  useSimulation(state, dispatch, cursorRef);

  
  // Handle target changes from simulation
  useEffect(() => {
    if (state.mode === "SIMULATE" && state.targetElement) {
      const selector = `[data-target="${state.targetElement}"]`;
      cursorRef.current?.highlightElement(selector);
    } else if (state.mode !== "SIMULATE" || !state.targetElement) {
      cursorRef.current?.clearHighlight();
    }
  }, [state.targetElement, state.mode]);

  // Scroll lock and position effect (IMPROVED)
  useEffect(() => {
    if (state.mode !== "SIMULATE") return;

    console.log("🎬 Simulation started - preparing view");

    const playgroundContainer = document.getElementById("try-it-playground");
    if (!playgroundContainer) {
      console.error("❌ Could not find playground container!");
      return;
    }

    let rafId: number | null = null;
    let cancelled = false;
    let lockedScrollY = 0;

    console.log("✅ Found container:", playgroundContainer);

    // Calculate target position EXACTLY like you did
    const rect = playgroundContainer.getBoundingClientRect();
    const targetPosition = window.scrollY + rect.top - 40;

    console.log("📍 Current scroll:", window.scrollY);
    console.log("🎯 Target scroll position:", targetPosition);

    // Ensure unlocked before scrolling
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.left = "";
    document.body.style.right = "";

    // Smooth scroll
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    // Wait for scroll to ACTUALLY reach target (no timeout)
    const waitForScrollFinish = () => {
      if (cancelled) return;

      const currentY = window.scrollY;
      const distance = Math.abs(currentY - targetPosition);

      if (distance < 2) {
        // Final scroll position
        lockedScrollY = window.scrollY;

        // HARD LOCK (same as your original)
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${lockedScrollY}px`;
        document.body.style.width = "100%";
        document.body.style.left = "0";
        document.body.style.right = "0";

        console.log("🔒 Scroll locked at:", lockedScrollY);
        return;
      }

      rafId = requestAnimationFrame(waitForScrollFinish);
    };

    rafId = requestAnimationFrame(waitForScrollFinish);

    // Show indicator (same as yours)
    const indicator = document.createElement("div");
    indicator.id = "simulation-scroll-indicator";
    indicator.className =
      "fixed top-4 left-1/2 transform -translate-x-1/2 z-[10000] bg-black/80 text-white px-4 py-2 rounded-full text-sm shadow-lg animate-pulse";
    indicator.innerText = "🎬 Simulation Mode - Scroll Locked";
    document.body.appendChild(indicator);

    return () => {
      cancelled = true;

      if (rafId) cancelAnimationFrame(rafId);

      // IMPORTANT FIX:
      // Capture current locked position BEFORE removing fixed
      const scrollY = lockedScrollY;

      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.left = "";
      document.body.style.right = "";

      // Restore exact scroll position immediately
      window.scrollTo(0, scrollY);

      // Remove indicator
      const existingIndicator = document.getElementById(
        "simulation-scroll-indicator"
      );
      if (existingIndicator) {
        existingIndicator.remove();
      }

      console.log("🔓 Scroll unlocked - restored to:", scrollY);
    };
  }, [state.mode]);

  return (
    <div ref={containerRef} className="relative isolate">
      {/* Simulation Target Cursor - only active during simulation */}
      {state.mode === "SIMULATE" && (
        <SimulationTargetCursor 
          ref={cursorRef}
          spinDuration={2}
          hideDefaultCursor={false}
          parallaxOn
          hoverDuration={0.2}
        />
      )}
      
      <div className="
        p-8
        min-h-102
        grid grid-cols-1 lg:grid-cols-2
        gap-10
      ">
        <LeftPanel 
          state={state} 
          dispatch={dispatch} 
          onHover={setHoveredInstanceId}
          hoveredInstanceId={hoveredInstanceId}
        />
        <PreviewPanel 
          segments={state.segments} 
          onHover={setHoveredInstanceId} 
          hoveredInstanceId={hoveredInstanceId}
        />

        {/* Floating cards - show based on state */}
        <div className="pointer-events-none absolute inset-0 z-30">
          {/* Card 1 */}
          {(state.mode === "TRY" || state.activeFloatingCard === 1 || state.activeFloatingCard === 2 || state.activeFloatingCard === 3) && (
            <div className=" 
              absolute top-1/3 -left-40 w-46 h-auto -rotate-12 shadow-[0_8px_30px_rgba(0,0,0,0.06)]
              bg-white p-3.5 rounded-2xl border border-gray-100 items-center gap-3 z-30
              animate-[boat_6s_ease-in-out_infinite] 
            ">
              <div className="text-left">
                <p className="text-xs text-gray-800 font-bold">Select a block from here</p>
                <p className="text-xs text-gray-400 flex items-center gap-1">You can start by clicking a block from this panel
                  <span className="absolute text-red-500 font-bold text-lg bottom-2 right-2">#1</span>
                </p>
              </div>
            </div>
          )}

          {/* Card 2 */}
          {(state.mode === "TRY" || state.activeFloatingCard === 2 || state.activeFloatingCard === 3) && (
            <div className="
                absolute top-20 -right-40 w-46 h-auto rotate-12 shadow-[0_8px_30px_rgba(0,0,0,0.06)]
              bg-white p-3.5 rounded-2xl border border-gray-100 items-center gap-3 z-30
                animate-[boat_8s_ease-in-out_infinite]
            ">
              <div className="text-left">
                <p className="text-xs text-gray-800 font-bold">Output in the right panel</p>
                <p className="text-xs text-gray-400 flex items-center gap-1">A pre made layout preview will be generated here
                  <span className="absolute text-red-500 font-bold text-lg bottom-2 right-2">#2</span>
                </p>
              </div>
            </div>
          )}

          {/* Card 3 */}
          {(state.mode === "TRY" || state.activeFloatingCard === 3) && (
            <div className="
                absolute bottom-2 -left-45 w-46 h-auto rotate-12 shadow-[0_8px_30px_rgba(0,0,0,0.06)]
              bg-white p-3.5 rounded-2xl border border-gray-100 items-center gap-3 z-30
                animate-[boat_4s_ease-in-out_infinite]
            ">
              <div className="text-left">
                <p className="text-xs text-gray-800 font-bold">Chose any combinations</p>
                <p className="text-xs text-gray-400 flex items-center gap-1">Click the dots to chose from more combinations
                  <span className="absolute text-red-500 font-bold text-lg bottom-2 right-2">#3</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}