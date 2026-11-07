'use client';

import { useEffect, useRef, useState } from 'react';
import { getHistory } from '@/lib/api';
import type { Visit } from '@/lib/types';

// A colour for each way of arriving, shown as a small badge.
const HOW_COLOR: Record<string, string> = {
  typed: 'bg-brand-soft text-brand',
  link: 'bg-ok/10 text-ok',
  search: 'bg-warn/10 text-warn',
  history: 'bg-paper text-muted',
  back: 'bg-paper text-faint',
  forward: 'bg-paper text-faint',
};

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

        {visits.length === 0 && !hasMore && <p className="text-faint">No visits yet.</p>}

        <ul className="card divide-y divide-line overflow-hidden">
          {visits.map((v) => (
            <li key={v._id}>
              <button
                type="button"
                onClick={() => onOpen(v.address)}
                className="flex w-full items-center gap-4 px-4 py-2.5 text-left transition-colors hover:bg-brand-soft"
              >
                <span className="flex-1 font-mono text-sm text-ink">{v.address}</span>
                <span className={`w-16 rounded-full px-2 py-0.5 text-center text-xs ${HOW_COLOR[v.how]}`}>
                  {v.how}
                </span>
                <span className="w-36 text-right text-xs text-faint">
                  {new Date(v.visitedAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {hasMore && !error && <p className="py-4 text-center text-sm text-faint">Loading…</p>}
        {!hasMore && visits.length > 0 && (
          <p className="py-4 text-center text-sm text-faint">End of history</p>
        )}
        {error && <p className="py-4 text-center text-sm text-bad">Could not load history.</p>}
      </div>
    </div>
  );
}
