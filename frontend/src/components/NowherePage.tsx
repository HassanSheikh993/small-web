export default function NowherePage({ address }: { address: string }) {
  return (
    <div className="mx-auto max-w-xl px-6 py-20 text-center">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-bad bg-bad/10 text-2xl text-bad">
        ?
      </div>
      <h1 className="mb-2 text-2xl font-semibold">Nowhere</h1>
      <p className="text-muted">
        There is no site at <span className="rounded bg-card px-1.5 py-0.5 font-mono text-ink">{address}</span>.
      </p>
    </div>
  );
}
