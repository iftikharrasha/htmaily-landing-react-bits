"use client"

import SectionTitle from "../SectionTitle"
import MiddleSlider from "./MiddleSlider"
import Image from "next/image"
import StatCard from "./StatCard"
import CardDecoration from "./CardDecoration"
import CardContent from "./CardContent"

export default function BeforeAfter() {
  return (
    <section className="relative bg-transparent py-20 overflow-hidden">
      <SectionTitle title="Why Choose Us" subTitle="Experience the difference" />

      <div className="relative mx-auto w-full max-w-280">
        <div
          className="
            grid 
            grid-cols-1 
            lg:grid-cols-[1.2fr_2fr_1.2fr] 
            gap-4 
            items-stretch
          "
        >
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-4 order-1 lg:order-1">
            <StatCard>
              <CardDecoration
                src="/shape-1.png"
                alt="layer"
                width={240}
                height={240}
                containerClass="top-0 right-0"
                className="w-35 h-35 saturate-0"
              />

              <CardContent>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-6">
                    A+
                  </h3>
                  <p className="text-sm text-white/70">
                    Ready to transform your boring emails to production-ready templates.
                  </p>
                </div>
              </CardContent>
            </StatCard>

            <div className="relative">
              <div className="absolute bottom-0 right-0 z-0">
                <Image
                  loading="lazy"
                  src="/halftone-1.png"
                  alt="layer"
                  className="w-22 h-22"
                  width={120}
                  height={120}
                />
              </div>
              <div className="relative rounded-2xl p-6 h-full min-h-[140px]" />
            </div>

            <StatCard>
              <CardDecoration
                src="/layer-1.png"
                alt="layer"
                width={240}
                height={240}
                containerClass="top-0 left-0"
                className="w-35 h-35 saturate-0"
              />

              <CardContent>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Top 5%
                  </h3>

                  <p className="text-sm text-white/70 leading-relaxed mt-6">
                    Email Marketing & Web Development
                  </p>

                  <div className="flex gap-2 text-xs font-light text-[#FAFAFA]">
                    <Image
                      src="/star.svg"
                      alt="Rating star"
                      width={14}
                      height={14}
                      className="h-3 w-3"
                    />
                    <span>4.9 on</span>
                    <Image
                      src="/fiverr.svg"
                      alt="Fiverr"
                      width={38}
                      height={14}
                      className="w-8 h-auto"
                    />
                  </div>
                </div>
              </CardContent>
            </StatCard>
          </div>

          {/* MIDDLE */}
          <MiddleSlider />

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4 order-3 lg:order-3">
            <StatCard>
              <CardDecoration
                src="/halftone-3.png"
                alt="layer"
                width={240}
                height={240}
                containerClass="top-0 right-0"
                className="w-full h-40 saturate-0 object-cover"
              />

              <CardDecoration
                src="/peak.png"
                alt="peak"
                width={160}
                height={160}
                containerClass="bottom-4 right-7"
                className="w-25 h-25 saturate-0"
              />

              <CardContent>
                <h3 className="text-lg font-semibold text-white leading-5">
                  15x Faster <br />
                  <span className="text-xs text-white/70">
                    time to make a template
                  </span>
                </h3>
              </CardContent>
            </StatCard>

            <StatCard>
              <CardDecoration
                src="/halftone-4.png"
                alt="layer"
                width={240}
                height={240}
                containerClass="top-0 right-0"
                className="w-full h-40 saturate-0 object-cover"
              />

              <CardContent>
                <h3 className="text-lg font-semibold text-white leading-5">
                  180% Growth <br />
                  <span className="text-xs text-white/70">
                    Increase in engagement
                  </span>
                </h3>
              </CardContent>
            </StatCard>

            <div className="relative">
              <div className="absolute top-0 left-0 z-0 rotate-90">
                <Image
                  loading="lazy"
                  src="/halftone-2.png"
                  alt="layer"
                  className="w-22 h-22"
                  width={120}
                  height={120}
                />
              </div>
              <div className="relative rounded-2xl p-6 h-full min-h-[140px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}