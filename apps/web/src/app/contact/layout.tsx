import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Kontak & Lokasi | Susan Spa & Resort',
  description: 'Hubungi concierge Susan Spa & Resort Bandungan untuk reservasi kamar, perawatan spa, paket pernikahan, dan acara pertemuan.',
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
