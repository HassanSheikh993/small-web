'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';

export default function StartPage({ onSearch }: { onSearch: (query: string) => void }) {
  const { user } = useUser();
  const [text, setText] = useState('');

  return (
    <div className="mx-auto max-w-xl px-6 py-16 text-center">
      <h1 className="mb-3 text-3xl font-semibold">The Small Web</h1>
      <p className="mb-6 text-zinc-600">
        {user
          ? `Hello ${user.name}. Type an address above, or search below.`
          : 'Pick a name to start browsing.'}
      </p>

      {user && (
        <form
          className="flex gap-2"
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
      )}
    </div>
  );
}
