"use client";

import React, { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  HEADER_ITEMS,
  HEADLINE_ITEMS,
  PARAGRAPH_ITEMS,
  IMAGE_ITEMS 
} from "@/lib/tryit/tryIt.config";
import { TryItAction, TryItState, SegmentType, ItemType } from "@/lib/tryit/tryIt.types";
import { ActiveBlocksController } from "./ActiveBlocksController";
import { useState } from "react";
import { getItemPreview } from "./Preview/ItemPreviews";
import { RotateCcw } from "lucide-react";

type Props = {
  state: TryItState;
  dispatch: React.Dispatch<TryItAction>;
  onHover?: (instanceId: string | null) => void;
  hoveredInstanceId?: string | null;
};

export default function LeftPanel({ state, dispatch, onHover, hoveredInstanceId }: Props) {
  const [activeTab, setActiveTab] = useState<SegmentType>("header");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const isTryMode = state.mode === "TRY";
  const isSimulateMode = state.mode === "SIMULATE";
  
  // Check if there are any active blocks
  const hasActiveBlocks = state.segments.length > 0;

  const handleTryMode = () => {
    dispatch({ type: "SET_MODE", mode: "TRY" });
  };

  const handleSimulateMode = () => {
    console.log("Simulate button clicked"); // Debug log
    dispatch({ type: "SIMULATION_START" });
  };

  const handleAddSegment = (item: ItemType) => {
    if (!isTryMode) return;
    
    dispatch({
      type: "ADD_SEGMENT",
      itemId: item.id,
      category: item.category,
      label: item.label,
      variants: item.variants,
    });
    
    // Auto-expand this item in the timeline?
    // Or collapse after adding? Your choice.
  };

  const handleVariantChange = (instanceId: string, variantId: string) => {
    dispatch({
      type: "SET_VARIANT",
      instanceId,
      variantId,
    });
  };

  const handleDelete = (instanceId: string) => {
    dispatch({
      type: "REMOVE_SEGMENT",
      instanceId,
    });
  };

  const handleDuplicate = (instanceId: string) => {
    if (!isTryMode) return;
    dispatch({
      type: "DUPLICATE_SEGMENT",
      instanceId,
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as SegmentType);
    setExpandedItem(null);
    // Only dispatch if in TRY mode or if simulation is forcing it
    if (state.mode === "TRY" || state.mode === "SIMULATE") {
      dispatch({ type: "SET_ACTIVE_TAB", tab: value as SegmentType });
    }
  };

  
  const handleReorder = (sourceIndex: number, destinationIndex: number) => {
    if (!isTryMode) return;
    dispatch({
      type: "REORDER_SEGMENTS",
      sourceIndex,
      destinationIndex,
    });
  };

  useEffect(() => {
    if (state.activeTab) {
      setActiveTab(state.activeTab);
    }
  }, [state.activeTab]);

  return (
    <div className="flex flex-col h-full">
      {/* Top Controls */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-semibold text-lg">
          HTMAILY
        </h3>

        <div className="flex gap-2">
          {/* Reset Button - Only shows when there are active blocks */}
          {hasActiveBlocks && (
            <button
              onClick={handleTryMode}
              className="
                flex items-center gap-1
                rounded-full px-3 py-1.5 text-sm
                bg-white/10 text-white
                hover:bg-white/20
                transition
                animate-in fade-in duration-200
              "
              title="Reset all blocks"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          )}
          
          {/* Simulate Button - Hidden during simulation */}
          {!state.simulationRunning && (
            <button
              onClick={handleSimulateMode}
              className={`rounded-full px-4 py-1.5 text-sm ${
                state.mode === "SIMULATE" 
                  ? "bg-white text-black" 
                  : "bg-white/10 text-white"
              }`}
            >
              Simulate
            </button>
          )}
        </div>
      </div>

      <Tabs 
        defaultValue="header" 
        value={activeTab}
        onValueChange={handleTabChange}
        orientation="vertical"
      >
        <TabsList className="mb-6  bg-transparent rounded-lg p-0 w-full justify-start space-y-1">
          <TabsTrigger 
            value="header" 
            disabled={isSimulateMode}
            className="flex-none rounded-sm border border-transparent! px-3 py-1 text-white/50 hover:text-white/70 hover:bg-[#ced3d0]/10 data-[state=active]:font-bold data-[state=active]:border-[#07c983]/30! data-[state=active]:bg-[#07c983]/10 data-[state=active]:text-[#07c983] cursor-pointer disabled:opacity-100"
          >
            Header
          </TabsTrigger>
          <TabsTrigger 
            value="headline" 
            data-target="headline-tab"
            disabled={isSimulateMode}
            className="cursor-target headline-tab flex-none rounded-sm border border-transparent! px-3 py-1 text-white/50 hover:text-white/70 hover:bg-[#ced3d0]/10 data-[state=active]:font-bold data-[state=active]:border-[#07c983]/30! data-[state=active]:bg-[#07c983]/10 data-[state=active]:text-[#07c983] cursor-pointer disabled:opacity-100"
          >
            Headline
          </TabsTrigger>
          <TabsTrigger 
            value="paragraph" 
            disabled={isSimulateMode}
            className="flex-none rounded-sm border border-transparent! px-3 py-1 text-white/50 hover:text-white/70 hover:bg-[#ced3d0]/10 data-[state=active]:font-bold data-[state=active]:border-[#07c983]/30! data-[state=active]:bg-[#07c983]/10 data-[state=active]:text-[#07c983] cursor-pointer disabled:opacity-100"
          >
            Paragraph
          </TabsTrigger>
          <TabsTrigger 
            value="image" 
            data-target="images-tab"
            disabled={isSimulateMode}
            className="cursor-target images-tab flex-none rounded-sm border border-transparent! px-3 py-1 text-white/50 hover:text-white/70 hover:bg-[#ced3d0]/10 data-[state=active]:font-bold data-[state=active]:border-[#07c983]/30! data-[state=active]:bg-[#07c983]/10 data-[state=active]:text-[#07c983] cursor-pointer disabled:opacity-100"
          >
            Image
          </TabsTrigger>
        </TabsList>

        {/* Header Tab */}
        <TabsContent value="header" className="space-y-2">
          {HEADER_ITEMS.map((item, index) => (
            <div
              key={item.id}
            >
                {/* Item Header */}
                <div className="flex-1 flex items-center justify-between gap-2 mb-2">
                    <div className="flex-1 text-left">
                        <div className="text-sm font-medium text-white/50">{item.label}</div>
                    </div>
                </div>
                <div data-target="header-item-2" className={`cursor-target ${index === 1 ? 'header-item-2' : ''}`}>
                  <ItemCard
                    key={item.id}
                    item={item}
                    onToggle={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                    onAdd={() => handleAddSegment(item)}
                    isTryMode={isTryMode && !isSimulateMode}
                  />
                </div>
            </div>
          ))}
        </TabsContent>

        {/* Headline Tab */}
        <TabsContent value="headline" className="space-y-2">
          {HEADLINE_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`cursor-target ${index === 0 ? 'headline-item-1' : ''}`}
              data-target="headline-item-1"
            >
              <ItemCard
                key={item.id}
                item={item}
                onToggle={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                onAdd={() => handleAddSegment(item)}
                isTryMode={isTryMode && !isSimulateMode}
              />
            </div>
          ))}
        </TabsContent>

        {/* Paragraph Tab */}
        <TabsContent value="paragraph" className="space-y-2">
          {PARAGRAPH_ITEMS.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onToggle={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
              onAdd={() => handleAddSegment(item)}
              isTryMode={isTryMode && !isSimulateMode}
            />
          ))}
        </TabsContent>

        {/* Image Tab */}
        <TabsContent value="image" className="space-y-2">
          {IMAGE_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`cursor-target ${index === 0 ? 'image-item-1' : ''}`}
              data-target="image-item-1"
            >
              <ItemCard
                key={item.id}
                item={item}
                onToggle={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                onAdd={() => handleAddSegment(item)}
                isTryMode={isTryMode && !isSimulateMode}
              />
            </div>
          ))}
        </TabsContent>
      </Tabs>

      {/* Active Blocks */}
      <div className="mt-8 border-t border-white/10 pt-6">
       <ActiveBlocksController 
          segments={state.segments}
          mode={state.mode.toLowerCase() as "try" | "simulate"}
          onVariantChange={handleVariantChange}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onReorder={handleReorder}  // Add this
          onHover={onHover}
          hoveredInstanceId={hoveredInstanceId}
        />
      </div>
    </div>
  );
}

/* ---------- Item Card Component with Visual Previews ONLY ---------- */
function ItemCard({ 
  item, 
  onToggle, 
  onAdd,
  isTryMode 
}: { 
  item: ItemType; 
  onToggle: () => void;
  onAdd: () => void;
  isTryMode: boolean;
}) {
  const PreviewComponent = getItemPreview(item.id);

  return (
      <button className={`
            relative w-full min-w-70 min-h-28 
            border border-white/10 rounded-lg overflow-hidden 
            bg-[url('/mask-1.png')] bg-cover bg-center
            ${isTryMode ? 'cursor-pointer hover:bg-white/5' : 'cursor-not-allowed'}
        `}
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            disabled={!isTryMode}
          >
          {/* Overlay div  */}
          <div className="absolute inset-0 bg-[#07c983]/20 opacity-50"></div>

          <div 
              className={`
                  relative z-10
                  flex flex-col gap-3 p-3
              `}
              onClick={isTryMode ? onToggle : undefined}
          >
              {/* Visual Preview Box */}
              <div className="w-full h-full rounded-lg flex items-center justify-center p-2 shrink-0">
                  {PreviewComponent ? (
                      <div className="w-full">
                      {/* Fix: Use a wrapper div and render the component with createElement */}
                      {PreviewComponent && (
                          <div className="w-full">
                          {React.createElement(PreviewComponent)}
                          </div>
                      )}
                      </div>
                  ) : (
                      <div className="text-[8px] text-white/30">Preview</div>
                  )}
              </div>

          </div>
      </button>
  );
}