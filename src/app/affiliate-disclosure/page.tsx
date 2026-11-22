import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: `FTC affiliate disclosure explaining how ${SITE_NAME} earns commissions from software referrals.`,
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-10">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Affiliate Disclosure
        </h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700">
          <p>
            In compliance with FTC guidelines, please assume that outbound
            software links and &ldquo;Try Free / Visit Official Site&rdquo;
            buttons on <strong>{SITE_NAME}</strong> may be affiliate links.
          </p>
          <p>
            If you click an affiliate link and sign up for a free trial or paid
            subscription, we may receive a referral commission at zero additional
            cost to you—and sometimes with partner discounts included.
          </p>
          <p>
            Affiliate relationships never alter our reported pricing tiers, free
            plan caps, or pros and cons. We regularly rank $0 open-source or
            non-affiliate tools #1 whenever they provide superior value.
          </p>
        </div>
      </div>
    </div>
  );
}
