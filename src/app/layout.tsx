// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Seven SMS Console',
  description: 'Send secure messages with style',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-sans min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}

