'use client';

import { useEffect, useRef } from 'react';
import type React from 'react';


const CSP = "default-src 'none'; style-src 'unsafe-inline'; img-src data:";

type Props = {
  html: string;
  initialScrollY: number; // where to scroll after loading (0 = top)
  frameRef: React.RefObject<HTMLIFrameElement | null>; // lets Browser read the scroll position
  onNavigate: (href: string) => void;
};

export default function SiteFrame({ html, initialScrollY, frameRef, onNavigate }: Props) {
  const onNavigateRef = useRef(onNavigate);
  useEffect(() => {
    onNavigateRef.current = onNavigate;
  }, [onNavigate]);

  function handleLoad() {
    const doc = frameRef.current?.contentDocument;
    if (!doc) return;

    frameRef.current?.contentWindow?.scrollTo(0, initialScrollY);

    doc.addEventListener('click', (event) => {
      const link = (event.target as Element).closest('a');
      if (!link) return;
      event.preventDefault();
      const href = link.getAttribute('href');
      if (href) onNavigateRef.current(href);
    });
  }

  return (
    <iframe
      ref={frameRef}
      title="Site"

      sandbox="allow-same-origin"
      srcDoc={`<meta http-equiv="Content-Security-Policy" content="${CSP}">${html}`}
      onLoad={handleLoad}
      className="block h-full w-full border-0 bg-white"
    />
  );
}
