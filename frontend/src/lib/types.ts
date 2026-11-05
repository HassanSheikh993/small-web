// Shapes of the data the backend returns

export type User = {
  _id: string;
  name: string;
};

export type Site = {
  _id: string;
  address: string;
  title: string;
  html: string;
  userId: User; // populated by the backend
};

export type SearchResult = {
  address: string;
  title: string;
  snippet: string;
  score: number;
};

export type VisitHow = 'typed' | 'link' | 'back' | 'forward' | 'history' | 'search';

export type Visit = {
  _id: string;
  address: string;
  how: VisitHow;
  visitedAt: string;
};

export type HistoryPage = {
  visits: Visit[];
  hasMore: boolean;
};

export type NewSite = {
  address: string;
  title: string;
  html: string;
  userId: string;
};
