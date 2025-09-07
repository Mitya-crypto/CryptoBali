export type TgInit = { userId?: number; username?: string; initData?: string };

export function getTelegramInit(): TgInit {
  if (typeof window === 'undefined') return {};
  const anyWin = window as any;
  const tg = anyWin?.Telegram?.WebApp;
  if (!tg) {
    if (process.env.NEXT_PUBLIC_TG_TEST_MODE === 'true') {
      // Дев-режим
      return { userId: 777000, username: 'dev', initData: 'test' };
    }
    return {};
  }
  const initDataUnsafe = tg.initDataUnsafe || {};
  return {
    userId: initDataUnsafe?.user?.id,
    username: initDataUnsafe?.user?.username,
    initData: anyWin?.Telegram?.WebApp?.initData
  };
}