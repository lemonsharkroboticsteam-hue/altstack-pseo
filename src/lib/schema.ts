import { getSiteUrl } from "./site";
import type { AlternativePage, ComparisonPage, Tool } from "./types";

export function buildSoftwareApplicationSchema(tool: Tool, pageUrl?: string) {
  const siteUrl = getSiteUrl();
  const detailUrl = pageUrl || `${siteUrl}/tools/${tool.slug}`;

  return {
    "@type": "SoftwareApplication",
    "@id": `${detailUrl}#software`,
    name: tool.name,
    description: tool.description,
    applicationCategory: tool.category,
    operatingSystem: tool.platforms.join(", "),
    url: detailUrl,
    sameAs: tool.officialUrl,
    offers: {
      "@type": "Offer",
      price: tool.hasFreeTier ? "0" : String(tool.startingPriceNumber),
      priceCurrency: "USD",
      description: tool.hasFreeTier
        ? `Free tier available; paid plans start at ${tool.startingPrice}`
        : `Paid plans start at ${tool.startingPrice}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(tool.rating),
      bestRating: "5",
      worstRating: "1",
      ratingCount: String(tool.reviewCount),
    },
  };
}

export function buildAlternativesJsonLd(
  altPage: AlternativePage,
  targetTool: Tool,
  rankedTools: Tool[],
  pageUrl: string
) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: `${targetTool.name} Alternatives`,
            item: pageUrl,
          },
        ],
      },
      buildSoftwareApplicationSchema(targetTool, `${siteUrl}/tools/${targetTool.slug}`),
      {
        "@type": "ItemList",
        name: altPage.title,
        description: altPage.metaDescription,
        numberOfItems: rankedTools.length,
        itemListElement: rankedTools.map((tool, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: buildSoftwareApplicationSchema(
            tool,
            `${siteUrl}/tools/${tool.slug}`
          ),
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: altPage.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export function buildComparisonJsonLd(
  compPage: ComparisonPage,
  toolA: Tool,
  toolB: Tool,
  pageUrl: string
) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: `${toolA.name} vs ${toolB.name}`,
            item: pageUrl,
          },
        ],
      },
      buildSoftwareApplicationSchema(toolA, `${siteUrl}/tools/${toolA.slug}`),
      buildSoftwareApplicationSchema(toolB, `${siteUrl}/tools/${toolB.slug}`),
      {
        "@type": "FAQPage",
        mainEntity: compPage.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}
