"use client"

import { EmailStackItem } from "@/lib/emailStackData"
import Image from "next/image"
import Link from "next/link"

type Props = {
  item: EmailStackItem
}

export default function EmailStackCard({ item }: Props) {
  return (
    <div
      className="
        grid grid-cols-1 lg:grid-cols-2
        gap-10
        rounded-3xl
        p-10
      "
      style={{ backgroundColor: item.bgColor }}
    >
      {/* Left Content */}
      <div className="flex flex-col justify-center">
        <span
          className="text-sm font-medium mb-3"
          style={{ color: item.accentColor }}
        >
          {item.tag}
        </span>

        <h3 className="text-3xl font-semibold text-black mb-4">
          {item.title}
        </h3>

        <p className="text-black/70 mb-6 max-w-md">
          {item.description}
        </p>

        <ul className="space-y-2 mb-8">
          {item.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-black/80"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: item.accentColor }}
              />
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href={item.buttonHref}
          className="
            inline-flex w-fit items-center gap-2
            rounded-full
            px-6 py-3
            font-medium
            text-white
          "
          style={{ backgroundColor: item.accentColor }}
        >
          {item.buttonText}
          →
        </Link>
      </div>

      {/* Right Image */}
      {/* Here in the right side taking half the width i want the Grid Motion from react bits */}
      <div className="relative flex items-center justify-center">
        <div className="relative w-full h-full max-w-md">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}