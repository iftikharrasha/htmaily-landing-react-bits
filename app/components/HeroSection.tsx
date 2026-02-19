"use client";

import Beams from "@/components/Beams"
import Image from "next/image";
import { TAGS, SEASONS } from "@/lib/templateMetadata"
import CategoriesLoop from "./CategoriesLoop";
import ActionButton from "./ActionButton";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-black text-white min-h-[85vh]">
      {/* Content container limited to 1440px */}
      <div className="relative mx-auto w-full max-w-360 py-10 md:py-20 px-0 lg:px-10">
        {/* Beams animated background - constrained to 1440px container */}
        <div className="pointer-events-none absolute h-150 md:h-200 w-full inset-0 z-0">
          <Beams
            beamWidth={3}
            beamHeight={30}
            beamNumber={20}
            lightColor="#ffffff"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={30}
          />
        </div>

        {/* Text content on top */}
        <div className="relative z-10 flex flex-col items-center gap-2 text-center w-full min-h-[60vh] justify-center">
          {/* Top small line - Developer attribution */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-base font-light text-[#FAFAFA] mt-20">
            <span>Developed by <strong>Iftikhar Rasha</strong></span>
            <Image
              src="/star.svg"
              alt="Rating star"
              className="h-3.5 w-3.5"
              loading="lazy"
              width={14}
              height={14}
            />
            <span>4.9 on</span>
            <Image
              src="/fiverr.svg"
              alt="Fiverr"
              className="w-9.5 md:w-12 h-3.5"
              loading="lazy"
              width={38}
              height={14}
            />
          </div>

          {/* Main heading */}
          <h1
            className="font-bold leading-tight tracking-tight text-[#FAFAFA] text-2xl md:text-4xl mb-10"
          >
            <span className="block">Design Email Templates</span>
            <span className="relative mt-2 inline-flex items-center justify-center gap-3">
              <span>The Easiest</span>
              <Image
                src="/icons.svg"
                alt="Icons"
                className="h-8 w-auto sm:h-10"
                loading="lazy"
                width={80}
                height={31}
              />
              <span>Way</span>
            </span>
          </h1>

          {/* CTA Button */}
          <ActionButton size="lg" text="See in Action" href="/playground" />

          {/* Text Loop Section */}
          <div className="relative z-10 w-full px-0 lg:px-30 md:px-15 mt-16">
            <CategoriesLoop
              tags={TAGS}
              seasons={SEASONS}
            />
          </div>

          {/* Hero Image */}
          <div className="relative z-10 w-full flex justify-center mt-8 px-4 md:px-0">
            <Image
              src="/hero-image.svg"
              alt="Hero"
              className="w-full max-w-full h-auto rounded-xl object-contain group relative cursor-pointer ease-out will-change-transform z-10 transition-transform duration-300 hover:-translate-y-3 hover:cursor-[url(/cursor.webp),grab]"
              loading="lazy"
              width={1080}
              height={648}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;