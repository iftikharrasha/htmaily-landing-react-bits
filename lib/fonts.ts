import { Inria_Serif, Red_Hat_Display } from "next/font/google"

export const inriaSerif = Inria_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-inria",
})

export const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-redhat",
})
