import { getWeddingPackages } from '@/lib/cms';
import WeddingsPageClient from './WeddingsPageClient';

export default async function WeddingsPage() {
  const packages = await getWeddingPackages();
  return <WeddingsPageClient packages={packages} />;
}
