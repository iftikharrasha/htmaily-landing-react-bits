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