import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About & Evaluation Methodology",
  description: `Learn how ${SITE_NAME} compares AI and productivity software pricing, free plans, pros, cons, and alternatives.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-10">
        <h1 className="text-3xl font-extrabold text-slate-900">
          About {SITE_NAME} &amp; Our Methodology
        </h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700">
          <p>
            <strong>{SITE_NAME}</strong> helps founders, product managers,
            engineers, and creators choose the right AI and productivity
            software without getting buried in marketing hype.
          </p>
          <h2 className="pt-2 text-lg font-bold text-slate-900">
            How We Evaluate Software
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Verified Pricing &amp; Free Tiers:</strong> We track real
              monthly/annual tier rates, seat caps, and hidden add-on charges.
            </li>
            <li>
              <strong>Workflow Fit Over Hype:</strong> No single tool wins for
              everyone—we highlight concrete trade-offs (e.g., local-first
              Markdown speed vs real-time multiplayer team wikis).
            </li>
            <li>
              <strong>Editorial Independence:</strong> While some outbound links
              may earn an affiliate commission, rankings and pros/cons are based
              on product merit and user fit.
            </li>
          </ul>
          <p className="pt-2">
            Explore our latest{" "}
            <Link href="/#alternatives" className="font-semibold text-indigo-600 underline">
              Alternatives Guides
            </Link>{" "}
            or{" "}
            <Link href="/#comparisons" className="font-semibold text-indigo-600 underline">
              Head-to-Head VS Comparisons
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
