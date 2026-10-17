import { getWeddingPackages } from '@/lib/cms';
import WeddingPageClient from './WeddingPageClient';

export default async function WeddingPage() {
  const packages = await getWeddingPackages();
  return <WeddingPageClient packages={packages} />;
}
