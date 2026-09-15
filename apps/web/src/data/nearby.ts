import { NearbyDestination, Testimonial } from '@/types';

export const NEARBY_DESTINATIONS: NearbyDestination[] = [
  {
    id: 'celosia-flower-garden',
    slug: 'celosia-flower-garden',
    name: 'Celosia Flower Garden',
    distance: '±4.2 km',
    distanceKm: 4.2,
    driveTimeMinutes: 10,
    category: 'Nature & Floral',
    address: 'Jl. Ke Candi Gedong Songo No.KM, RW.5, Beroken, Banyukuning, Bandungan, Semarang, Jawa Tengah 50614',
    description:
      'Highland flower park dengan berbagai taman bunga berwarna-warni, kincir angin khas Belanda, miniatur landmark dunia, dan spot foto yang sangat instagrammable di udara sejuk.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1600&auto=format&fit=crop',
    ],
    tips: 'Datang pagi hari sebelum pukul 10:00 untuk pencahayaan foto terbaik dan hawa yang sejuk segar.',
    mapUrl: 'https://maps.google.com/?q=Taman+Bunga+Celosia+Bandungan',
  },
  {
    id: 'gedong-songo-temple',
    slug: 'gedong-songo-temple',
    name: 'Gedong Songo Temple',
    distance: '±6.1 km',
    distanceKm: 6.1,
    driveTimeMinutes: 15,
    category: 'Historical & Heritage',
    address: 'Krapyak, Darum, Candi, Bandungan, Kabupaten Semarang, Jawa Tengah 50614',
    description:
      'Kompleks candi Hindu bersejarah peninggalan abad ke-8 di lereng Gunung Ungaran dengan panorama pegunungan memukau, kawah belerang alami, dan jalur wisata berkuda.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
    ],
    tips: 'Gunakan sepatu trekking yang nyaman atau sewa kuda pemandu lokal untuk mengitari Candi 1 hingga Candi 5.',
    mapUrl: 'https://maps.google.com/?q=Candi+Gedong+Songo+Bandungan',
  },
  {
    id: 'ayanaz-gedongsongo',
    slug: 'ayanaz-gedongsongo',
    name: 'Ayanaz Gedongsongo',
    distance: '±6.1 km',
    distanceKm: 6.1,
    driveTimeMinutes: 15,
    category: 'Outdoor & Photo Spots',
    address: 'Kawasan Candi Gedong Songo, Krapyak, Banyukuning, Bandungan, Kabupaten Semarang, Jawa Tengah 50614',
    description:
      'Outdoor attraction kekinian di dalam kawasan Gedong Songo yang menawarkan puluhan spot foto estetik seperti bubble tent, balon udara, dan sofa hammock dengan latar perbukitan.',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop',
    ],
    tips: 'Satu lokasi terpadu dengan tiket Candi Gedong Songo, cocok dikunjungi bersamaan dalam satu rute perjalanan.',
    mapUrl: 'https://maps.google.com/?q=Ayanaz+Gedongsongo',
  },
  {
    id: 'saloka-theme-park',
    slug: 'saloka-theme-park',
    name: 'Saloka Theme Park',
    distance: '±16.6 km',
    distanceKm: 16.6,
    driveTimeMinutes: 30,
    category: 'Amusement & Family',
    address: 'Jl. Fatmawati No.154, Gumuksari, Lopait, Kec. Tuntang, Kabupaten Semarang, Jawa Tengah 50773',
    description:
      'Family amusement park terbesar di Jawa Tengah dengan lebih dari 25 wahana tematik spektakuler, bianglala raksasa Cakrawala, pertunjukan air mancur menari, dan hiburan ramah anak.',
    image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?q=80&w=1600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515165562839-97840182415c?q=80&w=1600&auto=format&fit=crop',
    ],
    tips: 'Beli tiket terusan untuk mencoba seluruh wahana tanpa antrean tiket terpisah di setiap zona.',
    mapUrl: 'https://maps.google.com/?q=Saloka+Theme+Park',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    guestName: 'Maya & Hendra Kusuma',
    stayCategory: 'Wedding Couple at La Kana Chapel',
    origin: 'Jakarta, Indonesia',
    rating: 5,
    quote:
      'Pernikahan kami di La Kana Chapel benar-benar seperti mimpi. Kapel kaca yang menghadap perbukitan berkabut di Bandungan membuat seluruh keluarga terpesona. Pelayanan staf Susan Spa & Resort sangat hangat dan profesional.',
    date: 'July 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'test-2',
    guestName: 'David & Sarah Jenkins',
    stayCategory: 'Grand Suite & Jacuzzi Guests',
    origin: 'Singapore',
    rating: 5,
    quote:
      'Susan Spa & Resort is a serene mountain sanctuary. The cool 1,100m ASL climate was the perfect respite. The private jacuzzi and spa rituals overlooking the slopes were absolutely top notch.',
    date: 'June 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'test-3',
    guestName: 'Dr. Evelyn Wijaya',
    stayCategory: 'Weekend Family & Wellness Retreat',
    origin: 'Surabaya, Indonesia',
    rating: 5,
    quote:
      'Menghabiskan liburan di Villa bersama keluarga besar sangat menyenangkan. Udara Bandungan yang sejuk, kolam renang air hangat, dan perawatan spa membuat badan kembali segar sepenuhnya.',
    date: 'August 2026',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
  },
];
