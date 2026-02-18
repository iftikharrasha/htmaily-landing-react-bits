"use client";

import TextPressure from "@/components/TextPressure";
import Image from "next/image";
import ActionButton from "./ActionButton";

export default function SloganText() {
  return (
    <section>
    <div className="relative bg-black text-white h-[90vh] overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="
          saturate-0
          absolute inset-0
          w-full h-full
          object-cover
          z-0
        "
      >
        <source src="/globe.mp4" type="video/mp4" />
      </video>

      {/* Bottom gradient overlay */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute inset-x-0 bottom-0
          h-48
          bg-linear-to-t
          from-black
          via-black/70
          to-transparent
          z-10
        "
      />

        {/* Form layer */}
        <div className="relative z-20 w-full h-full flex items-end justify-center">
          <div className="w-full lg:w-6/12 px-4 pb-10 flex justify-center">
            <div
              className="
                w-full
                rounded-2xl
                border border-white/10
                bg-white/5
                backdrop-blur-xl
                shadow-[0_20px_80px_rgba(0,0,0,0.6)]
                p-6 md:p-8
              "
            >
              {/* Header */}
              <h2 className="text-lg lg:text-4xl font-bold text-[#FAFAFA] mb-1 md:mb-2">
                Let&apos;s re-design your
              </h2>

              <h6 className="text-lg lg:text-4xl italic font-normal text-white/60 uppercase mb-6">
                <span className="line-through">Booooring</span> emails.
              </h6>

              {/* Form */}
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="
                    flex-1
                    rounded-xl
                    bg-black/40
                    border border-white/10
                    px-4 py-3
                    text-white
                    placeholder:text-white/40
                    outline-none
                    focus:border-white/30
                    focus:ring-1 focus:ring-white/20
                    transition
                  "
                  required
                />

                <ActionButton size="lg" text="Subscribe" href="/templates" />
              </form>

              {/* Helper text */}
              <p className="mt-2 text-sm text-white/40 flex items-center gap-1">
                <span>Available for custom work on · </span>
                <Image
                  src="/fiverr.svg"
                  alt="Fiverr"
                  className="h-3 w-auto"
                  loading="lazy"
                  width={38}
                  height={14}
                />
              </p>
            </div>
          </div>
        </div>
    </div>

    
      <div className="relative mx-auto w-full px-4 md:px-8 lg:px-10">
        <div className="cursor-pointer">
            <TextPressure
                text="HTMAILY!"
                flex
                alpha={false}
                stroke={false}
                width
                weight
                italic
                textColor="#ffffff"
                strokeColor="#5227FF"
                minFontSize={36}
            />
        </div>
      </div>
    </section>
  );
}