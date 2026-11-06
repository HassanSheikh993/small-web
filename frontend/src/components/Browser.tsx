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
import SearchPage, { type SearchSnapshot } from './SearchPage';
import PublishPage, { type PublishDraft } from './PublishPage';

type Status = 'start' | 'loading' | 'shown' | 'nowhere' | 'error' | 'history' | 'search' | 'publish';

// Internal screens
const HISTORY = 'about:history';
const SEARCH = 'about:search';
const PUBLISH = 'about:publish';

const isInternal = (address: string) => address.startsWith('about:');
const isSearch = (address: string) => address === SEARCH || address.startsWith(`${SEARCH}?`);

// "tide pool" -> "about:search?q=tide%20pool", and back again.
const searchAddress = (query: string) => `${SEARCH}?q=${encodeURIComponent(query)}`;
const queryOf = (address: string) => new URLSearchParams(address.split('?')[1] ?? '').get('q') ?? '';

type Entry = {
  address: string;
  scrollY: number;
  history?: HistorySnapshot; // only for about:history: the rows and scroll to restore
  search?: SearchSnapshot; // only for about:search: the results and scroll to restore
  publish?: PublishDraft; // only for about:publish: what was typed in the form
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
  const searchSnap = useRef<SearchSnapshot | null>(null); // latest state of the search screen
  const saveSearch = useCallback((s: SearchSnapshot) => {
    searchSnap.current = s;
  }, []);
  const publishSnap = useRef<PublishDraft | null>(null); // latest state of the publish form
  const savePublish = useCallback((d: PublishDraft) => {
    publishSnap.current = d;
  }, []);

  const address = nav.current?.address ?? '';


  function currentWithScroll(): Entry | null {
    if (!nav.current) return null;
    if (status === 'history') return { ...nav.current, history: historySnap.current ?? undefined };
    if (status === 'search') return { ...nav.current, search: searchSnap.current ?? undefined };
    if (status === 'publish') return { ...nav.current, publish: publishSnap.current ?? undefined };
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
    if (isSearch(next)) {
      setStatus('search');
      return;
    }
    if (next === PUBLISH) {
      setStatus('publish');
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
    if (!user || isInternal(next)) return; // history, search and publish screens are not visits
    recordVisit(user._id, next, how).catch(() => {});
  }

  //  opens a new page
  function go(input: string, how: NewPageHow) {
    if (!user) return;
    const next = toAddress(input);
    if (!next) return;
    if (isInternal(next) && next === address) return; // already on this history / search screen
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
          onSearch={() => go(SEARCH, 'typed')}
          onPublish={() => go(PUBLISH, 'typed')}
        />
        <UserPicker />
      </header>

      <main className="flex-1 overflow-auto bg-white">
        {status === 'start' && <StartPage onSearch={(q) => go(searchAddress(q), 'typed')} />}
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
        {status === 'search' && (
          <SearchPage
            key={address} // a new search = a fresh screen
            query={queryOf(address)}
            saved={nav.current?.search}
            onChange={saveSearch}
            onSearch={(q) => go(searchAddress(q), 'typed')}
            onOpen={(a) => go(a, 'search')}
          />
        )}
        {status === 'publish' && user && (
          <PublishPage
            saved={nav.current?.publish}
            defaultAuthorId={user._id}
            onChange={savePublish}
            onPublished={(a) => go(a, 'typed')}
          />
        )}
        {status === 'error' && (
          <p className="p-6 text-red-600">Could not load {address}. Is the backend running?</p>
        )}
      </main>
    </div>
  );
}
