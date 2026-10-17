import { getGalleryItems, getPageHero } from '@/lib/cms';
import GalleryPageClient from './GalleryPageClient';

export default async function GalleryPage() {
  const items = await getGalleryItems();
  const heroImage = await getPageHero('gallery', '/images/wedding/wedding-chapel-1.jpg');
  return <GalleryPageClient items={items} heroImage={heroImage} />;
}
