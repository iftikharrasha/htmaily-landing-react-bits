"use client"

import SpotlightCard from "@/components/SpotlightCard"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
  className?: string
}

export default function StatCard({ children, className = "" }: Props) {
  return (
    <SpotlightCard
      className={`
        bg-black! 
        border border-[rgba(127,33,255,0.6)]
        shadow-[inset_0_8px_24px_rgba(255,255,255,0.06),0_16px_24px_rgba(23,11,38,0.2)]
        p-0!
        rounded-xl
        ${className}
      `}
      spotlightColor="rgba(0, 229, 255, 0.15)"
    >
      {children}
    </SpotlightCard>
  )
}