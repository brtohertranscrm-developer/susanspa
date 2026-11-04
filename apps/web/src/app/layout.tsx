import type { Metadata } from 'next';
import './globals.css';
import { getWebsiteImages } from '@/lib/cms';
import { WebsiteImagesProvider } from '@/components/global/WebsiteImages';

const baseMetadata: Metadata = {
  metadataBase: new URL('https://www.susansparesort.com'),
  title: {
    default: 'Susan Spa & Resort: Peristirahatan Menenangkan di Lereng Bandungan',
    template: '%s | Susan Spa & Resort',
  },
  description:
    'Rasakan kenyamanan menginap di ketinggian ±1.100 mdpl lereng Gunung Ungaran, ritual spa herbal tradisional Jawa, dan momen sakral pernikahan di La Kana Glass Chapel, Bandungan, Jawa Tengah.',
  keywords: [
    'Susan Spa & Resort',
    'Resort Bandungan',
    'Hotel Bandungan Semarang',
    'La Kana Chapel Wedding',
    'Spa Bandungan',
    'Hotel Lereng Gunung Ungaran',
    'Resort Pegunungan Jawa Tengah',
  ],
  authors: [{ name: 'Susan Spa & Resort' }],
  creator: 'Susan Spa & Resort',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://www.susansparesort.com/',
    siteName: 'Susan Spa & Resort',
    title: 'Susan Spa & Resort: Peristirahatan Menenangkan di Lereng Bandungan',
    description:
      'Kesejukan udara pegunungan di ketinggian ±1.100 mdpl. Akomodasi suite & villa yang nyaman, spa on the sky, dan kapel pernikahan ikonik La Kana di Bandungan.',
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
    title: 'Susan Spa & Resort: Peristirahatan Menenangkan di Lereng Bandungan',
    description: 'Kesejukan udara pegunungan di ketinggian ±1.100 mdpl lereng Gunung Ungaran, Bandungan, Jawa Tengah.',
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const images = await getWebsiteImages();
  if (!images.socialImage) return baseMetadata;
  const socialImage = { url: images.socialImage.url, alt: images.socialImage.alt || 'Susan Spa & Resort Bandungan' };
  return {
    ...baseMetadata,
    openGraph: { ...baseMetadata.openGraph, images: [socialImage] },
    twitter: { ...baseMetadata.twitter, images: [socialImage.url] },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const images = await getWebsiteImages();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Resort',
    name: 'Susan Spa & Resort',
    image: images.socialImage?.url || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200',
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
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body className="antialiased selection:bg-champagne selection:text-forest-deep">
        <WebsiteImagesProvider images={images}>{children}</WebsiteImagesProvider>
      </body>
    </html>
  );
}
