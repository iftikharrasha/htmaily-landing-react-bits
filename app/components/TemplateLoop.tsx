"use client";

import LogoLoop from "@/components/LogoLoop"
import Image from "next/image"

type TemplateItem = {
  src: string
  alt: string
}

const templates: TemplateItem[] = Array.from({ length: 10 }, (_, i) => ({
  src: `/preview-${i + 1}.png`,
  alt: `Template ${i + 1}`,
}))

export default function TemplateLoop() {
  return (
    <section className="relative bg-black text-white py-16 overflow-hidden mb-15">
      <div className="relative mx-auto w-full px-4 md:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <h2
            className="text-4xl font-bold text-[#FAFAFA]"
          >
            Explore Templates
          </h2>
        </div>

        {/* Infinite loop template showcase */}
        <LogoLoop
            logos={templates}
            speed={100}
            hoverSpeed={30}
            direction="left"
            gap={32}
            logoHeight={600}
            fadeOut
            fadeOutColor="#000000"
            ariaLabel="Template previews"
            renderItem={(item) => (
            <div className="relative shrink-0 pt-4">
                <div
                    className="
                        group
                        relative
                        w-90
                        cursor-pointer
                        transition-transform duration-300 ease-out
                        will-change-transform
                        hover:-translate-y-3 z-10
                    "
                >
                    <div className="relative rounded-xl shadow-2xl">
                        <Image
                            src={item.src}
                            alt={item.alt}
                            width={300}
                            height={600}
                            className="
                                w-full h-auto object-cover
                                opacity-70
                                transition-opacity duration-300
                                hover:opacity-100
                                rounded-lg
                            "
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
            )}
        />
      </div>
    </section>
  )
}
