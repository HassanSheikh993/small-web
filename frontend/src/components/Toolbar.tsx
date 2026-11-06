'use client';

import { useState } from 'react';

type Props = {
  currentAddress: string;
  disabled: boolean; // true when no user is picked
  canBack: boolean;
  canForward: boolean;
  onGo: (address: string) => void;
  onBack: () => void;
  onForward: () => void;
  onHistory: () => void;
};

export default function Toolbar({
  currentAddress, // The address of the page you’re on now, shown in the bar.
  disabled,      // true when no user is picked, which disables the input.
  canBack,      // Whether the back pile has something. If not, ← is disabled.
  canForward,   // Whether the forward pile has something. If not, → is disabled.
  onGo,         // Called when you press Enter in the address bar.
  onBack,      // Called when you click ←.
  onForward,   // Called when you click →.
  onHistory,   // Called when you click History.
}: Props) {
  const [address, setAddress] = useState(currentAddress);

  return (
    <form
      className="flex flex-1 items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onGo(address);
      }}
    >
      <button
        type="button"
        onClick={onBack}
        disabled={!canBack}
        className="rounded px-2 py-1 hover:bg-zinc-200 disabled:opacity-40 disabled:hover:bg-transparent"
        aria-label="Back"
      >
        ←
      </button>
      <button
        type="button"
        onClick={onForward}
        disabled={!canForward}
        className="rounded px-2 py-1 hover:bg-zinc-200 disabled:opacity-40 disabled:hover:bg-transparent"
        aria-label="Forward"
      >
        →
      </button>
      <input
        className="flex-1 rounded border border-zinc-300 bg-white px-3 py-1 font-mono text-sm disabled:bg-zinc-100"
        placeholder={disabled ? 'Pick a name first' : 'Type an address, e.g. tidepool.zz'}
        value={address}
        disabled={disabled}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button
        type="button"
        onClick={onHistory}
        disabled={disabled}
        className="rounded px-2 py-1 text-sm hover:bg-zinc-200 disabled:opacity-40 disabled:hover:bg-transparent"
      >
        History
      </button>
    </form>
  );
}
