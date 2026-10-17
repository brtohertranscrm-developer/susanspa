import RoomsPageClient from './RoomsPageClient';
import { getPageHero, getRooms } from '@/lib/cms';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kamar, Suite & Villa | Susan Spa & Resort',
  description: 'Kenyamanan, kehangatan, dan ketenangan lereng pegunungan Bandungan. Jelajahi 11 pilihan suite, villa, dan kamar keluarga kami.',
};

export default async function RoomsPage() {
  const [rooms, heroImage] = await Promise.all([
    getRooms(),
    getPageHero('rooms', '/images/rooms/room-1.jpg'),
  ]);
  return <RoomsPageClient rooms={rooms} heroImage={heroImage} />;
}
