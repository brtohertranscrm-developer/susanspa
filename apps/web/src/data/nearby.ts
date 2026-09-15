import { NearbyDestination, Testimonial } from '@/types';

export const NEARBY_DESTINATIONS: NearbyDestination[] = [
  {
    id: 'celosia-flower-garden',
    slug: 'celosia-flower-garden',
    name: 'Celosia Flower Garden',
    distance: '±4.2 km',
    distanceKm: 4.2,
    driveTimeMinutes: 10,
    category: 'Wisata Alam & Bunga',
    address: 'Jl. Ke Candi Gedong Songo No.KM, RW.5, Beroken, Banyukuning, Bandungan, Semarang, Jawa Tengah 50614',
    description:
      'Taman rekreasi bunga di kawasan dataran tinggi Bandungan yang menampilkan hamparan bunga warna-warni, miniatur landmark dunia, kincir angin, serta aneka spot foto keluarga yang asri di udara sejuk.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1600&auto=format&fit=crop',
    ],
    tips: 'Saran kami: Kunjungi di pagi hari sebelum pukul 10.00 WIB untuk menikmati pencahayaan foto alami dan udara segar pegunungan.',
    mapUrl: 'https://maps.google.com/?q=Taman+Bunga+Celosia+Bandungan',
  },
  {
    id: 'gedong-songo-temple',
    slug: 'gedong-songo-temple',
    name: 'Candi Gedong Songo',
    distance: '±6.1 km',
    distanceKm: 6.1,
    driveTimeMinutes: 15,
    category: 'Situs Sejarah & Budaya',
    address: 'Krapyak, Darum, Candi, Bandungan, Kabupaten Semarang, Jawa Tengah 50614',
    description:
      'Kompleks candi Hindu peninggalan abad ke-8 yang berada di lereng Gunung Ungaran. Menyuguhkan panorama pegunungan yang megah, mata air belerang alami, serta jalur wisata berkuda yang cocok dinikmati bersama pemandu lokal.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
    ],
    tips: 'Saran kami: Kenakan alas kaki yang nyaman untuk berjalan di lereng atau manfaatkan layanan berkuda lokal untuk menjelajahi area candi.',
    mapUrl: 'https://maps.google.com/?q=Candi+Gedong+Songo+Bandungan',
  },
  {
    id: 'ayanaz-gedongsongo',
    slug: 'ayanaz-gedongsongo',
    name: 'Ayanaz Gedongsongo',
    distance: '±6.1 km',
    distanceKm: 6.1,
    driveTimeMinutes: 15,
    category: 'Spot Foto & Rekreasi Alam',
    address: 'Kawasan Candi Gedong Songo, Krapyak, Banyukuning, Bandungan, Kabupaten Semarang, Jawa Tengah 50614',
    description:
      'Spot wisata foto keluarga di dalam area Gedong Songo yang menawarkan beragam sudut foto kreatif seperti tenda gelembung (bubble tent) dan hammock dengan latar perbukitan hijau.',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop',
    ],
    tips: 'Saran kami: Lokasi berada di dalam kawasan Candi Gedong Songo sehingga sangat praktis untuk dikunjungi bersamaan dalam satu rute.',
    mapUrl: 'https://maps.google.com/?q=Ayanaz+Gedongsongo',
  },
  {
    id: 'saloka-theme-park',
    slug: 'saloka-theme-park',
    name: 'Saloka Theme Park',
    distance: '±16.6 km',
    distanceKm: 16.6,
    driveTimeMinutes: 30,
    category: 'Taman Hiburan Keluarga',
    address: 'Jl. Fatmawati No.154, Gumuksari, Lopait, Kec. Tuntang, Kabupaten Semarang, Jawa Tengah 50773',
    description:
      'Taman rekreasi keluarga terpadu di kawasan Tuntang, Semarang, yang menghadirkan puluhan wahana permainan, bianglala Cakrawala, dan pertunjukan air mancur menari untuk melengkapi liburan keluarga Anda di Jawa Tengah.',
    image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?q=80&w=1600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515165562839-97840182415c?q=80&w=1600&auto=format&fit=crop',
    ],
    tips: 'Saran kami: Pilih tiket terusan agar Anda dan keluarga dapat menikmati seluruh wahana dengan leluasa tanpa antrean pembelian ulang.',
    mapUrl: 'https://maps.google.com/?q=Saloka+Theme+Park',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    guestName: 'Maya & Hendra Kusuma',
    stayCategory: 'Pasangan Pengantin di La Kana Chapel',
    origin: 'Jakarta, Indonesia',
    rating: 5,
    quote:
      'Pemberkatan pernikahan kami di La Kana Chapel berlangsung sangat khidmat dan indah. Pemandangan kabut pegunungan Bandungan melalui altar kaca menciptakan momen sakral yang tak terlupakan bagi seluruh keluarga besar kami.',
    date: 'Juli 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'test-2',
    guestName: 'David & Sarah Jenkins',
    stayCategory: 'Tamu Menginap di Grand Suite',
    origin: 'Singapura',
    rating: 5,
    quote:
      'Susan Spa & Resort is a peaceful sanctuary. The cool 1,100m ASL mountain breeze was truly refreshing. The private jacuzzi and authentic Javanese herbal spa rituals provided complete relaxation.',
    date: 'Juni 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'test-3',
    guestName: 'Dr. Evelyn Wijaya & Keluarga',
    stayCategory: 'Liburan Keluarga di Villa 4 Bedrooms',
    origin: 'Surabaya, Indonesia',
    rating: 5,
    quote:
      'Menghabiskan akhir pekan di Villa bersama keluarga besar sangat nyaman dan privat. Suasana Bandungan yang sejuk, kolam renang air hangat untuk anak-anak, dan perawatan spa membuat kami kembali bugar.',
    date: 'Agustus 2026',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
  },
];
