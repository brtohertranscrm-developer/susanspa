import React from 'react';
import Link from 'next/link';
import { MapPin, Mail, Instagram, Facebook, Share, Youtube } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b1f0c] text-white/90 py-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left: Copyright & Legal */}
        <div className="text-[10px] text-white/60 tracking-wider text-center lg:text-left order-3 lg:order-1">
          <p className="uppercase">
            Susan Spa & Resort is a registered trademark. © {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="mt-1.5 space-x-4">
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

        {/* Center: Floating Actions */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 bg-white/5 px-8 py-3 rounded-sm border border-white/10 order-1 lg:order-2">
          <Link href="/contact" className="flex items-center space-x-2.5 hover:text-white/70 transition-colors text-[10px] uppercase tracking-widest font-medium">
            <Mail className="w-4 h-4 stroke-[1.5]" />
            <span>Contact Us</span>
          </Link>
          <a href={SITE_CONFIG.googleMapsUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-2.5 hover:text-white/70 transition-colors text-[10px] uppercase tracking-widest font-medium">
            <MapPin className="w-4 h-4 stroke-[1.5]" />
            <span>Getting Here</span>
          </a>
          <button className="flex items-center space-x-2.5 hover:text-white/70 transition-colors text-[10px] uppercase tracking-widest font-medium">
            <Share className="w-4 h-4 stroke-[1.5]" />
            <span>Share</span>
          </button>
        </div>

        {/* Right: Social Media */}
        <div className="flex items-center space-x-6 order-2 lg:order-3">
          <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-white/70 transition-colors">
            <Instagram className="w-4 h-4 stroke-[1.5]" />
          </a>
          <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-white/70 transition-colors">
            <Facebook className="w-4 h-4 stroke-[1.5]" />
          </a>
          <a href={SITE_CONFIG.social.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" className="hover:text-white/70 transition-colors">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.38 6.38 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.67 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.33V9.05a8.16 8.16 0 0 0 4.91 1.64V7.24a4.84 4.84 0 0 1-1-.55z" />
            </svg>
          </a>
        </div>

      </div>
    </footer>
  );
};
