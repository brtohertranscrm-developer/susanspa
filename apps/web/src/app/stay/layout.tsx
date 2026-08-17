import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Luxury Rooms, Suites & Villas',
  description: 'Explore mountain villas, jacuzzi suites, deluxe rooms, and family accommodation at Susan Spa & Resort in Bandungan.',
};

export default function StayLayout({ children }: { children: ReactNode }) {
  return children;
}
