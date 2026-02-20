"use client";

import { SegmentInstance } from "@/lib/tryit/tryIt.types";
import HeaderPreview from "./Preview/HeaderPreview";
import HeadlinePreview from "./Preview/HeadlinePreview";
import ImagePreview from "./Preview/ImagePreview";
import ParagraphPreview from "./Preview/ParagraphPreview";
import { MousePointerClick } from "lucide-react";
import AnimatedContent from "@/components/AnimatedContent";

interface PreviewPanelProps {
  segments: SegmentInstance[];
  hoveredInstanceId?: string | null;
  onHover?: (instanceId: string | null) => void;
}

export function PreviewPanel({ segments, hoveredInstanceId, onHover }: PreviewPanelProps) {
  if (segments.length === 0) {
    return (
      <div className="relative w-full min-w-100 bg-black border border-white/20 rounded-xl shadow-sm p-12 flex items-center justify-center">
        <div className="absolute top-0 w-full min-h-150">
            <div className="text-center pt-30">
              <p className="text-white/70 text-sm">
                Your email preview will appear here
              </p>
              <p className="text-white/50 text-xs mt-2">
                Start by adding a block from the left panel
              </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-black border border-white/20 rounded-xl shadow-sm overflow-visible">
        <div className="min-w-100 min-h-150">
            {segments.map((segment) => {
                const isHovered = hoveredInstanceId === segment.instanceId;
                
                return (
                  <div 
                    key={segment.instanceId} 
                    className={`
                      relative
                      transition-all duration-200
                       ${isHovered ? 'animate-pulse pulse-once repeat-[1]' : ''}
                    `}
                      // ${isHovered ? 'border border-[#07c983]' : ''}
                    onMouseEnter={() => onHover?.(segment.instanceId)}
                    onMouseLeave={() => onHover?.(null)} 
                  >
                    {/* Optional hover indicator dot */}
                    {isHovered && (
                      <div className="absolute -left-6 top-5 transform -translate-y-1/2 z-20 scale-x-[-1]">
                          <MousePointerClick size={24} className="text-[#07c983] animate-pulse"/>
                      </div>
                    )}
                    
                    {/* The actual preview */}
                    <PreviewByType segment={segment} />
                  </div>
                );
            })}
        </div>
    </div>
  );
}

function PreviewByType({ segment }: { segment: SegmentInstance }) {
  switch (segment.category) {
    case "header":
      return <HeaderPreview variantId={segment.activeVariantId} />;
    case "headline":
      return <HeadlinePreview variantId={segment.activeVariantId} />;
    case "paragraph":
      return <ParagraphPreview variantId={segment.activeVariantId} />;
    case "image":
      return <ImagePreview variantId={segment.activeVariantId} />;
    default:
      return null;
  }
}