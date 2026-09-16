'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-deep text-ivory/80 pt-16 pb-12 border-t border-champagne/20">
      <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
        {/* Resort Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Brand & Direct Reservation (5 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block">
              <Image
                src="/images/susan-spa-logo-gold.png"
                alt={SITE_CONFIG.name}
                width={190}
                height={84}
                className="h-12 w-auto object-contain drop-shadow-md"
              />
            </Link>

            <p className="text-xs text-ivory/70 leading-relaxed max-w-sm">
              Peristirahatan menenangkan di ketinggian ±1.100 mdpl lereng selatan Gunung Ungaran, Bandungan. Menghadirkan ketenangan alam pegunungan, ritual spa herbal, kenyamanan villa keluarga, dan kapel sakral La Kana.
            </p>

            <div className="pt-2">
              <Link
                href="/reserve"
                className="inline-flex items-center space-x-2 bg-champagne hover:bg-champagne-light text-forest-deep px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>Reservasi Penginapan</span>
              </Link>
            </div>
          </div>

          {/* Kolom 2: Layanan & Pengalaman (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-ivory text-base tracking-wider uppercase text-champagne">
              Layanan & Pengalaman
            </h4>
            <ul className="space-y-2 text-xs text-ivory/80">
              <li>
                <Link href="/rooms" className="hover:text-champagne transition-colors">
                  Kamar & Villa Eksklusif
                </Link>
              </li>
              <li>
                <Link href="/spa" className="hover:text-champagne transition-colors">
                  Spa & Wellness Ritual
                </Link>
              </li>
              <li>
                <Link href="/dining" className="hover:text-champagne transition-colors">
                  Restoran & Kuliner
                </Link>
              </li>
              <li>
                <Link href="/wedding" className="hover:text-champagne transition-colors">
                  Pernikahan di La Kana Chapel
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-champagne transition-colors">
                  Fasilitas & Rekreasi
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-champagne transition-colors">
                  Galeri Foto Resort
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Panduan & Informasi (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-ivory text-base tracking-wider uppercase text-champagne">
              Informasi
            </h4>
            <ul className="space-y-2 text-xs text-ivory/80">
              <li>
                <Link href="/journal" className="hover:text-champagne transition-colors">
                  Jurnal & Inspirasi
                </Link>
              </li>
              <li>
                <Link href="/nearby" className="hover:text-champagne transition-colors">
                  Wisata Sekitar Bandungan
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-champagne transition-colors">
                  Bantuan & Kontak
                </Link>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-champagne transition-colors inline-flex items-center space-x-1"
                >
                  <span>Petunjuk Arah Maps</span>
                </a>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-champagne transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-champagne transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Alamat & Kontak Resmi (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-ivory text-base tracking-wider uppercase text-champagne">
              Kontak & Lokasi
            </h4>
            <div className="space-y-3 text-xs text-ivory/80">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {SITE_CONFIG.address.fullFormatted}
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-champagne shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="hover:text-champagne transition-colors"
                >
                  {SITE_CONFIG.contact.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-champagne shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="hover:text-champagne transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-wider text-champagne block font-semibold mb-2">
                Media Sosial
              </span>
              <div className="flex items-center space-x-3">
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-forest border border-champagne/30 text-champagne hover:bg-champagne hover:text-forest-deep flex items-center justify-center transition-all duration-300"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-forest border border-champagne/30 text-champagne hover:bg-champagne hover:text-forest-deep flex items-center justify-center transition-all duration-300"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a
                  href={SITE_CONFIG.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-8 h-8 rounded-full bg-forest border border-champagne/30 text-champagne hover:bg-champagne hover:text-forest-deep flex items-center justify-center transition-all duration-300"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.38 6.38 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.67 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.33V9.05a8.16 8.16 0 0 0 4.91 1.64V7.24a4.84 4.84 0 0 1-1-.55z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/50 gap-4">
          <p>Hak Cipta © {new Date().getFullYear()} Susan Spa & Resort. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-champagne transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/terms" className="hover:text-champagne transition-colors">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
