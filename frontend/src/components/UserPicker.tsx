'use client';

import { useUser } from '@/context/UserContext';

export default function UserPicker() {
  const { users, user, selectUser, error } = useUser();

  if (error) return <span className="text-sm text-red-600">{error}</span>;

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-zinc-500">Browsing as</span>
      <select
        className="rounded border border-zinc-300 bg-white px-2 py-1"
        value={user?._id ?? ''}
        onChange={(e) => selectUser(e.target.value)}
      >
        <option value="" disabled>
          Pick a name
        </option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name}
          </option>
        ))}
      </select>
    </label>
  );
}
