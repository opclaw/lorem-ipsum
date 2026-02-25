import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://lorem-ipsum.vercel.app'),
  title: 'Lorem Ipsum Generator — Generate Placeholder Text | Free Tool',
  description: 'Generate Lorem Ipsum placeholder text for your designs. Free online Lorem Ipsum generator.',
  keywords: ['lorem ipsum', 'lorem ipsum generator', 'placeholder text', 'dummy text'],
  authors: [{ name: 'SmartOK Tools' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lorem-ipsum.vercel.app',
    siteName: 'Lorem Ipsum',
    title: 'Lorem Ipsum Generator — Generate Placeholder Text',
    description: 'Generate Lorem Ipsum placeholder text.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lorem Ipsum Generator',
    description: 'Generate Lorem Ipsum placeholder text.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Lorem Ipsum Generator',
              applicationCategory: 'UtilitiesApplication',
              operatingSystem: 'Any',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              featureList: 'Custom paragraphs, Custom words, HTML format, Plain text',
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  )
}
