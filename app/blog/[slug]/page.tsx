import fs from "fs";
import path from "path";
import Image from "next/image";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

const BLOG_FALLBACK_IMG =
  "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1200&h=675&fit=crop&q=80";


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

function getPost(slug: string): BlogPost | null {
  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    author: data.author ?? "",
    excerpt: data.excerpt ?? "",
    content,
  };
}

export function generateStaticParams() {
  const dir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ slug: f.replace(/\.md$/, "") }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);

  if (!post) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          Blog post not found.
        </div>
        <Footer />
        <BackToTop />
      </>
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
                src={BLOG_FALLBACK_IMG}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="prose prose-stone max-w-none text-ink/70 leading-relaxed text-[15px] prose-headings:font-display prose-headings:text-ink prose-a:text-gold">
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
