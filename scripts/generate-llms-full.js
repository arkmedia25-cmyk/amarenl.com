/**
 * Generate llms-full.txt — volledige site content voor AI crawlers
 * Run: node scripts/generate-llms-full.js
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://amarenl.com';
const SITE_NAME = 'AmareNL';
const OUTPUT = path.join(__dirname, '..', 'public', 'llms-full.txt');

function main() {
  let output = [];

  output.push(`# ${SITE_NAME} — Volledige Site Content voor AI Modellen`);
  output.push(`# URL: ${SITE_URL}`);
  output.push(`# Gegenereerd: ${new Date().toISOString().split('T')[0]}`);
  output.push('');
  output.push('---');
  output.push('');

  // 1. Over de site
  output.push('## OVER DEZE SITE');
  output.push('');
  output.push(`${SITE_NAME} is een onafhankelijke Amare Global affiliate partner (ID: 2075008) in Nederland.`);
  output.push('Wij bieden wetenschappelijk onderbouwde supplementen voor darmgezondheid, mentale wellness,');
  output.push('energie, focus, schoonheid en gewichtsbeheer via de gut-brain axis.');
  output.push('');
  output.push(`Affiliate basis-URL: https://www.amare.com/2075008/nl-nl/`);
  output.push('Garanties: 30 dagen geld-terug, €8 welkomstkorting, gratis verzending vanaf €175, 10% abonnementskorting.');
  output.push('');

  // 2. Categorieen
  output.push('## CATEGORIEEN');
  output.push('');
  const categories = [
    { name: 'Supplementen (Mentale Fitness & Focus)', url: '/supplementen' },
    { name: 'Darmen & Digestie', url: '/darmgezondheid' },
    { name: 'Schoonheid & Verzorging', url: '/schoonheid' },
    { name: 'Dagelijkse Essentials', url: '/essentials' },
    { name: 'Pakketten & Bundels', url: '/pakketten' },
    { name: 'Gewichtsbeheer', url: '/gewichtsbeheer' },
    { name: 'Gut-Brain Axis (Pillar Page)', url: '/gut-brain-axis' },
    { name: 'Supplementenwijzer (Gratis Test)', url: '/supplementenwijzer' },
  ];
  categories.forEach(c => output.push(`- ${c.name}: ${SITE_URL}${c.url}`));
  output.push('');

  // 3. Blog artikelen
  const blogDir = path.join(__dirname, '..', 'content', 'blog');
  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));
    output.push('## BLOG ARTIKELEN');
    output.push(`Totaal: ${files.length} artikelen`);
    output.push('');

    for (const file of files) {
      const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
      const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (fmMatch) {
        const fm = fmMatch[1];
        const title = fm.match(/title:\s*"?(.+?)"?\n/)?.[1] || file;
        const date = fm.match(/date:\s*"?(.+?)"?\n/)?.[1] || '';
        const category = fm.match(/category:\s*"?(.+?)"?\n/)?.[1] || '';
        const excerpt = fm.match(/excerpt:\s*"?(.+?)"?\n/)?.[1] || '';
        const slug = fm.match(/slug:\s*"?(.+?)"?\n/)?.[1] || file.replace('.mdx', '');
        const tags = fm.match(/tags:\s*\[(.+?)\]/)?.[1] || '';

        output.push(`### ${title}`);
        output.push(`- Datum: ${date}`);
        output.push(`- Categorie: ${category}`);
        output.push(`- Tags: ${tags}`);
        output.push(`- Samenvatting: ${excerpt}`);
        output.push(`- URL: ${SITE_URL}/blogs/nieuws/${slug}`);
        output.push('');

        const body = content.replace(/^---\n[\s\S]*?\n---/, '').trim();
        output.push(body.slice(0, 2000));
        if (body.length > 2000) output.push('[...]');
        output.push('');
        output.push('---');
        output.push('');
      }
    }
  }

  // 4. Diepe productpagina's
  output.push('## DIEPE PRODUCTPAGINAS');
  output.push('');
  const deepPages = [
    'happy-juice-pack', 'mentabiotics', 'energy', 'hl5', 'origin',
    'restore', 'sunrise', 'fit20', 'sunset', 'edge-plus',
    'ignite-for-her', 'nitro-xtreme'
  ];
  deepPages.forEach(p => output.push(`- ${SITE_URL}/${p}`));
  output.push('');

  fs.writeFileSync(OUTPUT, output.join('\n'), 'utf8');
  const sizeKB = (fs.statSync(OUTPUT).size / 1024).toFixed(1);
  console.log(`✅ llms-full.txt gegenereerd: ${OUTPUT}`);
  console.log(`   Bestandsgrootte: ${sizeKB} KB`);
  if (fs.existsSync(blogDir)) {
    console.log(`   Blog artikelen: ${fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx')).length}`);
  }
}

main();
