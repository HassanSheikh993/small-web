'use client';

import { useRef, useState } from 'react';
import { getSite, recordVisit } from '@/lib/api';
import { toAddress } from '@/lib/address';
import type { Site, VisitHow } from '@/lib/types';
import { useUser } from '@/context/UserContext';
import Toolbar from './Toolbar';
import UserPicker from './UserPicker';
import StartPage from './StartPage';
import SiteFrame from './SiteFrame';
import NowherePage from './NowherePage';

type Status = 'start' | 'loading' | 'shown' | 'nowhere' | 'error';

type Entry = { address: string; scrollY: number };

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

  const address = nav.current?.address ?? '';

  // load() gets the new data ready: it fetches the page and puts it into site and status. Then the JSX uses that data to show it
  async function load(next: string) {
    latest.current = next;
    setSite(null);
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
    if (!user) return;
    recordVisit(user._id, next, how).catch(() => {});
  }

  //  opens a new page
  function go(input: string, how: NewPageHow) {
    if (!user) return;
    const next = toAddress(input);
    if (!next) return;

    setNav({
      back: nav.current ? [...nav.back, nav.current] : nav.back,
      current: { address: next, scrollY: 0 },
      forward: [], // a new page loses forward
    });
    load(next);
    record(next, how);
  }

  // takes you to the previous page
  function back() {
    if (!nav.current || nav.back.length === 0) return;
    const previous = nav.back[nav.back.length - 1];

    setNav({
      back: nav.back.slice(0, -1),
      current: previous,
      forward: [...nav.forward, nav.current],
    });
    load(previous.address);
    record(previous.address, 'back');
  }

  function forward() {
    if (!nav.current || nav.forward.length === 0) return;
    const next = nav.forward[nav.forward.length - 1];

    setNav({
      back: [...nav.back, nav.current],
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
        />
        <UserPicker />
      </header>

      <main className="flex-1 overflow-auto bg-white">
        {status === 'start' && <StartPage />}
        {status === 'loading' && <p className="p-6 text-zinc-500">Loading {address}…</p>}
        {status === 'shown' && site && (
          <SiteFrame html={site.html} onNavigate={(href) => go(href, 'link')} />
        )}
        {status === 'nowhere' && <NowherePage address={address} />}
        {status === 'error' && (
          <p className="p-6 text-red-600">Could not load {address}. Is the backend running?</p>
        )}
      </main>
    </div>
  );
}
