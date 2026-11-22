import Link from "next/link";
import { Layers3 } from "lucide-react";
import { SITE_NAME } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Layers3 className="h-4 w-4" aria-hidden="true" />
          </span>
          <span>{SITE_NAME}</span>
          <span className="hidden rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 sm:inline-block">
            2026
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="flex items-center gap-4 text-sm font-medium text-slate-600 sm:gap-6"
        >
          <Link href="/#alternatives" className="hover:text-slate-900">
            Alternatives
          </Link>
          <Link href="/#comparisons" className="hover:text-slate-900">
            VS Guides
          </Link>
          <Link href="/#tools" className="hover:text-slate-900">
            Software
          </Link>
          <Link
            href="/about"
            className="hidden hover:text-slate-900 sm:inline-block"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
