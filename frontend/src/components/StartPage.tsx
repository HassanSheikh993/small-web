'use client';

import { useUser } from '@/context/UserContext';

export default function StartPage() {
  const { user } = useUser();

  return (
    <div className="mx-auto max-w-xl px-6 py-16 text-center">
      <h1 className="mb-3 text-3xl font-semibold">The Small Web</h1>
      <p className="text-zinc-600">
        {user
          ? `Hello ${user.name}. Type an address above to start browsing.`
          : 'Pick a name to start browsing.'}
      </p>
    </div>
  );
}
