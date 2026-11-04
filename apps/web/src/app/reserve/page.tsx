import { getRooms } from '@/lib/cms';
import ReservePageClient from './ReservePageClient';

export default async function Page() {
  const rooms = await getRooms();
  return <ReservePageClient rooms={rooms} />;
}
