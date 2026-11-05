import type { HistoryPage, NewSite, SearchResult, Site, User, Visit, VisitHow } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = Array.isArray(body?.message) ? body.message.join(', ') : body?.message;
    throw new ApiError(res.status, message ?? `Request failed (${res.status})`);
  }

  return res.json() as Promise<T>;
}

export function getUsers() {
  return request<User[]>('/users');
}


export async function getSite(address: string): Promise<Site | null> {
  try {
    return await request<Site>(`/sites/${encodeURIComponent(address)}`);
  } catch (err) {
    if (err instanceof ApiError && (err.status === 404 || err.status === 400)) return null;
    throw err;
  }
}

export function searchSites(q: string) {
  return request<SearchResult[]>(`/sites/search?q=${encodeURIComponent(q)}`);
}

export function publishSite(site: NewSite) {
  return request<Pick<Site, '_id' | 'address' | 'title'>>('/sites', {
    method: 'POST',
    body: JSON.stringify(site),
  });
}

export function recordVisit(userId: string, address: string, how: VisitHow) {
  return request<Visit>('/visits', {
    method: 'POST',
    body: JSON.stringify({ userId, address, how }),
  });
}

export function getHistory(userId: string, page = 0) {
  return request<HistoryPage>(`/visits?userId=${encodeURIComponent(userId)}&page=${page}`);
}
