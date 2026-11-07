'use client';

import { useUser } from '@/context/UserContext';

export default function UserPicker() {
  const { users, user, selectUser, error } = useUser();

  if (error) return <span className="text-sm text-bad">{error}</span>;

  return (
    <label className="flex items-center gap-2 border-l border-line pl-4 text-sm">
      <span className="text-faint">Browsing as</span>
      <select
        className="input w-auto py-1.5"
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
