"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function SearchBox({
  autoFocus = false,
  placeholder = "Search by feature, technology or category",
}: {
  autoFocus?: boolean;
  placeholder?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = value.trim();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="w-full max-w-xl">
      <label htmlFor="site-search" className="sr-only">
        Search open source projects
      </label>
      <div className="flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3.5 shadow-sm transition-colors focus-within:border-accent">
        <button
          type="submit"
          aria-label="Search"
          className="shrink-0 text-muted-foreground hover:text-accent"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
            <path
              d="M17.5 17.5L13.875 13.875M15.833 9.167a6.667 6.667 0 11-13.333 0 6.667 6.667 0 0113.333 0z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <input
          id="site-search"
          type="search"
          name="q"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
        />
      </div>
    </form>
  );
}
