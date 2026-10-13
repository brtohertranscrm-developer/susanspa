import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Ballroom & Meeting Room | Susan Spa & Resort',
  description: 'Ballroom luas berfasilitas audio-visual modern untuk resepsi, jamuan, dan seminar, serta ruang meeting dengan proyektor dan layanan rehat kopi.',
};

export default function BallroomLayout({ children }: { children: ReactNode }) {
  return children;
}
