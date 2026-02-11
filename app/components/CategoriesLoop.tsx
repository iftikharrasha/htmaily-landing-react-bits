"use client"

import LogoLoop from "@/components/LogoLoop"

type TextItem = {
  label: string
}

type RowProps = {
  items: TextItem[]
  direction: "left" | "right"
  speed: number
  hoverSpeed: number
  rowKey: string
}

function TextLoopRow({
  items,
  direction,
  speed,
  hoverSpeed,
  rowKey,
}: RowProps) {
  return (
    <LogoLoop
      logos={items}
      direction={direction}
      speed={speed}
      hoverSpeed={hoverSpeed}
      gap={12}
      logoHeight={34}
      fadeOut
      fadeOutColor="#000000"
      ariaLabel={`${rowKey} loop`}
      renderItem={(item) => (
        <span
          className="
            inline-flex items-center justify-center
            rounded-full
            bg-white/5
            border border-white/10
            px-4
            py-1
            text-sm
            font-medium
            text-white
            backdrop-blur-sm
            cursor-default
            select-none
            whitespace-nowrap
            uppercase
          "
        >
          {item.label}
        </span>
      )}
    />
  )
}

export default function CategoriesLoop({
  tags,
  seasons,
}: {
  tags: string[]
  seasons: string[]
}) {
  return (
    <section
      className="relative w-full space-y-1 overflow-x-hidden overflow-y-visibles"
      aria-label="Template categories and seasons"
      role="region"
    >
      {/* Row 1 – left, faster */}
      <TextLoopRow
        items={tags.map((t) => ({ label: t }))}
        direction="left"
        speed={40}
        hoverSpeed={20}
        rowKey="tags"
      />

      {/* Row 2 – right, slower */}
      <TextLoopRow
        items={seasons.map((s) => ({ label: s }))}
        direction="right"
        speed={40}
        hoverSpeed={20}
        rowKey="seasons"
      />
    </section>
  )
}
