import { getDining } from '@/lib/cms';
import DiningPageClient from './DiningPageClient';

export default async function DiningPage() {
  const venues = await getDining();
  return <DiningPageClient venues={venues} />;
}
