import type { Metadata } from 'next'
import {
  Bebas_Neue,
  DM_Sans,
  JetBrains_Mono,
  Playfair_Display,
  Cedarville_Cursive,
} from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
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
      className={`${bebasNeue.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${playfair.variable} ${cedarville.variable}`}
    >
      <body className="bg-bg-primary overflow-x-hidden cursor-none">
        {children}
      </body>
    </html>
  )
}
