import { getPageHero } from '@/lib/cms';
import EventsPageClient from './EventsPageClient';

export default async function EventsPage() {
  const heroImage = await getPageHero('events', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop');
  return <EventsPageClient heroImage={heroImage} />;
}
