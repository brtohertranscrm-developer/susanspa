import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Meetings & Events',
  description: 'Host corporate retreats, meetings, and private events in the Bandungan highlands.',
};

export default function EventsLayout({ children }: { children: ReactNode }) {
  return children;
}
