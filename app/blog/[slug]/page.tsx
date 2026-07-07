"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import ReactMarkdown from 'react-markdown'; // Need to install react-markdown

import SectionHeading from "@/components/ui/SectionHeading";
import SectionReveal from "@/components/ui/SectionReveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/ui/BackToTop";
import SectionCTA from "@/components/SectionCTA";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        // Simulate fetching markdown content based on slug
        // In a real app, this would fetch from /content/blog/{slug}.md
        const response = await fetch(`/api/blog/${slug}`);
        if (!response.ok) throw new Error('Post not found');
        const data: BlogPost = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setPost(null); // Ensure post is null on error
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (!slug) {
    return <div>No blog post slug found.</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">Loading...</div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">Blog post not found.</div>
    );
  }

  return (
    <>
      <Header />
      <article className="py-20 md:py-28 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-6">
          <SectionReveal>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4 text-sm text-ink/50 font-mono">
                <span>{post.date}</span>
                <span>&middot;</span>
                <span>{post.author}</span>
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-medium text-ink leading-tight mb-5">
                {post.title}
              </h1>
              <p className="text-[15px] text-ink/55 max-w-2xl leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="relative h-[300px] md:h-[450px] w-full mb-8 rounded-2xl overflow-hidden shadow-premium">
              <Image
                src={`/images/blog/${post.slug}.jpg`}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                onError={(e) => {
                  // Fallback image logic if needed
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src = '/images/blog/default-post.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="prose max-w-none text-ink/70 leading-relaxed text-[15px]">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </SectionReveal>
        </div>
      </article>
      <SectionCTA text="Reservá tu consulta" />
      <Footer />
      <BackToTop />
    </>
  );
}
