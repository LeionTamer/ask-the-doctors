import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex h-screen flex-col bg-slate-200 antialiased`}
      >
        <div className="my-auto flex h-[3rem] items-center bg-red-600 align-middle">
          <div>Header goes here</div>
        </div>
        <div className="h-[calc(100vh - 3rem)] flex-grow">{children}</div>
      </body>
    </html>
  )
}
