import { getGalleryItems } from '@/lib/cms';
import GalleryPageClient from './GalleryPageClient';

export default async function GalleryPage() {
  const items = await getGalleryItems();
  return <GalleryPageClient items={items} />;
}
