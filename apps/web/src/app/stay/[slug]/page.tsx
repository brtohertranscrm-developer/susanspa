import { notFound } from 'next/navigation';
import RoomDetailClient from './RoomDetailClient';
import { getRooms } from '@/lib/cms';

type Props = { params: Promise<{ slug: string }> };

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params;
  const rooms = await getRooms();
  const room = rooms.find((item) => item.slug === slug);
  if (!room) notFound();

  return <RoomDetailClient room={room} rooms={rooms} />;
}
