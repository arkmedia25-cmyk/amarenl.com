"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import DOMPurify from "dompurify";
import { linkifyProductMentions } from "@/lib/blog";

/**
 * Bilgi bankası (knowledge base) listesi.
 *
 * NEDEN 14.11.2026'da değişti: her başlık bir <button> içindeydi ve makale linki yalnızca
 * akordeon AÇILINCA DOM'a giriyordu. Sonuç: /blogs/nieuws HTML'inde TEK bir makale linki yoktu
 * ve 230+ makale Google için orphan kaldı (ölçüm: 26 yeni makalenin 25'i "unknown to Google" /
 * "discovered – not indexed"). Başlık artık her zaman gerçek bir <a> (Link); akordeon yalnızca
 * özet/gövdeyi açıp kapatıyor. Böylece sayfa gerçek bir iç link hub'ı.
 */
export default function BlogAccordion({ posts }: { posts: BlogPost[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const toggle = (slug: string) => {
    setOpenSlug(openSlug === slug ? null : slug);
  };

  return (
    <div className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
      {posts.map((post) => {
        const isOpen = openSlug === post.slug;

        return (
          <div key={post.slug} className="group">
            {/* Title row — başlık HER ZAMAN bir link (crawl yolu), ok akordeonu açar */}
            <div className="flex items-center gap-3 py-4 px-2 rounded-lg hover:bg-[var(--color-bg-soft)]/50 transition-colors">
              <Link href={`/blogs/nieuws/${post.slug}`} className="flex-1 min-w-0">
                <h3 className="text-sm md:text-base font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors pr-4">
                  {post.title}
                </h3>
                {post.date && (
                  <time
                    dateTime={post.date}
                    className="block mt-1 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]"
                  >
                    {new Date(post.date).toLocaleDateString("nl-NL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                )}
              </Link>
              <button
                onClick={() => toggle(post.slug)}
                aria-expanded={isOpen}
                aria-label={`Samenvatting ${isOpen ? "sluiten" : "openen"}: ${post.title}`}
                className="shrink-0 p-2 rounded-full hover:bg-[var(--color-bg-soft)] transition-colors"
              >
                <ChevronDown
                  size={18}
                  className={`text-[var(--color-primary)] transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Expandable full article content */}
            {isOpen && (
              <div className="pb-6 px-2">
                <div
                  className="prose prose-sm max-w-none
                    prose-headings:font-cormorant prose-headings:font-bold prose-headings:text-[var(--color-text)]
                    prose-p:text-[var(--color-text-muted)] prose-p:leading-relaxed prose-p:text-sm
                    prose-strong:text-[var(--color-text)]
                    prose-li:text-[var(--color-text-muted)] prose-li:text-sm
                    prose-ul:my-3 prose-li:my-1
                    prose-h2:text-lg prose-h3:text-base prose-h4:text-sm"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(linkifyProductMentions(post.content, post.slug)) }}
                />
                <div className="mt-4 pt-3 border-t border-[var(--color-border)]">
                  <Link
                    href={`/blogs/nieuws/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    Lees volledig artikel <ExternalLink size={12} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
