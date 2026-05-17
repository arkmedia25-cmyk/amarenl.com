/**
 * AmareNL Product Data Access Layer
 *
 * Source of truth: data/products.json (43 products generated from data/products/*.json)
 * Regenerate: npx tsx scripts/generate-product-index.ts
 *
 * Functions:
 *   getAllProducts()       → Product[]
 *   getProduct(slug)       → Product | undefined
 *   getProductsByCategory  → Product[]
 *   getBestsellers()       → Product[]
 *   getRelatedProducts     → Product[]
 *   getAffiliateUrl(id)    → string
 */

import rawProducts from '../data/products.json';

export const AFFILIATE_ID = '2075008';
export const AFFILIATE_BASE_URL = `https://www.amare.com/${AFFILIATE_ID}/nl-nl/`;

// ── Types ──────────────────────────────────────────────────────────────────

export interface Category {
  slug: string;
  nameNL: string;
  descriptionNL: string;
  icon: string;
}

export interface ProductIngredient {
  name: string;
  amount: string;
  form?: string;
}

export interface ProductFAQ {
  q: string;
  a: string;
}

export interface Product {
  // Identity
  slug: string;
  id: string; // alias for slug (backward compat)
  name: string;
  nameNL: string;

  // Classification
  category: string;
  taglineNL: string;
  isNew: boolean;
  isBestseller: boolean;
  isPack: boolean;
  priority: number;

  // Description
  descriptionNL: string;

  // Pricing (flat + nested)
  priceRetail: number;
  priceSubscription: number;
  pricing: {
    subscription: number;
    oneTime: number;
    currency: 'EUR';
    savings: number;
    savingsPercent: number;
  };

  // Images (flat + nested)
  image: string;
  images: {
    primary: string;
    gallery?: string[];
    alt: string;
  };

  // Content
  benefitsNL: string[];
  benefits: string[];
  usageNL: string;
  usage: {
    dosage: string;
    timing: string;
    duration: string;
  };

  ingredientsNL?: ProductIngredient[];
  ingredients?: ProductIngredient[];
  mechanismNL?: string;
  targetAudienceNL?: string;

  // Affiliate
  affiliateUrl: string;
  affiliate: {
    url: string;
    sourceTag: string;
  };

  // SEO
  seoKeywordsNL?: string[];
  tags: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };

  // Relations
  synergies?: string[];
  relatedProducts?: string[];
  faqNL?: ProductFAQ[];
  faqs?: ProductFAQ[];

  // Meta
  publishedAt: string;
  updatedAt: string;
}

// ── Categories ─────────────────────────────────────────────────────────────

export const categories: Category[] = [
  {
    slug: 'hersenen',
    nameNL: 'Mentale Fitness',
    descriptionNL:
      'Gut-brain ondersteuning voor focus, stemming en mentale veerkracht.',
    icon: 'Brain',
  },
  {
    slug: 'darmen',
    nameNL: 'Darmen & Digestie',
    descriptionNL:
      'Probiotica, enzymen en superfoods voor een gezonde darmflora.',
    icon: 'Heart',
  },
  {
    slug: 'schoonheid',
    nameNL: 'Schoonheid & Verzorging',
    descriptionNL:
      'Huidverzorging, haarverzorging en collageen van binnenuit.',
    icon: 'Sparkles',
  },
  {
    slug: 'essentials',
    nameNL: 'Dagelijkse Essentials',
    descriptionNL:
      'Vitamines, eiwitten, omega-3 en dagelijkse basisondersteuning.',
    icon: 'Shield',
  },
  {
    slug: 'pakketten',
    nameNL: 'Pakketten & Bundels',
    descriptionNL:
      'Bespaar met onze zorgvuldig samengestelde productbundels.',
    icon: 'Package',
  },
];

// ── Data normalization ──────────────────────────────────────────────────────

interface RawProduct {
  slug: string;
  name: string;
  nameNL: string;
  category: string;
  taglineNL: string;
  isNew?: boolean;
  isBestseller?: boolean;
  isPack?: boolean;
  priority?: number;
  description?: { short: string; long: string };
  pricing?: { subscription: number; oneTime: number; currency: string; savings: number; savingsPercent: number };
  images?: { primary: string; gallery?: string[]; alt: string };
  benefits?: string[];
  usage?: { dosage: string; timing: string; duration: string };
  ingredients?: ProductIngredient[];
  mechanismNL?: string;
  targetAudienceNL?: string;
  affiliate?: { url: string; sourceTag: string };
  seoKeywordsNL?: string[];
  tags?: string[];
  seo?: { title: string; description: string; keywords: string[] };
  synergies?: string[];
  relatedProducts?: string[];
  faqs?: ProductFAQ[];
  publishedAt?: string;
  updatedAt?: string;
}

function normalizeProduct(p: RawProduct): Product {
  return {
    slug: p.slug,
    id: p.slug,
    name: p.name,
    nameNL: p.nameNL,

    category: p.category,
    taglineNL: p.taglineNL,
    isNew: p.isNew ?? false,
    isBestseller: p.isBestseller ?? false,
    isPack: p.isPack ?? false,
    priority: p.priority ?? 99,

    descriptionNL: p.description?.long || p.description?.short || '',

    priceRetail: p.pricing?.oneTime ?? 0,
    priceSubscription: p.pricing?.subscription ?? 0,
    pricing: {
      subscription: p.pricing?.subscription ?? 0,
      oneTime: p.pricing?.oneTime ?? 0,
      currency: 'EUR' as const,
      savings: p.pricing?.savings ?? 0,
      savingsPercent: p.pricing?.savingsPercent ?? 0,
    },

    image: p.images?.primary || '',
    images: p.images ?? { primary: '', alt: '' },

    benefitsNL: p.benefits ?? [],
    benefits: p.benefits ?? [],
    usageNL: p.usage?.dosage ?? '',
    usage: p.usage ?? { dosage: '', timing: '', duration: '' },

    ingredientsNL: p.ingredients ?? [],
    ingredients: p.ingredients ?? [],
    mechanismNL: p.mechanismNL,
    targetAudienceNL: p.targetAudienceNL,

    affiliateUrl: p.affiliate?.url ?? '',
    affiliate: p.affiliate ?? { url: '', sourceTag: '' },

    seoKeywordsNL: p.seoKeywordsNL ?? p.tags ?? [],
    tags: p.tags ?? [],
    seo: p.seo ?? { title: '', description: '', keywords: [] },

    synergies: p.synergies ?? [],
    relatedProducts: p.relatedProducts ?? [],
    faqNL: p.faqs ?? [],
    faqs: p.faqs ?? [],

    publishedAt: p.publishedAt ?? '',
    updatedAt: p.updatedAt ?? '',
  };
}

// ── Product array ───────────────────────────────────────────────────────────

export const products: Product[] = (rawProducts as RawProduct[])
  .map(normalizeProduct)
  .sort((a, b) => a.priority - b.priority);

// ── Public API ──────────────────────────────────────────────────────────────

export function getAllProducts(): Product[] {
  return products;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** @deprecated use getProduct(slug) instead */
export function getProductById(id: string): Product | undefined {
  return getProduct(id);
}

export function getProductsByCategory(cat: string): Product[] {
  return products
    .filter((p) => p.category === cat)
    .sort((a, b) => a.priority - b.priority);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.isBestseller);
}

export function getRelatedProducts(slug: string): Product[] {
  const product = getProduct(slug);
  if (!product?.relatedProducts?.length) return [];
  return product.relatedProducts
    .map((s) => getProduct(s))
    .filter((p): p is Product => !!p);
}

export function getAffiliateUrl(productId: string): string {
  const p = getProduct(productId);
  if (!p) return AFFILIATE_BASE_URL;
  return p.affiliateUrl || `${AFFILIATE_BASE_URL}${productId}`;
}
