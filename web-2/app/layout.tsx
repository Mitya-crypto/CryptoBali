import '../styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'CRYPTOBALI', description: 'Surf-style crypto exchange' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}