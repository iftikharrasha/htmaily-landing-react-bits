import { SegmentType, Variant, ItemType } from "./tryIt.types";

/* ===============================
   ITEMS CONFIG - Hierarchical structure
   Each item has its own variants
================================ */

// Header items
export const HEADER_ITEMS: ItemType[] = [
  {
    id: "header-logo-only",
    category: "header",
    label: "Header — Logo Only",
    description: "Simple logo placements",
    variants: [
      { id: "logo-left", label: "Logo Left" },
      { id: "logo-center", label: "Logo Center" },
      { id: "logo-icon-text", label: "Logo Icon + Text" },
    ]
  },
  {
    id: "header-logo-right-content",
    category: "header",
    label: "Header — Logo Left + Right Content",
    description: "Logo with navigation or metadata",
    variants: [
      { id: "logo-left-links", label: "Logo + Navigation Links" },
      { id: "logo-left-order", label: "Logo + Order Info" },
    ]
  }
];

// Headline items
export const HEADLINE_ITEMS: ItemType[] = [
  {
    id: "headline-single",
    category: "headline",
    label: "Text — Headline",
    description: "Single headline variations",
    variants: [
      { id: "headline-left", label: "Left Aligned" },
      { id: "headline-center", label: "Center Aligned" },
      { id: "headline-stacked", label: "Stacked Two-Line" },
    ]
  }
];

// Paragraph items
export const PARAGRAPH_ITEMS: ItemType[] = [
  {
    id: "paragraph-body",
    category: "paragraph",
    label: "Text — Body Copy",
    description: "Paragraph text variations",
    variants: [
      { id: "para-left", label: "Left Aligned" },
      { id: "para-center", label: "Center Aligned" },
    ]
  }
];

// Image items
export const IMAGE_ITEMS: ItemType[] = [
  {
    id: "image-full",
    category: "image",
    label: "Image — Full Width",
    description: "Full width image with padding options",
    variants: [
      { id: "image-full-padded", label: "With Padding" },
      { id: "image-full-edge", label: "Edge to Edge" },
    ]
  }
];

/* ===============================
   Lookup maps for easy access
================================ */
export const ITEMS_BY_CATEGORY: Record<SegmentType, ItemType[]> = {
  header: HEADER_ITEMS,
  headline: HEADLINE_ITEMS,
  paragraph: PARAGRAPH_ITEMS,
  image: IMAGE_ITEMS,
};

// Helper to get all variants for a category (flattened - for backward compatibility)
export function getVariantsByType(type: SegmentType): Variant[] {
  return ITEMS_BY_CATEGORY[type]?.flatMap(item => item.variants) || [];
}

// Helper to get an item by its ID
export function getItemById(itemId: string): ItemType | undefined {
  return [
    ...HEADER_ITEMS,
    ...HEADLINE_ITEMS,
    ...PARAGRAPH_ITEMS,
    ...IMAGE_ITEMS,
  ].find(item => item.id === itemId);
}