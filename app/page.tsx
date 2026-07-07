import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustSection from "@/components/TrustSection";
import Services from "@/components/Services";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import BackToTop from "@/components/ui/BackToTop";

export default function Home() {
  return (
    <main id="main-content">
      <Header />
      <Hero />
      <TrustSection />
      <Services />
      <BeforeAfterSlider />
      <Team />
      <Testimonials />
      <Reviews />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
      <StickyMobileCTA />
      <BackToTop />
    </main>
  );
}
