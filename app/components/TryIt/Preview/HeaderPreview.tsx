"use client";

import Image from "next/image";

type Props = {
  variantId: string;
};

export default function HeaderPreview({ variantId }: Props) {
  switch (variantId) {
    case "logo-left":
      return (
        <div className="flex items-center justify-start px-4 py-3 bg-[#EEECE0] border-b-2 border-[#052F2D]/10">
          {/* <div className="w-24 h-8 bg-black rounded" /> */}
          <Image
            src="/logo.svg"
            alt="Hero"
            className="w-24 h-auto"
            loading="lazy"
            width={114}
            height={26}
          />
        </div>
      );

    case "logo-center":
      return (
        <div className="flex items-center justify-center px-4 py-3 bg-[#EEECE0] border-b-2 border-[#052F2D]/10">
          {/* <div className="w-24 h-8 bg-black rounded" /> */}
          <Image
            src="/logo.svg"
            alt="Hero"
            className="w-24 h-auto"
            loading="lazy"
            width={114}
            height={26}
          />
        </div>
      );

    case "logo-icon-text":
      return (
        <div className="flex items-center gap-3 px-4 py-3 bg-[#EEECE0] border-b-2 border-[#052F2D]/10">
          <div className="w-8 h-8 border-2 border-[#18E299] rounded-full flex items-center justify-center">
            <Image
              src="/icon.svg"
              alt="Hero"
              className="w-5 h-auto"
              loading="lazy"
              width={56}
              height={56}
            />
          </div>
          <div className="text-black font-semibold text-lg">
            HTMAILY
          </div>
        </div>
      );

    case "logo-left-links":
      return (
        <div className="flex items-center justify-between px-4 py-3 bg-[#EEECE0] border-b-2 border-[#052F2D]/10">
          {/* <div className="w-24 h-8 bg-black rounded" /> */}
          <Image
            src="/logo.svg"
            alt="Hero"
            className="w-24 h-auto"
            loading="lazy"
            width={114}
            height={26}
          />
          <div className="flex gap-6 text-sm text-black">
            <span>Shop</span>
            <span>About</span>
            <span>Contact</span>
          </div>
        </div>
      );

    case "logo-left-order":
      return (
        <div className="flex items-center justify-between px-4 py-3 bg-[#EEECE0] border-b-2 border-[#052F2D]/10">
          {/* <div className="w-24 h-8 bg-black rounded" /> */}
          <div className="w-12 h-12 border-2 border-[#18E299] rounded-full flex items-center justify-center">
            <Image
              src="/icon.svg"
              alt="Hero"
              className="w-7 h-auto"
              loading="lazy"
              width={56}
              height={56}
            />
          </div>
          <div className="text-right">
            <div className="font-bold text-black">
              Order No.
            </div>
            <div className="text-black/60 text-sm">
              #12233234
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
