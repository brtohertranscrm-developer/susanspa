import { getFacilities } from '@/lib/cms';
import FacilitiesPageClient from './FacilitiesPageClient';
import type { FacilityGroup } from '@/data/facilities';

export default async function FacilitiesPage() {
  const facilities = await getFacilities();
  
  const groups: FacilityGroup[] = [
    {
      category: 'Wellness',
      title: 'Wellness & Relaksasi Holistik',
      description: 'Fasilitas pemulihan kebugaran tubuh dan ketenangan pikiran di atas awan lereng Gunung Ungaran.',
      items: facilities.filter((f) => f.category === 'Wellness' || f.category === 'Facility'),
    },
    {
      category: 'Dining',
      title: 'Santapan & Minuman Segar',
      description: 'Kelezatan kuliner Nusantara dan internasional dengan latar panorama pegunungan yang menyejukkan.',
      items: facilities.filter((f) => f.category === 'Dining'),
    },
    {
      category: 'Family & Recreation',
      title: 'Keluarga & Rekreasi Alam',
      description: 'Aktivitas menyenangkan dan sarana rekreasi untuk menciptakan momen berharga bersama keluarga tercinta.',
      items: facilities.filter((f) => f.category === 'Family & Recreation'),
    },
    {
      category: 'Events',
      title: 'Pernikahan & Acara Spesial',
      description: 'Venue berkelas dan tertata anggun untuk ikrar pernikahan sakral, perayaan pribadi, serta pertemuan bisnis.',
      items: facilities.filter((f) => f.category === 'Events'),
    },
    {
      category: 'Guest Services',
      title: 'Layanan Keramahan Tamu',
      description: 'Kenyamanan, keamanan, dan kemudahan istirahat Anda senantiasa didukung layanan prima staf kami selama 24 jam.',
      items: facilities.filter((f) => f.category === 'Guest Services'),
    },
  ];

  return <FacilitiesPageClient facilityGroups={groups.filter(g => g.items.length > 0)} />;
}
