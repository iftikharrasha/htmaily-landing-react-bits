"use client";

import LogoLoop from "@/components/LogoLoop"
import Image from "next/image"
import SectionTitle from "./SectionTitle";
import { TEMPLATES } from "@/lib/templateMetadata";
import Magnet from "@/components/Magnet";

export default function TemplateLoop() {
  return (
    <section className="relative bg-black text-white pt-60 py-16 overflow-hidden mb-15">
      <div className="relative mx-auto w-full px-4 md:px-8 lg:px-10">

        {/* //its shoud be in the middle of the section but its not, need to fix it */}
        <div className="
            absolute z-1 pointer-events-none
            top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        "> 
            {/* top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  */}
          <div className="flex justify-between items-end w-full">
            <h4 className="text-2xl lg:text-[100px] uppercase font-bold text-[#18E299] leading-20 mr-4">HTML</h4>
            <p className="text-xl font-bold text-[#FAFAFA]">Made for modern inboxes.</p>
          </div>
          <h4 className="text-2xl lg:text-[140px] uppercase font-bold text-[#FAFAFA] leading-30">Templates</h4>
        </div>
        {/* Infinite loop template showcase */}
        <LogoLoop
            logos={TEMPLATES}
            speed={100}
            hoverSpeed={30}
            direction="left"
            gap={32}
            logoHeight={600}
            fadeOut
            fadeOutColor="#000000"
            ariaLabel="Template previews"
            renderItem={(item) => (
                <div className="
                    group
                    relative
                    w-90
                    cursor-pointer
                    transition-transform duration-300 ease-out
                    will-change-transform
                    hover:-translate-y-3 z-100 pt-10
                  "
                >
                    <div className="relative rounded-xl shadow-2xl">
                      <Magnet padding={50} disabled={false} magnetStrength={10}>
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
                      </Magnet>
                    </div>
                </div>
            )}
        />
      </div>
    </section>
  )
}
