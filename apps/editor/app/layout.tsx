export const metadata = {
  title: 'Dragons Editor',
  description: 'Edit dragonfly species data',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
