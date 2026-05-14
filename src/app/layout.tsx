import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  axes: ['opsz', 'SOFT'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://indiaisraelcentre.org'),
  title: {
    default: 'India Israel Centre',
    template: '%s | India Israel Centre',
  },
  description:
    'The India Israel Centre is an independent forum dedicated to rigorous academic inquiry, substantive policy engagement, and the informed public dissemination of knowledge concerning the bilateral relationship between India and Israel.',
  openGraph: {
    type: 'website',
    siteName: 'India Israel Centre',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} scroll-smooth`}>
      <body className="bg-white text-stone-900 antialiased font-serif selection:bg-iic-saffron/30 selection:text-iic-navy">
        {children}
      </body>
    </html>
  )
}
