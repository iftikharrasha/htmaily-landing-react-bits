import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import TemplateLoop from "./components/TemplateLoop";
import TestimonialsSection from "./components/TestimonialsSection";

export default function Home() {
  return (
      <main className="min-h-screen bg-black text-white">
          <HeroSection />
          <TemplateLoop />
          <HowItWorks />
          <TestimonialsSection/>
      </main>
  );
}
