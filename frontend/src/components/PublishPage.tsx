'use client';

import { useEffect, useState } from 'react';
import { ApiError, publishSite } from '@/lib/api';
import { toAddress } from '@/lib/address';
import { useUser } from '@/context/UserContext';

export type PublishDraft = {
  address: string;
  title: string;
  html: string;
  authorId: string;
};

type Props = {
  saved?: PublishDraft; // given when coming back to this screen
  defaultAuthorId: string; // the person browsing
  onChange: (draft: PublishDraft) => void; // keeps Browser's copy up to date
  onPublished: (address: string) => void; // open the new site
};

export default function PublishPage({ saved, defaultAuthorId, onChange, onPublished }: Props) {
  const { users } = useUser();

  const [address, setAddress] = useState(saved?.address ?? '');
  const [title, setTitle] = useState(saved?.title ?? '');
  const [html, setHtml] = useState(saved?.html ?? '');
  const [authorId, setAuthorId] = useState(saved?.authorId ?? defaultAuthorId);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onChange({ address, title, html, authorId });
  }, [address, title, html, authorId, onChange]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      const site = await publishSite({ address: toAddress(address), title, html, userId: authorId });
      onPublished(site.address);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not publish. Is the backend running?');
      setSending(false);
    }
  }

  const input = 'input';
  const label = 'mb-1 block text-sm font-medium text-muted';

  return (
    <div className="h-full overflow-auto">
      <form onSubmit={handleSubmit} className="card mx-auto my-8 max-w-2xl space-y-5 p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-semibold">Publish a site</h1>
          <p className="text-sm text-faint">Give it an address and a page of HTML.</p>
        </div>

        <label className="block">
          <span className={label}>Address</span>
          <input
            className={`${input} font-mono`}
            placeholder="mypage.zz"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>

        <label className="block">
          <span className={label}>Title</span>
          <input className={input} value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>

        <label className="block">
          <span className={label}>HTML</span>
          <textarea
            className={`${input} h-64 font-mono text-sm`}
            placeholder={'<h1>Hello</h1>\n<p>My page. Link to <a href="tidepool.zz">tidepool</a>.</p>'}
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            required
          />
          <span className="mt-2 block rounded-lg bg-brand-soft px-3 py-2 text-xs text-muted">
            HTML and inline CSS only. No scripts, forms or outside images. Link to other sites by
            address, e.g. href=&quot;tidepool.zz&quot;.
          </span>
        </label>

        <label className="block">
          <span className={label}>Author</span>
          <select className={input} value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>
        </label>

        {error && (
          <p className="rounded-lg border border-bad/30 bg-bad/10 px-3 py-2 text-sm text-bad">{error}</p>
        )}

        <button type="submit" disabled={sending} className="btn btn-primary">
          {sending ? 'Publishing…' : 'Publish'}
        </button>
      </form>
    </div>
  );
}
