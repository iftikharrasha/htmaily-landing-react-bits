"use client"

import SpotlightCard from "@/components/SpotlightCard"
import SectionTitle from "../SectionTitle"
import MiddleSlider from "./MiddleSlider"

function SmallCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <SpotlightCard
      className="
        bg-black! 
        border border-[rgba(127,33,255,0.6)]
        shadow-[inset_0_8px_24px_rgba(255,255,255,0.06),0_16px_24px_rgba(23,11,38,0.2)]
        p-1!
        rounded-2xl
      "
      spotlightColor="rgba(0, 229, 255, 0.15)"
    >
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 h-full min-h-[140px] flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-white/70 leading-relaxed">
          {description}
        </p>
      </div>
    </SpotlightCard>
  )
}

/* -------------------- MAIN SECTION -------------------- */

export default function BeforeAfter() {
  return (
    <section className="relative bg-transparent py-20 overflow-hidden">
        {/* Header */}
        <SectionTitle title="Why Choose Us" subTitle="Experience the difference" />
        <div className="relative mx-auto w-full max-w-280">

            {/* Grid Layout */}
            <div className="
                    grid 
                    grid-cols-1 
                    lg:grid-cols-[1.2fr_2fr_1.2fr] 
                    gap-4 
                    items-stretch
                "
            >
            {/* LEFT SMALL CARDS */}
            <div className="flex flex-col gap-4 order-1 lg:order-1">
                <SmallCard
                    title="A+"
                    description="Ready to transform your boring emails to production-ready templates."
                />
                <SmallCard
                    title="Top 5%"
                    description="Ranked among the best in Email Marketing & Web Development."
                />
                <SmallCard
                    title="Performance Focused"
                    description="Every template is built for speed, engagement and conversions."
                />
            </div>

            {/* MIDDLE BIG CARD */}
            <MiddleSlider/>

            {/* RIGHT SMALL CARDS */}
            <div className="flex flex-col gap-4 order-3 lg:order-3">
                <SmallCard
                    title="15x Faster"
                    description="Time to design and launch a fully responsive email template."
                />
                <SmallCard
                    title="180% Growth"
                    description="Increase in engagement after switching to optimized layouts."
                />
                <SmallCard
                    title="Built For Scale"
                    description="Reusable modular system for brands, agencies & SaaS."
                />
            </div>

            </div>
        </div>
    </section>
  )
}