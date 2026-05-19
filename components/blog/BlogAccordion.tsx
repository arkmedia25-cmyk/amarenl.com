"use client";

import { useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import DOMPurify from "dompurify";
import { linkifyProductMentions } from "@/lib/blog";

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
            {/* Title row — clickable */}
            <button
              onClick={() => toggle(post.slug)}
              className="w-full flex items-center justify-between gap-4 py-4 text-left hover:bg-[var(--color-bg-soft)]/50 transition-colors px-2 rounded-lg"
              aria-expanded={isOpen}
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-base font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors pr-4">
                  {post.title}
                </h3>
                <span className="text-[10px] text-[var(--color-text-muted)] flex items-center gap-1 mt-0.5">
                  <Calendar size={10} />
                  {post.date}
                </span>
              </div>
              <ChevronDown
                size={18}
                className={`shrink-0 text-[var(--color-primary)] transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

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
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
