'use client';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useRef, useState } from 'react';

export default function QRScanner({ onParsed }: { onParsed: (data: {asset: 'ton'|'jetton', to?: string, amount?: string, comment?: string, master?: string}) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 240 });
    scanner.render((text: string) => {
      try {
        const res = parseTonLink(text);
        onParsed(res);
      } catch (e) {
        // fallback: plain address
        if (/^UQ|^EQ|^kQ|^0:/.test(text)) onParsed({ asset: 'ton', to: text });
      }
    }, (err: any) => {});
    setReady(true);
    return () => scanner.clear();
  }, []);

  return <div className="card"><div id="qr-reader" ref={ref} /></div>;
}

function parseTonLink(link: string): {asset: 'ton'|'jetton', to?: string, amount?: string, comment?: string, master?: string} {
  // ton://transfer/EQ...?amount=...&text=...
  if (link.startsWith('ton://transfer/')) {
    const u = new URL(link);
    const to = decodeURIComponent(u.pathname.split('/').pop() || '');
    const amountNano = u.searchParams.get('amount');
    const comment = u.searchParams.get('text') || undefined;
    const amount = amountNano ? (Number(amountNano) / 1e9).toString() : undefined;
    return { asset: 'ton', to, amount, comment };
  }
  // Tonkeeper jetton: https://app.tonkeeper.com/transfer/<master>?address=<to>&amount=&text=
  if (link.includes('app.tonkeeper.com/transfer/')) {
    const u = new URL(link);
    const master = u.pathname.split('/').pop() || '';
    const to = u.searchParams.get('address') || undefined;
    const amount = u.searchParams.get('amount') || undefined;
    const comment = u.searchParams.get('text') || undefined;
    return { asset: 'jetton', master, to, amount, comment };
  }
  throw new Error('unknown');
}
