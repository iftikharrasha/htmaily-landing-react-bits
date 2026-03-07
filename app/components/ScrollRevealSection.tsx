"use client";

import RevealBackground from "@/components/RevealBackground";
import ShinyText from "@/components/ShinyText";
import { useRef, useEffect, useState } from "react";

export default function ScrollRevealSection() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const rightSectionRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!leftTextRef.current || segmentRefs.current.length === 0) return;

      const leftTop = leftTextRef.current.getBoundingClientRect().top;

      const firstSegment = segmentRefs.current[0];
      const lastSegment = segmentRefs.current[segmentRefs.current.length - 1];

      if (!firstSegment || !lastSegment) return;

      const firstTop = firstSegment.getBoundingClientRect().top;
      const lastBottom = lastSegment.getBoundingClientRect().bottom;

      const totalDistance = lastBottom - firstTop;
      const scrolled = leftTop - firstTop;

      let progress = scrolled / totalDistance;

      progress = Math.max(0, Math.min(1, progress));

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const segments = [
    {
      title: "Custom Design",
      description:
        "Tailored specifically to your brand identity and business goals, ensuring you stand out from the competition.",
    },
    {
      title: "Responsive Layout",
      description:
        "Flawless experience across all devices - from desktop to mobile, your site will look perfect everywhere.",
    },
    {
      title: "Fast Performance",
      description:
        "Optimized code and assets for lightning-fast loading times that keep visitors engaged.",
    },
    {
      title: "SEO Optimized",
      description:
        "Built with search engines in mind, helping you rank higher and attract more organic traffic.",
    },
  ];

  const maskPosition = scrollProgress * 100;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black text-white md:py-0"
    > 
      <RevealBackground image="/reveal.png" radius={120} softness={200} className="h-288" />

      <div className="mx-auto w-full max-w-280 px-4 md:px-0">
        {/* MOBILE */}
        <div className="block md:hidden">
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              It’s about time you had a website you were{" "}
              <span className="text-[#18E299]">proud of</span>
            </h2>
          </div>

          <div className="space-y-8">
            {segments.map((segment, index) => (
              <div
                key={index}
                className="border-b border-white/10 pb-6 last:border-0"
              >
                <h3 className="text-2xl font-bold text-[#18E299] mb-3">
                  {String(index + 1).padStart(2, "0")}
                </h3>

                <h4 className="text-xl font-semibold text-white mb-2">
                  {segment.title}
                </h4>

                <p className="text-white/60 leading-relaxed">
                  {segment.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex md:flex-row md:gap-12 lg:gap-20 md:min-h-screen">
          {/* LEFT TEXT */}
          <div className="md:w-1/2 md:sticky md:top-0 md:self-start md:h-screen">
            <div
              ref={leftTextRef}
              className="relative h-full flex items-center"
            >
              <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
                It’s about <br />
                time you <br />
                present{" "}
                <span className="relative inline-block">
                  <ShinyText
                    text="your Email"
                    speed={3}
                    delay={1}
                    color="#ffffff"
                    shineColor="#000000"
                    spread={70}
                    direction="left"
                    yoyo={true}
                    pauseOnHover={false}
                    disabled={false}
                  />
                  <svg
                    viewBox="0 0 200 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute -bottom-2 left-0 h-2 w-full text-[#18E299] md:h-3"
                  >
                    <path
                      d="M2.00025 6.99997C25.7602 3.86993 116.326 -1.82944 198.006 2.05929"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <br />
                professionally
              </h2>

              {/* FADE MASK */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(
                    0deg,
                    rgba(0,0,0,1) 0%,
                    rgba(0,0,0,1) ${maskPosition}%,
                    transparent ${maskPosition + 20}%,
                    transparent 100%
                  )`,
                  transition: "background 0.05s linear",
                }}
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div ref={rightSectionRef} className="md:w-1/2">
            <div className="space-y-16 md:space-y-24 md:pt-300 md:pb-160">
              {segments.map((segment, index) => (
                <div
                  key={index}
                  ref={(el) => (segmentRefs.current[index] = el)}
                  className="group"
                >
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white/20 group-hover:text-[#18E299]/30 transition-colors duration-300">
                      {String(index + 1).padStart(2, "0")}  
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-[#18E299] transition-colors duration-300">
                      {segment.title}
                    </h3>

                    <p className="text-white/60 text-lg leading-relaxed">
                      {segment.description}
                    </p>
                  </div>

                  {index < segments.length - 1 && (
                    <div className="mt-8 w-full h-px border border-[#18E299] to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}