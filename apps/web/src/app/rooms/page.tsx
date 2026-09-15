import RoomsPageClient from './RoomsPageClient';
import { getRooms } from '@/lib/cms';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rooms & Suites | Susan Spa & Resort',
  description: 'Comfort, elegance and mountain serenity in Bandungan. Discover our suites, villas, and family rooms.',
};

export default async function RoomsPage() {
  const rooms = await getRooms();
  return <RoomsPageClient rooms={rooms} />;
}
