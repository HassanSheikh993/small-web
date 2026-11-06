'use client';

import { useCallback, useRef, useState } from 'react';
import { getSite, recordVisit } from '@/lib/api';
import { toAddress } from '@/lib/address';
import type { Site, VisitHow } from '@/lib/types';
import { useUser } from '@/context/UserContext';
import Toolbar from './Toolbar';
import UserPicker from './UserPicker';
import StartPage from './StartPage';
import SiteFrame from './SiteFrame';
import NowherePage from './NowherePage';
import HistoryPage, { type HistorySnapshot } from './HistoryPage';

type Status = 'start' | 'loading' | 'shown' | 'nowhere' | 'error' | 'history';

const HISTORY = 'about:history';

type Entry = {
  address: string;
  scrollY: number;
  history?: HistorySnapshot; // only for about:history: the rows and scroll to restore
};

type Nav = {
  back: Entry[]; // pages we came from (last item = previous page)
  current: Entry | null; // page we are on now
  forward: Entry[]; // pages we went back from (last item = next page)
};

const EMPTY_NAV: Nav = { back: [], current: null, forward: [] };

// Ways of arriving that start a new page 
type NewPageHow = Exclude<VisitHow, 'back' | 'forward'>;


export default function Browser() {
  const { user } = useUser();
  // when user change BrowserWindow part is rebuilt
  return <BrowserWindow key={user?._id ?? 'nobody'} />;
}

function BrowserWindow() {
  const { user } = useUser();
  const [nav, setNav] = useState<Nav>(EMPTY_NAV);
  const [status, setStatus] = useState<Status>('start');
  const [site, setSite] = useState<Site | null>(null);  // data from the backend (address, title, HTML), or null

  const latest = useRef('');
  const frameRef = useRef<HTMLIFrameElement>(null); // the iframe of the page being shown
  const historySnap = useRef<HistorySnapshot | null>(null); // latest state of the history screen
  const saveHistory = useCallback((s: HistorySnapshot) => {
    historySnap.current = s;
  }, []);

  const address = nav.current?.address ?? '';


  function currentWithScroll(): Entry | null {
    if (!nav.current) return null;
    if (status === 'history') return { ...nav.current, history: historySnap.current ?? undefined };
    const win = frameRef.current?.contentWindow;
    if (status !== 'shown' || !win) return nav.current; // Loading / Nowhere: nothing to save
    return { ...nav.current, scrollY: win.scrollY };
  }

  // load() gets the new data ready: it fetches the page and puts it into site and status. Then the JSX uses that data to show it
  async function load(next: string) {
    latest.current = next;
    setSite(null);

    // The history screen is built in, not fetched from the backend.
    if (next === HISTORY) {
      setStatus('history');
      return;
    }

    setStatus('loading');

    try {
      const found = await getSite(next);
      if (latest.current !== next) return;
      setSite(found);
      setStatus(found ? 'shown' : 'nowhere');
    } catch {
      if (latest.current !== next) return;
      setStatus('error');
    }
  }

// saves a visit to history
  function record(next: string, how: VisitHow) {
    if (!user || next === HISTORY) return; // the history screen is not a visit
    recordVisit(user._id, next, how).catch(() => {});
  }

  //  opens a new page
  function go(input: string, how: NewPageHow) {
    if (!user) return;
    const next = toAddress(input);
    if (!next) return;
    if (next === HISTORY && address === HISTORY) return; // already on the history screen
    const here = currentWithScroll();

    setNav({
      back: here ? [...nav.back, here] : nav.back,
      current: { address: next, scrollY: 0 }, // new pages start at the top
      forward: [], // a new page loses forward
    });
    load(next);
    record(next, how);
  }

  // takes you to the previous page
  function back() {
    const here = currentWithScroll();
    if (!here || nav.back.length === 0) return;
    const previous = nav.back[nav.back.length - 1];

    setNav({
      back: nav.back.slice(0, -1),
      current: previous,
      forward: [...nav.forward, here],
    });
    load(previous.address);
    record(previous.address, 'back');
  }

  function forward() {
    const here = currentWithScroll();
    if (!here || nav.forward.length === 0) return;
    const next = nav.forward[nav.forward.length - 1];

    setNav({
      back: [...nav.back, here],
      current: next,
      forward: nav.forward.slice(0, -1),
    });
    load(next.address);
    record(next.address, 'forward');
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center gap-4 border-b border-zinc-200 bg-zinc-100 px-4 py-2">
        <Toolbar
          key={address}
          currentAddress={address}
          disabled={!user}
          canBack={nav.back.length > 0}
          canForward={nav.forward.length > 0}
          onGo={(input) => go(input, 'typed')}
          onBack={back}
          onForward={forward}
          onHistory={() => go(HISTORY, 'typed')}
        />
        <UserPicker />
      </header>

      <main className="flex-1 overflow-auto bg-white">
        {status === 'start' && <StartPage />}
        {status === 'loading' && <p className="p-6 text-zinc-500">Loading {address}…</p>}
        {status === 'shown' && site && (
          <SiteFrame
            html={site.html}
            initialScrollY={nav.current?.scrollY ?? 0}
            frameRef={frameRef}
            onNavigate={(href) => go(href, 'link')}
          />
        )}
        {status === 'nowhere' && <NowherePage address={address} />}
        {status === 'history' && user && (
          <HistoryPage
            userId={user._id}
            saved={nav.current?.history}
            onChange={saveHistory}
            onOpen={(a) => go(a, 'history')}
          />
        )}
        {status === 'error' && (
          <p className="p-6 text-red-600">Could not load {address}. Is the backend running?</p>
        )}
      </main>
    </div>
  );
}
