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

  const input = 'w-full rounded border border-zinc-300 px-3 py-2';

  return (
    <div className="h-full overflow-auto">
      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-4 px-6 py-8">
        <h1 className="text-2xl font-semibold">Publish a site</h1>

        <label className="block">
          <span className="mb-1 block text-sm text-zinc-600">Address</span>
          <input
            className={`${input} font-mono`}
            placeholder="mypage.zz"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm text-zinc-600">Title</span>
          <input className={input} value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm text-zinc-600">HTML</span>
          <textarea
            className={`${input} h-64 font-mono text-sm`}
            placeholder={'<h1>Hello</h1>\n<p>My page. Link to <a href="tidepool.zz">tidepool</a>.</p>'}
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            required
          />
          <span className="mt-1 block text-xs text-zinc-500">
            HTML and inline CSS only. No scripts, forms or outside images. Link to other sites by
            address, e.g. href=&quot;tidepool.zz&quot;.
          </span>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm text-zinc-600">Author</span>
          <select className={input} value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={sending}
          className="rounded bg-zinc-800 px-4 py-2 text-white hover:bg-zinc-700 disabled:opacity-50"
        >
          {sending ? 'Publishing…' : 'Publish'}
        </button>
      </form>
    </div>
  );
}
