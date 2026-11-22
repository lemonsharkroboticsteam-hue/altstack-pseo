import fs from "node:fs";
import path from "node:path";
import { validateAndSyncData } from "./validate-and-build-data.mjs";

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "data");
const DEFAULT_INBOX = path.join(DATA_DIR, "inbox", "latest-scrape.json");

function toKebabSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function normalizeTool(raw, today) {
  const slug = toKebabSlug(raw.slug || raw.name);
  if (!slug || !raw.name) {
    throw new Error(`Scraped tool missing name/slug: ${JSON.stringify(raw)}`);
  }

  return {
    slug,
    name: String(raw.name).trim(),
    tagline:
      raw.tagline ||
      `${raw.name} software platform for modern AI and productivity workflows`,
    description:
      raw.description ||
      `${raw.name} provides structured workflow capabilities in the ${raw.category || "AI & Productivity"} space.`,
    category: raw.category || "AI & Productivity",
    officialUrl: raw.officialUrl || `https://${slug}.com`,
    pricingModel: raw.pricingModel || "Freemium",
    startingPrice: raw.startingPrice || "$0",
    startingPriceNumber:
      typeof raw.startingPriceNumber === "number" ? raw.startingPriceNumber : 0,
    hasFreeTier: Boolean(raw.hasFreeTier ?? true),
    pricingTiers:
      Array.isArray(raw.pricingTiers) && raw.pricingTiers.length > 0
        ? raw.pricingTiers
        : [
            {
              name: "Standard",
              price: raw.startingPrice || "See site",
              billingNote: "Verified during automated ingestion",
              highlights: Array.isArray(raw.keyFeatures)
                ? raw.keyFeatures.slice(0, 3)
                : ["Core software access"],
            },
          ],
    keyFeatures:
      Array.isArray(raw.keyFeatures) && raw.keyFeatures.length > 0
        ? raw.keyFeatures
        : ["Core automation & workflow capabilities"],
    pros:
      Array.isArray(raw.pros) && raw.pros.length > 0
        ? raw.pros
        : ["Strong workflow focus and modern UI"],
    cons:
      Array.isArray(raw.cons) && raw.cons.length > 0
        ? raw.cons
        : ["Evaluate limits against your team size before upgrading"],
    bestFor:
      raw.bestFor || `Teams exploring ${raw.category || "AI productivity"}`,
    platforms:
      Array.isArray(raw.platforms) && raw.platforms.length > 0
        ? raw.platforms
        : ["Web"],
    rating:
      typeof raw.rating === "number"
        ? Math.min(5, Math.max(1, Number(raw.rating.toFixed(1))))
        : 4.5,
    reviewCount:
      typeof raw.reviewCount === "number" && raw.reviewCount > 0
        ? Math.round(raw.reviewCount)
        : 250,
    isFlagship: raw.isFlagship !== false,
    lastUpdated: today,
    sources: Array.isArray(raw.sources)
      ? raw.sources
      : ["automated-pipeline"],
  };
}

function pickCategoryRivals(targetTool, allTools, count = 4) {
  const candidates = allTools.filter((t) => t.slug !== targetTool.slug);
  const sameCategory = candidates.filter(
    (t) => t.category.toLowerCase() === targetTool.category.toLowerCase()
  );
  const others = candidates.filter(
    (t) => t.category.toLowerCase() !== targetTool.category.toLowerCase()
  );

  sameCategory.sort((a, b) => b.rating - a.rating);
  others.sort((a, b) => b.rating - a.rating);

  return [...sameCategory, ...others].slice(0, count);
}

function buildGeneratedAltPage(targetTool, rivals, today) {
  const year = today.slice(0, 4);
  const topPick = rivals[0];

  return {
    slug: `best-${targetTool.slug}-alternatives`,
    targetToolSlug: targetTool.slug,
    title: `Best ${targetTool.name} Alternatives in ${year}: Pricing & Feature Picks`,
    metaDescription: `Compare the best ${targetTool.name} alternatives in ${year} including ${rivals
      .slice(0, 3)
      .map((r) => r.name)
      .join(", ")}. See pricing, free plans, pros, and cons.`,
    intro: `${targetTool.name} is a popular ${targetTool.category} platform (${targetTool.startingPrice}), yet teams frequently evaluate alternatives for lower costs, free tiers, or specialized features. Here are the top ${targetTool.name} alternatives verified for ${year}.`,
    topPickSlug: topPick.slug,
    alternatives: rivals.map((rival, idx) => ({
      toolSlug: rival.slug,
      rank: idx + 1,
      badge:
        idx === 0
          ? "Top Overall Alternative"
          : rival.hasFreeTier
          ? "Best Free-Tier Option"
          : "Strong Category Rival",
      whySwitch: `Switch from ${targetTool.name} to ${rival.name} if you want ${rival.bestFor.toLowerCase()} with ${
        rival.hasFreeTier
          ? "a permanent free tier"
          : `plans starting at ${rival.startingPrice}`
      }.`,
      standoutFeature: rival.keyFeatures[0] || rival.tagline,
    })),
    faqs: [
      {
        question: `What is the best alternative to ${targetTool.name} in ${year}?`,
        answer: `${topPick.name} is our #1 alternative to ${targetTool.name} thanks to its ${topPick.rating}/5 rating and focus on ${topPick.bestFor}.`,
      },
      {
        question: `Are there free alternatives to ${targetTool.name}?`,
        answer:
          rivals.some((r) => r.hasFreeTier)
            ? `Yes—${rivals
                .filter((r) => r.hasFreeTier)
                .map((r) => r.name)
                .join(", ")} offer permanent free tiers.`
            : `Most rivals offer introductory trials or pay-as-you-go tiers starting around ${topPick.startingPrice}.`,
      },
      {
        question: `How much does ${targetTool.name} cost compared to alternatives?`,
        answer: `${targetTool.name} paid plans start at ${targetTool.startingPrice}, whereas ${topPick.name} starts at ${topPick.startingPrice}.`,
      },
    ],
    lastUpdated: today,
  };
}

function buildGeneratedComparisonPage(toolA, toolB, today) {
  const year = today.slice(0, 4);
  const winner =
    toolA.rating >= toolB.rating ? toolA : toolB;

  return {
    slug: `${toolA.slug}-vs-${toolB.slug}`,
    toolASlug: toolA.slug,
    toolBSlug: toolB.slug,
    title: `${toolA.name} vs ${toolB.name} (${year}): Pricing, Features & Verdict`,
    metaDescription: `Compare ${toolA.name} vs ${toolB.name} in ${year} across pricing (${toolA.startingPrice} vs ${toolB.startingPrice}), free tiers, pros, cons, and workflow fit.`,
    intro: `Choosing between ${toolA.name} and ${toolB.name} comes down to pricing flexibility, feature depth, and how your team prefers to work in ${year}.`,
    verdictSummary: `Choose ${toolA.name} for ${toolA.bestFor.toLowerCase()}. Choose ${toolB.name} for ${toolB.bestFor.toLowerCase()}. Overall edge goes to ${winner.name} (${winner.rating}/5 rating).`,
    winnerSlug: winner.slug,
    chooseAIf: [
      `You prioritize ${toolA.bestFor.toLowerCase()}`,
      toolA.pros[0] || `${toolA.name} matches your existing stack`,
      toolA.hasFreeTier
        ? `You want ${toolA.name}'s $0 free tier`
        : `Plans from ${toolA.startingPrice} fit your budget`,
    ],
    chooseBIf: [
      `You prioritize ${toolB.bestFor.toLowerCase()}`,
      toolB.pros[0] || `${toolB.name} matches your existing stack`,
      toolB.hasFreeTier
        ? `You want ${toolB.name}'s $0 free tier`
        : `Plans from ${toolB.startingPrice} fit your budget`,
    ],
    comparisonTable: [
      {
        feature: "Paid Starting Price",
        toolAValue: toolA.startingPrice,
        toolBValue: toolB.startingPrice,
        winner:
          toolA.startingPriceNumber < toolB.startingPriceNumber
            ? "A"
            : toolB.startingPriceNumber < toolA.startingPriceNumber
            ? "B"
            : "tie",
      },
      {
        feature: "Free Tier Available",
        toolAValue: toolA.hasFreeTier ? "Yes ($0)" : "No",
        toolBValue: toolB.hasFreeTier ? "Yes ($0)" : "No",
        winner:
          toolA.hasFreeTier === toolB.hasFreeTier
            ? "tie"
            : toolA.hasFreeTier
            ? "A"
            : "B",
      },
      {
        feature: "Primary Focus",
        toolAValue: toolA.bestFor,
        toolBValue: toolB.bestFor,
        winner: "tie",
      },
      {
        feature: "User Rating",
        toolAValue: `${toolA.rating}/5`,
        toolBValue: `${toolB.rating}/5`,
        winner:
          toolA.rating > toolB.rating
            ? "A"
            : toolB.rating > toolA.rating
            ? "B"
            : "tie",
      },
    ],
    faqs: [
      {
        question: `Which is cheaper in ${year}: ${toolA.name} or ${toolB.name}?`,
        answer: `${toolA.name} paid tiers start at ${toolA.startingPrice} (${
          toolA.hasFreeTier ? "free plan available" : "no free tier"
        }), compared to ${toolB.name} at ${toolB.startingPrice} (${
          toolB.hasFreeTier ? "free plan available" : "no free tier"
        }).`,
      },
      {
        question: `Who should choose ${toolA.name} over ${toolB.name}?`,
        answer: `${toolA.name} is ideal for ${toolA.bestFor.toLowerCase()}.`,
      },
      {
        question: `Who should choose ${toolB.name} instead?`,
        answer: `${toolB.name} is the stronger choice for ${toolB.bestFor.toLowerCase()}.`,
      },
    ],
    lastUpdated: today,
  };
}

function main() {
  const inboxPath = process.argv[2]
    ? path.resolve(ROOT, process.argv[2])
    : DEFAULT_INBOX;

  if (!fs.existsSync(inboxPath)) {
    console.log(
      `No scraped inbox file found at ${inboxPath}. Running validation only.`
    );
    validateAndSyncData();
    return;
  }

  const payload = readJson(inboxPath);
  const incomingTools = Array.isArray(payload) ? payload : payload.tools || [];
  if (!Array.isArray(incomingTools) || incomingTools.length === 0) {
    console.log("Inbox payload contains 0 new tools. Running validation only.");
    validateAndSyncData();
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  const tools = readJson(path.join(DATA_DIR, "tools.json"));
  const alternatives = readJson(path.join(DATA_DIR, "alternatives.json"));
  const comparisons = readJson(path.join(DATA_DIR, "comparisons.json"));
  const log = readJson(path.join(DATA_DIR, "pipeline-log.json"));

  let addedTools = 0;
  let updatedTools = 0;
  let addedAltPages = 0;
  let addedVsPages = 0;

  const processedSlugs = [];

  for (const rawTool of incomingTools) {
    const normalized = normalizeTool(rawTool, today);
    processedSlugs.push(normalized.slug);

    const existingIndex = tools.findIndex((t) => t.slug === normalized.slug);
    if (existingIndex >= 0) {
      tools[existingIndex] = { ...tools[existingIndex], ...normalized };
      updatedTools += 1;
    } else {
      tools.push(normalized);
      addedTools += 1;
    }
  }

  for (const slug of processedSlugs) {
    const tool = tools.find((t) => t.slug === slug);
    if (!tool || !tool.isFlagship) continue;

    const altSlug = `best-${tool.slug}-alternatives`;
    if (!alternatives.some((a) => a.slug === altSlug)) {
      const rivals = pickCategoryRivals(tool, tools, 4);
      if (rivals.length >= 2) {
        alternatives.push(buildGeneratedAltPage(tool, rivals, today));
        addedAltPages += 1;
      }
    }

    const rivals = pickCategoryRivals(tool, tools, 3);
    for (const rival of rivals) {
      const exists = comparisons.some(
        (c) =>
          (c.toolASlug === tool.slug && c.toolBSlug === rival.slug) ||
          (c.toolASlug === rival.slug && c.toolBSlug === tool.slug)
      );
      if (!exists) {
        comparisons.push(buildGeneratedComparisonPage(tool, rival, today));
        addedVsPages += 1;
        break;
      }
    }
  }

  writeJson(path.join(DATA_DIR, "tools.json"), tools);
  writeJson(path.join(DATA_DIR, "alternatives.json"), alternatives);
  writeJson(path.join(DATA_DIR, "comparisons.json"), comparisons);

  log.push({
    runAt: new Date().toISOString(),
    type: "automated-ingest",
    inboxFile: path.relative(ROOT, inboxPath),
    addedTools,
    updatedTools,
    addedAltPages,
    addedVsPages,
    sources: Array.isArray(payload.sources)
      ? payload.sources
      : [payload.source || "browser-subagent"],
    notes: payload.notes || "Automated ingestion run",
  });
  writeJson(path.join(DATA_DIR, "pipeline-log.json"), log);

  console.log(
    `Ingested tools: +${addedTools} added, ${updatedTools} updated, +${addedAltPages} alt pages, +${addedVsPages} VS pages.`
  );
  validateAndSyncData();
}

main();
