'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Globe,
  Instagram,
  Facebook,
  MessageCircle,
  Phone,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE_CONFIG } from '@/data/site';
import type { Room } from '@/types';

interface HeaderProps {
  onOpenReserve?: () => void;
  rooms?: Room[];
}

export const Header: React.FC<HeaderProps> = ({ onOpenReserve }) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'ID'>('ID');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Rooms', href: '/rooms' },
    { label: 'Facilities', href: '/facilities' },
    { label: 'Wedding', href: '/wedding' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Nearby', href: '/nearby' },
    { label: 'Contact', href: '/contact' },
  ];

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

          {/* Desktop Proposed Main Navigation */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 relative py-1',
                    isActive
                      ? 'text-champagne font-semibold'
                      : 'text-ivory/90 hover:text-champagne'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-champagne rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Side CTA & Lang */}
          <div className="hidden lg:flex items-center space-x-5">
            <button
              onClick={() => setLanguage(language === 'EN' ? 'ID' : 'EN')}
              className="flex items-center space-x-1.5 text-xs text-ivory/80 hover:text-champagne transition-colors uppercase tracking-wider"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-champagne" />
              <span>{language}</span>
            </button>

            <button
              onClick={onOpenReserve}
              className="bg-champagne hover:bg-champagne-light text-forest-deep px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-md hover:shadow-champagne/20 hover:scale-105"
            >
              BOOK NOW
            </button>
          </div>

          {/* Mobile Right Controls: Book Now & Hamburger */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              onClick={onOpenReserve}
              className="bg-champagne text-forest-deep px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm"
            >
              BOOK NOW
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-ivory hover:text-champagne p-2 focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6 text-champagne" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Tablet Full-Screen Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#10241F] text-ivory flex flex-col animate-fade-in lg:hidden">
          {/* Top Bar */}
          <div className="px-5 py-4 flex items-center justify-between border-b border-champagne/20">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center"
            >
              <Image
                src="/images/susan-spa-logo-gold.png"
                alt={SITE_CONFIG.name}
                width={150}
                height={65}
                className="h-10 w-auto object-contain"
              />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-ivory hover:text-champagne p-2"
              aria-label="Close menu"
            >
              <X className="w-7 h-7 text-champagne" />
            </button>
          </div>

          {/* Nav List */}
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-champagne block font-semibold">
                Menu Navigasi
              </span>
              <ul className="space-y-3">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === '/'
                      ? pathname === '/'
                      : pathname === link.href || pathname.startsWith(`${link.href}/`);
                  return (
                    <li key={link.href} className="border-b border-white/5 pb-2">
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'font-serif text-2xl flex items-center justify-between transition-colors',
                          isActive
                            ? 'text-champagne font-semibold'
                            : 'text-ivory hover:text-champagne'
                        )}
                      >
                        <span>{link.label}</span>
                        <ChevronRight className="w-5 h-5 text-champagne/60" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Quick Action CTA */}
            <div className="pt-4 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenReserve) onOpenReserve();
                }}
                className="w-full bg-champagne hover:bg-champagne-light text-forest-deep py-3.5 rounded-xl font-bold uppercase tracking-[0.2em] text-xs text-center shadow-lg transition-colors"
              >
                BOOK NOW
              </button>

              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                  'Halo Susan Spa & Resort, saya ingin reservasi kamar / paket.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-champagne/50 text-champagne hover:bg-forest py-3 rounded-xl font-semibold uppercase tracking-wider text-xs flex items-center justify-center space-x-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat WhatsApp</span>
              </a>
            </div>

            {/* Contact & Socials */}
            <div className="pt-6 border-t border-white/10 space-y-3 text-xs text-ivory/70">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-champagne shrink-0" />
                <a href={`tel:${SITE_CONFIG.contact.phone}`} className="hover:text-champagne">
                  {SITE_CONFIG.contact.phoneFormatted}
                </a>
              </div>
              <p className="text-[11px] leading-relaxed">
                {SITE_CONFIG.address.fullFormatted}
              </p>
              <div className="flex items-center space-x-4 pt-2">
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory hover:text-champagne p-1"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory hover:text-champagne p-1"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
