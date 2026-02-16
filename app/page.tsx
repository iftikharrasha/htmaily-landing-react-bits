import EmailStack from "./components/EmailStack";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import SloganText from "./components/SloganText";
import TemplateLoop from "./components/TemplateLoop";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
      <main className="min-h-screen bg-black text-white">
          <HeroSection />
          <TemplateLoop />
          {/* <HowItWorks/> */}
          <EmailStack/>
          <Testimonials/>
          <SloganText/>
      </main>
  );
}
