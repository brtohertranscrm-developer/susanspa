import HomePageClient from './HomePageClient';
import { getRooms } from '@/lib/cms';

export default async function HomePage() {
  const rooms = await getRooms();
  return <HomePageClient rooms={rooms} />;
}
