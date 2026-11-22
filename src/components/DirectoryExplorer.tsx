"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Sparkles } from "lucide-react";

export interface DirectoryItem {
  id: string;
  href: string;
  kind: "alternative" | "comparison" | "tool";
  title: string;
  subtitle: string;
  category: string;
  badge: string;
}

interface DirectoryExplorerProps {
  items: DirectoryItem[];
  categories: string[];
}

export function DirectoryExplorer({
  items,
  categories,
}: DirectoryExplorerProps) {
  const [query, setQuery] = useState("");
  const [selectedKind, setSelectedKind] = useState<
    "all" | "alternative" | "comparison" | "tool"
  >("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (selectedKind !== "all" && item.kind !== selectedKind) return false;
      if (selectedCategory !== "All" && item.category !== selectedCategory)
        return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [items, query, selectedKind, selectedCategory]);

  return (
    <section
      aria-label="Search Software Comparisons and Alternatives"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools, alternatives, or VS guides (e.g. Notion, Cursor, Claude)..."
            aria-label="Search tools, alternatives, or VS guides"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by guide type">
          {(
            [
              { id: "all", label: "All Guides" },
              { id: "alternative", label: "Alternatives" },
              { id: "comparison", label: "VS Comparisons" },
              { id: "tool", label: "Tool Profiles" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedKind(tab.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                selectedKind === tab.id
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, 9).map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-all hover:border-indigo-300 hover:bg-white hover:shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-700">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  {item.badge}
                </span>
                <span className="text-[11px] font-medium text-slate-500">
                  {item.category}
                </span>
              </div>
              <h3 className="mt-2.5 text-sm font-bold text-slate-900 group-hover:text-indigo-600">
                {item.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-600">
                {item.subtitle}
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-indigo-600">
              <span>View guide</span>
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-500">
          No matching guides found for &ldquo;{query}&rdquo;. Try clearing your
          filters.
        </p>
      ) : filtered.length > 9 ? (
        <p className="mt-4 text-center text-xs text-slate-500">
          Showing 9 of {filtered.length} matching guides — browse the full
          directories below.
        </p>
      ) : null}
    </section>
  );
}
