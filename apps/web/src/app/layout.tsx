import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.susansparesort.com'),
  title: {
    default: 'Susan Spa & Resort — Luxury Mountain Retreat in Bandungan',
    template: '%s | Susan Spa & Resort',
  },
  description:
    'Discover restorative stays, elevated wellness spa rituals, and romantic weddings at La Kana Chapel, surrounded by Mount Ungaran at ~1,100 meters elevation in Bandungan, Central Java.',
  keywords: [
    'Susan Spa & Resort',
    'Resort Bandungan',
    'Luxury Hotel Semarang',
    'La Kana Chapel Wedding',
    'Bandungan Spa Retreat',
    'Mount Ungaran Hotel',
    'Central Java Mountain Resort',
  ],
  authors: [{ name: 'Susan Spa & Resort' }],
  creator: 'Susan Spa & Resort',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.susansparesort.com/',
    siteName: 'Susan Spa & Resort',
    title: 'Susan Spa & Resort — Luxury Mountain Retreat in Bandungan',
    description:
      'Elevated serenity at ~1,100m ASL. Restorative luxury accommodation, spa sanctuary, and iconic La Kana Chapel weddings.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Susan Spa & Resort Bandungan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Susan Spa & Resort — Luxury Mountain Retreat in Bandungan',
    description: 'Elevated serenity at ~1,100m ASL in Central Java, Indonesia.',
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Resort',
    name: 'Susan Spa & Resort',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200',
    '@id': 'https://www.susansparesort.com/',
    url: 'https://www.susansparesort.com/',
    telephone: '+62298711111',
    priceRange: 'IDR 1,650,000 - IDR 4,800,000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dusun Piyoto',
      addressLocality: 'Bandungan',
      addressRegion: 'Central Java',
      postalCode: '50614',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -7.2185,
      longitude: 110.3705,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-champagne selection:text-forest-deep">
        {children}
      </body>
    </html>
  );
}
