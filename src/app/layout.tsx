import type { Metadata } from 'next'
import { JetBrains_Mono, Cedarville_Cursive } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const brier = localFont({
  src: '../fonts/Brier-Bold.woff2',
  weight: '700',
  variable: '--font-brier',
  display: 'swap',
})

const monaSans = localFont({
  src: '../fonts/MonaSans-Variable.woff2',
  weight: '200 900',
  variable: '--font-mona',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
})

const cedarville = Cedarville_Cursive({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
})

export const metadata: Metadata = {
  title: 'Timelly — Intelligence for Education',
  description:
    'Timelly — Cloud-based SaaS for school management and parent engagement. Investor pitch.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${brier.variable} ${monaSans.variable} ${jetbrainsMono.variable} ${cedarville.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg-primary overflow-x-hidden cursor-none" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
