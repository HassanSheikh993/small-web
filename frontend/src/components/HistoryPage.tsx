'use client';

import { useEffect, useRef, useState } from 'react';
import { getHistory } from '@/lib/api';
import type { Visit } from '@/lib/types';

export type HistorySnapshot = {
  visits: Visit[];
  hasMore: boolean;
  nextPage: number;
  scrollY: number;
};

type Props = {
  userId: string;
  saved?: HistorySnapshot; // given when coming back to this screen
  onChange: (snapshot: HistorySnapshot) => void; // keeps Browser's copy up to date
  onOpen: (address: string) => void; // a row was clicked
};

export default function HistoryPage({ userId, saved, onChange, onOpen }: Props) {
  const [visits, setVisits] = useState<Visit[]>(saved?.visits ?? []);
  const [hasMore, setHasMore] = useState(saved?.hasMore ?? true);
  const [nextPage, setNextPage] = useState(saved?.nextPage ?? 0);
  const [error, setError] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null); // the scrolling list
  const loading = useRef(false); // stops two loads at once

  function loadMore() {
    if (loading.current || !hasMore) return;
    loading.current = true;

    getHistory(userId, nextPage)
      .then((res) => {
        setVisits((prev) => {
          const seen = new Set(prev.map((v) => v._id));
          return [...prev, ...res.visits.filter((v) => !seen.has(v._id))];
        });
        setHasMore(res.hasMore);
        setNextPage(nextPage + 1);
      })
      .catch(() => setError(true))
      .finally(() => {
        loading.current = false;
      });
  }

  useEffect(() => {
    if (saved && saved.visits.length > 0) {
      if (boxRef.current) boxRef.current.scrollTop = saved.scrollY;
    } else {
      loadMore();
    }
  }, []);

  useEffect(() => {
    onChange({ visits, hasMore, nextPage, scrollY: boxRef.current?.scrollTop ?? 0 });
  }, [visits, hasMore, nextPage, onChange]);

  function handleScroll() {
    const box = boxRef.current;
    if (!box) return;
    onChange({ visits, hasMore, nextPage, scrollY: box.scrollTop });
    if (box.scrollTop + box.clientHeight >= box.scrollHeight - 200) loadMore();
  }

  return (
    <div ref={boxRef} onScroll={handleScroll} className="h-full overflow-auto">
      <div className="mx-auto max-w-2xl px-6 py-8">
        <h1 className="mb-4 text-2xl font-semibold">History</h1>

        {visits.length === 0 && !hasMore && <p className="text-zinc-500">No visits yet.</p>}

        <ul className="divide-y divide-zinc-200">
          {visits.map((v) => (
            <li key={v._id}>
              <button
                type="button"
                onClick={() => onOpen(v.address)}
                className="flex w-full items-center gap-4 px-2 py-2 text-left hover:bg-zinc-100"
              >
                <span className="flex-1 font-mono text-sm">{v.address}</span>
                <span className="w-16 text-xs text-zinc-500">{v.how}</span>
                <span className="text-xs text-zinc-500">
                  {new Date(v.visitedAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {hasMore && !error && <p className="py-4 text-center text-sm text-zinc-500">Loading…</p>}
        {!hasMore && visits.length > 0 && (
          <p className="py-4 text-center text-sm text-zinc-400">End of history</p>
        )}
        {error && <p className="py-4 text-center text-sm text-red-600">Could not load history.</p>}
      </div>
    </div>
  );
}
