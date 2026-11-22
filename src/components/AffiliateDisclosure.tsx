import Link from "next/link";
import { Info } from "lucide-react";

export function AffiliateDisclosure() {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-600">
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
      <p>
        <strong>Editorial Transparency:</strong> Pricing and features are
        verified for 2026. When you visit software through our links, we may earn
        an affiliate commission at zero extra cost to you.{" "}
        <Link
          href="/affiliate-disclosure"
          className="font-medium text-indigo-600 underline decoration-indigo-300 underline-offset-2 hover:text-indigo-700"
        >
          Learn more
        </Link>
        .
      </p>
    </div>
  );
}
