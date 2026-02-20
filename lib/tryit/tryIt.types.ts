/* ===============================
   MODES
================================ */
export type TryItMode = "IDLE" | "TRY" | "SIMULATE";

/* ===============================
   SEGMENT TYPES (Categories)
================================ */
export type SegmentType = 
  | "header" 
  | "headline" 
  | "paragraph" 
  | "image";

/* ===============================
   ITEM TYPE (specific block type within a category)
================================ */
export type ItemType = {
  id: string;           // e.g., "header-logo-only"
  category: SegmentType;
  label: string;        // e.g., "Header — Logo Only"
  description?: string;
  variants: Variant[];  // The 3 variants for this specific item
};

/* ===============================
   VARIANT
================================ */
export type Variant = {
  id: string;
  label: string;
};

/* ===============================
   SEGMENT INSTANCE (one preview block)
================================ */
export type SegmentInstance = {
  instanceId: string;
  itemId: string;           // Which item type this is
  category: SegmentType;
  label: string;            // The item label
  activeVariantId: string;
  variants: Variant[];      // The variants for THIS specific item
};

/* ===============================
   STATE
================================ */
export type TryItState = {
  mode: TryItMode;

  /** Left panel selection */
  activeTab: SegmentType | null;

  /** Preview stack (right panel) */
  segments: SegmentInstance[];

  /** Simulation */
  simulationRunning: boolean;
  simulationProgress: number; // 0 → 100
};

/* ===============================
   ACTIONS
================================ */
export type TryItAction =
  | { type: "RESET" }
  | { type: "SET_MODE"; mode: TryItMode }
  | { type: "SET_ACTIVE_TAB"; tab: SegmentType }
  | {
      type: "ADD_SEGMENT";
      itemId: string;
      category: SegmentType;
      label: string;
      variants: Variant[];
    }
  | {
      type: "DUPLICATE_SEGMENT";  // New action
      instanceId: string;          // The segment to duplicate
    }
  | {
      type: "SET_VARIANT";
      instanceId: string;
      variantId: string;
    }
  | {
      type: "REMOVE_SEGMENT";
      instanceId: string;
    }
  | {
      type: "SIMULATION_START";
    }
  | {
      type: "SIMULATION_PROGRESS";
      progress: number;
    }
  | {
      type: "SIMULATION_END";
    };