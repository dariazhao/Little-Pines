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
  metadataBase: new URL('https://littlepines.studio'),
  title: {
    default: 'Little Pines Studio | Home',
    template: '%s | Little Pines Studio',
  },
  description:
    'An open-source toy studio that helps young children notice and name what they feel.',
  keywords: [
    'Montessori toys',
    'Waldorf toys',
    'open source toy patterns',
    'emotional literacy',
    'children emotional development',
    'natural fiber toys',
    'Little Pines Studio',
  ],
  authors: [{ name: 'Daria Zhao', url: 'https://github.com/dariazhao' }],
  creator: 'Little Pines Studio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Little Pines Studio',
    title: 'Little Pines · Open-Source Toy Studio',
    description:
      'An open-source toy studio that helps young children notice and name what they feel.',
    images: [{ url: '/preview1.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Little Pines · Open-Source Toy Studio',
    description: 'An open-source toy studio that helps young children notice and name what they feel.',
    images: ['/preview1.png'],
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
