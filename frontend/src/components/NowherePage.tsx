export default function NowherePage({ address }: { address: string }) {
  return (
    <div className="mx-auto max-w-xl px-6 py-16 text-center">
      <h1 className="mb-3 text-2xl font-semibold">Nowhere</h1>
      <p className="text-zinc-600">
        There is no site at <span className="font-mono">{address}</span>.
      </p>
    </div>
  );
}
