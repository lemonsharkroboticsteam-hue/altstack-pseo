import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers3, Scale, Sparkles } from "lucide-react";
import { AdSenseSlot } from "@/components/AdSenseSlot";
import {
  DirectoryExplorer,
  type DirectoryItem,
} from "@/components/DirectoryExplorer";
import {
  getAllAlternativePages,
  getAllCategories,
  getAllComparisonPages,
  getAllTools,
  getToolBySlug,
} from "@/lib/data";

export default function HomePage() {
  const tools = getAllTools();
  const alternativePages = getAllAlternativePages();
  const comparisonPages = getAllComparisonPages();
  const categories = getAllCategories();

  const explorerItems: DirectoryItem[] = [
    ...alternativePages.map((alt) => {
      const target = getToolBySlug(alt.targetToolSlug);
      return {
        id: `alt-${alt.slug}`,
        href: `/${alt.slug}`,
        kind: "alternative" as const,
        title: alt.title,
        subtitle: alt.metaDescription,
        category: target?.category || "Software",
        badge: "Alternatives Guide",
      };
    }),
    ...comparisonPages.map((comp) => {
      const toolA = getToolBySlug(comp.toolASlug);
      return {
        id: `vs-${comp.slug}`,
        href: `/${comp.slug}`,
        kind: "comparison" as const,
        title: comp.title,
        subtitle: comp.metaDescription,
        category: toolA?.category || "Software",
        badge: "VS Comparison",
      };
    }),
    ...tools.map((tool) => ({
      id: `tool-${tool.slug}`,
      href: `/tools/${tool.slug}`,
      kind: "tool" as const,
      title: `${tool.name} Pricing & Review (2026)`,
      subtitle: tool.tagline,
      category: tool.category,
      badge: tool.hasFreeTier ? "Free Plan + Paid" : `From ${tool.startingPrice}`,
    })),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-indigo-50/40 to-emerald-50/40 p-6 shadow-xs sm:p-10">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 ring-1 ring-inset ring-indigo-600/15">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Verified 2026 Pricing &amp; Stack Guides
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Find Better AI &amp; Productivity Software Alternatives
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Compare real 2026 subscription tiers, free plan limits, pros, cons,
            and head-to-head matchups across{" "}
            <strong className="text-slate-900">{tools.length}</strong> leading
            tools—without marketing fluff.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold text-slate-700 sm:text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 shadow-xs ring-1 ring-slate-200">
              <Layers3 className="h-4 w-4 text-indigo-600" aria-hidden="true" />
              {alternativePages.length} Alternatives Guides
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 shadow-xs ring-1 ring-slate-200">
              <Scale className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              {comparisonPages.length} Head-to-Head VS Pages
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 shadow-xs ring-1 ring-slate-200">
              <CheckCircle2 className="h-4 w-4 text-indigo-600" aria-hidden="true" />
              {tools.length} Tools Tracked
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Search & Filter */}
      <div className="mt-8">
        <DirectoryExplorer items={explorerItems} categories={categories} />
      </div>

      {/* Alternatives Directory */}
      <section id="alternatives" className="mt-14 scroll-mt-20">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Best Software Alternatives Guides
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Curated ranked replacements with verified pricing and migration
              reasons
            </p>
          </div>
          <span className="text-xs font-semibold text-indigo-600">
            {alternativePages.length} Guides Live
          </span>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {alternativePages.map((page) => {
            const target = getToolBySlug(page.targetToolSlug);
            const topPick = getToolBySlug(page.topPickSlug);
            return (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-indigo-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 font-semibold text-indigo-700">
                      {target?.category || "Software"}
                    </span>
                    <span className="text-slate-500">
                      {page.alternatives.length} picks
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-indigo-600">
                    {page.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600">
                    {page.metaDescription}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                  <span className="font-medium text-slate-600">
                    #1 Pick:{" "}
                    <strong className="text-slate-900">
                      {topPick?.name || page.topPickSlug}
                    </strong>
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-indigo-600">
                    Compare
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <AdSenseSlot variant="in-article" slotId="home-mid-1" />

      {/* VS Comparisons Directory */}
      <section id="comparisons" className="mt-10 scroll-mt-20">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Head-to-Head VS Comparisons
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Side-by-side feature matrices, pricing tiers, and decisive buyer
              verdicts
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-600">
            {comparisonPages.length} Matchups Live
          </span>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {comparisonPages.map((comp) => {
            const toolA = getToolBySlug(comp.toolASlug);
            const toolB = getToolBySlug(comp.toolBSlug);
            const winner = getToolBySlug(comp.winnerSlug);
            return (
              <Link
                key={comp.slug}
                href={`/${comp.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-emerald-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-semibold text-emerald-700">
                      {toolA?.name} vs {toolB?.name}
                    </span>
                    <span className="text-slate-500">
                      {comp.comparisonTable.length} criteria compared
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-indigo-600">
                    {comp.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-600">
                    {comp.verdictSummary}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                  <span className="font-medium text-slate-600">
                    Verdict Edge:{" "}
                    <strong className="text-slate-900">
                      {winner?.name || comp.winnerSlug}
                    </strong>
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-indigo-600">
                    Read VS guide
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Tracked Software Profiles */}
      <section id="tools" className="mt-14 scroll-mt-20">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              All Tracked AI &amp; Productivity Software
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Detailed pricing plans, feature lists, pros, and cons for every
              indexed product
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-600">
            {tools.length} Profiles
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group rounded-xl border border-slate-200 bg-white p-4 shadow-xs transition-all hover:border-indigo-300 hover:shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600">
                  {tool.name}
                </span>
                <span className="text-xs font-semibold text-amber-600">
                  ★ {tool.rating}
                </span>
              </div>
              <p className="mt-1 text-[11px] font-medium text-indigo-600">
                {tool.category}
              </p>
              <p className="mt-1.5 line-clamp-2 text-xs text-slate-600">
                {tool.tagline}
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-slate-700">
                <span>
                  {tool.hasFreeTier ? "Free Tier" : "Paid"} · From{" "}
                  {tool.startingPrice}
                </span>
                <ArrowRight
                  className="h-3.5 w-3.5 text-slate-400 group-hover:text-indigo-600"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
