import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Luxury Rooms, Suites & Villas',
  description: 'Explore Aurora Junior Suite, Family Room, Family Suite Room, Grand Deluxe, Grand Suite, President Suite, Prime Room, Prince Suite, Princess Suite and Villa 1 Big Room at Susan Spa & Resort.',
};

export default function StayLayout({ children }: { children: ReactNode }) {
  return children;
}
