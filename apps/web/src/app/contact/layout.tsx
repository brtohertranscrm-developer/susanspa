import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Contact & Location',
  description: 'Contact Susan Spa & Resort in Bandungan for room, spa, wedding, and event inquiries.',
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
