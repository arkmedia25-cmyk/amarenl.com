/**
 * Generate data/products.json from individual JSON files
 * Run: npx tsx scripts/generate-product-index.ts
 */

import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(__dirname, '..', 'data', 'products');
const OUTPUT_FILE = path.resolve(__dirname, '..', 'data', 'products.json');

const products: unknown[] = [];

const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.json'));

files.forEach((file) => {
  const raw = fs.readFileSync(path.join(DATA_DIR, file), 'utf-8');
  products.push(JSON.parse(raw));
});

// Sort by priority
products.sort((a: any, b: any) => (a.priority ?? 99) - (b.priority ?? 99));

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(products, null, 2));

console.log(`✅ Generated data/products.json with ${products.length} products`);
