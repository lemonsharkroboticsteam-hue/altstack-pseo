import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Layers3,
  Star,
  XCircle,
} from "lucide-react";
import { AdSenseSlot } from "@/components/AdSenseSlot";
import { AffiliateCtaButton } from "@/components/AffiliateCtaButton";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { JsonLd } from "@/components/JsonLd";
import {
  getAllTools,
  getAlternativePageByTargetTool,
  getComparisonsForTool,
  getToolBySlug,
} from "@/lib/data";
import { buildSoftwareApplicationSchema } from "@/lib/schema";
import { getSiteUrl, SITE_NAME } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTools().map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/tools/${tool.slug}`;
  const title = `${tool.name} Pricing, Plans, Pros & Alternatives (2026)`;
  const description = `${tool.name} review & 2026 pricing: ${
    tool.hasFreeTier ? "Free plan available, " : ""
  }paid tiers start at ${tool.startingPrice}. ${tool.tagline}.`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonicalUrl,
      type: "article",
    },
  };
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/tools/${tool.slug}`;
  const altGuide = getAlternativePageByTargetTool(tool.slug);
  const vsGuides = getComparisonsForTool(tool.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: tool.name, item: pageUrl },
        ],
      },
      buildSoftwareApplicationSchema(tool, pageUrl),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-indigo-600">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <Link href="/#tools" className="hover:text-indigo-600">
            Software
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="font-medium text-slate-800">{tool.name}</span>
        </nav>

        {/* Above-the-Fold Hero Card */}
        <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 font-semibold text-indigo-700">
                  {tool.category}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 font-semibold text-amber-700">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                  {tool.rating}/5 ({tool.reviewCount.toLocaleString()} reviews)
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-medium text-slate-600">
                  Updated {tool.lastUpdated}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                {tool.name} Pricing, Features &amp; Alternatives (2026)
              </h1>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {tool.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-700">
                <span className="rounded-lg bg-slate-100 px-3 py-1.5 font-semibold">
                  Model: {tool.pricingModel}
                </span>
                <span className="rounded-lg bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-800">
                  {tool.hasFreeTier
                    ? `Free Tier + Paid from ${tool.startingPrice}`
                    : `Paid Plans from ${tool.startingPrice}`}
                </span>
                <span className="rounded-lg bg-slate-100 px-3 py-1.5 font-medium">
                  Platforms: {tool.platforms.join(", ")}
                </span>
              </div>
            </div>

            <div className="w-full shrink-0 rounded-2xl border border-indigo-200 bg-indigo-50/50 p-5 lg:w-80">
              <p className="text-xs font-bold tracking-wider text-indigo-700 uppercase">
                Official Software Access
              </p>
              <p className="mt-1 text-sm font-bold text-slate-900">
                Start with {tool.name}
              </p>
              <p className="mt-1 mb-4 text-xs text-slate-600">
                Best for: {tool.bestFor}
              </p>
              <AffiliateCtaButton
                toolSlug={tool.slug}
                variant="primary"
                size="lg"
                showDealBadge
                showPromoNote
                fullWidth
              />
            </div>
          </div>

          <div className="mt-6">
            <AffiliateDisclosure />
          </div>
        </header>

        {/* Main Content + Sidebar */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-8">
            {/* Pricing Tiers */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900">
                {tool.name} 2026 Pricing Plans
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {tool.pricingTiers.map((tier) => (
                  <div
                    key={tier.name}
                    className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-base font-bold text-slate-900">
                        {tier.name}
                      </h3>
                      <span className="text-base font-extrabold text-indigo-600">
                        {tier.price}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {tier.billingNote}
                    </p>
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
                      {tier.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-1.5">
                          <CheckCircle2
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* In-Article AdSense */}
            <AdSenseSlot variant="in-article" slotId="tool-in-article-1" />

            {/* Key Features */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900">
                Core Capabilities &amp; Features
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {tool.keyFeatures.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50 p-3.5 text-sm text-slate-700"
                  >
                    <Layers3
                      className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600"
                      aria-hidden="true"
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Pros & Cons */}
            <section className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
                <h2 className="text-sm font-bold tracking-wider text-emerald-800 uppercase">
                  What Users Love (Pros)
                </h2>
                <ul className="mt-3 space-y-2.5 text-sm text-slate-700">
                  {tool.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                        aria-hidden="true"
                      />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5">
                <h2 className="text-sm font-bold tracking-wider text-rose-800 uppercase">
                  Where It Falls Short (Cons)
                </h2>
                <ul className="mt-3 space-y-2.5 text-sm text-slate-700">
                  {tool.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2">
                      <XCircle
                        className="mt-0.5 h-4 w-4 shrink-0 text-rose-500"
                        aria-hidden="true"
                      />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Related Guides */}
            {(altGuide || vsGuides.length > 0) && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900">
                  {tool.name} Alternatives &amp; VS Comparisons
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {altGuide ? (
                    <Link
                      href={`/${altGuide.slug}`}
                      className="flex items-center justify-between rounded-xl border border-indigo-200 bg-indigo-50/50 p-4 text-sm font-bold text-indigo-900 hover:bg-indigo-50"
                    >
                      <span>{altGuide.title}</span>
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  ) : null}

                  {vsGuides.map((comp) => (
                    <Link
                      key={comp.slug}
                      href={`/${comp.slug}`}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-800 hover:border-indigo-300 hover:bg-white"
                    >
                      <span>{comp.title}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-indigo-600" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky Sidebar */}
          <aside className="space-y-6">
            <div className="sticky top-20 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                <h2 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Quick Snapshot
                </h2>
                <dl className="mt-3 space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Starting Paid</dt>
                    <dd className="font-bold text-slate-900">
                      {tool.startingPrice}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Free Plan</dt>
                    <dd className="font-semibold text-slate-900">
                      {tool.hasFreeTier ? "Yes" : "No"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Rating</dt>
                    <dd className="font-bold text-amber-600">
                      ★ {tool.rating}/5
                    </dd>
                  </div>
                </dl>
                <div className="mt-4">
                  <AffiliateCtaButton
                    toolSlug={tool.slug}
                    variant="primary"
                    fullWidth
                    showDealBadge
                  />
                </div>
                {altGuide ? (
                  <Link
                    href={`/${altGuide.slug}`}
                    className="mt-3 block text-center text-xs font-semibold text-indigo-600 hover:underline"
                  >
                    Compare {tool.name} Alternatives →
                  </Link>
                ) : null}
              </div>

              <AdSenseSlot variant="sidebar" slotId="tool-sidebar-1" />
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
