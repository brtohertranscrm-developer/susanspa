'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-deep text-ivory/80 pt-20 pb-12 border-t border-champagne/20">
      <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-Column Grid per Specification */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Susan Spa & Resort logo & Short brand description */}
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <Image
                src="/images/susan-spa-logo-gold.png"
                alt={SITE_CONFIG.name}
                width={190}
                height={84}
                className="h-12 w-auto object-contain drop-shadow-md"
              />
            </Link>

            <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed">
              Susan Spa & Resort menyambut Anda di kawasan sejuk Bandungan, Kabupaten Semarang. Berada pada ketinggian ~1.100 meter di atas permukaan laut di lereng Gunung Ungaran dengan suasana peristirahatan yang menenangkan.
            </p>
          </div>

          {/* Column 2: Jelajahi */}
          <div className="space-y-4">
            <h4 className="font-serif text-ivory text-base tracking-wider uppercase text-champagne">
              Jelajahi
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory/80">
              <li>
                <Link href="/rooms" className="hover:text-champagne transition-colors">
                  Kamar & Villa
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-champagne transition-colors">
                  Fasilitas
                </Link>
              </li>
              <li>
                <Link href="/wedding" className="hover:text-champagne transition-colors">
                  Pernikahan
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-champagne transition-colors">
                  Galeri
                </Link>
              </li>
              <li>
                <Link href="/nearby" className="hover:text-champagne transition-colors">
                  Wisata Sekitar
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Kontak */}
          <div className="space-y-4">
            <h4 className="font-serif text-ivory text-base tracking-wider uppercase text-champagne">
              Kontak Kami
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
          </div>

          {/* Column 4: Media Sosial */}
          <div className="space-y-4">
            <h4 className="font-serif text-ivory text-base tracking-wider uppercase text-champagne">
              Media Sosial
            </h4>
            <p className="text-xs text-ivory/70">
              Ikuti kabar terbaru dan keindahan visual harian kami di media sosial.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-forest border border-champagne/30 text-champagne hover:bg-champagne hover:text-forest-deep flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-forest border border-champagne/30 text-champagne hover:bg-champagne hover:text-forest-deep flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full bg-forest border border-champagne/30 text-champagne hover:bg-champagne hover:text-forest-deep flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                {/* TikTok Icon */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.38 6.38 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.67 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.33V9.05a8.16 8.16 0 0 0 4.91 1.64V7.24a4.84 4.84 0 0 1-1-.55z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 text-center text-xs text-ivory/50">
          <p>Hak Cipta © Susan Spa & Resort. Seluruh hak cipta dilindungi undang-undang.</p>
        </div>
      </div>
    </footer>
  );
};
