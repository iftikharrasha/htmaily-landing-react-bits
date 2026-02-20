import {
  TryItState,
  TryItAction,
  SegmentInstance,
} from "./tryIt.types";

/* ===============================
   INITIAL STATE
================================ */
export const initialTryItState: TryItState = {
  mode: "IDLE",
  activeTab: null,
  segments: [],
  simulationRunning: false,
  simulationProgress: 0,
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
      return initialTryItState;

    case "SET_MODE":
      return {
        ...state,
        mode: action.mode,
        simulationRunning: action.mode === "SIMULATE",
        simulationProgress: 0,
        // Only clear segments when switching to TRY mode
        segments: action.mode === "TRY" ? [] : state.segments,
      };

    case "SET_ACTIVE_TAB":
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

    case "DUPLICATE_SEGMENT": {
      // Find the segment to duplicate
      const segmentToDuplicate = state.segments.find(
        s => s.instanceId === action.instanceId
      );
      
      if (!segmentToDuplicate) return state;
      
      // Create a new segment with same properties but new ID
      const duplicatedSegment: SegmentInstance = {
        ...segmentToDuplicate,
        instanceId: crypto.randomUUID(),
        label: `${segmentToDuplicate.label}`, // Optional: indicate it's a copy
      };
      
      // Find the index of the original segment
      const index = state.segments.findIndex(
        s => s.instanceId === action.instanceId
      );
      
      // Insert the duplicate right after the original
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
      
      // If indices are the same, do nothing
      if (sourceIndex === destinationIndex) return state;
      
      // Create a new array with reordered items
      const newSegments = [...state.segments];
      const [movedItem] = newSegments.splice(sourceIndex, 1);
      newSegments.splice(destinationIndex, 0, movedItem);
      
      return {
        ...state,
        segments: newSegments,
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

    case "SIMULATION_START":
      return {
        ...state,
        mode: "SIMULATE",
        simulationRunning: true,
        simulationProgress: 0,
        segments: [],
      };

    case "SIMULATION_PROGRESS":
      return {
        ...state,
        simulationProgress: action.progress,
      };

    case "SIMULATION_END":
      return {
        ...state,
        simulationRunning: false,
        simulationProgress: 100,
      };

    default:
      return state;
  }
}