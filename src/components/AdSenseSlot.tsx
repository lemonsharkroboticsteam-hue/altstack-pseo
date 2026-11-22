import { getAdSenseClientId } from "@/lib/site";

interface AdSenseSlotProps {
  variant: "sidebar" | "in-article";
  slotId: string;
}

export function AdSenseSlot({ variant, slotId }: AdSenseSlotProps) {
  const clientId = getAdSenseClientId();
  const isSidebar = variant === "sidebar";

  if (clientId) {
    return (
      <div
        className={`overflow-hidden rounded-xl border border-slate-200 bg-white p-2 ${
          isSidebar ? "min-h-[250px]" : "my-8 min-h-[120px]"
        }`}
        aria-label="Advertisement"
      >
        <p className="mb-1 text-center text-[10px] font-medium tracking-wider text-slate-400 uppercase">
          Advertisement
        </p>
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format={isSidebar ? "auto" : "fluid"}
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <aside
      aria-label={
        isSidebar
          ? "Google AdSense Placeholder Sidebar"
          : "Google AdSense Placeholder In-Article"
      }
      className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-100/70 px-4 py-6 text-center ${
        isSidebar ? "min-h-[250px] w-full" : "my-8 min-h-[120px] w-full"
      }`}
    >
      <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-slate-600 uppercase">
        Ad Slot · {slotId}
      </span>
      <p className="mt-2 text-xs font-medium text-slate-700">
        {isSidebar
          ? "Google AdSense Placeholder · Sidebar (300×250)"
          : "Google AdSense Placeholder · In-Article (Responsive)"}
      </p>
      <p className="mt-1 max-w-xs text-[11px] text-slate-500">
        Set{" "}
        <code className="rounded bg-slate-200/80 px-1 py-0.5 text-[10px]">
          NEXT_PUBLIC_ADSENSE_CLIENT_ID
        </code>{" "}
        in Cloudflare Pages to activate live ads.
      </p>
    </aside>
  );
}
