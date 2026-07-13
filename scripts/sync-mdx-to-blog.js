/**
 * Sync missing MDX files to extra-articles.json
 * Converts MDX frontmatter + body to HTML entries
 * Run: node scripts/sync-mdx-to-blog.js
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog');
const EXTRA_ARTICLES_PATH = path.join(__dirname, '..', 'data', 'extra-articles.json');
const BLOG_TS_PATH = path.join(__dirname, '..', 'lib', 'blog.ts');

// Simple MDX-to-HTML converter for common patterns
function mdxToHtml(mdx) {
  let html = mdx;

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');

  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Paragraphs (double newlines)
  html = html.replace(/\n\n/g, '</p><p>');

  // Wrap in paragraph tags
  html = '<p>' + html + '</p>';

  // Clean up nested paragraphs
  html = html.replace(/<p><h([23])>/g, '<h$1>');
  html = html.replace(/<\/h([23])><\/p>/g, '</h$1>');
  html = html.replace(/<p><p>/g, '<p>');
  html = html.replace(/<\/p><\/p>/g, '</p>');

  // Lists
  html = html.replace(/<p>- /g, '<p>• ');

  // Tables (basic)
  html = html.replace(/<p>\|(.+)\|<\/p>/g, (match) => {
    const cells = match.replace(/<p>\|/g, '').replace(/\|<\/p>/g, '').split('|');
    return '<tr>' + cells.map(c => {
      const trimmed = c.trim();
      return trimmed.startsWith('---') ? '' : `<td>${trimmed}</td>`;
    }).join('') + '</tr>';
  });

  return html;
}

function main() {
  // Get all MDX files
  const mdxFiles = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));

  // Get existing slugs from blog.ts
  const blogContent = fs.readFileSync(BLOG_TS_PATH, 'utf8');
  const blogSlugMatches = [...blogContent.matchAll(/slug:\s*"([^"]+)"/g)];
  const blogSlugs = new Set(blogSlugMatches.map(m => m[1]));

  // Get existing slugs from extra-articles.json
  const extraArticles = JSON.parse(fs.readFileSync(EXTRA_ARTICLES_PATH, 'utf8'));
  const extraSlugs = new Set(extraArticles.map(a => a.slug));

  const allExisting = new Set([...blogSlugs, ...extraSlugs]);

  // Find missing
  const missing = [];
  for (const file of mdxFiles) {
    const slug = file.replace('.mdx', '');
    if (!allExisting.has(slug)) {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
      const { data, content } = matter(raw);

      missing.push({
        slug,
        title: data.title || slug,
        date: data.date || '2026-01-01',
        category: data.category || 'essentials',
        excerpt: data.excerpt || data.metaDescription || '',
        content: mdxToHtml(content.trim()),
      });
    }
  }

  console.log(`MDX bestanden totaal: ${mdxFiles.length}`);
  console.log(`Bestaande slugs (blog.ts + extra): ${allExisting.size}`);
  console.log(`Missing MDX die toegevoegd worden: ${missing.length}`);
  console.log('');

  if (missing.length > 0) {
    // Add to extra-articles.json
    const updated = [...extraArticles, ...missing];
    fs.writeFileSync(EXTRA_ARTICLES_PATH, JSON.stringify(updated, null, 2), 'utf8');
    console.log(`✅ ${missing.length} artikelen toegevoegd aan extra-articles.json`);
    console.log(`   Totaal extra artikelen: ${updated.length}`);
    console.log('');
    missing.forEach(m => console.log(`   + ${m.slug}`));
  }
}

main();
