"use client"

import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack"
import { EMAIL_STACKS } from "@/lib/emailStackData"
import EmailStackCard from "./EmailStackCard."
import HowItWorks from "./HowItWorks"
import ActionButton from "./ActionButton"
import SectionTitle from "./SectionTitle"

export default function EmailStack() {
  return (
    <section>
      <div className="mx-auto w-full max-w-280 will-change-transform transform-gpu backface-hidden px-4 md:px-0">
        {/* Header */}
        <SectionTitle title="Simplified Design" subTitle="With Variations" />

        <ScrollStack
            gap={100}
            perspective={1200}
            scale={0.94}
            itemDistance={100}
            itemScale={0.02}
            itemStackDistance={10}
            stackPosition="15%"
            scaleEndPosition="5%"
            baseScale={0.90}
            scaleDuration={1}
            rotationAmount={0}
            blurAmount={0}
            useWindowScroll={true}
        >
            {EMAIL_STACKS.map((item) => (
                <ScrollStackItem
                    key={item.id}
                >
                    <EmailStackCard item={item} />
                </ScrollStackItem>
            ))}
                <ScrollStackItem>
                    <HowItWorks/>
                </ScrollStackItem>
        </ScrollStack>
      </div>
      
      <div className="my-10 mb-20 flex items-center justify-center">
          <ActionButton size="lg" text="Browse Templates" href="/templates" />
      </div>
    </section>
  )
}