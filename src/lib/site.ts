export const SITE_NAME = "AltStack";
export const SITE_TAGLINE =
  "Unbiased AI & Productivity Software Alternatives and Head-to-Head Comparisons";
export const SITE_DESCRIPTION =
  "Compare verified 2026 pricing, free plans, pros, cons, and top alternatives for the leading AI and productivity software tools.";

export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://altstack.vercel.app";
  return raw.replace(/\/+$/, "");
}

export function getAdSenseClientId(): string {
  return process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() || "";
}
