import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Jurnal & Inspirasi | Susan Spa & Resort',
  description: 'Inspirasi kebugaran alami, panduan pernikahan sakral, dan kisah perjalanan di lereng pegunungan Bandungan.',
};

export default function JournalLayout({ children }: { children: ReactNode }) {
  return children;
}
