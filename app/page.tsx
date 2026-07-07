import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Team from "@/components/Team";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/ui/BackToTop";

export default function Home() {
  return (
    <main id="main-content">
      <Header />
      <Hero />
      <Services />
      <BeforeAfterSlider />
      <Team />
      <Reviews />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}
