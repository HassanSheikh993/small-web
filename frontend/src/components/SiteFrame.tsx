'use client';

import { useEffect, useRef } from 'react';


const CSP = "default-src 'none'; style-src 'unsafe-inline'; img-src data:";

type Props = {
  html: string;
  onNavigate: (href: string) => void;
};

export default function SiteFrame({ html, onNavigate }: Props) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  const onNavigateRef = useRef(onNavigate);
  useEffect(() => {
    onNavigateRef.current = onNavigate;
  }, [onNavigate]);

  function handleLoad() {
    const doc = frameRef.current?.contentDocument;
    if (!doc) return;

    
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
      className="h-full w-full border-0"
    />
  );
}
