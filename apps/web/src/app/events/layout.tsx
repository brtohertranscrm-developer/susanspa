import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Ruang Pertemuan & Acara Privat | Susan Spa & Resort',
  description: 'Penyelenggaraan retreat perusahaan, rapat kerja strategis, dan acara gathering keluarga di sejuknya lereng Bandungan.',
};

export default function EventsLayout({ children }: { children: ReactNode }) {
  return children;
}
