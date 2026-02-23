import { useEffect, useRef } from "react";
import { TryItAction, TryItState } from "./tryIt.types";
import { 
  HEADER_ITEMS, 
  HEADLINE_ITEMS, 
  IMAGE_ITEMS 
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

  // Update ref when segments change
  useEffect(() => {
    segmentsRef.current = state.segments;
  }, [state.segments]);

  // Clear all timeouts helper
  const clearAllTimeouts = () => {
    timeoutRef.current.forEach(clearTimeout);
    timeoutRef.current = [];
  };

  // Stop simulation completely
  const stopSimulation = () => {
    console.log("🛑 Stopping simulation");
    clearAllTimeouts();
    simulationStartedRef.current = false;
    activeSimulationRef.current = false;
    
    // Clear any targets
    dispatch({ type: "SET_TARGET", target: null });
    
    if (cursorRef?.current) {
      cursorRef.current.clearHighlight();
    }
  };

  // Simulation sequence
  const runSimulation = () => {
    if (activeSimulationRef.current) return;
    
    console.log("🎬 Simulation sequence running");
    activeSimulationRef.current = true;
    
    // Clear any existing timeouts
    clearAllTimeouts();

    // Helper to add timeout
    const addTimeout = (fn: () => void, delay: number) => {
      const timeout = setTimeout(() => {
        // Only execute if simulation is still active
        if (activeSimulationRef.current && state.mode === "SIMULATE") {
          fn();
        }
      }, delay);
      timeoutRef.current.push(timeout);
    };

    // Get item references
    const headerItem2 = HEADER_ITEMS[1];
    const headlineItem1 = HEADLINE_ITEMS[0];
    const imageItem1 = IMAGE_ITEMS[0];

    // Initial state: No cards, start fresh
    dispatch({ type: "SET_FLOATING_CARD", card: null });
    dispatch({ type: "SET_TARGET", target: null });

    // ============ HEADER SECTION ============
    
    // STEP 1: Show Card 1
    addTimeout(() => {
      console.log("⏱️ Step 1: Show Card 1");
      dispatch({ type: "SET_FLOATING_CARD", card: 1 });
    }, 1000);

    // STEP 2: Target Header item 2 in left panel
    addTimeout(() => {
      console.log("⏱️ Step 2: Target Header item 2");
      dispatch({ type: "SET_TARGET", target: "header-item-2" });
    }, 3000);

    // STEP 3: Add Header item 2
    addTimeout(() => {
      console.log("⏱️ Step 3: Add Header item 2");
      dispatch({
        type: "ADD_SEGMENT",
        itemId: headerItem2.id,
        category: headerItem2.category,
        label: headerItem2.label,
        variants: headerItem2.variants,
      });
      dispatch({ type: "SET_TARGET", target: null });
    }, 5000);

    // STEP 4: Wait to view result
    addTimeout(() => {
      console.log("⏱️ Step 4: Viewing Header");
    }, 6000);

    // STEP 5: Show Card 2
    addTimeout(() => {
      console.log("⏱️ Step 5: Show Card 2");
      dispatch({ type: "SET_FLOATING_CARD", card: 2 });
    }, 6000);

    // ============ HEADLINE SECTION ============

    // STEP 6: Target Headline tab
    addTimeout(() => {
      console.log("⏱️ Step 6: Target Headline tab");
      dispatch({ type: "SET_TARGET", target: "headline-tab" });
    }, 11000);

    // STEP 7: Switch to Headline tab
    addTimeout(() => {
      console.log("⏱️ Step 7: Switch to Headline tab");
      dispatch({ type: "SET_ACTIVE_TAB", tab: "headline" });
      dispatch({ type: "SET_TARGET", target: null });
    }, 13000);

    // STEP 8: Target Headline item 1
    addTimeout(() => {
      console.log("⏱️ Step 8: Target Headline item 1");
      dispatch({ type: "SET_TARGET", target: "headline-item-1" });
    }, 14000);

    // STEP 9: Add Headline item 1
    addTimeout(() => {
      console.log("⏱️ Step 9: Add Headline item 1");
      dispatch({
        type: "ADD_SEGMENT",
        itemId: headlineItem1.id,
        category: headlineItem1.category,
        label: headlineItem1.label,
        variants: headlineItem1.variants,
      });
      dispatch({ type: "SET_TARGET", target: null });
    }, 16000);

    // STEP 10: Wait to view result
    addTimeout(() => {
      console.log("⏱️ Step 10: Viewing Headline");
    }, 19000);

    // STEP 11: Show Card 3
    addTimeout(() => {
      console.log("⏱️ Step 11: Show Card 3");
      dispatch({ type: "SET_FLOATING_CARD", card: 3 });
    }, 20000);

    // STEP 12: Target Headline variant 3 dot
    addTimeout(() => {
      console.log("⏱️ Step 12: Target Headline variant 3");
      const currentSegments = segmentsRef.current;
      const headlineSegment = currentSegments.find(s => s.category === "headline");
      if (headlineSegment) {
        dispatch({ type: "SET_TARGET", target: "headline-variant-3" });
      }
    }, 22000);

    // STEP 13: Change to variant 3
    addTimeout(() => {
      console.log("⏱️ Step 13: Change to variant 3");
      const currentSegments = segmentsRef.current;
      const headlineSegment = currentSegments.find(s => s.category === "headline");
      if (headlineSegment) {
        dispatch({
          type: "SET_VARIANT",
          instanceId: headlineSegment.instanceId,
          variantId: "headline-stacked",
        });
        dispatch({ type: "SET_TARGET", target: null });
      }
    }, 24000);

    // STEP 14: Wait to view updated preview
    addTimeout(() => {
      console.log("⏱️ Step 14: Viewing updated Headline");
    }, 27000);

    // ============ IMAGE SECTION ============

    // STEP 15: Target Images tab
    addTimeout(() => {
      console.log("⏱️ Step 15: Target Images tab");
      dispatch({ type: "SET_TARGET", target: "images-tab" });
    }, 29000);

    // STEP 16: Switch to Images tab
    addTimeout(() => {
      console.log("⏱️ Step 16: Switch to Images tab");
      dispatch({ type: "SET_ACTIVE_TAB", tab: "image" });
      dispatch({ type: "SET_TARGET", target: null });
    }, 31000);

    // STEP 17: Target Image item 1
    addTimeout(() => {
      console.log("⏱️ Step 17: Target Image item 1");
      dispatch({ type: "SET_TARGET", target: "image-item-1" });
    }, 32000);

    // STEP 18: Add Image item 1
    addTimeout(() => {
      console.log("⏱️ Step 18: Add Image item 1");
      dispatch({
        type: "ADD_SEGMENT",
        itemId: imageItem1.id,
        category: imageItem1.category,
        label: imageItem1.label,
        variants: imageItem1.variants,
      });
      dispatch({ type: "SET_TARGET", target: null });
    }, 34000);

    // STEP 19: Wait to view final preview
    addTimeout(() => {
      console.log("⏱️ Step 19: Viewing final preview");
    }, 37000);

    // STEP 20: Simulation complete
    addTimeout(() => {
      console.log("⏱️ Step 20: Simulation complete");
      dispatch({ type: "SIMULATION_STEP", step: "COMPLETED" });
      dispatch({ type: "SIMULATION_END" }); // This will set mode to TRY and activeTab to header
      activeSimulationRef.current = false;
      simulationStartedRef.current = false;
      if (cursorRef?.current) {
        cursorRef.current.clearHighlight();
      }
    }, 38000);
  };

  // Listen for SIMULATION_START action
  useEffect(() => {
    if (state.mode === "SIMULATE" && !simulationStartedRef.current) {
      console.log("🚀 Starting simulation sequence");
      simulationStartedRef.current = true;
      runSimulation();
    } else if (state.mode !== "SIMULATE") {
      // Immediately stop simulation when mode changes
      stopSimulation();
    }

    return () => {
      if (state.mode !== "SIMULATE") {
        stopSimulation();
      }
    };
  }, [state.mode]);
}