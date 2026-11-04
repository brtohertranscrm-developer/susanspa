import { getGalleryItems } from '@/lib/cms';
import GalleryPageClient from './GalleryPageClient';

export default async function Page() {
  const items = await getGalleryItems();
  return <GalleryPageClient items={items} />;
}
