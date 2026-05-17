#!/usr/bin/env node

/**
 * Product schema validation script
 * Validates data/products.json against required fields.
 *
 * Usage: node scripts/validate-products.js
 */

const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = path.resolve(__dirname, '..', 'data', 'products.json');

const REQUIRED_FIELDS = [
  'slug',
  'name',
  'nameNL',
  'category',
  'taglineNL',
  'description',
  'benefits',
  'pricing',
  'images',
  'affiliate',
  'usage',
];

const REQUIRED_PRICING_FIELDS = ['subscription', 'oneTime', 'currency'];
const REQUIRED_USAGE_FIELDS = ['dosage'];
const REQUIRED_IMAGES_FIELDS = ['primary', 'alt'];
const REQUIRED_AFFILIATE_FIELDS = ['url'];
const VALID_CATEGORIES = ['hersenen', 'darmen', 'schoonheid', 'essentials', 'pakketten'];

function validate() {
  if (!fs.existsSync(PRODUCTS_FILE)) {
    console.error(`❌ products.json not found at ${PRODUCTS_FILE}`);
    process.exit(1);
  }

  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));

  console.log(`🔍 Validating ${products.length} products...\n`);

  let errors = 0;
  let warnings = 0;

  products.forEach((p, i) => {
    const label = `[${i + 1}] ${p.slug || 'MISSING SLUG'}`;

    // Check required fields exist
    REQUIRED_FIELDS.forEach((field) => {
      if (!p[field]) {
        console.error(`❌ ${label}: Missing required field "${field}"`);
        errors++;
      }
    });

    // Check slug format
    if (p.slug && !/^[a-z0-9-]+$/.test(p.slug)) {
      console.error(`❌ ${label}: Invalid slug "${p.slug}" (lowercase, digits, hyphens only)`);
      errors++;
    }

    // Check category
    if (p.category && !VALID_CATEGORIES.includes(p.category)) {
      console.warn(`⚠️  ${label}: Unknown category "${p.category}"`);
      warnings++;
    }

    // Check description
    if (p.description) {
      if (!p.description.short) {
        console.warn(`⚠️  ${label}: Missing description.short`);
        warnings++;
      }
      if (!p.description.long || p.description.long.length < 50) {
        console.warn(`⚠️  ${label}: description.long too short (< 50 chars)`);
        warnings++;
      }
    }

    // Check pricing
    if (p.pricing) {
      REQUIRED_PRICING_FIELDS.forEach((field) => {
        if (p.pricing[field] === undefined) {
          console.error(`❌ ${label}: Missing pricing.${field}`);
          errors++;
        }
      });
      if (p.pricing.subscription >= p.pricing.oneTime) {
        console.warn(`⚠️  ${label}: Subscription price (${p.pricing.subscription}) >= one-time price (${p.pricing.oneTime})`);
        warnings++;
      }
    }

    // Check images
    if (p.images) {
      REQUIRED_IMAGES_FIELDS.forEach((field) => {
        if (!p.images[field]) {
          console.warn(`⚠️  ${label}: Missing images.${field}`);
          warnings++;
        }
      });
    }

    // Check affiliate
    if (p.affiliate) {
      REQUIRED_AFFILIATE_FIELDS.forEach((field) => {
        if (!p.affiliate[field]) {
          console.error(`❌ ${label}: Missing affiliate.${field}`);
          errors++;
        }
      });
      if (p.affiliate.url && !p.affiliate.url.includes('amare.com')) {
        console.warn(`⚠️  ${label}: affiliate.url doesn't contain amare.com`);
        warnings++;
      }
    }

    // Check usage
    if (p.usage) {
      REQUIRED_USAGE_FIELDS.forEach((field) => {
        if (!p.usage[field]) {
          console.warn(`⚠️  ${label}: Missing usage.${field}`);
          warnings++;
        }
      });
    }

    // Check benefits
    if (p.benefits && p.benefits.length === 0) {
      console.warn(`⚠️  ${label}: Empty benefits array`);
      warnings++;
    }

    // Check EFSA compliance in descriptions
    const forbidden = ['geneest', 'behandelt', 'klinisch bewezen', 'voorkomt ziekte'];
    const longDesc = p.description?.long || '';
    forbidden.forEach((word) => {
      if (longDesc.toLowerCase().includes(word.toLowerCase())) {
        console.error(`❌ ${label}: EFSA violation — contains "${word}"`);
        errors++;
      }
    });
  });

  console.log(`\n${'='.repeat(60)}`);
  console.log(`📊 VALIDATION RESULT`);
  console.log(`${'='.repeat(60)}`);
  console.log(`  Products: ${products.length}`);
  console.log(`  Errors:   ${errors}`);
  console.log(`  Warnings: ${warnings}`);

  if (errors === 0) {
    console.log(`\n✅ All products pass validation`);
    process.exit(0);
  } else {
    console.log(`\n❌ ${errors} validation error(s) found`);
    process.exit(1);
  }
}

validate();
