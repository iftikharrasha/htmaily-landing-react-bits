"use client";

import RevealBackground from "@/components/RevealBackground";
import ShinyText from "@/components/ShinyText";
import { img } from "framer-motion/client";
import Image from "next/image";
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
      title: "Drop the HTML in your Gmail",
      img: "/View1.png",
    },
    {
      title: "Send your brand storytelling emails",
      img: "/View2.png",
    },
    {
      title: "Even in outlook",
      img: "/View3.png",
    },
  ];

  const maskPosition = scrollProgress * 100;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black text-white md:py-0"
    > 
      <div className="m-auto lg:ml-98 max-w-280 lg:max-w-full px-4 md:px-0">
        {/* m-auto max-w-280 */}
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

                <Image
                  src={segment.img}
                  alt="View"
                  className="w-full"
                  loading="lazy"
                  width={1132}
                  height={766}
                />
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex w-full">

          {/* LEFT SIDE (aligned with site container) */}
          <div className="shrink-0 w-full max-w-110 mx-auto px-4 md:px-0">
            <div className="md:w-110 md:sticky md:top-0 md:self-start md:h-screen">
              <div ref={leftTextRef} className="relative h-full flex items-center">
                
                <h2 className="text-5xl lg:text-6xl xl:text-6xl font-bold leading-tight text-white">
                  It’s about <br />
                  time you <br />
                  present<br />

                  <span className="relative inline-block">
                    <ShinyText
                      text="Your Email"
                      speed={3}
                      delay={1}
                      color="#18E299"
                      shineColor="#ffffff"
                      spread={70}
                      direction="left"
                      yoyo
                    />

                    <svg
                      viewBox="0 0 200 9"
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
          </div>


          {/* RIGHT SIDE (goes to scrollbar) */}
          <div ref={rightSectionRef} className="flex-1">
            <div className="max-w-none space-y-16 md:space-y-24 md:pt-300 md:pb-160">

              {segments.map((segment, index) => (
                <div
                  key={index}
                  ref={(el) => (segmentRefs.current[index] = el)}
                  className="group space-y-4"
                >
                  <span className="text-4xl font-bold text-white/20 group-hover:text-[#18E299]/30 transition-colors duration-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="text-2xl lg:text-3xl font-bold text-[#18E299] group-hover:text-white transition-colors duration-300">
                    {segment.title}
                  </h3>

                  <Image
                    src={segment.img}
                    alt="View"
                    className="w-full"
                    width={1132}
                    height={766}
                  />
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}