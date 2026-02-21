import {
  TryItState,
  TryItAction,
  SegmentInstance,
} from "./tryIt.types";

/* ===============================
   INITIAL STATE
================================ */
export const initialTryItState: TryItState = {
  mode: "TRY", // Start in TRY mode
  activeTab: "header", // Default to header tab
  segments: [],
  simulationRunning: false,
  simulationProgress: 0,
  simulationStep: "IDLE",
  activeFloatingCard: null,
  targetElement: null,
};

/* ===============================
   REDUCER
================================ */
export function tryItReducer(
  state: TryItState,
  action: TryItAction
): TryItState {
  switch (action.type) {
    case "RESET":
      console.log("Reducer: RESET");
      return {
        ...initialTryItState,
        mode: "TRY",
        activeTab: "header", // Explicitly set to header
        segments: [],
        simulationRunning: false,
        simulationProgress: 0,
        simulationStep: "IDLE",
        activeFloatingCard: null,
        targetElement: null,
      };

    case "SET_MODE":
      return {
        ...state,
        mode: action.mode,
        simulationRunning: action.mode === "SIMULATE",
        simulationProgress: 0,
        simulationStep: action.mode === "SIMULATE" ? "CARD1" : "IDLE",
        segments: action.mode === "TRY" ? [] : state.segments,
        targetElement: null,
      };

    case "SET_ACTIVE_TAB":
      console.log("Reducer: SET_ACTIVE_TAB", action.tab); // Add debug log
      return {
        ...state,
        activeTab: action.tab,
      };

    case "ADD_SEGMENT": {
      const newSegment: SegmentInstance = {
        instanceId: crypto.randomUUID(),
        itemId: action.itemId,
        category: action.category,
        label: action.label,
        activeVariantId: action.variants[0]?.id || "",
        variants: action.variants,
      };

      return {
        ...state,
        segments: [...state.segments, newSegment],
      };
    }

    case "SET_VARIANT":
      return {
        ...state,
        segments: state.segments.map(segment =>
          segment.instanceId === action.instanceId
            ? {
                ...segment,
                activeVariantId: action.variantId,
              }
            : segment
        ),
      };

    case "REMOVE_SEGMENT":
      return {
        ...state,
        segments: state.segments.filter(
          s => s.instanceId !== action.instanceId
        ),
      };

    case "DUPLICATE_SEGMENT": {
      const segmentToDuplicate = state.segments.find(
        s => s.instanceId === action.instanceId
      );
      
      if (!segmentToDuplicate) return state;
      
      const duplicatedSegment: SegmentInstance = {
        ...segmentToDuplicate,
        instanceId: crypto.randomUUID(),
        label: `${segmentToDuplicate.label}`,
      };
      
      const index = state.segments.findIndex(
        s => s.instanceId === action.instanceId
      );
      
      const newSegments = [
        ...state.segments.slice(0, index + 1),
        duplicatedSegment,
        ...state.segments.slice(index + 1),
      ];
      
      return {
        ...state,
        segments: newSegments,
      };
    }

    case "REORDER_SEGMENTS": {
      const { sourceIndex, destinationIndex } = action;
      
      if (sourceIndex === destinationIndex) return state;
      
      const newSegments = [...state.segments];
      const [movedItem] = newSegments.splice(sourceIndex, 1);
      newSegments.splice(destinationIndex, 0, movedItem);
      
      return {
        ...state,
        segments: newSegments,
      };
    }

    case "SIMULATION_START":
      console.log("Reducer: SIMULATION_START"); // Debug log
      return {
        ...state,
        mode: "SIMULATE",
        simulationRunning: true,
        simulationProgress: 0,
        simulationStep: "IDLE", // Start with IDLE, not CARD1
        activeFloatingCard: null,
        targetElement: null,
        activeTab: "header",
        segments: [], // Start fresh
      };

    case "SIMULATION_STEP":
      return {
        ...state,
        simulationStep: action.step,
      };

    case "SIMULATION_END":
      console.log("Reducer: SIMULATION_END");
      return {
        ...state,
        mode: "TRY",
        simulationRunning: false,
        simulationProgress: 100,
        simulationStep: "IDLE",
        activeFloatingCard: null,
        targetElement: null,
        activeTab: "header", // Reset to header when simulation ends
      };

    case "SET_FLOATING_CARD":
      return {
        ...state,
        activeFloatingCard: action.card,
      };

    case "SET_TARGET":
      return {
        ...state,
        targetElement: action.target,
      };

    default:
      return state;
  }
}