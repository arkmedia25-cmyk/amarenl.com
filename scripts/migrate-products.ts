/**
 * Migration script: Converts lib/products.ts array → data/products/[slug].json
 * Usage: npx tsx scripts/migrate-products.ts
 */

import { products, categories, type Product as OldProduct } from '../lib/products.js';
import type { Product as NewProduct, ProductPricing, ProductImage, ProductUsage, ProductAffiliate, ProductSEO, ProductRating, ProductFAQ } from '../types/Product.js';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(__dirname, '..', 'data', 'products');
const AFFILIATE_BASE = 'https://www.amare.com/2075008/nl-nl/';

function slugify(id: string): string {
  // Convert product ID to URL-friendly slug
  return id.replace(/^amare-/, '').replace(/\s+/g, '-').toLowerCase();
}

function mapPricing(old: OldProduct): ProductPricing {
  const savings = old.priceRetail - old.priceSubscription;
  return {
    subscription: old.priceSubscription,
    oneTime: old.priceRetail,
    currency: 'EUR' as const,
    savings: Math.round(savings * 100) / 100,
    savingsPercent: Math.round((savings / old.priceRetail) * 1000) / 10,
  };
}

function mapImages(old: OldProduct): ProductImage {
  return {
    primary: old.image || `/products/${slugify(old.id)}.webp`,
    alt: `${old.nameNL} — Amare supplement`,
  };
}

function mapUsage(old: OldProduct): ProductUsage {
  return {
    dosage: old.usageNL || 'Raadpleeg de verpakking voor de aanbevolen dosering.',
    timing: 'Raadpleeg de verpakking',
    duration: 'Eerste effecten na 3-4 weken consistent gebruik',
  };
}

function mapAffiliate(old: OldProduct): ProductAffiliate {
  return {
    url: `${AFFILIATE_BASE}${old.affiliateUrl || slugify(old.id)}`,
    sourceTag: 'amarenl-product-page',
  };
}

function mapSEO(old: OldProduct): ProductSEO {
  return {
    title: `${old.nameNL} Kopen | Beste Prijs Nederland 2026`,
    description: old.taglineNL || old.descriptionNL?.substring(0, 155) || '',
    keywords: old.seoKeywordsNL || [],
  };
}

function mapFaqs(old: OldProduct): ProductFAQ[] | undefined {
  return old.faqNL as ProductFAQ[] | undefined;
}

function mapRatings(old: OldProduct): ProductRating | undefined {
  if (old.isBestseller) {
    return { value: 4.5, count: 500 };
  }
  return undefined;
}

function mapProduct(old: OldProduct): NewProduct {
  const slug = slugify(old.id);
  return {
    slug,
    name: old.name,
    nameNL: old.nameNL,
    shortNameNL: old.nameNL?.split(' - ')[0] || old.nameNL,
    category: old.category,
    taglineNL: old.taglineNL,

    description: {
      short: old.taglineNL,
      long: old.descriptionNL || old.taglineNL,
    },

    pricing: mapPricing(old),
    images: mapImages(old),

    ingredients: old.ingredientsNL?.map((i) => ({
      name: i.name,
      amount: i.amount,
      form: i.form,
    })),

    benefits: old.benefitsNL || [],
    usage: mapUsage(old),
    mechanismNL: old.mechanismNL,
    targetAudienceNL: old.targetAudienceNL,

    faqs: mapFaqs(old),
    affiliate: mapAffiliate(old),
    ratings: mapRatings(old),
    relatedProducts: old.synergies || [],
    tags: old.seoKeywordsNL || [],
    seo: mapSEO(old),

    synergies: old.synergies,
    seoKeywordsNL: old.seoKeywordsNL,

    isNew: old.isNew,
    isBestseller: old.isBestseller,
    isPack: old.isPack,
    priority: old.priority,
    publishedAt: '2024-01-15',
    updatedAt: new Date().toISOString().split('T')[0],
  };
}

function main() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  let count = 0;
  const errors: string[] = [];

  products.forEach((oldProduct) => {
    try {
      const newProduct = mapProduct(oldProduct);
      const filePath = path.join(DATA_DIR, `${newProduct.slug}.json`);
      fs.writeFileSync(filePath, JSON.stringify(newProduct, null, 2));
      count++;
      console.log(`  ✅ ${newProduct.slug}.json`);
    } catch (err) {
      errors.push(`❌ ${oldProduct.id}: ${err}`);
    }
  });

  console.log(`\n📊 Migrated ${count}/${products.length} products`);
  if (errors.length > 0) {
    console.log(`\nErrors:`);
    errors.forEach((e) => console.log(`  ${e}`));
  }
}

main();
