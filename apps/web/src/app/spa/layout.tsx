import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Spa & Wellness Sanctuary | Susan Spa & Resort',
  description: 'Rasakan kesegaran ritual lulur rempah tradisional Jawa, terapi batu basal hangat Gunung Ungaran, dan hidroterapi di Susan Spa & Resort.',
};

export default function SpaLayout({ children }: { children: ReactNode }) {
  return children;
}
