'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';

export default function StartPage({ onSearch }: { onSearch: (query: string) => void }) {
  const { user } = useUser();
  const [text, setText] = useState('');

  return (
    <div className="mx-auto max-w-xl px-6 py-20 text-center">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-faint">A tiny web of its own</p>
      <h1 className="mb-3 text-4xl font-bold tracking-tight">
        The <span className="text-brand">Small</span> Web
      </h1>
      <p className="mb-8 text-muted">
        {user
          ? `Hello ${user.name}. Type an address above, or search below.`
          : 'Pick a name to start browsing.'}
      </p>

      {user && (
        <form
          className="card flex gap-2 p-2 shadow-sm"
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
      )}
    </div>
  );
}
