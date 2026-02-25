import { useEffect, useRef, useState } from "react";
import { TryItAction, TryItState } from "./tryIt.types";
import {
  HEADER_ITEMS,
  HEADLINE_ITEMS,
  IMAGE_ITEMS,
} from "./tryIt.config";

export function useSimulation(
  state: TryItState,
  dispatch: React.Dispatch<TryItAction>,
  cursorRef?: React.RefObject<any>
) {
  const timeoutRef = useRef<NodeJS.Timeout[]>([]);
  const simulationStartedRef = useRef(false);
  const segmentsRef = useRef(state.segments);
  const activeSimulationRef = useRef(false);

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const totalDurationRef = useRef(38000); // SAME TOTAL AS BEFORE
  const [progress, setProgress] = useState(0);

  // Keep segments fresh
  useEffect(() => {
    segmentsRef.current = state.segments;
  }, [state.segments]);

  const clearAllTimeouts = () => {
    timeoutRef.current.forEach(clearTimeout);
    timeoutRef.current = [];
  };

  const clearProgress = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setProgress(0);
  };

  const stopSimulation = () => {
    clearAllTimeouts();
    clearProgress();

    simulationStartedRef.current = false;
    activeSimulationRef.current = false;

    dispatch({ type: "SET_TARGET", target: null });

    if (cursorRef?.current) {
      cursorRef.current.clearHighlight();
    }
  };

  const runSimulation = () => {
    if (activeSimulationRef.current) return;

    activeSimulationRef.current = true;
    clearAllTimeouts();
    clearProgress();

    const headerItem2 = HEADER_ITEMS[1];
    const headlineItem1 = HEADLINE_ITEMS[0];
    const imageItem1 = IMAGE_ITEMS[0];

    // Reset UI
    dispatch({ type: "SET_FLOATING_CARD", card: null });
    dispatch({ type: "SET_TARGET", target: null });

    // Helper
    const addTimeout = (fn: () => void, delay: number) => {
      const timeout = setTimeout(() => {
        if (activeSimulationRef.current && state.mode === "SIMULATE") {
          fn();
        }
      }, delay);

      timeoutRef.current.push(timeout);
    };

    // =========================
    // ORIGINAL TIMELINE (UNCHANGED)
    // =========================

    addTimeout(() => {
      dispatch({ type: "SET_FLOATING_CARD", card: 1 });
    }, 1000);

    addTimeout(() => {
      dispatch({ type: "SET_TARGET", target: "header-item-2" });
    }, 3000);

    addTimeout(() => {
      dispatch({
        type: "ADD_SEGMENT",
        itemId: headerItem2.id,
        category: headerItem2.category,
        label: headerItem2.label,
        variants: headerItem2.variants,
      });
      dispatch({ type: "SET_TARGET", target: null });
    }, 5000);

    addTimeout(() => {}, 8000);

    addTimeout(() => {
      dispatch({ type: "SET_FLOATING_CARD", card: 2 });
    }, 9000);

    addTimeout(() => {
      dispatch({ type: "SET_TARGET", target: "headline-tab" });
    }, 11000);

    addTimeout(() => {
      dispatch({ type: "SET_ACTIVE_TAB", tab: "headline" });
      dispatch({ type: "SET_TARGET", target: null });
    }, 13000);

    addTimeout(() => {
      dispatch({ type: "SET_TARGET", target: "headline-item-1" });
    }, 14000);

    addTimeout(() => {
      dispatch({
        type: "ADD_SEGMENT",
        itemId: headlineItem1.id,
        category: headlineItem1.category,
        label: headlineItem1.label,
        variants: headlineItem1.variants,
      });
      dispatch({ type: "SET_TARGET", target: null });
    }, 16000);

    addTimeout(() => {}, 19000);

    addTimeout(() => {
      dispatch({ type: "SET_FLOATING_CARD", card: 3 });
    }, 20000);

    addTimeout(() => {
      const headlineSegment = segmentsRef.current.find(
        (s) => s.category === "headline"
      );
      if (headlineSegment) {
        dispatch({ type: "SET_TARGET", target: "headline-variant-3" });
      }
    }, 22000);

    addTimeout(() => {
      const headlineSegment = segmentsRef.current.find(
        (s) => s.category === "headline"
      );
      if (headlineSegment) {
        dispatch({
          type: "SET_VARIANT",
          instanceId: headlineSegment.instanceId,
          variantId: "headline-stacked",
        });
        dispatch({ type: "SET_TARGET", target: null });
      }
    }, 24000);

    addTimeout(() => {}, 27000);

    addTimeout(() => {
      dispatch({ type: "SET_TARGET", target: "images-tab" });
    }, 29000);

    addTimeout(() => {
      dispatch({ type: "SET_ACTIVE_TAB", tab: "image" });
      dispatch({ type: "SET_TARGET", target: null });
    }, 31000);

    addTimeout(() => {
      dispatch({ type: "SET_TARGET", target: "image-item-1" });
    }, 32000);

    addTimeout(() => {
      dispatch({
        type: "ADD_SEGMENT",
        itemId: imageItem1.id,
        category: imageItem1.category,
        label: imageItem1.label,
        variants: imageItem1.variants,
      });
      dispatch({ type: "SET_TARGET", target: null });
    }, 34000);

    addTimeout(() => {}, 37000);

    addTimeout(() => {
      dispatch({ type: "SIMULATION_STEP", step: "COMPLETED" });
      dispatch({ type: "SIMULATION_END" });

      activeSimulationRef.current = false;
      simulationStartedRef.current = false;

      if (cursorRef?.current) {
        cursorRef.current.clearHighlight();
      }
    }, 38000);

    // =========================
    // PROGRESS TIMER (TIME BASED)
    // =========================

    const startTime = Date.now();

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percent = Math.min(
        (elapsed / totalDurationRef.current) * 100,
        100
      );
      setProgress(percent);

      if (percent >= 100 && progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }, 100);
  };

  useEffect(() => {
    if (state.mode === "SIMULATE" && !simulationStartedRef.current) {
      simulationStartedRef.current = true;
      runSimulation();
    } else if (state.mode !== "SIMULATE") {
      stopSimulation();
    }

    return () => {
      if (state.mode !== "SIMULATE") {
        stopSimulation();
      }
    };
  }, [state.mode]);

  return { progress };
}