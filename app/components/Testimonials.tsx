import { generateFakeTestimonials } from "@/lib/testimonials"
import TestimonialLoop from "./TestimonialLoop"
import SectionTitle from "./SectionTitle"

export default function Testimonials() {
  const testimonials = generateFakeTestimonials()

  return (
    <section className="relative bg-transparent py-16 overflow-hidden">
      <div className="relative mx-auto px-4 md:px-8 lg:px-10">
         {/* Header */}
         <SectionTitle title="Trusted by" subTitle="Brand Owners" />

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
