import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Journal & Stories',
  description: 'Read wellness stories, wedding inspiration, and destination guides from Susan Spa & Resort.',
};

export default function JournalLayout({ children }: { children: ReactNode }) {
  return children;
}
