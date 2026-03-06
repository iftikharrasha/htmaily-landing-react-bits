import BeforeAfter from "./components/BeforeAfter";
import EmailStack from "./components/EmailStack";
import HeroSection from "./components/HeroSection";
import ScrollRevealSection from "./components/ScrollRevealSection";
import SloganText from "./components/SloganText";
import TemplateLoop from "./components/TemplateLoop";
import Testimonials from "./components/Testimonials";
import TryIt from "./components/TryIt";

export default function Home() {
  return (
      <main className="min-h-screen bg-black text-white">
        <HeroSection />
        <TemplateLoop />
        <EmailStack/>
        <BeforeAfter />
        <ScrollRevealSection />
        <TryIt/>
        <Testimonials/>
        <SloganText/>
      </main>
  );
}
