'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  X,
  ArrowUpRight,
  Globe,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onOpenReserve?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenReserve }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'ID'>('EN');
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

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

  const handleCloseMenu = () => {
    setMegaMenuOpen(false);
    setActiveSubCategory(null);
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (megaMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [megaMenuOpen]);

  const menuSections = [
    {
      id: 'stay',
      label: 'Accommodations',
      href: '/stay',
      hasSub: true,
      items: [
        { href: '/stay/grand-villa', label: 'Grand Mountain Villa' },
        { href: '/stay/royal-suite', label: 'Royal Jacuzzi Suite' },
        { href: '/stay/jacuzzi-villa', label: 'Garden Jacuzzi Villa' },
        { href: '/stay/family-suite', label: 'Bandungan Family Suite' },
        { href: '/stay', label: 'View All Accommodations →' },
      ],
    },
    {
      id: 'spa',
      label: 'Wellness & Spa',
      href: '/spa',
      hasSub: true,
      items: [
        { href: '/spa', label: 'Signature Spa Treatments' },
        { href: '/spa', label: 'Thermal Hydrotherapy Baths' },
        { href: '/facilities', label: 'Heated Infinity Pool' },
        { href: '/facilities', label: 'Sky Garden & Sauna' },
      ],
    },
    {
      id: 'weddings',
      label: 'Celebrations & Weddings',
      href: '/weddings',
      hasSub: true,
      items: [
        { href: '/weddings', label: 'La Kana Glass Chapel' },
        { href: '/weddings', label: 'Sky Lawn Wedding Receptions' },
        { href: '/weddings', label: 'Pre-Wedding Photography' },
        { href: '/events', label: 'Corporate Meetings & Retreats' },
      ],
    },
    {
      id: 'dining',
      label: 'Sky Garden & Dining',
      href: '/dining',
      hasSub: false,
    },
    {
      id: 'nearby',
      label: 'Bandungan Destination Guide',
      href: '/nearby',
      hasSub: false,
    },
    {
      id: 'about',
      label: 'About Susan Spa & Resort',
      href: '/about',
      hasSub: false,
    },
    {
      id: 'journal',
      label: 'The Susan Journal',
      href: '/journal',
      hasSub: false,
    },
    {
      id: 'offers',
      label: 'Exclusive Offers & Packages',
      href: '/offers',
      hasSub: false,
    },
    {
      id: 'contact',
      label: 'Contact & Location',
      href: '/contact',
      hasSub: true,
      items: [
        { href: '/contact', label: 'Resort Location & Directions' },
        { href: 'https://wa.me/62811299878', label: 'Direct WhatsApp Concierge' },
      ],
    },
  ];

  const currentActiveSection = menuSections.find((sec) => sec.id === activeSubCategory);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out',
          isScrolled
            ? 'bg-[#10241F] py-4 border-b border-champagne/30 shadow-2xl'
            : 'bg-gradient-to-b from-[#10241F] via-[#10241F]/80 to-transparent py-6'
        )}
      >
        <div className="max-w-wide mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Left Side: Hamburger Trigger */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMegaMenuOpen(true)}
              className="group flex items-center space-x-2 text-ivory hover:text-champagne transition-colors focus:outline-none py-1"
              aria-label="Open Resort Menu"
            >
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

          {/* Right Side: RESERVE Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLanguage(language === 'EN' ? 'ID' : 'EN')}
              className="hidden md:flex items-center space-x-1 text-[11px] text-ivory/80 hover:text-champagne transition-colors uppercase tracking-wider"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-champagne" />
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

      {/* NIHI-Inspired Full-Screen Menu Overlay */}
      {megaMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#10241F] text-ivory flex flex-col animate-fade-in overflow-hidden">
          {/* Top Bar matching NIHI reference */}
          <div className="w-full px-4 sm:px-12 py-4 sm:py-5 flex items-center justify-between border-b border-champagne/25 bg-[#10241F]">
            {/* Left: Close Icon */}
            <button
              onClick={handleCloseMenu}
              className="text-ivory hover:text-champagne transition-colors p-1.5 focus:outline-none"
              aria-label="Close menu"
            >
              <X className="w-6 sm:w-7 h-6 sm:h-7 text-champagne" />
            </button>

            {/* Center: Official Logo */}
            <Link href="/" onClick={handleCloseMenu} className="flex flex-col items-center text-center">
              <Image
                src="/images/susan-spa-logo-gold.png"
                alt="Susan Spa & Resort"
                width={160}
                height={70}
                className="h-9 sm:h-11 w-auto object-contain"
              />
            </Link>

            {/* Right: Outlined RESERVE button */}
            <button
              onClick={() => {
                setMegaMenuOpen(false);
                if (onOpenReserve) onOpenReserve();
              }}
              className="border border-champagne/80 hover:border-champagne hover:bg-champagne hover:text-forest-deep text-champagne px-4 sm:px-6 py-1.5 sm:py-2 rounded-sm text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] transition-all"
            >
              RESERVE
            </button>
          </div>

          {/* Middle Body: Left Social Sidebar + Right Navigation (Main or Sub View) */}
          <div className="flex-1 overflow-y-auto flex flex-col justify-between">
            <div className="flex min-h-[380px]">
              {/* Left Vertical Social Media Sidebar */}
              <div className="w-14 sm:w-20 border-r border-champagne/20 flex flex-col items-center py-6 sm:py-8 space-y-6 sm:space-y-7 shrink-0 bg-[#10241F]">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/70 hover:text-champagne transition-colors p-1"
                  title="Instagram"
                >
                  <Instagram className="w-4 sm:w-5 h-4 sm:h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/70 hover:text-champagne transition-colors p-1"
                  title="Facebook"
                >
                  <Facebook className="w-4 sm:w-5 h-4 sm:h-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/70 hover:text-champagne transition-colors p-1"
                  title="YouTube"
                >
                  <Youtube className="w-4 sm:w-5 h-4 sm:h-5" />
                </a>
                <a
                  href="https://wa.me/62811299878"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/70 hover:text-champagne transition-colors p-1"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5" />
                </a>
              </div>

              {/* Right Navigation Area */}
              <div className="flex-1 px-6 sm:px-12 py-6 sm:py-8 max-w-3xl">
                {activeSubCategory === null ? (
                  /* Main Menu Navigation List */
                  <div className="space-y-2.5 sm:space-y-3.5 animate-fade-in">
                    {menuSections.map((sec) => (
                      <div key={sec.id} className="border-b border-white/5 pb-2.5 sm:pb-3">
                        {sec.hasSub ? (
                          <button
                            onClick={() => setActiveSubCategory(sec.id)}
                            className="w-full flex items-center justify-between group text-left focus:outline-none"
                          >
                            <span className="font-serif text-lg sm:text-xl lg:text-[22px] text-white group-hover:text-champagne transition-colors tracking-wide leading-tight font-normal">
                              {sec.label}
                            </span>
                            <ChevronRight className="w-5 h-5 text-champagne/80 group-hover:text-champagne group-hover:translate-x-1 transition-transform" />
                          </button>
                        ) : (
                          <Link
                            href={sec.href}
                            onClick={handleCloseMenu}
                            className="w-full flex items-center justify-between group text-left"
                          >
                            <span className="font-serif text-lg sm:text-xl lg:text-[22px] text-white group-hover:text-champagne transition-colors tracking-wide leading-tight font-normal">
                              {sec.label}
                            </span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Dedicated Sub-Menu Panel (NIHI Pattern: ← Back + Sub-Items) */
                  <div className="space-y-5 animate-fade-in">
                    {/* Back Button matching NIHI reference */}
                    <button
                      onClick={() => setActiveSubCategory(null)}
                      className="flex items-center space-x-2 text-ivory/80 hover:text-champagne transition-colors text-base font-medium group focus:outline-none"
                    >
                      <ArrowLeft className="w-5 h-5 text-champagne group-hover:-translate-x-1 transition-transform" />
                      <span className="tracking-wide">Back</span>
                    </button>

                    {/* Category Title Badge */}
                    <div className="pt-2 pb-1 border-b border-champagne/30">
                      <span className="text-xs uppercase tracking-[0.25em] text-champagne font-bold block">
                        {currentActiveSection?.label}
                      </span>
                    </div>

                    {/* Sub-Items List */}
                    <ul className="space-y-3.5 pt-1">
                      {currentActiveSection?.items?.map((sub, idx) => (
                        <li key={idx} className="border-b border-white/5 pb-2.5">
                          <Link
                            href={sub.href}
                            onClick={() => {
                              setMegaMenuOpen(false);
                              setActiveSubCategory(null);
                            }}
                            className="font-serif text-lg sm:text-xl lg:text-[22px] text-white hover:text-champagne transition-colors block leading-relaxed font-normal"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Lower Section: Property Location & Contact Info Cards */}
            <div className="bg-[#0B1916] border-t border-champagne/20 px-6 sm:px-16 py-6 sm:py-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-xs text-ivory/80">
              {/* Card 1: Susan Spa & Resort Main Property */}
              <div className="space-y-1.5">
                <Link
                  href="/contact"
                  onClick={handleCloseMenu}
                  className="font-sans font-bold text-xs sm:text-sm text-ivory hover:text-champagne transition-colors flex items-center space-x-1 uppercase tracking-wider"
                >
                  <span>Susan Spa & Resort — Bandungan</span>
                  <ChevronRight className="w-4 h-4 text-champagne" />
                </Link>
                <p className="text-ivory/70 leading-relaxed max-w-md text-[11px] sm:text-xs">
                  Jl. Gintungan Utara P.99, Jetis, Bandungan, Kab. Semarang, Jawa Tengah 50614{' '}
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-champagne hover:underline ml-1"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 inline" />
                  </a>
                </p>
                <p className="text-champagne font-medium pt-0.5 text-[11px] sm:text-xs">
                  WhatsApp: <a href="https://wa.me/62811299878" className="hover:underline">+62 811 299 878</a>
                </p>
              </div>

              {/* Card 2: La Kana Glass Chapel & Events */}
              <div className="space-y-1.5">
                <Link
                  href="/weddings"
                  onClick={() => setMegaMenuOpen(false)}
                  className="font-sans font-bold text-xs sm:text-sm text-ivory hover:text-champagne transition-colors flex items-center space-x-1 uppercase tracking-wider"
                >
                  <span>La Kana Glass Chapel & Sky Lawn</span>
                  <ChevronRight className="w-4 h-4 text-champagne" />
                </Link>
                <p className="text-ivory/70 leading-relaxed max-w-md text-[11px] sm:text-xs">
                  Bandungan Highlands ~1,100m ASL near Mount Ungaran, Central Java{' '}
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-champagne hover:underline ml-1"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 inline" />
                  </a>
                </p>
                <p className="text-champagne font-medium pt-0.5 text-[11px] sm:text-xs">
                  Direct Line: <a href="tel:+62298711111" className="hover:underline">+62 298 711111</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
