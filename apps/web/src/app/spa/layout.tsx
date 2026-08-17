import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Spa & Wellness',
  description: 'Discover restorative massage, hydrotherapy, and mountain wellness treatments at Susan Spa & Resort.',
};

export default function SpaLayout({ children }: { children: ReactNode }) {
  return children;
}
