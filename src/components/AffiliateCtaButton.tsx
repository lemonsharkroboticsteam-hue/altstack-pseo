import { ExternalLink, Sparkles } from "lucide-react";
import { getAffiliateLink } from "@/lib/data";

interface AffiliateCtaButtonProps {
  toolSlug: string;
  labelOverride?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "md" | "lg";
  showDealBadge?: boolean;
  showPromoNote?: boolean;
  fullWidth?: boolean;
}

export function AffiliateCtaButton({
  toolSlug,
  labelOverride,
  variant = "primary",
  size = "md",
  showDealBadge = false,
  showPromoNote = false,
  fullWidth = false,
}: AffiliateCtaButtonProps) {
  const link = getAffiliateLink(toolSlug);
  const label = labelOverride || link.ctaText;

  const variantClasses = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-600/20 border border-indigo-600",
    secondary:
      "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-600/20 border border-emerald-600",
    outline:
      "bg-white text-slate-900 hover:bg-slate-50 border border-slate-300 shadow-xs",
  }[variant];

  const sizeClasses =
    size === "lg"
      ? "px-5 py-3 text-sm sm:text-base font-semibold rounded-xl"
      : "px-4 py-2.5 text-sm font-semibold rounded-lg";

  return (
    <div className={fullWidth ? "w-full" : "inline-flex flex-col items-start"}>
      <a
        href={link.url}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 transition-colors ${variantClasses} ${sizeClasses} ${
          fullWidth ? "w-full" : ""
        }`}
      >
        <span>{label}</span>
        <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
      </a>
      {(showDealBadge && link.dealBadge) || (showPromoNote && link.promoNote) ? (
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-600">
          {showDealBadge && link.dealBadge ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              {link.dealBadge}
            </span>
          ) : null}
          {showPromoNote && link.promoNote ? (
            <span>{link.promoNote}</span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
