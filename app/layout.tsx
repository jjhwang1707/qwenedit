import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QwenEdit - Precision Image Editor',
  description: 'AI-powered precision image editor using Qwen and Nanobanana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  )
}
