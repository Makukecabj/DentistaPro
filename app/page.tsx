"use client";

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
// import FloatingWhatsApp from "@/components/FloatingWhatsApp"; // Removed
import ChatWidget from "@/components/ChatWidget"; // Added back
import BackToTop from "@/components/ui/BackToTop";
import SectionCTA from "@/components/SectionCTA";
import SectionReveal from "@/components/ui/SectionReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface BlogPostPreview {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

// Mock data for blog preview
const MOCK_POSTS: BlogPostPreview[] = [
  {
    slug: "visitas-regulares-dentista",
    title: "La Importancia de las Visitas Regulares al Dr. John",
    date: "15 Ene 2023",
    excerpt: "Descubrí por qué las revisiones periódicas son clave para una salud bucal óptima y una sonrisa radiante.",
  },
  {
    slug: "mitos-realidades-blanqueamiento-dental",
    title: "Blanqueamiento Dental: Mitos y Realidades",
    date: "20 Mar 2023",
    excerpt: "¿Es seguro? ¿Cuánto dura? Despejamos todas tus dudas sobre el blanqueamiento dental y te contamos cómo lograr una sonrisa más blanca.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

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

      {/* Blog Preview Section */}
      <section className="py-20 md:py-28 bg-sage/30 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <SectionReveal>
            <SectionHeading
              eyebrow="Blog"
              title="Novedades y Consejos"
              subtitle="Mantente al día con las últimas tendencias y consejos para tu salud bucal."
              align="center"
            />
          </SectionReveal>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 gap-8"
          >
            {MOCK_POSTS.map((post) => (
              <motion.div key={post.slug} variants={item} className="group glass rounded-2xl shadow-premium p-6 hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="relative h-40 w-full mb-5 rounded-xl overflow-hidden">
                  <Image
                    src={`/images/blog/${post.slug}.jpg`}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).onerror = null;
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1200&h=675&fit=crop&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-gold">
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 14v-4a2 2 0 012-2h4a2 2 0 012 2v4M6 14h12v-4a2 2 0 00-2-2H8a2 2 0 00-2 2v4z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl font-medium text-ink group-hover:text-gold transition-colors">
                    {post.title}
                  </h3>
                </div>
                <p className="text-sm text-ink/60 leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center text-xs text-ink/40 font-mono">
                  <span>{post.date}</span>
                  <Link href={`/blog/${post.slug}`}
                    className="group/link inline-flex items-center gap-1 font-medium text-gold hover:text-gold-dark transition-colors">
                    Leer más
                    <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">&rarr;</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <SectionReveal delay={0.3}>
            <div className="mt-12 text-center">
              <a
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-gold transition-colors"
              >
                Ver todas las entradas del blog
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 5l5 5-5 5" />
                </svg>
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>

      <Footer />
      <ChatWidget />
      <BackToTop />
    </main>
  );
}
