"use client";

import { SegmentInstance } from "@/lib/tryit/tryIt.types";
import { Trash2 } from "lucide-react";

interface Props {
  segments: SegmentInstance[];
  mode: "try" | "simulate";
  onVariantChange: (instanceId: string, variantId: string) => void;
  onDelete: (instanceId: string) => void;
}

export function ActiveBlocksController({
  segments,
  mode,
  onVariantChange,
  onDelete,
}: Props) {
  if (segments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-white/30">
          No blocks added yet. Click on a block type to start building.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider">
        Your Email Blocks ({segments.length})
      </h4>

      <div className="space-y-2">
        {segments.map((segment) => (
          <div
            key={segment.instanceId}
            className="
              rounded-lg 
              bg-white/5 
              border border-white/10 
              p-3 
              space-y-2
              hover:bg-white/8
              transition
            "
          >
            {/* Header row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs px-1.5 py-0.5 rounded bg-white/10 text-white/60 uppercase">
                  {segment.category}
                </span>
                <span className="text-sm font-medium text-white">
                  {segment.label}
                </span>
              </div>

              {mode === "try" && (
                <button
                  onClick={() => onDelete(segment.instanceId)}
                  className="
                    text-white/40 
                    hover:text-white 
                    transition
                    p-1
                    rounded
                    hover:bg-white/10
                  "
                  aria-label="Delete block"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>

            {/* Variant timeline dots */}
            <div className="flex items-center gap-1.5 pt-1">
              {segment.variants.map((variant) => {
                const isActive = variant.id === segment.activeVariantId;

                return (
                  <button
                    key={variant.id}
                    onClick={() => mode === "try" && onVariantChange(segment.instanceId, variant.id)}
                    disabled={mode !== "try"}
                    className={`
                      group relative
                      h-6 w-6 
                      rounded-full 
                      transition-all
                      flex items-center justify-center
                      ${isActive 
                        ? 'bg-white/20 scale-110' 
                        : 'hover:bg-white/10'
                      }
                      ${mode !== "try" ? 'cursor-default' : 'cursor-pointer'}
                    `}
                    title={variant.label}
                  >
                    <span 
                      className={`
                        h-2 w-2 
                        rounded-full 
                        transition-all
                        ${isActive 
                          ? 'bg-white scale-110' 
                          : 'bg-white/30 group-hover:bg-white/50'
                        }
                      `} 
                    />
                    
                    {/* Tooltip on hover */}
                    <span className="
                      absolute 
                      -top-8 
                      left-1/2 -translate-x-1/2
                      px-2 py-1
                      bg-black
                      border border-white/10
                      rounded
                      text-[10px]
                      text-white/80
                      whitespace-nowrap
                      opacity-0
                      group-hover:opacity-100
                      transition
                      pointer-events-none
                      z-10
                    ">
                      {variant.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}