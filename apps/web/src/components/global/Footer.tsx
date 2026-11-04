'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Mail, Instagram, Facebook, Share } from 'lucide-react';
import { fillTemplate } from '@susan/contracts/content';
import { useSiteConfig } from '@/components/global/SiteConfigProvider';
import { useLayoutContent } from '@/components/global/SiteContentProvider';

export const Footer: React.FC = () => {
  const site = useSiteConfig();
  const { footer } = useLayoutContent();
  const [copied, setCopied] = useState(false);

  // Bagikan lewat menu bawaan perangkat. Browser tanpa fitur itu menyalin tautan halaman.
  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Pengguna menutup dialog bagikan.
    }
  };

  return (
    <footer className="bg-[#0b1f0c] text-white/90 py-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left: Copyright & Legal */}
        <div className="text-[10px] text-white/60 tracking-wider text-center lg:text-left order-3 lg:order-1">
          <p className="uppercase">
            {fillTemplate(footer.copyright, { tahun: new Date().getFullYear() })}
          </p>
          <div className="mt-1.5 space-x-4">
            {footer.legalLinks.map((link, index) => (
              <Link key={index} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Center: Floating Actions */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 bg-white/5 px-8 py-3 rounded-sm border border-white/10 order-1 lg:order-2">
          <Link href={footer.contactHref} className="flex items-center space-x-2.5 hover:text-white/70 transition-colors text-[10px] uppercase tracking-widest font-medium">
            <Mail className="w-4 h-4 stroke-[1.5]" />
            <span>{footer.contactLabel}</span>
          </Link>
          <a href={site.googleMapsUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-2.5 hover:text-white/70 transition-colors text-[10px] uppercase tracking-widest font-medium">
            <MapPin className="w-4 h-4 stroke-[1.5]" />
            <span>{footer.directionsLabel}</span>
          </a>
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center space-x-2.5 hover:text-white/70 transition-colors text-[10px] uppercase tracking-widest font-medium"
          >
            <Share className="w-4 h-4 stroke-[1.5]" />
            <span aria-live="polite">{copied ? footer.shareCopiedLabel : footer.shareLabel}</span>
          </button>
        </div>

        {/* Right: Social Media */}
        <div className="flex items-center space-x-6 order-2 lg:order-3">
          <a href={site.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-white/70 transition-colors">
            <Instagram className="w-4 h-4 stroke-[1.5]" />
          </a>
          <a href={site.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-white/70 transition-colors">
            <Facebook className="w-4 h-4 stroke-[1.5]" />
          </a>
          <a href={site.social.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" className="hover:text-white/70 transition-colors">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.38 6.38 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.67 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.33V9.05a8.16 8.16 0 0 0 4.91 1.64V7.24a4.84 4.84 0 0 1-1-.55z" />
            </svg>
          </a>
        </div>

      </div>
    </footer>
  );
};
