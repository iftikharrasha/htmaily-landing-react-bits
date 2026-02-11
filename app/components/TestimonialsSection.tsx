import { generateFakeTestimonials } from "@/lib/testimonials"
import TestimonialLoop from "./TestimonialLoop"

export default function TestimonialsSection() {
  const testimonials = generateFakeTestimonials()

  return (
    <section className="relative bg-white py-16 overflow-hidden">
      <div className="relative mx-auto max-w-360 px-4 md:px-8 lg:px-10">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#5ac0c0] bg-white mb-4">
            <span className="text-xs font-medium text-[#5ac0c0]">
              Referral From People
            </span>
          </div>

          <h2 className="text-4xl font-bold text-gray-900">
            Trusted by People{" "}
            <span className="italic font-normal">Chosen By Brands</span>
          </h2>
        </header>

        {/* Row 1 */}
        <div className="mb-3">
          <TestimonialLoop
            testimonials={testimonials.slice(0, 4)}
            direction="left"
            speed={20}
          />
        </div>

        {/* Row 2 */}
        <div className="mb-3">
            <TestimonialLoop
                testimonials={testimonials.slice(4, 8)}
                direction="right"
                speed={20}
            />
        </div>

        {/* Row 3 */}
        <TestimonialLoop
          testimonials={testimonials.slice(3, 7)}
          direction="left"
          speed={25}
        />
      </div>
    </section>
  )
}
