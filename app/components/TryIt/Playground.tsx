"use client";

import { useReducer, useState } from "react";
import LeftPanel from "./LeftPanel";
import { initialTryItState, tryItReducer } from "@/lib/tryit/tryIt.reducer";
import { PreviewPanel } from "./PreviewPanel";
import AnimatedContent from "@/components/AnimatedContent";

export default function TryItShell() {
  const [state, dispatch] = useReducer(
    tryItReducer,
    initialTryItState
  );
  
  // Add state for hover tracking
  const [hoveredInstanceId, setHoveredInstanceId] = useState<string | null>(null);

  return (
    <div className="relative isolate">
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

        <div className="pointer-events-none absolute inset-0 z-30">
          {/* Floating placeholders - keep as is */}
          <AnimatedContent
            distance={50}
            direction="vertical"
            reverse={false}
            duration={1}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.1}
            delay={0.5}
          >
            <div className=" 
              absolute top-20 -left-45 w-46 h-auto -rotate-12 shadow-[0_8px_30px_rgba(0,0,0,0.06)]
            bg-white p-3.5 rounded-xl border border-gray-100 items-center gap-3 z-30
            animate-[boat_6s_ease-in-out_infinite] 
            " >
              <div className="text-left">
                <p className="text-xs text-gray-800 font-bold">Select a block from here</p>
                <p className="text-xs text-gray-400 flex items-center gap-1">You can start by clicking a block from this panel
                  <span className="absolute text-red-500 font-bold text-lg bottom-2 right-2">#1</span>
                </p>
              </div>
            </div>
          </AnimatedContent>

          <div className="
              absolute top-20 -right-40 w-46 h-auto rotate-12 shadow-[0_8px_30px_rgba(0,0,0,0.06)]
            bg-white p-3.5 rounded-xl border border-gray-100 items-center gap-3 z-30
              animate-[boat_7s_ease-in-out_infinite]
          " >
            <div className="text-left">
              <p className="text-xs text-gray-800 font-bold">Output in the right panel</p>
              <p className="text-xs text-gray-400 flex items-center gap-1">A pre made layout preview will be generated here
                <span className="absolute text-red-500 font-bold text-lg bottom-2 right-2">#2</span>
              </p>
            </div>
          </div>

          <div className="
              absolute top-85 -left-40 w-46 h-auto rotate-12 shadow-[0_8px_30px_rgba(0,0,0,0.06)]
            bg-white p-3.5 rounded-xl border border-gray-100 items-center gap-3 z-30
              animate-[boat_4s_ease-in-out_infinite]
          " >
            <div className="text-left">
              <p className="text-xs text-gray-800 font-bold">Chose any combinations</p>
              <p className="text-xs text-gray-400 flex items-center gap-1">Click the dots to chose from more combinations
                <span className="absolute text-red-500 font-bold text-lg bottom-2 right-2">#3</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}