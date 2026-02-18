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
    <div
      className="
        relative
        grid grid-cols-1 lg:grid-cols-2
        gap-10
        rounded-3xl
        border border-white/10
        bg-[#0B0B0B]
        p-8
      "
    >
      <LeftPanel state={state} dispatch={dispatch} />
      <PreviewPanel segments={state.segments} />

      {/* Floating placeholders */}
      <div className="absolute top-20 -right-40 w-40 h-28 rounded-xl rotate-12 bg-white shadow-xs" />
      <div className="absolute top-1/3 -left-30 w-32 h-24 rounded-xl -rotate-12 bg-white shadow-xs" />
      <div className="absolute bottom-8 -left-30 w-36 h-24 rounded-xl rotate-12 bg-white shadow-xs" />
    </div>
  );
}
