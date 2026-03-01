"use client"

import Image from "next/image"

export default function AfterItem() {
  return (
    <div className="relative w-full h-full bg-neutral-100">
      {/* Replace this entire layout with your real "Before" design later */}
      <Image
        src="/after.svg"
        alt="after template"
        priority
        className="w-140 h-auto"
        width={560}
        height={544}
      />

      {/* Optional overlay label (you can remove later) */}
      <div className="absolute bottom-4 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
        AFTER
      </div>
    </div>
  )
}