import type { Metadata, Viewport } from 'next'
import { Space_Mono, Bricolage_Grotesque } from 'next/font/google'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/Cursor'
import { LanguageProvider } from '@/contexts/LanguageContext'

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://trebol.agency'),
  title: 'Trebol Labs — Bridge Between Ideas & Future',
  description:
    'Trebol Labs is a young, ambitious IT & Innovation agency based in Bogotá, Colombia. Two Javerian engineers turning bold ideas into working technology with a MultiStack approach.',
  keywords: [
    'Trebol Labs',
    'MultiStack',
    'software agency Bogotá',
    'Colombia tech',
    'software agency',
    'tech innovation',
    'software development',
    'Bogotá',
    'Colombia',
    'digital strategy',
    'UI/UX',
    'systems architecture',
  ],
  openGraph: {
    title: 'Trebol Labs — Bridge Between Ideas & Future',
    description:
      'Trebol Labs turns bold ideas into working technology. Two Javerian engineers with a hunger for the cutting edge — MultiStack by nature, ambitious by design.',
    url: 'https://trebol.agency',
    siteName: 'Trebol Labs',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Trebol Labs',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trebol Labs — Bridge Between Ideas & Future',
    description:
      'Trebol Labs turns bold ideas into working technology. Two Javerian engineers with a hunger for the cutting edge — MultiStack by nature, ambitious by design.',
    images: ['/og-image.png'],
  },
}

export function generateViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${bricolage.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme:light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t);})()` }} />
      </head>
      <body>
        <LanguageProvider>
          <Cursor />
          <Nav />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
