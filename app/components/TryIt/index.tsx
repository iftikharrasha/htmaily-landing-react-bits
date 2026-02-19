"use client";

import SectionTitle from "../SectionTitle";
import Playground from "./Playground";

export default function TryIt() {
  return (
    <section className="mx-auto w-full max-w-280 px-4 py-32 flex flex-col items-center justify-center mb-70">
      {/* Header */}
      <SectionTitle title="Explore Templates" subTitle="Try it Out!" />
      <div className="relative mx-auto max-w-225">
        <Playground />
      </div>
    </section>
  );
}
