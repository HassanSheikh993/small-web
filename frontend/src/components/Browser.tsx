'use client';

import { useRef, useState } from 'react';
import { getSite } from '@/lib/api';
import { toAddress } from '@/lib/address';
import type { Site } from '@/lib/types';
import Toolbar from './Toolbar';
import UserPicker from './UserPicker';
import StartPage from './StartPage';
import SiteFrame from './SiteFrame';
import NowherePage from './NowherePage';

type Status = 'start' | 'loading' | 'shown' | 'nowhere' | 'error';

export default function Browser() {
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState<Status>('start');
  const [site, setSite] = useState<Site | null>(null);

  const latest = useRef('');

  async function go(input: string) {
    const next = toAddress(input);
    if (!next) return;

    latest.current = next;
    setAddress(next);
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

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center gap-4 border-b border-zinc-200 bg-zinc-100 px-4 py-2">
        <Toolbar key={address} currentAddress={address} onGo={go} />
        <UserPicker />
      </header>

      <main className="flex-1 overflow-auto bg-white">
        {status === 'start' && <StartPage />}
        {status === 'loading' && <p className="p-6 text-zinc-500">Loading {address}…</p>}
        {status === 'shown' && site && <SiteFrame html={site.html} onNavigate={go} />}
        {status === 'nowhere' && <NowherePage address={address} />}
        {status === 'error' && (
          <p className="p-6 text-red-600">Could not load {address}. Is the backend running?</p>
        )}
      </main>
    </div>
  );
}
