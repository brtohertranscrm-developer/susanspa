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
            ? 'bg-[#10241F]/95 backdrop-blur-md py-3.5 border-b border-white/10 shadow-xl'
            : 'bg-gradient-to-b from-black/30 to-transparent py-5'
        )}
      >
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-3 items-center">
          
          {/* Left: Menu Trigger */}
          <div className="flex items-center justify-start">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center space-x-3 text-ivory hover:text-white group transition-all duration-300 py-2"
              aria-label="Buka Menu Navigasi"
            >
              <div className="flex flex-col space-y-1.5 justify-center w-6">
                <span className="block h-[1px] w-full bg-white transition-colors"></span>
                <span className="block h-[1px] w-full bg-white transition-colors"></span>
              </div>
              <span className="hidden sm:block text-[11px] font-medium uppercase tracking-[0.2em] mt-0.5">Resort</span>
            </button>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex items-center justify-center">
            <Link href="/" className="flex items-center group py-1">
              <Image
                src="/images/susan-spa-logo-gold.png"
                alt={SITE_CONFIG.name}
                width={170}
                height={75}
                priority
                className="h-10 sm:h-12 w-auto object-contain transition-all duration-300 group-hover:opacity-80 drop-shadow-md brightness-0 invert"
              />
            </Link>
          </div>

          {/* Right: Reserve CTA */}
          <div className="flex items-center justify-end">
            <button
              onClick={onOpenReserve}
              className="border border-white/70 hover:border-white hover:bg-white/10 text-white px-4 sm:px-6 py-2 rounded-sm text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-sm"
            >
              Reserve
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
