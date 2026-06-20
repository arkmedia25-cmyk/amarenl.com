/**
 * JSON-LD Schema generators voor amarenl.com
 * Alle types volgens schema.org — content in het Nederlands
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://amarenl.com";
const SITE_NAME = "AmareNL";
const ORG_NAME = "AmareNL";

export interface OrganizationInput {
  description?: string;
  sameAs?: string[];
}

export function generateOrganizationSchema(input?: OrganizationInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/amarenl-logo.png`,
    description:
      input?.description ||
      "Onafhankelijke Amare affiliate partner — ontdek natuurlijke wellness supplementen voor mentale en fysieke vitaliteit.",
    sameAs: input?.sameAs || [],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "nl-NL",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?s={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export interface ArticleInput {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
  slug: string;
  category?: string;
}

export function generateArticleSchema(input: ArticleInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    author: {
      "@type": "Person",
      name: input.author || "AmareNL Redactie",
    },
    image: input.image
      ? `${SITE_URL}${input.image}`
      : `${SITE_URL}/images/amarenl-og-default.jpg`,
    url: `${SITE_URL}/blogs/nieuws/${input.slug}`,
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/amarenl-logo.png`,
      },
    },
    inLanguage: "nl-NL",
    ...(input.category && { articleSection: input.category }),
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(questions: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

export interface ProductSchemaInput {
  name: string;
  nameNL?: string;
  description: string;
  image?: string;
  slug: string;
  category?: string;
  /** Subscription price */
  priceSubscription: number;
  /** One-time purchase price */
  priceRetail: number;
  priceCurrency?: string;
  availability?: string;
  /** AggregateRating (0-5) */
  ratingValue?: number;
  ratingCount?: number;
  /** Affiliate URL */
  affiliateUrl: string;
}

export function generateProductSchema(input: ProductSchemaInput) {
  const currency = input.priceCurrency || 'EUR';
  const availability = input.availability || 'https://schema.org/InStock';
  const productUrl = `${SITE_URL}/${input.slug}`;
  const priceValidUntil = new Date(
    new Date().getFullYear() + 1,
    11,
    31
  ).toISOString().split('T')[0];

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.nameNL || input.name,
    description: input.description,
    sku: input.slug,
    url: productUrl,
    ...(input.image && {
      image: input.image.startsWith('http') ? input.image : `${SITE_URL}${input.image}`,
    }),
    brand: {
      '@type': 'Brand',
      name: 'Amare',
    },
    category: 'Voedingssupplementen',
    offers: [
      {
        '@type': 'Offer',
        url: input.affiliateUrl,
        priceCurrency: currency,
        price: input.priceSubscription,
        availability,
        priceValidUntil,
        itemCondition: 'https://schema.org/NewCondition',
        name: 'Abonnement (-10%)',
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: 0,
            currency: 'EUR',
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'NL',
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
            transitTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 5, unitCode: 'DAY' },
          },
        },
        seller: {
          '@type': 'Organization',
          name: 'Amare Global',
        },
      },
      {
        '@type': 'Offer',
        url: input.affiliateUrl,
        priceCurrency: currency,
        price: input.priceRetail,
        availability,
        priceValidUntil,
        itemCondition: 'https://schema.org/NewCondition',
        name: 'Eenmalige aankoop',
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: { '@type': 'MonetaryAmount', value: 4.95, currency: 'EUR' },
          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'NL' },
        },
        seller: {
          '@type': 'Organization',
          name: 'Amare Global',
        },
      },
    ],
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      returnMethod: 'https://schema.org/ReturnByMail',
      returnFees: 'https://schema.org/FreeReturn',
      merchantReturnDays: 30,
      description: '30 dagen geld-terug-garantie — zelfs als de verpakking leeg is',
    },
  };

  if (input.ratingValue && input.ratingCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: input.ratingValue,
      reviewCount: input.ratingCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
}

/** @deprecated Use generateProductSchema for full product schema */
export function generateProductSchemaBasic(input: ProductInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    ...(input.image && { image: input.image }),
    url: input.url,
    brand: {
      '@type': 'Brand',
      name: 'Amare',
    },
    ...(input.price && {
      offers: {
        '@type': 'Offer',
        price: input.price,
        priceCurrency: input.priceCurrency || 'EUR',
        availability: input.availability || 'https://schema.org/InStock',
        url: input.url,
      },
    }),
  };
}

// Legacy type kept for backward compatibility
export interface ProductInput {
  name: string;
  description: string;
  image?: string;
  url: string;
  price?: number;
  priceCurrency?: string;
  availability?: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Combines multiple schemas into a single @graph array.
 */
export function combineSchemas(...schemas: object[]) {
  if (schemas.length === 1) return schemas[0];
  return {
    "@context": "https://schema.org",
    "@graph": schemas,
  };
}

/**
 * Speakable schema — marks content sections as eligible for voice search (Google Assistant, Siri).
 * Use on blog posts only. CSS selectors target the first 2-3 substantive sections.
 */
export function generateSpeakableSchema(slug: string, headings: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "SpeakableSpecification",
    cssSelector: headings.map((_, i) => `#speakable-section-${i}`).concat([`#speakable-conclusie`]),
    url: `${SITE_URL}/blogs/nieuws/${slug}`,
  };
}

/**
 * Person schema for E-E-A-T signals — establishes author identity for Google's trust evaluation.
 * Used on all article/product pages.
 */
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "AmareNL Redactie",
    jobTitle: "Wellness & Supplementen Expert",
    description:
      "Onafhankelijke supplementen-onderzoeker gespecialiseerd in natuurlijke formules, gut-brain gezondheid en evidence-based wellness in de Nederlandse markt.",
    url: `${SITE_URL}/over-ons`,
    sameAs: [SITE_URL],
    knowsAbout: [
      "Voedingssupplementen",
      "Darmgezondheid",
      "Gut-Brain Axis",
      "Mentale Wellness",
      "Plantaardige Voeding",
      "Collageen & Huidgezondheid",
      "Hormoonbalans",
      "Natuurlijke Energie",
    ],
    affiliation: {
      "@type": "Organization",
      name: ORG_NAME,
      url: SITE_URL,
    },
  };
}

/**
 * SiteLinks search box — enables the search box directly in Google SERP for branded queries.
 * Already integrated in generateWebSiteSchema; this is an enriched standalone variant.
 */
export function generateSiteLinksSearchSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "nl-NL",
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/blogs/nieuws/?s={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/?s={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    ],
  };
}
