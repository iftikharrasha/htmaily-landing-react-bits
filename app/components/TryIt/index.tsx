"use client";

import Playground from "./Playground";
import RevealBackground from "@/components/RevealBackground"

export default function TryIt() {
  return (
    <section className="relative w-full min-h-[85vh]">
     <RevealBackground
        image="/reveal.png"
        radius={120}
        softness={200}
        className="h-288"
      />

      <div className="mx-auto w-full max-w-280 px-4 py-32 flex flex-col items-center justify-center mb-20 z-10">
        {/* Header */}
        <div className="mx-auto w-full max-w-280 mb-4 md:mb-12">
            <h2 className=" text-2xl lg:text-4xl font-bold text-[#FAFAFA] mb-4 md:mb-12">No <span className="line-through font-normal">code</span> Way<br />
            <span className="relative italic font-normal text-white/60">Try it Out!
              <svg 
                viewBox="0 0 200 9" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-1 left-0 h-2 w-full text-[#18E299] md:h-3"
              >
                <path 
                  d="M2.00025 6.99997C25.7602 3.86993 116.326 -1.82944 198.006 2.05929" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                />
              </svg>
            </span>
            </h2>
        </div>
        <div className="relative mx-auto max-w-225" id="try-it-playground">
          <Playground />
        </div>
      </div>
    </section>
  );
}
