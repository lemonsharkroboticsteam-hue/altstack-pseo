import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-24 text-center">
      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
        404 · Page Not Found
      </span>
      <h1 className="mt-4 text-3xl font-extrabold text-slate-900">
        We couldn&apos;t find that software guide
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Browse all verified AI &amp; productivity software alternatives and VS
        comparisons on the homepage.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to AltStack Directory
      </Link>
    </div>
  );
}
