// components/ActionButton.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ShinyText from "@/components/ShinyText";

interface ActionButtonProps {
  text: string;
  href: string;
  size?: "default" | "sm" | "lg";
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, href, size = "default" }) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(e.clientX - rect.left - rect.width / 2);
    setMouseY(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    setMouseX(0);
    setMouseY(0);
  };

  return (
    <div className="relative inline-flex items-center">
      {/* ShadCN Button */}
      <Button
        size={size}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        asChild
        className="group relative z-10 flex items-center justify-center rounded-full border border-white/60 bg-[#ffffff] px-8 md:px-10 uppercase font-bold text-12 text-[#000000] tracking-tight overflow-hidden transition-all duration-200 hover:bg-[#ffffff] shadow-[0_0_10px_2px_rgba(255,170,129,0.75)] space-x-1 cursor-pointer"
      >
        <a href={href} className="flex items-center space-x-1 relative z-10">
          {/* Cursor-following inner glow */}
          <div
            className="absolute -z-10 w-50 h-50 rounded-full transition-transform duration-100 ease-out"
            style={{
              transform: `translate(${mouseX * 1}px, ${mouseY * 1}px)`,
            }}
          >
            <div
              className="absolute top-0 left-0 w-full h-full rounded-full"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, #FFFFF5 3.5%, #FFAA81 26.5%, #FFDA9F 37.5%, rgba(255,170,129,0.5) 49%, rgba(210,106,58,0) 92.5%)",
              }}
            ></div>
            <div
              className="absolute top-0 left-0 w-full h-full blur-[5px] rounded-full"
              style={{
                background:
                  "radial-gradient(43.3% 44.23% at 50% 49.51%, #FFFFF7 29%, #FFFACD 48.5%, #F4D2BF 60.71%, rgba(214,211,210,0) 100%)",
              }}
            ></div>
          </div>

            {/* Text */}
            <span className="transition-transform duration-300 group-hover:-translate-x-3">
                <ShinyText
                  text={text}
                  speed={2}
                  delay={3}
                  color="#000000"
                  shineColor="#ffffff"
                  spread={50}
                  direction="left"
                  yoyo={true}
                  pauseOnHover={false}
                  disabled={false}
                />
            </span>

          {/* Optional arrow */}
          <Image
            src="/arrow.svg"
            alt="Arrow"
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-3"
            loading="lazy"
            width={24}
            height={24}
          />
        </a>
      </Button>
    </div>
  );
};

export default ActionButton;