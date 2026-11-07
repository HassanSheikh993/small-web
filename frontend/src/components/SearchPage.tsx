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
          className="card mb-6 flex gap-2 p-2 shadow-sm"
          onSubmit={(e) => {
            e.preventDefault();
            if (text.trim()) onSearch(text.trim());
          }}
        >
          <input
            className="input flex-1 border-transparent"
            placeholder="Search the small web"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        {query && results === null && !error && <p className="text-faint">Searching…</p>}
        {error && <p className="text-bad">Could not search. Is the backend running?</p>}
        {results && results.length === 0 && <p className="text-faint">No pages match “{query}”.</p>}
        {results && results.length > 0 && (
          <p className="mb-3 text-sm text-faint">
            {results.length} {results.length === 1 ? 'page' : 'pages'} match “{query}”
          </p>
        )}

        <ul className="space-y-3">
          {results?.map((r) => (
            <li key={r.address}>
              <button
                type="button"
                onClick={() => onOpen(r.address)}
                className="card block w-full p-4 text-left transition-colors hover:border-brand"
              >
                <span className="block text-lg font-medium text-brand">{r.title}</span>
                <span className="mb-1 block font-mono text-xs text-ok">{r.address}</span>
                <span className="block text-sm text-muted">{r.snippet}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
