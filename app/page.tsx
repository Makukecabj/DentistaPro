import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustSection from "@/components/TrustSection";
import Statistics from "@/components/Statistics";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Team from "@/components/Team";
import SocialProof from "@/components/SocialProof";
import BudgetCalculator from "@/components/BudgetCalculator";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BackToTop from "@/components/ui/BackToTop";
import SectionCTA from "@/components/SectionCTA";

export default function Home() {
  return (
    <main id="main-content">
      <Header />
      <Hero />
      <TrustSection />
      <Statistics />
      <WhyChooseUs />
      <Services />
      <SectionCTA text="Consultá tu tratamiento por WhatsApp" />
      <BeforeAfterSlider />
      <Team />
      <SectionCTA text="Agendá tu consulta" />
      <SocialProof />
      <BudgetCalculator />
      <FAQ />
      <SectionCTA text="¿Tenés dudas? Escribinos" />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </main>
  );
}
