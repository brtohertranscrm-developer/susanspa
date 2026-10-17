import { getRooms } from '@/lib/cms';
import ReservePageClient from './ReservePageClient';

export default async function ReservePage() {
  const rooms = await getRooms();
  return <ReservePageClient rooms={rooms} />;
}
