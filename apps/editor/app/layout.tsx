import { Nav } from '@/components/Nav'
import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Dragonfly API Editor',
  description: 'Edit dragonfly species data'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  )
}
