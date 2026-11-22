import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy, cookies, and analytics practices for ${SITE_NAME}.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-10">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs text-slate-500">Last updated: November 22, 2026</p>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700">
          <p>
            {SITE_NAME} is an informational software comparison directory. We do
            not require user accounts or collect personal passwords.
          </p>
          <h2 className="pt-2 text-lg font-bold text-slate-900">
            Advertising &amp; Cookies
          </h2>
          <p>
            When Google AdSense is active on this site, third-party vendors,
            including Google, may use cookies to serve ads based on a user&apos;s
            prior visits to this website or other websites. Users may opt out of
            personalized advertising by visiting Google Ads Settings.
          </p>
          <h2 className="pt-2 text-lg font-bold text-slate-900">
            External Vendor Links
          </h2>
          <p>
            Clicking outbound buttons redirects you to third-party software
            vendors (some via affiliate tracking URLs). Those external sites
            operate under their own privacy policies and terms of service.
          </p>
        </div>
      </div>
    </div>
  );
}
