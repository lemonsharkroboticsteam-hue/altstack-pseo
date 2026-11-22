export interface PricingTier {
  name: string;
  price: string;
  billingNote: string;
  highlights: string[];
}

export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  officialUrl: string;
  pricingModel: string;
  startingPrice: string;
  startingPriceNumber: number;
  hasFreeTier: boolean;
  pricingTiers: PricingTier[];
  keyFeatures: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
  platforms: string[];
  rating: number;
  reviewCount: number;
  isFlagship: boolean;
  lastUpdated: string;
  sources: string[];
}

export interface AlternativeEntry {
  toolSlug: string;
  rank: number;
  badge: string;
  whySwitch: string;
  standoutFeature: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface AlternativePage {
  slug: string;
  targetToolSlug: string;
  title: string;
  metaDescription: string;
  intro: string;
  topPickSlug: string;
  alternatives: AlternativeEntry[];
  faqs: FaqItem[];
  lastUpdated: string;
}

export interface ComparisonDimension {
  feature: string;
  toolAValue: string;
  toolBValue: string;
  winner: "A" | "B" | "tie";
}

export interface ComparisonPage {
  slug: string;
  toolASlug: string;
  toolBSlug: string;
  title: string;
  metaDescription: string;
  intro: string;
  verdictSummary: string;
  winnerSlug: string;
  chooseAIf: string[];
  chooseBIf: string[];
  comparisonTable: ComparisonDimension[];
  faqs: FaqItem[];
  lastUpdated: string;
}

export interface AffiliateConfig {
  affiliateUrl: string;
  ctaText: string;
  dealBadge?: string;
  promoNote?: string;
  isAffiliateActive: boolean;
}

export interface ResolvedAffiliateLink {
  url: string;
  ctaText: string;
  dealBadge?: string;
  promoNote?: string;
  isAffiliateActive: boolean;
}
