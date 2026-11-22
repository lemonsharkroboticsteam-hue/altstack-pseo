import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlternativesPageView } from "@/components/AlternativesPageView";
import { ComparisonPageView } from "@/components/ComparisonPageView";
import { JsonLd } from "@/components/JsonLd";
import {
  getAllRootSlugs,
  getAlternativePageBySlug,
  getComparisonPageBySlug,
  getToolBySlug,
} from "@/lib/data";
import {
  buildAlternativesJsonLd,
  buildComparisonJsonLd,
} from "@/lib/schema";
import { getSiteUrl, SITE_NAME } from "@/lib/site";
import type { Tool } from "@/lib/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllRootSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/${slug}`;

  const altPage = getAlternativePageBySlug(slug);
  if (altPage) {
    return {
      title: altPage.title,
      description: altPage.metaDescription,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: `${altPage.title} | ${SITE_NAME}`,
        description: altPage.metaDescription,
        url: canonicalUrl,
        type: "article",
      },
    };
  }

  const compPage = getComparisonPageBySlug(slug);
  if (compPage) {
    return {
      title: compPage.title,
      description: compPage.metaDescription,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: `${compPage.title} | ${SITE_NAME}`,
        description: compPage.metaDescription,
        url: canonicalUrl,
        type: "article",
      },
    };
  }

  return {};
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${slug}`;

  const altPage = getAlternativePageBySlug(slug);
  if (altPage) {
    const targetTool = getToolBySlug(altPage.targetToolSlug);
    if (!targetTool) notFound();

    const rankedTools = altPage.alternatives
      .map((entry) => getToolBySlug(entry.toolSlug))
      .filter((t): t is Tool => Boolean(t));

    const jsonLd = buildAlternativesJsonLd(
      altPage,
      targetTool,
      rankedTools,
      pageUrl
    );

    return (
      <>
        <JsonLd data={jsonLd} />
        <AlternativesPageView page={altPage} targetTool={targetTool} />
      </>
    );
  }

  const compPage = getComparisonPageBySlug(slug);
  if (compPage) {
    const toolA = getToolBySlug(compPage.toolASlug);
    const toolB = getToolBySlug(compPage.toolBSlug);
    if (!toolA || !toolB) notFound();

    const jsonLd = buildComparisonJsonLd(compPage, toolA, toolB, pageUrl);

    return (
      <>
        <JsonLd data={jsonLd} />
        <ComparisonPageView page={compPage} toolA={toolA} toolB={toolB} />
      </>
    );
  }

  notFound();
}
