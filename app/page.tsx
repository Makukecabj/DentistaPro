import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import SmileDivider from "@/components/SmileDivider";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Team from "@/components/Team";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <SmileDivider />
      <Services />
      <BeforeAfterSlider />
      <SmileDivider flip />
      <Team />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}
