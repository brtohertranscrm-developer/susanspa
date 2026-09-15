import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Pernikahan La Kana Glass Chapel | Susan Spa & Resort',
  description: 'Rencanakan momen pernikahan sakral di kapel kaca ikonik La Kana dan Sky Lawn Susan Spa & Resort Bandungan.',
};

export default function WeddingsLayout({ children }: { children: ReactNode }) {
  return children;
}
