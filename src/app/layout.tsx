import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'River City Discipleship',
  description: 'Walk with God and with each other toward Jesus.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Disciple',
  },
}

export const viewport: Viewport = {
  themeColor: '#f2efe8',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col" style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)' }}>
        {children}
      </body>
    </html>
  )
}
