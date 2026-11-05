'use client';

import { useState } from 'react';

export default function Toolbar() {
  const [address, setAddress] = useState('');

  return (
    <form className="flex flex-1 items-center gap-2" onSubmit={(e) => e.preventDefault()}>
      <button type="button" disabled className="rounded px-2 py-1 disabled:opacity-40" aria-label="Back">
        ←
      </button>
      <button type="button" disabled className="rounded px-2 py-1 disabled:opacity-40" aria-label="Forward">
        →
      </button>
      <input
        className="flex-1 rounded border border-zinc-300 bg-white px-3 py-1 font-mono text-sm"
        placeholder="Type an address, e.g. tidepool.zz"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
    </form>
  );
}
