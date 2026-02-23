"use client";

import { useRef, useEffect } from "react";
import { SimulationTargetCursorHandle } from "@/components/SimulationTargetCursor";
import LeftPanel from "./LeftPanel";
import { PreviewPanel } from "./PreviewPanel";
import SimulationTargetCursor from "@/components/SimulationTargetCursor";

interface PlaygroundProps {
  state: any;
  dispatch: any;
  cursorRef: React.RefObject<SimulationTargetCursorHandle>;
  hoveredInstanceId: string | null;
  setHoveredInstanceId: (id: string | null) => void;
}

export default function Playground({
  state,
  dispatch,
  cursorRef,
  hoveredInstanceId,
  setHoveredInstanceId,
}: PlaygroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Highlight targets inside playground
  useEffect(() => {
    if (state.mode === "SIMULATE" && state.targetElement) {
      cursorRef.current?.highlightElement(`[data-target="${state.targetElement}"]`);
    } else {
      cursorRef.current?.clearHighlight();
    }
  }, [state.targetElement, state.mode]);

  return (
    <div ref={containerRef} className="relative isolate">
      {state.mode === "SIMULATE" && (
        <SimulationTargetCursor
          ref={cursorRef}
          spinDuration={2}
          hideDefaultCursor={false}
          parallaxOn
          hoverDuration={0.2}
        />
      )}

      <div className="p-8 min-h-102 grid grid-cols-1 lg:grid-cols-2 gap-10">
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
                  absolute top-40 -left-40 w-46 h-auto -rotate-12 shadow-[0_8px_30px_rgba(0,0,0,0.06)]
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
                    absolute top-115 -left-45 w-46 h-auto rotate-12 shadow-[0_8px_30px_rgba(0,0,0,0.06)]
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