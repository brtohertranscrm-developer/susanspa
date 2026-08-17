import StayPageClient from './StayPageClient';
import { getRooms } from '@/lib/cms';

export default async function StayPage() {
  const rooms = await getRooms();
  return <StayPageClient rooms={rooms} />;
}
