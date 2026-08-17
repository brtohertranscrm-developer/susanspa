import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'La Kana Chapel Weddings',
  description: 'Plan a mountain wedding at the iconic La Kana glass chapel and Sky Lawn at Susan Spa & Resort.',
};

export default function WeddingsLayout({ children }: { children: ReactNode }) {
  return children;
}
