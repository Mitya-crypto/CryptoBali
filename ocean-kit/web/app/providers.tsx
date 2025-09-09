'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// если алиас "@" не настроен, замени на относительный импорт
const TonConnectProvider = dynamic(
  () => import('../components/providers/TonConnectProvider'),
  { ssr: false }
);

export default function Providers({ children }: { children: React.ReactNode }) {
  return <TonConnectProvider>{children}</TonConnectProvider>;
}
