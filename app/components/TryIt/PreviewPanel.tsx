"use client";

import { SegmentInstance } from "@/lib/tryit/tryIt.types";
import HeaderPreview from "./Preview/HeaderPreview";
import HeadlinePreview from "./Preview/HeadlinePreview";
import ImagePreview from "./Preview/ImagePreview";

interface PreviewPanelProps {
  segments: SegmentInstance[];
}

export function PreviewPanel({ segments }: PreviewPanelProps) {
  if (segments.length === 0) {
    return (
      <div className="w-full h-full min-h-100 bg-white rounded-xl shadow-sm p-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-black/40 text-sm">
            Your email preview will appear here
          </p>
          <p className="text-black/20 text-xs mt-2">
            Start by adding a block from the left panel
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white rounded-xl shadow-sm overflow-y-auto max-h-[800px]">
        <div>
            {segments.map((segment) => {
                // Each segment gets a visual separator to show they're distinct blocks
                return (
                <div key={segment.instanceId} className="relative">
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
    // case "paragraph":
    //   return <ParagraphPreview variantId={segment.activeVariantId} />;
    case "image":
      return <ImagePreview variantId={segment.activeVariantId} />;
    default:
      return null;
  }
}