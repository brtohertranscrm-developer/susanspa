export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  altitudeMeters: number;
  locationName: string;
  address: {
    street: string;
    village: string;
    district: string;
    regency: string;
    province: string;
    postalCode: string;
    fullFormatted: string;
  };
  contact: {
    phone: string;
    phoneFormatted: string;
    whatsapp: string;
    whatsappFormatted: string;
    email: string;
    reservationEmail: string;
  };
  social: {
    instagram: string;
    facebook: string;
    tiktok: string;
    youtube?: string;
  };
  mapEmbedUrl: string;
  googleMapsUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const SITE_CONFIG: SiteConfig = {
  name: 'Susan Spa & Resort',
  tagline: 'Peristirahatan Menenangkan di Lereng Gunung Ungaran',
  description:
    'Susan Spa & Resort menyambut Anda di kawasan sejuk Bandungan, Semarang, pada ketinggian sekitar 1.100 meter di atas permukaan laut. Menghadirkan perpaduan ketenangan alam pegunungan, relaksasi spa herbal khas Jawa, kenyamanan akomodasi keluarga, serta keindahan kapel kaca La Kana untuk momen berharga Anda.',
  altitudeMeters: 1100,
  locationName: 'Bandungan, Kabupaten Semarang',
  address: {
    street: 'Jalan Gintungan Utara Piyoto',
    village: 'Deso, Jetis',
    district: 'Bandungan',
    regency: 'Kabupaten Semarang',
    province: 'Jawa Tengah',
    postalCode: '50614',
    fullFormatted:
      'Jalan Gintungan Utara Piyoto, Deso, Jetis, Bandungan, Kabupaten Semarang, Jawa Tengah 50614',
  },
  contact: {
    phone: '+62298711766',
    phoneFormatted: '+62 298 711766',
    whatsapp: '6281228111111',
    whatsappFormatted: '+62 812 2811 1111',
    email: 'info@susansparesort.com',
    reservationEmail: 'reservation@susansparesort.com',
  },
  social: {
    instagram: 'https://instagram.com/susansparesort',
    facebook: 'https://facebook.com/susansparesort',
    tiktok: 'https://tiktok.com/@susansparesort',
  },
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.825827361841!2d110.3683053!3d-7.2185209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708173bb22eb73%3A0xe54d2e7428ee6d83!2sSusan%20Spa%20%26%20Resort!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid',
  googleMapsUrl:
    'https://maps.google.com/?q=Susan+Spa+%26+Resort+Bandungan',
  coordinates: {
    lat: -7.2185209,
    lng: 110.3683053,
  },
};
