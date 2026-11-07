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
  onSearch: () => void;
  onPublish: () => void;
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
  onSearch,    // Called when you click Search.
  onPublish,   // Called when you click Publish.
}: Props) {
  const [address, setAddress] = useState(currentAddress);

  return (
    <form
      className="flex flex-1 items-center gap-1.5"
      onSubmit={(e) => {
        e.preventDefault();
        onGo(address);
      }}
    >
      <button
        type="button"
        onClick={onBack}
        disabled={!canBack}
        className="btn btn-ghost text-lg"
        aria-label="Back"
      >
        ←
      </button>
      <button
        type="button"
        onClick={onForward}
        disabled={!canForward}
        className="btn btn-ghost text-lg"
        aria-label="Forward"
      >
        →
      </button>
      <input
        className="input mx-1 flex-1 rounded-full py-1.5 font-mono text-sm"
        placeholder={disabled ? 'Pick a name first' : 'Type an address, e.g. tidepool.zz'}
        value={address}
        disabled={disabled}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button
        type="button"
        onClick={onSearch}
        disabled={disabled}
        className="btn btn-ghost"
      >
        Search
      </button>
      <button
        type="button"
        onClick={onHistory}
        disabled={disabled}
        className="btn btn-ghost"
      >
        History
      </button>
      <button
        type="button"
        onClick={onPublish}
        disabled={disabled}
        className="btn btn-primary px-3 py-1.5"
      >
        Publish
      </button>
    </form>
  );
}
