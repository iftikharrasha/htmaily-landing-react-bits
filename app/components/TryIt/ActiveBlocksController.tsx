"use client";

import { SegmentInstance } from "@/lib/tryit/tryIt.types";
import { Copy, Trash2, GripVertical } from "lucide-react";
import { useState } from "react";
import { 
  DragDropContext, 
  Droppable, 
  Draggable,
  DropResult 
} from "@hello-pangea/dnd";

interface Props {
  segments: SegmentInstance[];
  mode: "try" | "simulate";
  onVariantChange: (instanceId: string, variantId: string) => void;
  onDelete: (instanceId: string) => void;
  onDuplicate?: (instanceId: string) => void;
  onReorder?: (sourceIndex: number, destinationIndex: number) => void; // Add reorder callback
  onHover?: (instanceId: string | null) => void;
  hoveredInstanceId?: string | null;
}

export function ActiveBlocksController({
  segments,
  mode,
  onVariantChange,
  onDelete,
  onDuplicate,
  onReorder,
  onHover,
  hoveredInstanceId,
}: Props) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  // Handle drag end
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    onReorder?.(
      result.source.index,
      result.destination.index
    );
  };

  if (segments.length === 0) {
    return (
      <div className="text-center px-8">
        <p className="text-sm text-white/70">
          Your selected blocks will appear here.
        </p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="space-y-4">
        <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider">
          Your Email Blocks ({segments.length})
        </h4>

        {/* Timeline Wrapper */}
        <div className="relative pl-8">
          
          {/* Vertical Line */}
          <div className="absolute left-5.25 top-3 bottom-2 w-0.5 bg-[#07c983]/30" />

          <Droppable droppableId="blocks-droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`space-y-4 transition-colors ${
                  snapshot.isDraggingOver ? 'bg-white/5 rounded-lg' : ''
                }`}
              >
                {segments.map((segment, index) => {
                  const isHovered = hoveredInstanceId === segment.instanceId;
                  
                  return (
                    <Draggable
                      key={segment.instanceId}
                      draggableId={segment.instanceId}
                      index={index}
                      isDragDisabled={mode !== "try"} // Disable dragging in simulate mode
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="relative"
                          onMouseEnter={() => onHover?.(segment.instanceId)}
                          onMouseLeave={() => onHover?.(null)}
                        >
                          {/* Timeline Dot */}
                          <div className="absolute -left-4 top-3">
                            <div className={`w-3 h-3 rounded-full transition-all duration-200 ${
                              isHovered 
                                ? 'bg-[#ffffff] shadow-[0_0_0_8px_rgba(7,201,131,0.3)]' 
                                : 'bg-[#07c983] shadow-[0_0_0_8px_rgba(7,201,131,0.15)]'
                            }`} />
                          </div>

                          {/* Card */}
                          <div
                            className={`
                              rounded-xl 
                              p-3 
                              pt-1
                              space-y-2
                              transition-all duration-200
                              ${snapshot.isDragging ? 'shadow-2xl scale-105 rotate-1' : ''}
                              ${snapshot.isDragging ? 'bg-white/10 ring-2 ring-[#07c983]' : ''}
                            `}
                          >
                            {/* Header row */}
                            <div className="flex items-center justify-between">
                              <div className={`
                                  flex items-center gap-2 
                                  w-full px-1 py-1 rounded
                                  bg-white/5 ring-1
                                  mr-1
                                  ${isHovered ? ' ring-[#07c983]/50' : 'ring-white/20'}
                              `}>
                                <span className="text-xs px-1.5 py-0.5 rounded bg-[#07c983]/10 text-[#07c983] uppercase">
                                  {segment.category}
                                </span>
                                <span className="text-sm font-medium text-white/50">
                                  {segment.label}
                                </span>
                              </div>

                              {mode === "try" && (
                                <div className="flex items-center gap-1">
                                  {/* Drag Handle with Tooltip */}
                                  <div className="relative">
                                    <div 
                                      {...provided.dragHandleProps}
                                      onMouseEnter={() => setHoveredButton(`drag-${segment.instanceId}`)}
                                      onMouseLeave={() => setHoveredButton(null)}
                                      className="cursor-grab active:cursor-grabbing p-1 hover:bg-white/10 rounded text-white/40 hover:text-white"
                                    >
                                      <GripVertical size={14} />
                                    </div>
                                    
                                    {/* Tooltip */}
                                    {hoveredButton === `drag-${segment.instanceId}` && (
                                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-white/10 rounded text-[10px] text-white/80 whitespace-nowrap z-50">
                                        Drag to reorder
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black" />
                                      </div>
                                    )}
                                  </div>

                                  {/* Duplicate Button */}
                                  <div className="relative">
                                    <button
                                      onClick={() => onDuplicate?.(segment.instanceId)}
                                      onMouseEnter={() => setHoveredButton(`duplicate-${segment.instanceId}`)}
                                      onMouseLeave={() => setHoveredButton(null)}
                                      className="
                                        text-white/40 
                                        hover:text-[#07c983] 
                                        transition
                                        p-1
                                        rounded
                                        hover:bg-white/10
                                      "
                                      aria-label="Duplicate block"
                                    >
                                      <Copy size={14} />
                                    </button>
                                    
                                    {/* Tooltip */}
                                    {hoveredButton === `duplicate-${segment.instanceId}` && (
                                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-white/10 rounded text-[10px] text-white/80 whitespace-nowrap z-50">
                                        Duplicate
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black" />
                                      </div>
                                    )}
                                  </div>

                                  {/* Delete Button */}
                                  <div className="relative">
                                    <button
                                      onClick={() => onDelete(segment.instanceId)}
                                      onMouseEnter={() => setHoveredButton(`delete-${segment.instanceId}`)}
                                      onMouseLeave={() => setHoveredButton(null)}
                                      className="
                                        text-white/40 
                                        hover:text-red-400
                                        transition
                                        p-1
                                        rounded
                                        hover:bg-white/10
                                      "
                                      aria-label="Delete block"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                    
                                    {/* Tooltip */}
                                    {hoveredButton === `delete-${segment.instanceId}` && (
                                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-white/10 rounded text-[10px] text-white/80 whitespace-nowrap z-50">
                                        Delete
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black" />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Variant timeline dots */}
                            <div className="flex items-center gap-1.5">
                              {segment.variants.map((variant) => {
                                const isActive =
                                  variant.id === segment.activeVariantId;

                                return (
                                  <button
                                    key={variant.id}
                                    onClick={() =>
                                      mode === "try" &&
                                      onVariantChange(
                                        segment.instanceId,
                                        variant.id
                                      )
                                    }
                                    disabled={mode !== "try"}
                                    className={`
                                      group relative
                                      h-6 w-6 
                                      rounded-full 
                                      transition-all
                                      flex items-center justify-center
                                      ${variant.id === "headline-stacked" ? 'headline-variant-3' : ''}
                                      ${
                                        isActive
                                          ? "bg-white/20 scale-110 animate-pulse"
                                          : "hover:bg-white/10"
                                      }
                                      ${mode !== "try" ? "cursor-default opacity-50" : "cursor-pointer"}
                                    `}
                                    data-target={variant.id === "headline-stacked" ? "headline-variant-3" : undefined}
                                    title={variant.label}
                                  >
                                    <span
                                      className={`
                                        h-2 w-2 
                                        rounded-full 
                                        transition-all
                                        ${
                                          isActive
                                            ? "bg-white scale-110"
                                            : "bg-white/30 group-hover:bg-white/50"
                                        }
                                      `}
                                    />

                                    {/* Tooltip */}
                                    <span
                                      className="
                                        absolute 
                                        -top-8 
                                        left-1/2 -translate-x-1/2
                                        px-2 py-1
                                        bg-black
                                        border border-white/10
                                        rounded
                                        text-[10px]
                                        text-white/80
                                        whitespace-nowrap
                                        opacity-0
                                        group-hover:opacity-100
                                        transition
                                        pointer-events-none
                                        z-10
                                      "
                                    >
                                      {variant.label}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                          
                          {/* Draggable placeholder */}
                          {provided.placeholder}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
}