import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getRooms } from '@/lib/cms';

type Props = { children: ReactNode; params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const rooms = await getRooms();
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rooms = await getRooms();
  const room = rooms.find((item) => item.slug === slug);
  if (!room) notFound();
  return {
    title: room.name,
    description: room.description,
    openGraph: { title: room.name, description: room.description, images: [room.images[0]] },
  };
}

export default async function RoomLayout({ children, params }: Props) {
  const { slug } = await params;
  const rooms = await getRooms();
  if (!rooms.some((room) => room.slug === slug)) notFound();
  return children;
}
