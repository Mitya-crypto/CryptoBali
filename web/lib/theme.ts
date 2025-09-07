export type Theme = 'day' | 'sunset' | 'night';

export function getBaliTheme(date = new Date(), tz = process.env.NEXT_PUBLIC_BALI_TZ || 'Asia/Makassar'): Theme {
  // Получаем «час» по часовому поясу Бали
  const f = new Intl.DateTimeFormat('en-US', { hour:'numeric', hour12:false, timeZone: tz });
  const hour = Number(f.format(date));
  // День: 06-17, Закат: 17-19, Ночь: 19-06
  if (hour >= 6 && hour < 17) return 'day';
  if (hour >= 17 && hour < 19) return 'sunset';
  return 'night';
}