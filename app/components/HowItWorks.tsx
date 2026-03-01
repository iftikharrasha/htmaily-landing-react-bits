"use client"

import CardSwap, { Card } from "@/components/CardSwap"
import CountUp from "@/components/CountUp"
import ShinyText from "@/components/ShinyText"
import SpotlightCard from "@/components/SpotlightCard"
import Image from "next/image"

export default function HowItWorks() {
  return (
        <SpotlightCard className="
          bg-black! 
            border
          border-[rgba(127,33,255,0.6)]
            shadow-[inset_0_8px_24px_rgba(255,255,255,0.09),0_16px_24px_rgba(23,11,38,0.1)]
            mx-auto w-full max-w-360 p-0! flex flex-col items-center justify-center isolate
          " 
          spotlightColor="rgba(0, 229, 255, 0.2)">
          <div className="w-full flex flex-col md:flex-row items-center justify-between overflow-hidden">

            {/* LEFT CONTENT */}
            <div className="max-w-2xl w-full pl-12 pr-6 flex flex-col items-start space-y-8 overflow-hidden">
              <p
                className="text-6xl font-bold text-[#FAFAFA] mb-2"
                style={{ fontFamily: '"Inria Serif", serif' }}
              >
                <CountUp
                  from={0}
                  to={76}
                  separator=","
                  direction="up"
                  duration={1}
                  // startCounting
                /> 
                <span>+</span>
              </p>

              <div
                className="
                  inline-flex items-center gap-2
                  px-4 py-1.5
                  rounded-full
                  border border-[#a1a1aa]/60
                  mb-6
                "
              >
                {/* Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3 text-[#a1a1aa]"
                  aria-hidden="true"
                >
                  <path d="M16 7h6v6" />
                  <path d="m22 7-8.5 8.5-5-5L2 17" />
                </svg>

                {/* Shiny Text */}
                <ShinyText
                  text="Production ready combinations"
                  speed={2}
                  delay={0}
                  color="#a1a1aa"
                  shineColor="#ffffff"
                  spread={120}
                  direction="left"
                  yoyo={false}
                  pauseOnHover={false}
                  disabled={false}
                />
              </div>

              <h2
                className="text-4xl font-bold text-[#a1a1aa] mb-0"
              >
                Templates built on
              </h2>
              <h6 className="text-[#FAFAFA] text-3xl">Real Brands Solutions</h6>

              <p className="text-sm text-gray-300 leading-relaxed max-w-md">
                HTMAILY gives you all the tools you need to start building and customize your email template — from zero to the finished product in just a few minutes.
              </p>
            </div>

            {/* RIGHT CONTENT — CARD SWAP */}
            <div className="w-full md:flex-1 flex justify-center md:justify-end mt-8 md:mt-0 select-none">
              <div className="md:h-125 h-50 relative">
                  <CardSwap
                      width={600}
                      height={380}
                      cardDistance={60}
                      verticalDistance={70}
                      delay={4000}
                      skewAmount={6}
                      easing="elastic"
                      //   pauseOnHover
                  >
                      <Card className="overflow-hidden rounded-xl">
                          <div className="p-1 pl-2 bg-sidebar border-b flex flex-row items-center gap-3">
                              <div>
                                  Architech AI
                                  <p className="text-sm text-muted-foreground">Effortless diagramming with a modern, intuitive interface.</p>
                              </div>
                          </div>
                          <Image fill
                              src="/way1.png"
                              alt="Template preview 1"
                              className="object-cover invert dark:invert-0"
                          />
                      </Card>

                      <Card className="overflow-hidden rounded-xl">
                          <div className="p-1 pl-2 bg-sidebar border-b flex flex-row items-center gap-3">
                              <div>
                                  Architech AI
                                  <p className="text-sm text-muted-foreground">Effortless diagramming with a modern, intuitive interface.</p>
                              </div>
                          </div>
                          <Image fill
                              src="/way2.png"
                              alt="Template preview 2"
                              className="object-cover invert dark:invert-0"
                          />
                      </Card>

                      <Card className="overflow-hidden rounded-xl">
                          <div className="p-1 pl-2 bg-sidebar border-b flex flex-row items-center gap-3">
                              <div>
                                  Architech AI
                                  <p className="text-sm text-muted-foreground">Effortless diagramming with a modern, intuitive interface.</p>
                              </div>
                          </div>
                          <Image fill
                              src="/way3.png"
                              alt="Template preview 3"
                              className="object-cover invert dark:invert-0"
                          />
                      </Card>
                  </CardSwap>
              </div>
            </div>

          </div>
      </SpotlightCard>
  )
}
