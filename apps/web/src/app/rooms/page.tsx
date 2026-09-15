import RoomsPageClient from './RoomsPageClient';
import { getRooms } from '@/lib/cms';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kamar, Suite & Villa | Susan Spa & Resort',
  description: 'Kenyamanan, kehangatan, dan ketenangan lereng pegunungan Bandungan. Jelajahi 11 pilihan suite, villa, dan kamar keluarga kami.',
};

export default async function RoomsPage() {
  const rooms = await getRooms();
  return <RoomsPageClient rooms={rooms} />;
}
