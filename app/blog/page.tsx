import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogList from "@/components/BlogList";

function getPosts() {
  const dir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      const { data } = matter(raw);
      return {
        slug: f.replace(/\.md$/, ""),
        title: data.title ?? f,
        date: data.date ?? "",
        author: data.author ?? "",
        excerpt: data.excerpt ?? "",
      };
    });
}

export default function BlogPage() {
  const posts = getPosts();
  return <BlogList posts={posts} />;
}
