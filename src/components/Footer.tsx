import Link from "next/link";
import {
  getAllAlternativePages,
  getAllComparisonPages,
} from "@/lib/data";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export function Footer() {
  const topAlternatives = getAllAlternativePages().slice(0, 6);
  const topComparisons = getAllComparisonPages().slice(0, 6);

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="text-lg font-bold text-slate-900">
              {SITE_NAME}
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {SITE_TAGLINE}. Built for fast pricing checks, honest trade-offs,
              and smarter SaaS stacks.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wider text-slate-900 uppercase">
              Top Alternatives
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {topAlternatives.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/${page.slug}`}
                    className="hover:text-indigo-600 hover:underline"
                  >
                    {page.slug
                      .replace(/^best-/, "Best ")
                      .replace(/-alternatives$/, " Alternatives")
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wider text-slate-900 uppercase">
              Popular VS Guides
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {topComparisons.map((comp) => (
                <li key={comp.slug}>
                  <Link
                    href={`/${comp.slug}`}
                    className="hover:text-indigo-600 hover:underline"
                  >
                    {comp.slug
                      .split("-vs-")
                      .map((part) =>
                        part
                          .split("-")
                          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                          .join(" ")
                      )
                      .join(" vs ")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wider text-slate-900 uppercase">
              Editorial & Legal
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/about" className="hover:text-indigo-600">
                  About & Methodology
                </Link>
              </li>
              <li>
                <Link
                  href="/affiliate-disclosure"
                  className="hover:text-indigo-600"
                >
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-indigo-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-indigo-600">
                  XML Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-slate-100 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <p>
            Pricing & plans verified from public vendor announcements. Always
            verify checkout terms on the vendor site.
          </p>
        </div>
      </div>
    </footer>
  );
}
