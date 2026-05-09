import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog";
import { ArrowLeft, Calendar, Tag, Share2 } from "lucide-react";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import {
  generateArticleSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from "@/lib/schema";

interface Props {
  params: { slug: string };
}

function extractFAQItems(content: string) {
  const items: { question: string; answer: string }[] = [];
  const h3Regex = /<h3>(.+?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g;
  let match: RegExpExecArray | null;
  while ((match = h3Regex.exec(content)) !== null) {
    const question = match[1].replace(/<[^>]*>/g, "").trim();
    const answer = match[2].replace(/<[^>]*>/g, "").trim();
    if (question.endsWith("?") && answer.length > 20) {
      items.push({ question, answer });
    }
  }
  return items;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return { title: "Niet gevonden | AmareNL" };
  return {
    title: `${post.title} | AmareNL`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const faqItems = extractFAQItems(post.content);
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    datePublished: post.date,
    slug: post.slug,
    category: post.category,
    image: post.image,
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://amarenl.com" },
    { name: "Blog", url: "https://amarenl.com/blogs/nieuws" },
    { name: post.title, url: `https://amarenl.com/blogs/nieuws/${post.slug}` },
  ]);
  const combinedSchema = faqItems.length
    ? combineSchemas(articleSchema, generateFAQSchema(faqItems), breadcrumbSchema)
    : combineSchemas(articleSchema, breadcrumbSchema);

  return (
    <>
      <SchemaMarkup schema={combinedSchema} id="blog-post-schema" />
      <article className="bg-white min-h-screen font-nunito">
      <header className="bg-[var(--color-bg-soft)] py-20 border-b border-[var(--color-border)]">
        <div className="container-page max-w-4xl">
          <Link
            href="/blogs/nieuws"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mb-12"
          >
            <ArrowLeft size={14} />
            Terug naar blog
          </Link>

          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)]">
              <Tag size={12} />
              {post.category}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
              <Calendar size={12} />
              {post.date}
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-cormorant font-bold text-[var(--color-text)] leading-tight mb-8">
            {post.title}
          </h1>

          <p className="text-xl text-[var(--color-text-muted)] leading-relaxed italic border-l-4 border-[var(--color-primary)] pl-6">
            {post.excerpt}
          </p>
        </div>
      </header>

      <section className="py-20">
        <div className="container-page max-w-3xl">
          <div
            className="prose prose-lg prose-primary max-w-none
              prose-headings:font-cormorant prose-headings:font-bold prose-headings:text-[var(--color-text)]
              prose-p:text-[var(--color-text-muted)] prose-p:leading-relaxed
              prose-strong:text-[var(--color-text)]
              prose-li:text-[var(--color-text-muted)]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-20 pt-10 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Deel dit artikel:</span>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-[var(--color-bg-soft)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-all">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
            <Link href="/#products" className="btn-primary px-8 py-3 text-sm">
              Bekijk Amare Producten
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--color-bg-soft)] border-t border-[var(--color-border)]">
        <div className="container-page max-w-5xl">
          <h2 className="text-3xl font-bold text-[var(--color-text)] mb-12 text-center font-cormorant">Gerelateerde Artikelen</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {getAllBlogPosts()
              .filter((p) => p.slug !== post.slug)
              .slice(0, 2)
              .map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blogs/nieuws/${rp.slug}`}
                  className="bg-white p-8 rounded-3xl border border-[var(--color-border)] hover:shadow-xl transition-all flex flex-col"
                >
                  <span className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-widest mb-4">{rp.category}</span>
                  <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">{rp.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 mb-6 flex-1">{rp.excerpt}</p>
                  <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest">Lees Verder →</span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </article>
    </>
  );
}
