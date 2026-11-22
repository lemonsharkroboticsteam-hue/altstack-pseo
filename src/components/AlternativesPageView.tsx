import Link from "next/link";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronRight,
  Star,
  XCircle,
} from "lucide-react";
import {
  findComparisonBetween,
  getAllAlternativePages,
  getComparisonsForTool,
  getToolBySlug,
} from "@/lib/data";
import type { AlternativePage, Tool } from "@/lib/types";
import { AdSenseSlot } from "./AdSenseSlot";
import { AffiliateCtaButton } from "./AffiliateCtaButton";
import { AffiliateDisclosure } from "./AffiliateDisclosure";

interface AlternativesPageViewProps {
  page: AlternativePage;
  targetTool: Tool;
}

export function AlternativesPageView({
  page,
  targetTool,
}: AlternativesPageViewProps) {
  const topPick = getToolBySlug(page.topPickSlug) || targetTool;
  const resolvedEntries = page.alternatives
    .map((entry) => {
      const tool = getToolBySlug(entry.toolSlug);
      return tool ? { entry, tool } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const relatedComparisons = getComparisonsForTool(targetTool.slug).slice(0, 4);
  const otherAltGuides = getAllAlternativePages()
    .filter((a) => a.slug !== page.slug)
    .slice(0, 4);

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-slate-500">
        <Link href="/" className="hover:text-indigo-600">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <Link href="/#alternatives" className="hover:text-indigo-600">
          Alternatives
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="font-medium text-slate-800">
          {targetTool.name} Alternatives
        </span>
      </nav>

      {/* Above-the-Fold Hero + Primary Conversion CTAs */}
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 font-semibold text-indigo-700">
            {targetTool.category}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-medium text-slate-600">
            Updated {page.lastUpdated}
          </span>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700">
            {resolvedEntries.length} Verified Alternatives
          </span>
        </div>

        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          {page.intro}
        </p>

        {/* Above-the-fold Dual Conversion Banner */}
        <div className="mt-6 grid gap-4 rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 via-white to-emerald-50/60 p-4 sm:grid-cols-2 sm:p-5">
          <div className="flex flex-col justify-between gap-3 rounded-lg bg-white p-4 shadow-xs ring-1 ring-indigo-200/70">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold tracking-wide text-indigo-600 uppercase">
                <Award className="h-3.5 w-3.5" aria-hidden="true" />
                #1 Top Alternative Pick
              </div>
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <h2 className="text-lg font-bold text-slate-900">
                  {topPick.name}
                </h2>
                <span className="text-xs font-semibold text-emerald-700">
                  {topPick.hasFreeTier ? "Free Plan" : topPick.startingPrice} · ★{" "}
                  {topPick.rating}
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                {topPick.tagline}
              </p>
            </div>
            <AffiliateCtaButton
              toolSlug={topPick.slug}
              variant="primary"
              size="lg"
              showDealBadge
              showPromoNote
              fullWidth
            />
          </div>

          <div className="flex flex-col justify-between gap-3 rounded-lg bg-white p-4 shadow-xs ring-1 ring-slate-200">
            <div>
              <div className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                Original Tool Benchmark
              </div>
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <h2 className="text-lg font-bold text-slate-900">
                  {targetTool.name}
                </h2>
                <span className="text-xs font-semibold text-slate-600">
                  From {targetTool.startingPrice} · ★ {targetTool.rating}
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                {targetTool.tagline}
              </p>
            </div>
            <AffiliateCtaButton
              toolSlug={targetTool.slug}
              variant="outline"
              size="lg"
              showDealBadge
              showPromoNote
              fullWidth
            />
          </div>
        </div>

        <div className="mt-5">
          <AffiliateDisclosure />
        </div>
      </header>

      {/* Two-Column Body + Sticky Sidebar */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-8">
          {/* Quick Comparison Table */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="text-lg font-bold text-slate-900">
                Quick Comparison: Top {targetTool.name} Alternatives (2026)
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Side-by-side pricing, free tiers, and standout strengths
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold text-slate-600 uppercase">
                  <tr>
                    <th className="px-4 py-3">Rank & Tool</th>
                    <th className="px-4 py-3">Free Tier</th>
                    <th className="px-4 py-3">Starting Paid</th>
                    <th className="px-4 py-3">Rating</th>
                    <th className="px-4 py-3">Best For</th>
                    <th className="px-4 py-3 text-right">Official Site</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {resolvedEntries.map(({ entry, tool }) => (
                    <tr key={tool.slug} className="hover:bg-slate-50/70">
                      <td className="px-4 py-3.5">
                        <a
                          href={`#alt-${tool.slug}`}
                          className="font-bold text-slate-900 hover:text-indigo-600"
                        >
                          #{entry.rank} {tool.name}
                        </a>
                        <div className="text-[11px] font-medium text-indigo-600">
                          {entry.badge}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-xs">
                        {tool.hasFreeTier ? (
                          <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">
                            Yes ($0)
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-slate-900">
                        {tool.startingPrice}
                      </td>
                      <td className="px-4 py-3.5 text-xs font-semibold text-amber-600">
                        ★ {tool.rating}
                      </td>
                      <td className="max-w-[200px] px-4 py-3.5 text-xs text-slate-600">
                        {tool.bestFor}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <AffiliateCtaButton
                          toolSlug={tool.slug}
                          labelOverride="Visit"
                          variant="primary"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Mid-Article Google AdSense Placement */}
          <AdSenseSlot variant="in-article" slotId="alt-in-article-1" />

          {/* Detailed Ranked Breakdown Cards */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">
              Detailed Reviews: Best {targetTool.name} Alternatives
            </h2>

            {resolvedEntries.map(({ entry, tool }) => {
              const vsGuide = findComparisonBetween(targetTool.slug, tool.slug);
              return (
                <section
                  key={tool.slug}
                  id={`alt-${tool.slug}`}
                  className="scroll-mt-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs"
                >
                  <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-lg bg-slate-900 px-2.5 py-0.5 text-xs font-bold text-white">
                          #{entry.rank}
                        </span>
                        <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                          {entry.badge}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                          {tool.rating} ({tool.reviewCount.toLocaleString()} reviews)
                        </span>
                      </div>
                      <h3 className="mt-2 text-2xl font-bold text-slate-900">
                        {tool.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {tool.tagline}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <AffiliateCtaButton
                        toolSlug={tool.slug}
                        variant={entry.rank === 1 ? "secondary" : "primary"}
                        size="md"
                        showDealBadge
                      />
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-indigo-50/60 p-4 text-sm text-slate-800">
                    <span className="font-bold text-indigo-900">
                      Why switch from {targetTool.name}:{" "}
                    </span>
                    {entry.whySwitch}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-700">
                    {tool.description}
                  </p>

                  {/* Pricing & Standout Strip */}
                  <div className="mt-4 grid gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-3">
                    <div>
                      <div className="text-[11px] font-semibold text-slate-500 uppercase">
                        Pricing Model
                      </div>
                      <div className="mt-0.5 text-sm font-bold text-slate-900">
                        {tool.pricingModel}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-500 uppercase">
                        Paid Plans Start At
                      </div>
                      <div className="mt-0.5 text-sm font-bold text-slate-900">
                        {tool.startingPrice}{" "}
                        {tool.hasFreeTier ? "(Free tier available)" : ""}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-500 uppercase">
                        Standout Edge
                      </div>
                      <div className="mt-0.5 text-xs font-medium text-slate-800">
                        {entry.standoutFeature}
                      </div>
                    </div>
                  </div>

                  {/* Pros & Cons */}
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
                      <h4 className="text-xs font-bold tracking-wider text-emerald-800 uppercase">
                        Pros
                      </h4>
                      <ul className="mt-2.5 space-y-2 text-xs text-slate-700">
                        {tool.pros.map((pro) => (
                          <li key={pro} className="flex items-start gap-2">
                            <CheckCircle2
                              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"
                              aria-hidden="true"
                            />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-4">
                      <h4 className="text-xs font-bold tracking-wider text-rose-800 uppercase">
                        Cons
                      </h4>
                      <ul className="mt-2.5 space-y-2 text-xs text-slate-700">
                        {tool.cons.map((con) => (
                          <li key={con} className="flex items-start gap-2">
                            <XCircle
                              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-500"
                              aria-hidden="true"
                            />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Internal Links Footer */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs">
                    <div className="flex flex-wrap items-center gap-4">
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:underline"
                      >
                        Full {tool.name} pricing & specs
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                      {vsGuide ? (
                        <Link
                          href={`/${vsGuide.slug}`}
                          className="inline-flex items-center gap-1 font-semibold text-slate-700 hover:text-indigo-600 hover:underline"
                        >
                          Read {targetTool.name} vs {tool.name}
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      ) : null}
                    </div>
                    <span className="text-slate-500">
                      Platforms: {tool.platforms.join(", ")}
                    </span>
                  </div>
                </section>
              );
            })}
          </section>

          {/* FAQs */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900">
              Frequently Asked Questions: {targetTool.name} Alternatives
            </h2>
            <div className="mt-4 divide-y divide-slate-100">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="py-4 first:pt-0 last:pb-0">
                  <h3 className="text-sm font-bold text-slate-900">
                    {faq.question}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Guides */}
          <section className="grid gap-4 sm:grid-cols-2">
            {relatedComparisons.length > 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                <h2 className="text-sm font-bold text-slate-900">
                  Head-to-Head {targetTool.name} Comparisons
                </h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {relatedComparisons.map((comp) => (
                    <li key={comp.slug}>
                      <Link
                        href={`/${comp.slug}`}
                        className="inline-flex items-center gap-1.5 font-medium text-indigo-600 hover:underline"
                      >
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        {comp.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <h2 className="text-sm font-bold text-slate-900">
                Explore More Software Alternatives
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {otherAltGuides.map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      href={`/${guide.slug}`}
                      className="inline-flex items-center gap-1.5 font-medium text-indigo-600 hover:underline"
                    >
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      {guide.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Sticky Right Sidebar */}
        <aside className="space-y-6">
          <div className="sticky top-20 space-y-6">
            {/* Table of Contents */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <h2 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                Top Picks Jump List
              </h2>
              <ol className="mt-3 space-y-2 text-sm">
                {resolvedEntries.map(({ entry, tool }) => (
                  <li key={tool.slug}>
                    <a
                      href={`#alt-${tool.slug}`}
                      className="flex items-center justify-between rounded-lg px-2 py-1.5 text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                    >
                      <span className="font-medium">
                        {entry.rank}. {tool.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        {tool.hasFreeTier ? "$0 Free" : tool.startingPrice}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="mb-2 text-xs font-semibold text-slate-700">
                  Our #1 Overall Pick: {topPick.name}
                </p>
                <AffiliateCtaButton
                  toolSlug={topPick.slug}
                  variant="primary"
                  fullWidth
                  showDealBadge
                />
              </div>
            </div>

            {/* Sidebar Google AdSense Placement */}
            <AdSenseSlot variant="sidebar" slotId="alt-sidebar-1" />
          </div>
        </aside>
      </div>
    </article>
  );
}
