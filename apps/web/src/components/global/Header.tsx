'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, X, Compass, Phone, ArrowUpRight, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onOpenReserve?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenReserve }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'ID'>('EN');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mega menu is open
  useEffect(() => {
    if (megaMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [megaMenuOpen]);

  const accommodationLinks = [
    { href: '/stay/grand-villa', label: 'Grand Mountain Villa' },
    { href: '/stay/royal-suite', label: 'Royal Jacuzzi Suite' },
    { href: '/stay/jacuzzi-villa', label: 'Garden Jacuzzi Villa' },
    { href: '/stay/family-suite', label: 'Bandungan Family Suite' },
    { href: '/stay', label: 'View All Accommodations' },
  ];

  const wellnessLinks = [
    { href: '/spa', label: 'Signature Spa Treatments' },
    { href: '/spa', label: 'Thermal Hydrotherapy Baths' },
    { href: '/facilities', label: 'Heated Infinity Pool' },
    { href: '/facilities', label: 'Sky Garden & Sauna' },
  ];

  const celebrationLinks = [
    { href: '/weddings', label: 'La Kana Glass Chapel' },
    { href: '/weddings', label: 'Sky Lawn Wedding Receptions' },
    { href: '/weddings', label: 'Pre-Wedding Photography' },
    { href: '/events', label: 'Corporate Meetings & Retreats' },
  ];

  const discoveryLinks = [
    { href: '/dining', label: 'Sky Garden Restaurant' },
    { href: '/experiences', label: 'Gedong Songo Temple Trekking' },
    { href: '/offers', label: 'Exclusive Packages' },
    { href: '/gallery', label: 'Visual Portfolio' },
    { href: '/nearby', label: 'Bandungan Destination Guide' },
    { href: '/journal', label: 'The Susan Journal' },
    { href: '/about', label: 'About Our Sanctuary' },
    { href: '/contact', label: 'Contact & Location' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out',
          isScrolled
            ? 'bg-forest-deep/95 backdrop-blur-md py-4 border-b border-champagne/20 shadow-xl'
            : 'bg-gradient-to-b from-forest-deep/80 via-forest-deep/40 to-transparent py-6'
        )}
      >
        <div className="max-w-wide mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Left Side: Hamburger Icon + RESORT Trigger */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMegaMenuOpen(true)}
              className="group flex items-center space-x-2 text-ivory hover:text-champagne transition-colors focus:outline-none py-1"
              aria-label="Open Resort Mega Menu"
            >
              {/* Custom Two-Line Hamburger Icon matching NIHI reference */}
              <div className="flex flex-col justify-center space-y-1.5 w-5">
                <span className="h-[1.5px] bg-current w-full transition-all duration-300 group-hover:w-full" />
                <span className="h-[1.5px] bg-current w-3/4 transition-all duration-300 group-hover:w-full" />
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-champagne group-hover:rotate-180 transition-transform duration-300" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-ivory group-hover:text-champagne ml-1 hidden sm:inline">
                RESORT
              </span>
            </button>
          </div>

          {/* Center Side: Official Susan Spa & Resort Logo */}
          <Link href="/" className="flex flex-col items-center group text-center py-1">
            <Image
              src="/images/susan-spa-logo-gold.png"
              alt="Susan Spa & Resort"
              width={180}
              height={80}
              priority
              className="h-10 sm:h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105 drop-shadow-md"
            />
          </Link>

          {/* Right Side: Outlined RESERVE Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLanguage(language === 'EN' ? 'ID' : 'EN')}
              className="hidden md:flex items-center space-x-1 text-[11px] text-ivory/80 hover:text-champagne transition-colors uppercase tracking-wider"
              title="Toggle Language"
            >
              <Globe className="w-3 h-3 text-champagne" />
              <span>{language}</span>
            </button>

            <button
              onClick={onOpenReserve}
              className="border border-white/60 hover:border-champagne hover:bg-champagne hover:text-forest-deep text-ivory px-5 sm:px-7 py-2 rounded-sm text-[11px] font-medium uppercase tracking-[0.25em] transition-all duration-300 shadow-sm"
            >
              RESERVE
            </button>
          </div>
        </div>
      </header>

      {/* Editorial Full-Screen Mega Menu Overlay */}
      {megaMenuOpen && (
        <div className="fixed inset-0 z-50 bg-forest-deep/98 backdrop-blur-2xl text-ivory flex flex-col animate-fade-in overflow-hidden">
          {/* Mega Menu Top Bar */}
          <div className="max-w-wide w-full mx-auto px-4 sm:px-8 lg:px-12 py-6 flex items-center justify-between border-b border-champagne/20">
            {/* Left Close Button */}
            <button
              onClick={() => setMegaMenuOpen(false)}
              className="flex items-center space-x-2 text-ivory/80 hover:text-champagne transition-colors text-xs uppercase tracking-[0.2em]"
            >
              <X className="w-5 h-5 text-champagne" />
              <span>CLOSE</span>
            </button>

            {/* Center Logo */}
            <Link href="/" onClick={() => setMegaMenuOpen(false)} className="flex flex-col items-center text-center">
              <Image
                src="/images/susan-spa-logo-gold.png"
                alt="Susan Spa & Resort"
                width={150}
                height={66}
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Right Action */}
            <button
              onClick={() => {
                setMegaMenuOpen(false);
                if (onOpenReserve) onOpenReserve();
              }}
              className="border border-champagne text-champagne hover:bg-champagne hover:text-forest-deep px-5 py-2 rounded-sm text-[11px] uppercase tracking-[0.2em] transition-colors"
            >
              BOOK STAY
            </button>
          </div>

          {/* Mega Menu Content Grid */}
          <div className="flex-1 overflow-y-auto max-w-wide w-full mx-auto px-4 sm:px-8 lg:px-12 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
              {/* Column 1: Accommodations */}
              <div className="space-y-4">
                <span className="text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block border-b border-champagne/30 pb-2">
                  ACCOMMODATIONS
                </span>
                <ul className="space-y-3">
                  {accommodationLinks.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        onClick={() => setMegaMenuOpen(false)}
                        className="font-serif text-lg sm:text-xl text-ivory/90 hover:text-champagne transition-colors block leading-snug"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Wellness & Spa */}
              <div className="space-y-4">
                <span className="text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block border-b border-champagne/30 pb-2">
                  WELLNESS & SPA
                </span>
                <ul className="space-y-3">
                  {wellnessLinks.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        onClick={() => setMegaMenuOpen(false)}
                        className="font-serif text-lg sm:text-xl text-ivory/90 hover:text-champagne transition-colors block leading-snug"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Celebrations */}
              <div className="space-y-4">
                <span className="text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block border-b border-champagne/30 pb-2">
                  CELEBRATIONS & EVENTS
                </span>
                <ul className="space-y-3">
                  {celebrationLinks.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        onClick={() => setMegaMenuOpen(false)}
                        className="font-serif text-lg sm:text-xl text-ivory/90 hover:text-champagne transition-colors block leading-snug"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4: Discoveries & Experiences */}
              <div className="space-y-4">
                <span className="text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block border-b border-champagne/30 pb-2">
                  DISCOVERIES & JOURNAL
                </span>
                <ul className="space-y-2.5">
                  {discoveryLinks.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        onClick={() => setMegaMenuOpen(false)}
                        className="text-xs uppercase tracking-wider text-ivory/80 hover:text-champagne transition-colors flex items-center justify-between"
                      >
                        <span>{item.label}</span>
                        <ArrowUpRight className="w-3 h-3 text-champagne/60" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Info Banner inside Mega Menu */}
            <div className="mt-16 pt-8 border-t border-champagne/20 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-ivory/70">
              <div className="flex items-center space-x-3">
                <Compass className="w-4 h-4 text-champagne" />
                <span>Bandungan, Central Java • Elevation ~1,100m ASL near Mount Ungaran</span>
              </div>

              <div className="flex items-center space-x-6">
                <span className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-champagne" />
                  <span>+62 298 711111</span>
                </span>

                <button
                  onClick={() => setLanguage(language === 'EN' ? 'ID' : 'EN')}
                  className="text-champagne underline uppercase tracking-wider"
                >
                  Language: {language === 'EN' ? 'English' : 'Bahasa Indonesia'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
