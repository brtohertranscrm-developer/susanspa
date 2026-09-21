'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site';
import { cn } from '@/lib/utils';
import { Room } from '@/types';
import { MenuOverlay } from './MenuOverlay';

interface HeaderProps {
  rooms?: Room[];
  onOpenReserve?: () => void;
  hideDesktopNav?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenReserve }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out',
          isScrolled
            ? 'bg-[#10241F]/95 backdrop-blur-md py-3.5 border-b border-champagne/30 shadow-xl'
            : 'bg-gradient-to-b from-[#10241F]/90 via-[#10241F]/60 to-transparent py-5'
        )}
      >
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group py-1 shrink-0">
            <Image
              src="/images/susan-spa-logo-gold.png"
              alt={SITE_CONFIG.name}
              width={170}
              height={75}
              priority
              className="h-10 sm:h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105 drop-shadow-md"
            />
          </Link>

          {/* Desktop Right Side CTA & Menu Trigger */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <button
              onClick={onOpenReserve}
              className="bg-champagne hover:bg-champagne-light text-forest-deep px-5 xl:px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-md hover:shadow-champagne/20 hover:scale-105"
            >
              Reservasi
            </button>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center space-x-2 text-ivory hover:text-champagne px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] border border-champagne/35 hover:border-champagne hover:bg-forest-deep/60 transition-all duration-300 min-h-[40px]"
              aria-label="Buka Menu Navigasi Lengkap"
            >
              <Menu className="w-4 h-4 text-champagne" />
              <span>Menu</span>
            </button>
          </div>

          {/* Mobile Right Controls: Book Now & Hamburger */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={onOpenReserve}
              className="bg-champagne hover:bg-champagne-light text-forest-deep min-h-[44px] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center justify-center transition-colors"
            >
              Reservasi
            </button>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-ivory hover:text-champagne p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne rounded-md"
              aria-label="Buka Menu Navigasi"
            >
              <Menu className="w-6 h-6 text-champagne" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Luxury Navigation Overlay (Nihi Sumba Style) */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenReserve={onOpenReserve}
      />
    </>
  );
};
