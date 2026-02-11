import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import TemplateLoop from "./components/TemplateLoop";

export default function Home() {
  return (
      <main className="min-h-screen bg-black text-white">
          <HeroSection />
          <TemplateLoop />
          <HowItWorks />
      </main>
  );
}
