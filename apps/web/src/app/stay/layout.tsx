import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Pilihan Kamar, Suite & Villa | Susan Spa & Resort',
  description: 'Temukan kenyamanan menginap di Susan Spa & Resort: Aurora Junior Suite, Family Room, Family Suite Room, Grand Deluxe, Grand Suite, President Suite, Prime Room, Prince Suite, Princess Suite, Villa 1 Big Room, dan Villa 4 Bedrooms.',
};

export default function StayLayout({ children }: { children: ReactNode }) {
  return children;
}
