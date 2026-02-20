"use client";

import React from "react";
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

type Props = {
  state: TryItState;
  dispatch: React.Dispatch<TryItAction>;
};

export default function LeftPanel({ state, dispatch }: Props) {
  const [activeTab, setActiveTab] = useState<SegmentType>("header");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const isTryMode = state.mode === "TRY";
  const isSimulateMode = state.mode === "SIMULATE";

  const handleTryMode = () => {
    dispatch({ type: "SET_MODE", mode: "TRY" });
  };

  const handleSimulateMode = () => {
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

  const handleTabChange = (value: string) => {
    setActiveTab(value as SegmentType);
    setExpandedItem(null); // Collapse expanded item when switching tabs
    dispatch({ type: "SET_ACTIVE_TAB", tab: value as SegmentType });
  };

  const getItemsForTab = (tab: SegmentType): ItemType[] => {
    switch(tab) {
      case "header": return HEADER_ITEMS;
      case "headline": return HEADLINE_ITEMS;
      case "paragraph": return PARAGRAPH_ITEMS;
      case "image": return IMAGE_ITEMS;
      default: return [];
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top Controls */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-semibold text-lg">
          HTMAILY
        </h3>

        <div className="flex gap-2">
          <button
            onClick={handleTryMode}
            className={`rounded-full px-4 py-1.5 text-sm ${
              state.mode === "TRY" 
                ? "bg-white text-black" 
                : "bg-white/10 text-white"
            }`}
          >
            Reset
          </button>
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
            className="flex-none rounded-sm border border-transparent! px-3 py-1 text-white/50 hover:text-white/70 hover:bg-[#ced3d0]/10 data-[state=active]:font-bold data-[state=active]:border-[#07c983]/30! data-[state=active]:bg-[#07c983]/10 data-[state=active]:text-[#07c983] cursor-pointer"
          >
            Header
          </TabsTrigger>
          <TabsTrigger 
            value="headline" 
            disabled={isSimulateMode}
            className="flex-none rounded-sm border border-transparent! px-3 py-1 text-white/50 hover:text-white/70 hover:bg-[#ced3d0]/10 data-[state=active]:font-bold data-[state=active]:border-[#07c983]/30! data-[state=active]:bg-[#07c983]/10 data-[state=active]:text-[#07c983] cursor-pointer"
          >
            Headline
          </TabsTrigger>
          <TabsTrigger 
            value="paragraph" 
            disabled={isSimulateMode}
            className="flex-none rounded-sm border border-transparent! px-3 py-1 text-white/50 hover:text-white/70 hover:bg-[#ced3d0]/10 data-[state=active]:font-bold data-[state=active]:border-[#07c983]/30! data-[state=active]:bg-[#07c983]/10 data-[state=active]:text-[#07c983] cursor-pointer"
          >
            Paragraph
          </TabsTrigger>
          <TabsTrigger 
            value="image" 
            disabled={isSimulateMode}
            className="flex-none rounded-sm border border-transparent! px-3 py-1 text-white/50 hover:text-white/70 hover:bg-[#ced3d0]/10 data-[state=active]:font-bold data-[state=active]:border-[#07c983]/30! data-[state=active]:bg-[#07c983]/10 data-[state=active]:text-[#07c983] cursor-pointer"
          >
            Image
          </TabsTrigger>
        </TabsList>

        {/* Header Tab */}
        <TabsContent value="header" className="space-y-2">
          {HEADER_ITEMS.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onToggle={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
              onAdd={() => handleAddSegment(item)}
              isTryMode={isTryMode}
            />
          ))}
        </TabsContent>

        {/* Headline Tab */}
        <TabsContent value="headline" className="space-y-2">
          {HEADLINE_ITEMS.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onToggle={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
              onAdd={() => handleAddSegment(item)}
              isTryMode={isTryMode}
            />
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
              isTryMode={isTryMode}
            />
          ))}
        </TabsContent>

        {/* Image Tab */}
        <TabsContent value="image" className="space-y-2">
          {IMAGE_ITEMS.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onToggle={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
              onAdd={() => handleAddSegment(item)}
              isTryMode={isTryMode}
            />
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
    <div>
      {/* Item Header */}
      <div className="flex-1 flex items-center justify-between gap-2 mb-2">
          <div className="flex-1 text-left">
              <div className="text-sm font-medium text-white/50">{item.label}</div>
          </div>
      </div>

      <button className={`
            relative w-full min-w-70 min-h-28 
            border border-white/10 rounded-lg overflow-hidden 
            bg-[url('/mask-1.png')] bg-cover bg-center
            ${isTryMode ? 'cursor-pointer hover:bg-white/5' : 'opacity-50'}
            transition
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
    </div>
  );
}