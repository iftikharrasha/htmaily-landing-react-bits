"use client"

import Link from "next/link"
import Image from "next/image"
import { EmailStackItem } from "@/lib/emailStackData"
import GridMotion from "@/components/GridMotion"
import { useState } from "react"
import SpotlightCard from "@/components/SpotlightCard"
import ActionButton from "./ActionButton"
import ShinyText from "@/components/ShinyText"
import { it } from "node:test"

type Props = {
  item: EmailStackItem
}

export default function EmailStackCard({ item }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <SpotlightCard 
      className="
        p-0!
      bg-black!
        border
      border-[rgba(127,33,255,0.6)]
        shadow-[inset_0_8px_24px_rgba(255,255,255,0.09),0_16px_24px_rgba(23,11,38,0.1)]
      " 
      spotlightColor={item.spotlightColor}>
      {/* <div className="absolute top-0 left-0 z-0">
        <Image
          loading="lazy"
          src="/layer-1.avif"
          alt="layer"
          className="w-full h-full scale-x-[-1]"
          width={394}
          height={394}
        />
      </div> */}
      <div 
        className={`
          relative z-10
          grid grid-cols-1 lg:grid-cols-2
          gap-10
          rounded-2xl
          overflow-hidden
        `
        }
        // style={{ backgroundColor: item.spotlightColor }}
      >
        {/* LEFT: Content */}
        <div className="flex flex-col justify-center px-8 py-4">
          <span
            className="text-2xl font-bold font-heading text-[#a1a1aa] italic mb-3"
            // style={{ color: item.accentColor }}
          >
            <ShinyText
              text={item.tag}
              speed={3}
              delay={2}
              color="#ffffff"
              shineColor="#1b1b1b"
              spread={100}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
            />
          </span>

          <h3 className="text-3xl font-semibold text-[#FFFFFF] mb-4">
            {item.title}
          </h3>

          <p className="text-[#FAFAFA] mb-6 max-w-md">
            {item.description}
          </p>

          <ul className="space-y-2 mb-8">
            {item.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-[#FAFAFA]"
              >
                <span
                  style={{ color: item.accentColor }}
                >
                  —
                </span>
                {feature}
              </li>
            ))}
          </ul>

          <ActionButton size="lg" text={item.buttonText} href={item.buttonHref} />
        </div>

        {/* RIGHT: GridMotion */}
        <div className="relative h-[400px] lg:h-[400px] w-full overflow-hidden rounded-2xl">
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative h-full"
          >
            <GridMotion
              items={item.images} // array of image URLs
              active={hovered}
              gradientColor={item.accentColor}
            />
          </div>
        </div>
      </div>
    </SpotlightCard>
  )
}