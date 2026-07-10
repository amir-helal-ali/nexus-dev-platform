import Navbar from "@/components/site/navbar";
import Footer from "@/components/site/footer";
import Hero from "@/components/sections/hero";
import Stats from "@/components/sections/stats";
import Services from "@/components/sections/services";
import Templates from "@/components/sections/templates";
import TechStack from "@/components/sections/tech-stack";
import Process from "@/components/sections/process";
import Portfolio from "@/components/sections/portfolio";
import Testimonials from "@/components/sections/testimonials";
import Pricing from "@/components/sections/pricing";
import FAQ from "@/components/sections/faq";
import CTA from "@/components/sections/cta";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      {/* Page-level decorative background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[oklch(0.70_0.16_200/0.05)] rounded-full blur-[120px]" />
      </div>

      <Navbar />

      <main className="flex-1">
        <Hero />
        <Stats />
        <Services compact limit={3} />
        <Templates compact limit={3} />
        <TechStack />
        <Process />
        <Portfolio compact limit={4} />
        <Testimonials compact limit={3} />
        <Pricing compact />
        <FAQ limit={6} />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
