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
        className="w-120 h-auto"
        width={478}
        height={464}
      />
    </div>
  )
}