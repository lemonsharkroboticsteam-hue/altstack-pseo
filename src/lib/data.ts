import toolsRaw from "../../data/tools.json";
import alternativesRaw from "../../data/alternatives.json";
import comparisonsRaw from "../../data/comparisons.json";
import affiliatesRaw from "../../data/affiliates.json";
import type {
  AffiliateConfig,
  AlternativePage,
  ComparisonPage,
  ResolvedAffiliateLink,
  Tool,
} from "./types";

const tools = toolsRaw as Tool[];
const alternatives = alternativesRaw as AlternativePage[];
const comparisons = comparisonsRaw as ComparisonPage[];
const affiliates = affiliatesRaw as Record<string, AffiliateConfig>;

export function getAllTools(): Tool[] {
  return tools;
}

export function getFlagshipTools(): Tool[] {
  return tools.filter((t) => t.isFlagship);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(tools.map((t) => t.category)));
}

export function getAllAlternativePages(): AlternativePage[] {
  return alternatives;
}

export function getAlternativePageBySlug(
  slug: string
): AlternativePage | undefined {
  return alternatives.find((a) => a.slug === slug);
}

export function getAlternativePageByTargetTool(
  toolSlug: string
): AlternativePage | undefined {
  return alternatives.find((a) => a.targetToolSlug === toolSlug);
}

export function getAllComparisonPages(): ComparisonPage[] {
  return comparisons;
}

export function getComparisonPageBySlug(
  slug: string
): ComparisonPage | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getComparisonsForTool(toolSlug: string): ComparisonPage[] {
  return comparisons.filter(
    (c) => c.toolASlug === toolSlug || c.toolBSlug === toolSlug
  );
}

export function findComparisonBetween(
  slugA: string,
  slugB: string
): ComparisonPage | undefined {
  return comparisons.find(
    (c) =>
      (c.toolASlug === slugA && c.toolBSlug === slugB) ||
      (c.toolASlug === slugB && c.toolBSlug === slugA)
  );
}

export function getAllRootSlugs(): string[] {
  return [
    ...alternatives.map((a) => a.slug),
    ...comparisons.map((c) => c.slug),
  ];
}

export function getAffiliateLink(toolSlug: string): ResolvedAffiliateLink {
  const tool = getToolBySlug(toolSlug);
  const config = affiliates[toolSlug];
  if (config && config.affiliateUrl) {
    return {
      url: config.affiliateUrl,
      ctaText: config.ctaText || `Try ${tool?.name || toolSlug}`,
      dealBadge: config.dealBadge,
      promoNote: config.promoNote,
      isAffiliateActive: Boolean(config.isAffiliateActive),
    };
  }
  return {
    url: tool?.officialUrl || "https://example.com",
    ctaText: `Visit ${tool?.name || toolSlug}`,
    dealBadge: tool?.hasFreeTier ? "Free Tier Available" : undefined,
    promoNote: tool ? `Starts at ${tool.startingPrice}` : undefined,
    isAffiliateActive: false,
  };
}
