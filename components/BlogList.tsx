"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionReveal from "@/components/ui/SectionReveal";

const BLOG_FALLBACK_IMG =
  "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1200&h=675&fit=crop&q=80";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="py-20 md:py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <SectionReveal>
          <SectionHeading
            eyebrow="Blog"
            title="Novedades y Consejos"
            subtitle="Mantente al día con las últimas tendencias y consejos para tu salud bucal."
          />
        </SectionReveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 gap-8"
        >
          {posts.length > 0 ? (
            posts.map((post) => (
              <motion.div
                key={post.slug}
                variants={item}
                className="group glass rounded-2xl shadow-premium p-6 hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 w-full mb-5 rounded-xl overflow-hidden">
                  <Image
                    src={BLOG_FALLBACK_IMG}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-gold">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
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
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group/link inline-flex items-center gap-1 font-medium text-gold hover:text-gold-dark transition-colors"
                  >
                    Leer más
                    <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="sm:col-span-2 text-center py-10">
              <p className="text-ink/50">Aún no hay posts en el blog. ¡Vuelve pronto!</p>
            </div>
          )}
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
  );
}
