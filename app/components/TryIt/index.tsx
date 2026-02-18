"use client";

import Playground from "./Playground";

export default function TryIt() {
  return (
    <section className="mx-auto w-full max-w-280 px-4 py-32 flex flex-col items-center justify-center">
      <div className="mx-auto max-w-[900px]">
        <Playground />
      </div>
    </section>
  );
}
