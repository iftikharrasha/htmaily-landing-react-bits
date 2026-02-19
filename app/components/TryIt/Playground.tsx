"use client";

import { useReducer } from "react";
import LeftPanel from "./LeftPanel";
import { initialTryItState, tryItReducer } from "@/lib/tryit/tryIt.reducer";
import { PreviewPanel } from "./PreviewPanel";

export default function TryItShell() {
  const [state, dispatch] = useReducer(
    tryItReducer,
    initialTryItState
  );

  return (
    <div className="relative">
      <div className="
        p-8
        min-h-102
        grid grid-cols-1 lg:grid-cols-2
        gap-10
      ">
        {/* bg-[#0B0B0B]
        border border-white/10
        rounded-3xl */}
        <LeftPanel state={state} dispatch={dispatch} />
        <PreviewPanel segments={state.segments} />

        
        {/* Floating placeholders */}
        <div className="
          absolute top-1/3 -left-40 w-46 h-auto -rotate-12 shadow-[0_8px_30px_rgba(0,0,0,0.06)]
        bg-white p-3.5 rounded-2xl border border-gray-100 items-center gap-3 z-30
        " >
          <div className="text-left">
            <p className="text-xs text-gray-800 font-bold">Click the pulse to input</p>
            <p className="text-xs text-gray-400 flex items-center gap-1">You can start by clicking a block from this panel
              <span className="absolute text-red-500 font-bold text-lg bottom-2 right-2">#1</span>
            </p>
          </div>
        </div>

        <div className="
            absolute top-20 -right-40 w-46 h-auto rotate-12 shadow-[0_8px_30px_rgba(0,0,0,0.06)]
          bg-white p-3.5 rounded-2xl border border-gray-100 items-center gap-3 z-30
        " >
          <div className="text-left">
            <p className="text-xs text-gray-800 font-bold">Output in the right panel</p>
            <p className="text-xs text-gray-400 flex items-center gap-1">A pre made layout preview will be generated here
              <span className="absolute text-red-500 font-bold text-lg bottom-2 right-2">#2</span>
            </p>
          </div>
        </div>

        <div className="
            absolute bottom-2 -left-45 w-46 h-auto rotate-12 shadow-[0_8px_30px_rgba(0,0,0,0.06)]
          bg-white p-3.5 rounded-2xl border border-gray-100 items-center gap-3 z-30
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
  );
}
