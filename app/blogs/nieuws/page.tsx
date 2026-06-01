import { getAllBlogPosts } from "@/lib/blog";
import BlogAccordion from "@/components/blog/BlogAccordion";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import {
  generateBreadcrumbSchema,
  combineSchemas,
} from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AmareNL Blog — Wellness, Supplementen & Gezondheid",
  description:
    "Ontdek wetenschappelijke inzichten, tips en gidsen over darmgezondheid, mentale wellness, collageen, supplementen en natuurlijke gezondheid.",
  alternates: { canonical: "/blogs/nieuws" },
  openGraph: {
    title: "AmareNL Blog — Wellness, Supplementen & Gezondheid",
    description: "Ontdek wetenschappelijke inzichten, tips en gidsen over supplementen en natuurlijke gezondheid.",
    url: "/blogs/nieuws",
    type: "website",
    siteName: "AmareNL",
    locale: "nl_NL",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AmareNL Blog — Wellness, Supplementen & Gezondheid",
    description: "Ontdek wetenschappelijke inzichten, tips en gidsen over supplementen en natuurlijke gezondheid.",
    images: ["/images/og-default.jpg"],
  },
}

export default function BlogListingPage() {
  const posts = getAllBlogPosts();

  const grouped = posts.reduce((acc, post) => {
    const cat = post.category || "Algemeen";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(post);
    return acc;
  }, {} as Record<string, typeof posts>);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "AmareNL Blog",
    description: "Wetenschappelijke inzichten over darmgezondheid, mentale wellness en supplementen.",
    url: "https://amarenl.com/blogs/nieuws",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `https://amarenl.com/blogs/nieuws/${p.slug}`,
      datePublished: p.date,
      description: p.excerpt,
    })),
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://amarenl.com" },
    { name: "Blog", url: "https://amarenl.com/blogs/nieuws" },
  ]);

  return (
    <div className="bg-white min-h-screen">
      <SchemaMarkup schema={combineSchemas(blogSchema, breadcrumbSchema)} id="blog-list-schema" />
      {/* Hero */}
      <section className="bg-[var(--color-bg-soft)] py-16 md:py-20 border-b border-[var(--color-border)]">
        <div className="container-page text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-4">
            AmareNL <span className="text-[var(--color-primary)]">Kennisbank</span>
          </h1>
          <p className="text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed">
            Alles over darmgezondheid, mentale wellness, collageen, supplementen en natuurlijke leefstijl — helder uitgelegd, wetenschappelijk onderbouwd.
          </p>
        </div>
      </section>

      {/* Accordion List */}
      <section className="py-12 md:py-16">
        <div className="container-page max-w-3xl">
          {Object.entries(grouped).map(([category, categoryPosts]) => (
            <div key={category} className="mb-12">
              <h2 className="text-xl font-cormorant font-bold text-[var(--color-primary)] mb-2 pb-2 border-b border-[var(--color-border)]">
                {category}
              </h2>
              <BlogAccordion posts={categoryPosts} />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
