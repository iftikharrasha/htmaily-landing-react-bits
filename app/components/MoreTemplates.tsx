"use client";

import Masonry from "@/components/Masonry";

const items = [
  { id: "1", img: "/more-1.png", height: 1316 },
  { id: "2", img: "/more-2.png", height: 862 },
  { id: "3", img: "/more-3.png", height: 508 },
  { id: "4", img: "/more-4.png", height: 486 },
  { id: "5", img: "/more-5.png", height: 1322 },
  { id: "6", img: "/more-6.png", height: 1250 },
  { id: "7", img: "/more-7.png", height: 1318 },
  { id: "8", img: "/more-8.png", height: 760 },
  { id: "9", img: "/more-9.png", height: 658 },
];

export default function MoreTemplates() {
  return (
    <section className="relative w-full min-h-screen bg-black mt-40">
      {/* Masonry */}
      <div className="mx-auto w-full px-0 pb-32">
        <Masonry
          items={items}
          ease="power1.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover
          hoverScale={0.95}
          blurToFocus
          colorShiftOnHover={false}
        />
      </div>

      {/* Bottom Gradient */}
      <div className="pointer-events-none absolute -bottom-10 left-0 w-full h-[600px] bg-gradient-to-t from-black via-black/80 to-transparent" />

      {/* Bottom Text */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-left px-6">
        <h2 className="text-white font-bold leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Experience
          <br />
          <span className="text-[#18E299]">The difference.</span>
        </h2>
      </div>
    </section>
  );
}