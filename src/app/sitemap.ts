import type { MetadataRoute } from "next";
import {
  getAllAlternativePages,
  getAllComparisonPages,
  getAllTools,
} from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/affiliate-disclosure`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const alternativeRoutes: MetadataRoute.Sitemap = getAllAlternativePages().map(
    (page) => ({
      url: `${siteUrl}/${page.slug}`,
      lastModified: new Date(page.lastUpdated),
      changeFrequency: "weekly",
      priority: 0.9,
    })
  );

  const comparisonRoutes: MetadataRoute.Sitemap = getAllComparisonPages().map(
    (comp) => ({
      url: `${siteUrl}/${comp.slug}`,
      lastModified: new Date(comp.lastUpdated),
      changeFrequency: "weekly",
      priority: 0.9,
    })
  );

  const toolRoutes: MetadataRoute.Sitemap = getAllTools().map((tool) => ({
    url: `${siteUrl}/tools/${tool.slug}`,
    lastModified: new Date(tool.lastUpdated),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...alternativeRoutes,
    ...comparisonRoutes,
    ...toolRoutes,
  ];
}
