'use client';

import { useEffect, useRef, useState } from 'react';
import { searchSites } from '@/lib/api';
import type { SearchResult } from '@/lib/types';

export type SearchSnapshot = {
  query: string;
  results: SearchResult[] | null; // null = not searched yet
  scrollY: number;
};

type Props = {
  query: string; // from the address, e.g. about:search?q=tide -> "tide"
  saved?: SearchSnapshot; // given when coming back to this screen
  onChange: (snapshot: SearchSnapshot) => void; // keeps Browser's copy up to date
  onSearch: (query: string) => void; // a new search was submitted
  onOpen: (address: string) => void; // a result was clicked
};

export default function SearchPage({ query, saved, onChange, onSearch, onOpen }: Props) {
  const restore = saved && saved.query === query && saved.results !== null;

  const [text, setText] = useState(query); // the search box
  const [results, setResults] = useState<SearchResult[] | null>(restore ? saved.results : null);
  const [error, setError] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null); // the scrolling area

  useEffect(() => {
    if (restore) {
      if (boxRef.current) boxRef.current.scrollTop = saved.scrollY;
    } else if (query) {
      searchSites(query)
        .then(setResults)
        .catch(() => setError(true));
    }
  }, []);

  useEffect(() => {
    onChange({ query, results, scrollY: boxRef.current?.scrollTop ?? 0 });
  }, [query, results, onChange]);

  function handleScroll() {
    onChange({ query, results, scrollY: boxRef.current?.scrollTop ?? 0 });
  }

  return (
    <div ref={boxRef} onScroll={handleScroll} className="h-full overflow-auto">
      <div className="mx-auto max-w-2xl px-6 py-8">
        <form
          className="mb-6 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (text.trim()) onSearch(text.trim());
          }}
        >
          <input
            className="flex-1 rounded border border-zinc-300 px-3 py-2"
            placeholder="Search the small web"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="rounded bg-zinc-800 px-4 py-2 text-white hover:bg-zinc-700">
            Search
          </button>
        </form>

        {query && results === null && !error && <p className="text-zinc-500">Searching…</p>}
        {error && <p className="text-red-600">Could not search. Is the backend running?</p>}
        {results && results.length === 0 && <p className="text-zinc-500">No pages match “{query}”.</p>}

        <ul className="space-y-5">
          {results?.map((r) => (
            <li key={r.address}>
              <button type="button" onClick={() => onOpen(r.address)} className="text-left">
                <span className="block text-lg text-blue-700 hover:underline">{r.title}</span>
                <span className="block font-mono text-xs text-green-700">{r.address}</span>
                <span className="block text-sm text-zinc-600">{r.snippet}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
