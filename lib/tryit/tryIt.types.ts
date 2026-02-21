/* ===============================
   MODES
================================ */
export type TryItMode = "TRY" | "SIMULATE"; // Removed IDLE

/* ===============================
   SEGMENT TYPES (Categories)
================================ */
export type SegmentType = 
  | "header" 
  | "headline" 
  | "paragraph" 
  | "image";

/* ===============================
   ITEM TYPE
================================ */
export type ItemType = {
  id: string;
  category: SegmentType;
  label: string;
  description?: string;
  variants: Variant[];
};

/* ===============================
   VARIANT
================================ */
export type Variant = {
  id: string;
  label: string;
};

/* ===============================
   SEGMENT INSTANCE
================================ */
export type SegmentInstance = {
  instanceId: string;
  itemId: string;
  category: SegmentType;
  label: string;
  activeVariantId: string;
  variants: Variant[];
};

/* ===============================
   TARGET ELEMENT TYPE for cursor highlighting
================================ */
export type TargetElement = 
  | "header-item-2"           // Header item 2 (Logo Left + Right Content)
  | "headline-tab"            // Headline tab
  | "headline-item-1"         // Headline item 1
  | "headline-variant-3"      // Headline variant 3 dot
  | "images-tab"              // Images tab
  | "image-item-1"            // Image item 1
  | null;

/* ===============================
   STATE
================================ */
export type TryItState = {
  mode: TryItMode;
  activeTab: SegmentType | null;
  segments: SegmentInstance[];
  simulationRunning: boolean;
  simulationProgress: number;
  simulationStep: SimulationStep;
  activeFloatingCard: number | null; // 1, 2, or 3
  targetElement: TargetElement;       // For cursor highlighting
};

/* ===============================
   SIMULATION STEP TYPE
================================ */
export type SimulationStep = 
  | "IDLE"
  | "CARD1"
  | "CARD2"
  | "CARD3"
  | "COMPLETED";

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
      type: "DUPLICATE_SEGMENT";
      instanceId: string;
    }
  | {
      type: "REORDER_SEGMENTS";
      sourceIndex: number;
      destinationIndex: number;
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
      type: "SIMULATION_STEP";
      step: SimulationStep;
    }
  | {
      type: "SIMULATION_END";
    }
  | {
      type: "SET_FLOATING_CARD";
      card: number | null;
    }
  | {
      type: "SET_TARGET";
      target: TargetElement;
    };