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

export interface ProductInput {
  name: string;
  description: string;
  image?: string;
  url: string;
  price?: number;
  priceCurrency?: string;
  availability?: string;
}

export function generateProductSchema(input: ProductInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    ...(input.image && { image: input.image }),
    url: input.url,
    brand: {
      "@type": "Brand",
      name: "Amare",
    },
    ...(input.price && {
      offers: {
        "@type": "Offer",
        price: input.price,
        priceCurrency: input.priceCurrency || "EUR",
        availability: input.availability || "https://schema.org/InStock",
        url: input.url,
      },
    }),
  };
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
