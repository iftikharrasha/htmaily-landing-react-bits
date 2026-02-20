"use client";

import SectionTitle from "../SectionTitle";
import Playground from "./Playground";
import RevealBackground from "@/components/RevealBackground"

export default function TryIt() {
  return (
    <section className="relative w-full min-h-[85vh]">
     <RevealBackground
        image="/hero-image.svg"
        radius={120}
        softness={200}
        className="h-288"
      />

      <div className="mx-auto w-full max-w-280 px-4 py-32 flex flex-col items-center justify-center mb-20 z-10">
        {/* Header */}
        <SectionTitle title="No-Code Way" subTitle="Try it Out!" />
        <div className="relative mx-auto max-w-225">
          <Playground />
        </div>
      </div>
    </section>
  );
}
