import { getWeddingPackages } from '@/lib/cms';
import WeddingPageClient from './WeddingPageClient';

export default async function Page() {
  const packages = await getWeddingPackages();
  return <WeddingPageClient packages={packages} />;
}
