/**
 * Product types — EFSA-compliant supplement product schema
 * Used by: data/products/*.json, lib/products.ts, product pages
 */

export interface ProductPricing {
  subscription: number;
  oneTime: number;
  currency: 'EUR';
  savings: number;
  savingsPercent: number;
}

export interface ProductImage {
  primary: string;
  gallery?: string[];
  alt: string;
}

export interface ProductIngredient {
  name: string;
  amount: string;
  form?: string;
  purpose?: string;
}

export interface ProductUsage {
  dosage: string;
  timing: string;
  duration: string;
}

export interface ProductFAQ {
  q: string;
  a: string;
}

export interface ProductAffiliate {
  url: string;
  sourceTag: string;
}

export interface ProductRating {
  value: number;
  count: number;
}

export interface ProductSEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface Product {
  slug: string;
  name: string;
  nameNL: string;
  shortNameNL?: string;
  category: string;
  subCategory?: string;
  taglineNL: string;

  description: {
    short: string;
    long: string;
  };

  pricing: ProductPricing;
  images: ProductImage;

  ingredients?: ProductIngredient[];
  benefits: string[];
  contraindications?: string[];

  usage: ProductUsage;
  mechanismNL?: string;
  targetAudienceNL?: string;

  faqs?: ProductFAQ[];
  affiliate: ProductAffiliate;
  ratings?: ProductRating;
  relatedProducts?: string[];
  tags: string[];
  seo: ProductSEO;

  synergies?: string[];
  seoKeywordsNL?: string[];

  isNew: boolean;
  isBestseller: boolean;
  isPack: boolean;
  priority: number;
  publishedAt: string;
  updatedAt: string;
}
