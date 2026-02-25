"use client"

import LogoLoop from "@/components/LogoLoop"
import SpotlightCard from "@/components/SpotlightCard"
import Image from "next/image"

export type Testimonial = {
  id: number
  name: string
  profession: string
  brand: string
  comment: string
  avatar: string
}

type Props = {
    testimonials: Testimonial[]
    direction: "left" | "right"
    speed?: number
}

export default function TestimonialLoop({
  testimonials,
  direction,
  speed
}: Props) {
  return (
    <LogoLoop
      logos={testimonials}
      direction={direction}
      speed={speed}
      hoverSpeed={2}
      gap={12}
      logoHeight={260}
      fadeOut
      fadeOutColor="#000000"
      ariaLabel="Customer testimonials"
      renderItem={(item) => (
        <div
          className="
            group
            relative
            w-90
            transition-transform duration-300 ease-out
          "
        >
        <SpotlightCard className="
          bg-black! 
            border
          border-[rgba(127,33,255,0.6)]
            shadow-[inset_0_8px_24px_rgba(255,255,255,0.09),0_16px_24px_rgba(23,11,38,0.1)]
            p-1!
          " 
          spotlightColor="rgba(0, 229, 255, 0.2)">
            <div
              className="
                flex flex-col justify-between
                bg-neutral-900/50 border border-neutral-800 hover:bg-neutral-900/70
                p-6  h-full min-h-60 rounded-2xl
                transition-colors duration-200
              "
            >
              {/* Quote */}
              <p className="text-[16px] text-[#FAFAFA] leading-relaxed flex-1">
                “{item.comment}”
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-[#FFFFFF]">
                    {item.name}
                  </p>
                  <p className="text-xs text-[#FAFAFA]/70">
                    {item.profession} @ {item.brand}
                  </p>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      )}
    />
  )
}
