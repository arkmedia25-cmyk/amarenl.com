import { getAllBlogPosts } from "@/lib/blog";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";

export default function BlogPreview() {
  const latestPosts = getAllBlogPosts().slice(0, 3);

  return (
    <section className="py-24 bg-[var(--color-bg-soft)]">
      <div className="container-page">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-6">
              Wellness Tips & Insights
            </h2>
            <p className="text-[var(--color-text-muted)] text-lg">
              Blijf op de hoogte van de laatste wetenschappelijke inzichten over de gut-brain as en mentaal welzijn.
            </p>
          </div>
          <Link 
            href="/blogs/nieuws"
            className="flex items-center gap-2 text-[var(--color-primary)] font-bold hover:underline underline-offset-4"
          >
            Bekijk alle artikelen
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <Link 
              href={`/blogs/nieuws/${post.slug}`} 
              key={post.slug}
              className="group bg-white rounded-2xl overflow-hidden border border-[var(--color-border)] hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 w-full bg-gray-100">
                {post.image ? (
                   <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--color-primary)]/5 flex items-center justify-center text-[var(--color-primary)]/20">
                    <Calendar size={48} />
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-widest mb-3">
                  {post.category}
                </div>
                <h3 className="text-xl font-bold font-cormorant text-[var(--color-text)] mb-3 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-xs text-[var(--color-text-muted)] font-medium">
                  <Calendar size={14} className="mr-2" />
                  {new Date(post.date).toLocaleDateString("nl-NL", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
