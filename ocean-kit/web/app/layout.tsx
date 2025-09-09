import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

const TonConnectProvider = dynamic(
  () => import('@/components/providers/TonConnectProvider'),
  { ssr: false }
);

export const metadata: Metadata = { title: 'CryptoBali' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TonConnectProvider>{children}</TonConnectProvider>
      </body>
    </html>
  );
}
