import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Minus,
  Scale,
  Star,
  Trophy,
  XCircle,
} from "lucide-react";
import {
  getAllComparisonPages,
  getAlternativePageByTargetTool,
} from "@/lib/data";
import type { ComparisonPage, Tool } from "@/lib/types";
import { AdSenseSlot } from "./AdSenseSlot";
import { AffiliateCtaButton } from "./AffiliateCtaButton";
import { AffiliateDisclosure } from "./AffiliateDisclosure";

interface ComparisonPageViewProps {
  page: ComparisonPage;
  toolA: Tool;
  toolB: Tool;
}

export function ComparisonPageView({
  page,
  toolA,
  toolB,
}: ComparisonPageViewProps) {
  const winnerTool = page.winnerSlug === toolA.slug ? toolA : toolB;
  const altA = getAlternativePageByTargetTool(toolA.slug);
  const altB = getAlternativePageByTargetTool(toolB.slug);
  const otherComparisons = getAllComparisonPages()
    .filter((c) => c.slug !== page.slug)
    .slice(0, 4);

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-slate-500">
        <Link href="/" className="hover:text-indigo-600">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <Link href="/#comparisons" className="hover:text-indigo-600">
          VS Guides
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="font-medium text-slate-800">
          {toolA.name} vs {toolB.name}
        </span>
      </nav>

      {/* Above-the-Fold Hero + Dual Affiliate CTAs */}
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 font-semibold text-indigo-700">
            <Scale className="h-3 w-3" aria-hidden="true" />
            Head-to-Head Comparison
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-medium text-slate-600">
            Updated {page.lastUpdated}
          </span>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700">
            2026 Verified Pricing
          </span>
        </div>

        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          {page.intro}
        </p>

        {/* Side-by-Side Above-the-Fold Conversion Cards */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[toolA, toolB].map((tool, index) => {
            const isWinner = winnerTool.slug === tool.slug;
            return (
              <div
                key={tool.slug}
                className={`flex flex-col justify-between rounded-xl border p-5 ${
                  isWinner
                    ? "border-indigo-300 bg-gradient-to-br from-indigo-50/70 via-white to-white ring-1 ring-indigo-200"
                    : "border-slate-200 bg-slate-50/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                      Option {index === 0 ? "A" : "B"} · {tool.category}
                    </span>
                    {isWinner ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-indigo-600 px-2.5 py-0.5 text-[11px] font-bold text-white">
                        <Trophy className="h-3 w-3" aria-hidden="true" />
                        Overall Pick
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-2 flex items-baseline justify-between gap-2">
                    <h2 className="text-xl font-extrabold text-slate-900">
                      {tool.name}
                    </h2>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                      {tool.rating}/5
                    </span>
                  </div>

                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    {tool.tagline}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-md bg-white px-2.5 py-1 font-semibold text-slate-800 ring-1 ring-slate-200">
                      Paid from {tool.startingPrice}
                    </span>
                    <span className="rounded-md bg-white px-2.5 py-1 font-medium text-slate-700 ring-1 ring-slate-200">
                      {tool.hasFreeTier ? "Free Plan Included" : "Paid Only"}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <AffiliateCtaButton
                    toolSlug={tool.slug}
                    variant={isWinner ? "primary" : "secondary"}
                    size="lg"
                    showDealBadge
                    showPromoNote
                    fullWidth
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* TL;DR Verdict Banner */}
        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-sm text-slate-800">
          <span className="font-bold text-emerald-900">TL;DR Verdict: </span>
          {page.verdictSummary}
        </div>

        <div className="mt-5">
          <AffiliateDisclosure />
        </div>
      </header>

      {/* Two-Column Body + Sticky Sidebar */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-8">
          {/* Feature & Pricing Matrix Table */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="text-lg font-bold text-slate-900">
                {toolA.name} vs {toolB.name}: Feature & Pricing Matrix
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Head-to-head breakdown across pricing, workflow fit, and key specs
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[580px] text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold text-slate-600 uppercase">
                  <tr>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">{toolA.name}</th>
                    <th className="px-4 py-3">{toolB.name}</th>
                    <th className="px-4 py-3 text-right">Edge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {page.comparisonTable.map((row) => (
                    <tr key={row.feature} className="hover:bg-slate-50/70">
                      <td className="px-4 py-3.5 font-semibold text-slate-900">
                        {row.feature}
                      </td>
                      <td
                        className={`px-4 py-3.5 text-xs sm:text-sm ${
                          row.winner === "A"
                            ? "font-semibold text-emerald-800"
                            : "text-slate-600"
                        }`}
                      >
                        {row.toolAValue}
                      </td>
                      <td
                        className={`px-4 py-3.5 text-xs sm:text-sm ${
                          row.winner === "B"
                            ? "font-semibold text-emerald-800"
                            : "text-slate-600"
                        }`}
                      >
                        {row.toolBValue}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        {row.winner === "A" ? (
                          <span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
                            {toolA.name}
                          </span>
                        ) : row.winner === "B" ? (
                          <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                            {toolB.name}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                            <Minus className="h-3 w-3" aria-hidden="true" />
                            Tie
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Mid-Article Google AdSense Placement */}
          <AdSenseSlot variant="in-article" slotId="vs-in-article-1" />

          {/* Side-by-Side Pricing Tiers */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              2026 Pricing Breakdown: {toolA.name} vs {toolB.name}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[toolA, toolB].map((tool) => (
                <div
                  key={tool.slug}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <h3 className="text-lg font-bold text-slate-900">
                        {tool.name} Plans
                      </h3>
                      <span className="text-xs font-medium text-slate-500">
                        {tool.pricingModel}
                      </span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {tool.pricingTiers.map((tier) => (
                        <div
                          key={tier.name}
                          className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5"
                        >
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="font-bold text-slate-900">
                              {tier.name}
                            </span>
                            <span className="text-sm font-extrabold text-indigo-600">
                              {tier.price}
                            </span>
                          </div>
                          <p className="mt-0.5 text-[11px] text-slate-500">
                            {tier.billingNote}
                          </p>
                          <ul className="mt-2 space-y-1 text-xs text-slate-600">
                            {tier.highlights.map((item) => (
                              <li key={item} className="flex items-start gap-1.5">
                                <CheckCircle2
                                  className="mt-0.5 h-3 w-3 shrink-0 text-emerald-600"
                                  aria-hidden="true"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 pt-2">
                    <AffiliateCtaButton
                      toolSlug={tool.slug}
                      variant="outline"
                      fullWidth
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pros & Cons Head-to-Head */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Pros & Cons Head-to-Head
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[toolA, toolB].map((tool) => (
                <div
                  key={tool.slug}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
                >
                  <h3 className="text-lg font-bold text-slate-900">
                    {tool.name}
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <div className="text-xs font-bold tracking-wider text-emerald-700 uppercase">
                        Strengths
                      </div>
                      <ul className="mt-2 space-y-2 text-xs leading-relaxed text-slate-700">
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
                    <div className="border-t border-slate-100 pt-3">
                      <div className="text-xs font-bold tracking-wider text-rose-700 uppercase">
                        Trade-Offs
                      </div>
                      <ul className="mt-2 space-y-2 text-xs leading-relaxed text-slate-700">
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
                </div>
              ))}
            </div>
          </section>

          {/* Choose A If / Choose B If */}
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-5">
              <h2 className="text-base font-bold text-slate-900">
                Choose {toolA.name} if...
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {page.chooseAIf.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600"
                      aria-hidden="true"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <AffiliateCtaButton toolSlug={toolA.slug} variant="primary" />
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
              <h2 className="text-base font-bold text-slate-900">
                Choose {toolB.name} if...
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {page.chooseBIf.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                      aria-hidden="true"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <AffiliateCtaButton toolSlug={toolB.slug} variant="secondary" />
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900">
              Frequently Asked Questions: {toolA.name} vs {toolB.name}
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

          {/* Internal Links Footer */}
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <h2 className="text-sm font-bold text-slate-900">
                Explore Tool Profiles & Alternatives
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    href={`/tools/${toolA.slug}`}
                    className="inline-flex items-center gap-1.5 font-medium text-indigo-600 hover:underline"
                  >
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    {toolA.name} Full Profile & Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/tools/${toolB.slug}`}
                    className="inline-flex items-center gap-1.5 font-medium text-indigo-600 hover:underline"
                  >
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    {toolB.name} Full Profile & Pricing
                  </Link>
                </li>
                {altA ? (
                  <li>
                    <Link
                      href={`/${altA.slug}`}
                      className="inline-flex items-center gap-1.5 font-medium text-indigo-600 hover:underline"
                    >
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      Best {toolA.name} Alternatives
                    </Link>
                  </li>
                ) : null}
                {altB ? (
                  <li>
                    <Link
                      href={`/${altB.slug}`}
                      className="inline-flex items-center gap-1.5 font-medium text-indigo-600 hover:underline"
                    >
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      Best {toolB.name} Alternatives
                    </Link>
                  </li>
                ) : null}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <h2 className="text-sm font-bold text-slate-900">
                More Head-to-Head VS Guides
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {otherComparisons.map((comp) => (
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
          </section>
        </div>

        {/* Sticky Right Sidebar */}
        <aside className="space-y-6">
          <div className="sticky top-20 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <h2 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                Quick Verdict Links
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Recommended overall:{" "}
                <strong className="text-slate-900">{winnerTool.name}</strong>
              </p>

              <div className="mt-4 space-y-3">
                <AffiliateCtaButton
                  toolSlug={toolA.slug}
                  variant={winnerTool.slug === toolA.slug ? "primary" : "outline"}
                  fullWidth
                  showDealBadge
                />
                <AffiliateCtaButton
                  toolSlug={toolB.slug}
                  variant={winnerTool.slug === toolB.slug ? "primary" : "outline"}
                  fullWidth
                  showDealBadge
                />
              </div>
            </div>

            {/* Sidebar Google AdSense Placement */}
            <AdSenseSlot variant="sidebar" slotId="vs-sidebar-1" />
          </div>
        </aside>
      </div>
    </article>
  );
}
