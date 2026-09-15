import { DiningVenue } from '@/types';

export const DINING_VENUES: DiningVenue[] = [
  {
    id: 'sky-garden-restaurant',
    name: 'Sky Garden Restaurant & Lounge',
    subtitle: 'Sajian Kuliner Istimewa dengan Pemandangan Lembah & Pegunungan',
    cuisine: 'Nusantara, Masakan Jawa Tradisional, & Pilihan Menu Western',
    ambiance: 'Ruang bersantap kaca berpanorama asri & teras terbuka yang sejuk',
    operatingHours: '06:30 - 22:30 WIB Setiap Hari',
    description: 'Berada di ketinggian resort dengan pemandangan taman asri dan lembah Bandungan, Sky Garden Restaurant menyajikan ragam hidangan lezat yang diolah dari bahan segar pilihan petani lokal Bandungan.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop',
    menuHighlights: [
      'Nasi Goreng Spesial Susan dengan Udang Bakar Gurih',
      'Soto Ayam Rempah Hangat Khas Dataran Tinggi',
      'Iga Bakar Madu dengan Sambal Tradisional',
      'Wedang Ronde Hangat & Camilan Khas Bandungan',
    ],
  },
  {
    id: 'private-chapel-dining',
    name: 'La Kana Romantic Candlelight Dinner',
    subtitle: 'Makan Malam Romantis Privat untuk Pasangan di Teras La Kana',
    cuisine: 'Set Menu Multi-Course Eksklusif untuk Pasangan',
    ambiance: 'Suasana hangat temaram lilin, pemandangan lampu kota malam hari, dan udara sejuk pegunungan',
    operatingHours: '19:00 - 22:00 WIB (Diperlukan Reservasi Sebelumnya)',
    description: 'Pengalaman bersantap malam istimewa dan privat khusus untuk Anda dan pasangan di area La Kana. Dikelilingi udara sejuk pegunungan dan tata lampu lilin yang intim, sempurna untuk merayakan momen ulang tahun pernikahan atau momen spesial berdua.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop',
    menuHighlights: [
      'Salmon Panggang dengan Saus Lemon Herb Lembut',
      'Sup Krim Jamur Truffle Hangat',
      'Steak Pilihan dengan Mentega Rempah Herbal',
      'Dessert Manis & Sajian Minuman Hangat Pilihan',
    ],
  },
];
