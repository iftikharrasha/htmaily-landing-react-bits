"use client"

import LogoLoop from "@/components/LogoLoop"
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
      fadeOutColor="#ffffff"
      ariaLabel="Customer testimonials"
      renderItem={(item) => (
        <div
          className="
            group
            relative
            w-95
            transition-transform duration-300 ease-out
          "
        >
          <div
            className="
              bg-white
              rounded-xl
              p-6
              border border-gray-200
              transition-shadow duration-300
              flex flex-col justify-between
              h-full
              min-h-50
            "
          >
            {/* Quote */}
            <p className="text-sm text-gray-700 leading-relaxed flex-1">
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
                <p className="text-sm font-semibold text-gray-900">
                  {item.name}
                </p>
                <p className="text-xs text-gray-600">
                  {item.profession} @ {item.brand}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  )
}
