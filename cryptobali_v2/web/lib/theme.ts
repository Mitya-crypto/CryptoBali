export type Theme = 'day' | 'sunset' | 'night'

export function getBaliTheme(date = new Date(), tz = process.env.NEXT_PUBLIC_BALI_TZ || 'Asia/Makassar'): Theme {
  const f = new Intl.DateTimeFormat('en-US', { hour:'numeric', hour12:false, timeZone: tz })
  const hour = Number(f.format(date))
  if (hour >= 6 && hour < 17) return 'day'
  if (hour >= 17 && hour < 19) return 'sunset'
  return 'night'
}