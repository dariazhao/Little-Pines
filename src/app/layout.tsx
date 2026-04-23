import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/nav'
import { ConditionalFooter } from '@/components/conditional-footer'
import { PageTransition } from '@/components/page-transition'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Little Pines Studio — Handcrafted Play for Curious Minds',
    template: '%s | Little Pines Studio',
  },
  description:
    'Open-source toy patterns and handcrafted bears for Montessori and Waldorf-inspired childhood. Ethically made with fine Peruvian alpaca fiber.',
  keywords: [
    'Montessori toys',
    'Waldorf toys',
    'open source toy patterns',
    'handcrafted alpaca plush',
    'natural fiber toys',
    'educational toys',
    'Little Pines Studio',
  ],
  authors: [{ name: 'Daria Zhao', url: 'https://github.com/dariazhao' }],
  creator: 'Little Pines Studio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Little Pines Studio',
    title: 'Little Pines Studio — Handcrafted Play for Curious Minds',
    description:
      'Open-source toy patterns and handcrafted bears for Montessori and Waldorf-inspired childhood.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Little Pines Studio',
    description: 'Handcrafted play for curious minds.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <PageTransition />
        <Nav />
        <main>{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  )
}
