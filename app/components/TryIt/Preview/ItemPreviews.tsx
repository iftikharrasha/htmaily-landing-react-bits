"use client";

// Header Previews
export function HeaderLogoOnlyPreview() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-transparent border-2 border-[#07c983] rounded-full" />
      <div className="flex-1">
        <div className="w-32 h-6 bg-transparent border-2 border-[#07c983] rounded" />
      </div>
    </div>
  );
}

export function HeaderLogoRightContentPreview() {
  return (
    <div className="flex items-center justify-between">
      <div className="w-8 h-8 bg-transparent border-2 border-[#07c983] rounded-full" />
      <div className="flex gap-3">
        <div className="w-12 h-6  bg-transparent border-2 border-[#07c983] rounded" />
        <div className="w-12 h-6  bg-transparent border-2 border-[#07c983] rounded" />
        <div className="w-12 h-6  bg-transparent border-2 border-[#07c983] rounded" />
      </div>
    </div>
  );
}

// Headline Previews
export function HeadlineSinglePreview() {
  return (
    <div className="space-y-2">
      <div className="w-3/4 h-5 bg-transparent border-2 border-[#07c983] rounded" />
    </div>
  );
}

// Paragraph Previews
export function ParagraphBodyPreview() {
  return (
    <div className="space-y-1.5">
      <div className="w-full h-3 bg-transparent border-2 border-[#07c983] rounded" />
      <div className="w-full h-3 bg-transparent border-2 border-[#07c983] rounded" />
      <div className="w-2/3 h-3 bg-transparent border-2 border-[#07c983] rounded" />
    </div>
  );
}

// Image Previews
export function ImageFullPreview() {
  return (
    <div className="w-full h-12 bg-transparent border-2 border-[#07c983] rounded-lg" />
  );
}

// Map items to their preview components
export const ITEM_PREVIEWS: Record<string, React.FC> = {
  'header-logo-only': HeaderLogoOnlyPreview,
  'header-logo-right-content': HeaderLogoRightContentPreview,
  'headline-single': HeadlineSinglePreview,
  'paragraph-body': ParagraphBodyPreview,
  'image-full': ImageFullPreview,
};

// Helper to get preview component for an item
export function getItemPreview(itemId: string) {
  return ITEM_PREVIEWS[itemId] || null;
}