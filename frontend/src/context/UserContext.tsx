'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getUsers } from '@/lib/api';
import type { User } from '@/lib/types';

type UserContextValue = {
  users: User[];
  user: User | null; // who is browsing
  selectUser: (id: string) => void;
  error: string | null;
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setError('Could not load users. Is the backend running?'));
  }, []);

  function selectUser(id: string) {
    setUser(users.find((u) => u._id === id) ?? null);
  }

  return (
    <UserContext.Provider value={{ users, user, selectUser, error }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const value = useContext(UserContext);
  if (!value) throw new Error('useUser must be used inside UserProvider');
  return value;
}
