import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "data");

function readJson(filename) {
  const fullPath = path.join(DATA_DIR, filename);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

function writeJson(filename, data) {
  const fullPath = path.join(DATA_DIR, filename);
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

export function validateAndSyncData() {
  const errors = [];

  const tools = readJson("tools.json");
  const alternatives = readJson("alternatives.json");
  const comparisons = readJson("comparisons.json");
  const affiliates = readJson("affiliates.json");

  if (!Array.isArray(tools) || tools.length === 0) {
    throw new Error("data/tools.json must be a non-empty array.");
  }

  const toolMap = new Map();
  for (const tool of tools) {
    if (!tool.slug || typeof tool.slug !== "string") {
      errors.push(`Tool missing valid slug: ${JSON.stringify(tool.name)}`);
      continue;
    }
    if (toolMap.has(tool.slug)) {
      errors.push(`Duplicate tool slug: ${tool.slug}`);
    }
    toolMap.set(tool.slug, tool);

    const requiredStringFields = [
      "name",
      "tagline",
      "description",
      "category",
      "officialUrl",
      "pricingModel",
      "startingPrice",
      "bestFor",
      "lastUpdated",
    ];
    for (const field of requiredStringFields) {
      if (!tool[field] || typeof tool[field] !== "string") {
        errors.push(`Tool "${tool.slug}" missing string field "${field}".`);
      }
    }
    if (typeof tool.rating !== "number" || tool.rating < 1 || tool.rating > 5) {
      errors.push(`Tool "${tool.slug}" has invalid rating: ${tool.rating}`);
    }
    if (!Array.isArray(tool.pricingTiers) || tool.pricingTiers.length === 0) {
      errors.push(`Tool "${tool.slug}" must have at least 1 pricingTier.`);
    }
    if (!Array.isArray(tool.pros) || tool.pros.length === 0) {
      errors.push(`Tool "${tool.slug}" must have pros.`);
    }
    if (!Array.isArray(tool.cons) || tool.cons.length === 0) {
      errors.push(`Tool "${tool.slug}" must have cons.`);
    }
  }

  const rootSlugs = new Set();

  for (const page of alternatives) {
    if (!page.slug || !page.slug.startsWith("best-") || !page.slug.endsWith("-alternatives")) {
      errors.push(`Alternative page slug must match best-[tool]-alternatives: ${page.slug}`);
    }
    if (rootSlugs.has(page.slug)) {
      errors.push(`Duplicate root slug detected: ${page.slug}`);
    }
    rootSlugs.add(page.slug);

    if (!toolMap.has(page.targetToolSlug)) {
      errors.push(`Alternative page "${page.slug}" references missing targetToolSlug "${page.targetToolSlug}".`);
    }
    if (!toolMap.has(page.topPickSlug)) {
      errors.push(`Alternative page "${page.slug}" references missing topPickSlug "${page.topPickSlug}".`);
    }
    if (!Array.isArray(page.alternatives) || page.alternatives.length < 2) {
      errors.push(`Alternative page "${page.slug}" must contain at least 2 alternatives.`);
    } else {
      for (const alt of page.alternatives) {
        if (!toolMap.has(alt.toolSlug)) {
          errors.push(`Alternative page "${page.slug}" references unknown toolSlug "${alt.toolSlug}".`);
        }
      }
    }
    if (!Array.isArray(page.faqs) || page.faqs.length === 0) {
      errors.push(`Alternative page "${page.slug}" must contain FAQs.`);
    }
  }

  for (const comp of comparisons) {
    if (!comp.slug || !comp.slug.includes("-vs-")) {
      errors.push(`Comparison page slug must match [a]-vs-[b]: ${comp.slug}`);
    }
    if (rootSlugs.has(comp.slug)) {
      errors.push(`Root slug collision between alternatives and comparisons: ${comp.slug}`);
    }
    rootSlugs.add(comp.slug);

    if (!toolMap.has(comp.toolASlug)) {
      errors.push(`Comparison "${comp.slug}" references missing toolASlug "${comp.toolASlug}".`);
    }
    if (!toolMap.has(comp.toolBSlug)) {
      errors.push(`Comparison "${comp.slug}" references missing toolBSlug "${comp.toolBSlug}".`);
    }
    if (!toolMap.has(comp.winnerSlug)) {
      errors.push(`Comparison "${comp.slug}" references missing winnerSlug "${comp.winnerSlug}".`);
    }
    if (!Array.isArray(comp.comparisonTable) || comp.comparisonTable.length < 3) {
      errors.push(`Comparison "${comp.slug}" must have at least 3 comparisonTable rows.`);
    }
  }

  if (errors.length > 0) {
    console.error("Data validation failed:\n" + errors.map((e) => ` - ${e}`).join("\n"));
    process.exit(1);
  }

  // Non-destructively sync affiliates.json: preserve every existing tool entry verbatim
  let addedAffiliates = 0;
  for (const tool of tools) {
    if (!affiliates[tool.slug]) {
      const separator = tool.officialUrl.includes("?") ? "&" : "?";
      affiliates[tool.slug] = {
        affiliateUrl: `${tool.officialUrl}${separator}utm_source=altstack&ref=REPLACE_WITH_YOUR_AFFILIATE_ID`,
        ctaText: tool.hasFreeTier ? `Try ${tool.name} Free` : `Visit ${tool.name}`,
        dealBadge: tool.hasFreeTier ? "Free Plan Available" : `From ${tool.startingPrice}`,
        promoNote: tool.bestFor,
        isAffiliateActive: false,
      };
      addedAffiliates += 1;
    }
  }

  if (addedAffiliates > 0) {
    writeJson("affiliates.json", affiliates);
  }

  const flagshipCount = tools.filter((t) => t.isFlagship).length;
  console.log("✓ Data validation passed:");
  console.log(`  - Tools tracked:        ${tools.length} (${flagshipCount} flagship)`);
  console.log(`  - Alternatives pages:   ${alternatives.length}`);
  console.log(`  - Comparison VS pages:  ${comparisons.length}`);
  console.log(`  - Total pSEO pages:     ${alternatives.length + comparisons.length + tools.length}`);
  console.log(`  - Affiliates synced:    +${addedAffiliates} new entries (existing preserved)`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  validateAndSyncData();
}
