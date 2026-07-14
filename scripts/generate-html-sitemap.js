const fs = require('fs');
const matter = require('gray-matter');

const SITE = 'https://amarenl.com';

// Blog posts
const blogFiles = fs.readdirSync('content/blog').filter(f => f.endsWith('.mdx'));
const blogs = [];
for (const f of blogFiles) {
  try {
    const raw = fs.readFileSync('content/blog/' + f, 'utf8');
    const { data } = matter(raw);
    blogs.push({ slug: data.slug || f.replace('.mdx',''), title: data.title, date: data.date });
  } catch (e) {
    // Skip files with YAML parse errors
    const slug = f.replace('.mdx','');
    blogs.push({ slug, title: slug, date: '2026-01-01' });
  }
}
blogs.sort((a,b) => new Date(b.date) - new Date(a.date));

// Products
const products = JSON.parse(fs.readFileSync('data/products.json','utf8'));

// Static routes
const appDirs = fs.readdirSync('app', {withFileTypes: true});
const routes = appDirs
  .filter(d => d.isDirectory())
  .map(d => d.name)
  .filter(r => !r.startsWith('[') && !r.startsWith('_') && r !== 'api' && r !== 'blogs' && r !== 'go' && r !== 'producten' && r !== 'collections' && r !== 'on');

let html = '<!DOCTYPE html>\n<html lang="nl">\n<head>\n<meta charset="UTF-8">\n<title>Sitemap | AmareNL</title>\n';
html += '<meta name="robots" content="noindex">\n';
html += '<style>body{font-family:system-ui;max-width:800px;margin:2rem auto;padding:1rem;line-height:1.8;color:#2C2C2C}h1{color:#6B4C8C}h2{color:#6B4C8C;margin-top:2rem}a{color:#6B4C8C;text-decoration:none}a:hover{text-decoration:underline}</style>\n';
html += '</head>\n<body>\n';
html += '<h1>AmareNL Sitemap</h1>\n';
html += '<p>Alle paginas op amarenl.com — handig voor Google en bezoekers.</p>\n';

// Pages
html += '<h2>Paginas</h2>\n<ul>\n';
routes.forEach(r => html += `<li><a href="${SITE}/${r}">${SITE}/${r}</a></li>\n`);
html += '</ul>\n';

// Products
html += `<h2>Producten (${products.length})</h2>\n<ul>\n`;
products.forEach(p => html += `<li><a href="${SITE}/producten/${p.slug}">${p.nameNL}</a></li>\n`);
html += '</ul>\n';

// Blog
html += `<h2>Blog Artikelen (${blogs.length})</h2>\n<ul>\n`;
blogs.forEach(b => html += `<li><a href="${SITE}/blogs/nieuws/${b.slug}">${b.title || b.slug}</a> — ${b.date}</li>\n`);
html += '</ul>\n';

html += '</body>\n</html>';

fs.writeFileSync('public/sitemap.html', html);
console.log('✅ sitemap.html generated with ' + (routes.length + products.length + blogs.length) + ' links');
