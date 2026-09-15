import { notFound } from 'next/navigation';
import { getRooms } from '@/lib/cms';
import RoomDetailTemplate from './RoomDetailTemplate';
import { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rooms = await getRooms();
  const room = rooms.find((r) => r.slug === slug);
  if (!room) return { title: 'Room Not Found | Susan Spa & Resort' };

  return {
    title: `${room.name} | Susan Spa & Resort`,
    description: room.description || room.tagline || `${room.name} at Susan Spa & Resort Bandungan`,
  };
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params;
  const rooms = await getRooms();
  const room = rooms.find((item) => item.slug === slug);
  if (!room) notFound();

  return <RoomDetailTemplate room={room} rooms={rooms} />;
}
