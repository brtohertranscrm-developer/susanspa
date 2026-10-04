import { getSpaTreatments } from '@/lib/cms';
import SpaPageClient from './SpaPageClient';

export default async function SpaPage() {
  const treatments = await getSpaTreatments();
  return <SpaPageClient treatments={treatments} />;
}
