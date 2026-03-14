"use client"

import BeforeAfter from "./components/BeforeAfter";
import EmailStack from "./components/EmailStack";
import FAQ from "./components/FAQ";
import HeroSection from "./components/HeroSection";
import MoreTemplates from "./components/MoreTemplates";
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
        <MoreTemplates/>
        <BeforeAfter />
        <ScrollRevealSection />
        <TryIt/>
        <Testimonials/>
        <FAQ/>
        <SloganText/>
      </main>
  );
}
