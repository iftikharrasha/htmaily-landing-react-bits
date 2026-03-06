import { ReactNode } from "react"

export default function CardContent({ children }: { children: ReactNode }) {
  return (
    <div className="relative rounded-2xl p-4 xl:p-6 h-full min-h-28 xl:min-h-35 flex flex-col justify-between">
      {children}
    </div>
  )
}