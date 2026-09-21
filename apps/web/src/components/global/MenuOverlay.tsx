'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  X,
  ChevronRight,
  ChevronDown,
  Instagram,
  Facebook,
  MessageCircle,
  Phone,
  CloudFog,
  Wind,
  Droplets,
  Sparkles,
} from 'lucide-react';
import { SITE_CONFIG } from '@/data/site';
import { cn } from '@/lib/utils';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReserve?: () => void;
}

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
}

interface SubMenuItem {
  label: string;
  href: string;
}

interface MenuCategory {
  id: string;
  label: string;
  href?: string;
  subItems?: SubMenuItem[];
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({
  isOpen,
  onClose,
  onOpenReserve,
}) => {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Active category for the 2-column desktop layout
  const [activeCategoryId, setActiveCategoryId] = useState<string>('rooms');
  // Expanded categories for mobile accordion layout
  const [expandedMobileCategories, setExpandedMobileCategories] = useState<Record<string, boolean>>({
    rooms: true,
  });

  // Live Bandungan weather state with verified highland fallback
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 21,
    humidity: 78,
    windSpeed: 8,
    condition: 'Sejuk & Berkabut',
  });

  // Fetch real-time weather for Bandungan, Semarang (lat -7.2185, lng 110.3683)
  useEffect(() => {
    let isMounted = true;
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-7.2185&longitude=110.3683&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m'
        );
        if (!res.ok) return;
        const data = await res.json();
        if (!isMounted || !data?.current) return;

        const temp = Math.round(data.current.temperature_2m);
        const hum = Math.round(data.current.relative_humidity_2m);
        const wind = Math.round(data.current.wind_speed_10m);
        const code = data.current.weather_code;

        let cond = 'Sejuk & Berawan';
        if (code >= 45 && code <= 48) cond = 'Berkabut Pegunungan';
        else if (code >= 51 && code <= 67) cond = 'Hujan Rintik Sejuk';
        else if (code >= 80 && code <= 82) cond = 'Hujan Pegunungan';
        else if (code === 0) cond = 'Cerah Berawan';

        setWeather({
          temperature: temp,
          humidity: hum,
          windSpeed: wind,
          condition: cond,
        });
      } catch {
        // Retain verified fallback data on network limitation
      }
    };

    if (isOpen) {
      fetchWeather();
    }

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Handle ESC key and Focus Trapping
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && overlayRef.current) {
        const focusableElements = overlayRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 60);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Categorized navigation hierarchy
  const menuCategories: MenuCategory[] = [
    {
      id: 'rooms',
      label: 'Kamar & Villa',
      href: '/rooms',
      subItems: [
        { label: 'Semua Kamar & Villa', href: '/rooms' },
        { label: 'Villa Kolam Renang Privat', href: '/rooms' },
        { label: 'Suite Keluarga & Mewah', href: '/rooms' },
        { label: 'Reservasi Menginap', href: '/reserve' },
      ],
    },
    {
      id: 'spa',
      label: 'Wellness & Spa',
      href: '/spa',
      subItems: [
        { label: 'Susan Spa & Signature Rituals', href: '/spa' },
        { label: 'Kolam Air Hangat Semispoor', href: '/facilities' },
        { label: 'Fasilitas Kebugaran & Sauna', href: '/facilities' },
        { label: 'Reservasi Perawatan Spa', href: '/spa' },
      ],
    },
    {
      id: 'dining',
      label: 'Restoran & Kuliner',
      href: '/dining',
      subItems: [
        { label: 'Sky Garden Cafe & Resto', href: '/dining' },
        { label: 'Menu & Pengalaman Bersantap', href: '/dining' },
        { label: 'Romantic Mountain Dinner', href: '/dining' },
      ],
    },
    {
      id: 'experiences',
      label: 'Pengalaman & Rekreasi',
      href: '/experiences',
      subItems: [
        { label: 'Aktivitas & Fasilitas Resort', href: '/facilities' },
        { label: 'Eden Park Bandungan', href: '/facilities' },
        { label: 'Wisata Sekitar Bandungan', href: '/nearby' },
        { label: 'Galeri Foto & Video', href: '/gallery' },
      ],
    },
    {
      id: 'wedding',
      label: 'La Kana Chapel & Events',
      href: '/wedding',
      subItems: [
        { label: 'La Kana Wedding Chapel', href: '/wedding' },
        { label: 'Paket & Venue Pernikahan', href: '/wedding' },
        { label: 'Pertemuan & Acara Privat', href: '/events' },
        { label: 'Konsultasi Wedding & Event', href: '/wedding' },
      ],
    },
    {
      id: 'offers',
      label: 'Paket & Penawaran',
      href: '/offers',
    },
    {
      id: 'about',
      label: 'Tentang Susan Spa',
      href: '/about',
      subItems: [
        { label: 'Kisah & Filosofi Resort', href: '/about' },
        { label: 'Jurnal & Inspirasi Liburan', href: '/journal' },
        { label: 'Galeri Resort', href: '/gallery' },
      ],
    },
    {
      id: 'contact',
      label: 'Kontak & Lokasi',
      href: '/contact',
    },
  ];

  const subLinks = [
    { label: 'SUSANSPARESORT.COM', href: '/' },
    { label: 'LA KANA WEDDING CHAPEL', href: '/wedding' },
  ];

  const properties = [
    { name: 'SUSAN SPA & RESORT', href: '/' },
    { name: 'LA KANA WEDDING CHAPEL', href: '/wedding' },
    { name: 'SKY GARDEN RESTAURANT', href: '/dining' },
    { name: 'SEMISPOOR WARM POOL', href: '/facilities' },
    { name: 'EDEN PARK BANDUNGAN', href: '/facilities' },
  ];

  const activeCategory =
    menuCategories.find((cat) => cat.id === activeCategoryId) || menuCategories[0];

  const toggleMobileCategory = (id: string) => {
    setExpandedMobileCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu Navigasi Susan Spa & Resort"
      className="fixed inset-0 z-50 overflow-y-auto bg-white text-forest-deep animate-fade-in flex flex-col justify-between"
    >
      {/* 1. TOP BAR */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-stone/20">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between">
          {/* Close button with clear icon and text */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="flex items-center space-x-2 text-forest-deep hover:text-terracotta p-2 -ml-2 min-h-[44px] min-w-[44px] transition-colors focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none rounded-md"
            aria-label="Tutup menu navigasi"
          >
            <X className="w-5 h-5 text-forest-deep" />
            <span className="text-xs uppercase font-bold tracking-[0.2em]">
              Close
            </span>
          </button>

          {/* Center Brand Logo */}
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center group py-1 focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none rounded-md"
          >
            <Image
              src="/images/susan-spa-logo-dark.png"
              alt={SITE_CONFIG.name}
              width={160}
              height={70}
              priority
              className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Right Action: Reserve CTA */}
          <button
            onClick={() => {
              onClose();
              if (onOpenReserve) onOpenReserve();
            }}
            className="border border-forest-deep text-forest-deep hover:bg-forest-deep hover:text-white px-5 sm:px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none"
          >
            Reserve
          </button>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA (2-COLUMN SPLIT DESKTOP / ACCORDION MOBILE) */}
      <div className="flex-1 bg-white">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
            
            {/* 2A. Far-Left Social Rail (Desktop vertical rail, mobile horizontal) */}
            <div className="flex lg:flex-col items-center lg:items-start space-x-6 lg:space-x-0 lg:space-y-6 shrink-0 lg:pt-2 border-b lg:border-b-0 lg:border-r border-stone/20 pb-4 lg:pb-0 lg:pr-8">
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest-deep/70 hover:text-terracotta p-2 min-h-[44px] min-w-[44px] flex items-center justify-center transition-all hover:scale-110 focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none rounded-md"
                aria-label="Kunjungi Instagram Susan Spa & Resort"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest-deep/70 hover:text-terracotta p-2 min-h-[44px] min-w-[44px] flex items-center justify-center transition-all hover:scale-110 focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none rounded-md"
                aria-label="Kunjungi Facebook Susan Spa & Resort"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                  'Halo Susan Spa & Resort, saya ingin bertanya seputar reservasi.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest-deep/70 hover:text-terracotta p-2 min-h-[44px] min-w-[44px] flex items-center justify-center transition-all hover:scale-110 focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none rounded-md"
                aria-label="Hubungi WhatsApp Resmi Susan Spa & Resort"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="text-forest-deep/70 hover:text-terracotta p-2 min-h-[44px] min-w-[44px] flex items-center justify-center transition-all hover:scale-110 focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none rounded-md"
                aria-label="Telepon Susan Spa & Resort"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>

            {/* 2B. Desktop Two-Column Layout (Hidden on Mobile) */}
            <div className="hidden lg:flex flex-1 gap-10 xl:gap-16">
              
              {/* Primary Categories Column (Left) */}
              <div className="w-[45%] xl:w-[42%] shrink-0 pr-8 border-r border-stone/20">
                <nav aria-label="Kategori Menu Utama">
                  <ul className="space-y-1">
                    {menuCategories.map((category) => {
                      const isSelected = activeCategoryId === category.id;
                      const hasSubmenu = Boolean(category.subItems && category.subItems.length > 0);

                      return (
                        <li key={category.id}>
                          {hasSubmenu ? (
                            <button
                              type="button"
                              onClick={() => setActiveCategoryId(category.id)}
                              onMouseEnter={() => setActiveCategoryId(category.id)}
                              onFocus={() => setActiveCategoryId(category.id)}
                              className={cn(
                                'group w-full flex items-center justify-between py-2 xl:py-2.5 text-left transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none rounded-sm min-h-[44px]',
                                isSelected
                                  ? 'text-terracotta font-semibold'
                                  : 'text-forest-deep hover:text-terracotta'
                              )}
                              aria-expanded={isSelected}
                            >
                              <div className="flex items-center space-x-3">
                                {isSelected ? (
                                  <span className="w-2 h-2 rounded-full bg-terracotta shrink-0 animate-pulse" />
                                ) : (
                                  <span className="w-2 h-2 rounded-full bg-transparent shrink-0" />
                                )}
                                <span className="font-serif text-2xl xl:text-3xl tracking-tight group-hover:translate-x-1 transition-transform duration-200">
                                  {category.label}
                                </span>
                              </div>
                              <ChevronRight
                                className={cn(
                                  'w-5 h-5 transition-all duration-200 shrink-0 ml-4',
                                  isSelected
                                    ? 'text-terracotta translate-x-1'
                                    : 'text-forest-deep/40 group-hover:text-terracotta group-hover:translate-x-1'
                                )}
                              />
                            </button>
                          ) : (
                            <Link
                              href={category.href || '#'}
                              onClick={onClose}
                              onMouseEnter={() => setActiveCategoryId(category.id)}
                              onFocus={() => setActiveCategoryId(category.id)}
                              className={cn(
                                'group flex items-center justify-between py-2 xl:py-2.5 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none rounded-sm min-h-[44px]',
                                pathname === category.href
                                  ? 'text-terracotta font-semibold'
                                  : 'text-forest-deep hover:text-terracotta'
                              )}
                            >
                              <div className="flex items-center space-x-3">
                                <span className="w-2 h-2 rounded-full bg-transparent shrink-0" />
                                <span className="font-serif text-2xl xl:text-3xl tracking-tight group-hover:translate-x-1 transition-transform duration-200">
                                  {category.label}
                                </span>
                              </div>
                              <ChevronRight className="w-5 h-5 text-forest-deep/40 group-hover:text-terracotta group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-4" />
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Sub-links with left arrow indicator */}
                <div className="mt-8 pt-6 border-t border-stone/20 flex flex-wrap gap-6 text-xs uppercase font-bold tracking-[0.18em]">
                  {subLinks.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={onClose}
                      className="inline-flex items-center text-forest-deep/70 hover:text-terracotta transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none rounded-sm"
                    >
                      <span className="mr-1 text-sm font-light">‹</span>
                      <span>{sub.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sub-Menu Column (Right Column) */}
              <div className="flex-1 pl-4 xl:pl-6">
                <div className="mb-4 pb-2 border-b border-stone/15 flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-[0.2em] text-forest-deep/60">
                    {activeCategory.label}
                  </span>
                  {activeCategory.href && (
                    <Link
                      href={activeCategory.href}
                      onClick={onClose}
                      className="text-xs uppercase font-bold tracking-[0.18em] text-terracotta hover:underline"
                    >
                      Lihat Halaman Utama ›
                    </Link>
                  )}
                </div>

                {activeCategory.subItems && activeCategory.subItems.length > 0 ? (
                  <nav aria-label={`Sub-menu ${activeCategory.label}`}>
                    <ul className="space-y-2">
                      {activeCategory.subItems.map((subItem) => {
                        const isSubActive =
                          pathname === subItem.href &&
                          (subItem.href !== '/rooms' || subItem.label === 'Semua Kamar & Villa');

                        return (
                          <li key={subItem.label}>
                            <Link
                              href={subItem.href}
                              onClick={onClose}
                              className={cn(
                                'group flex items-center justify-between py-3 px-4 rounded-md transition-all duration-200 min-h-[50px] focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none',
                                isSubActive
                                  ? 'bg-ivory-warm/60 text-terracotta font-semibold'
                                  : 'text-forest-deep hover:text-terracotta hover:bg-stone/10'
                              )}
                            >
                              <span className="font-serif text-xl xl:text-2xl tracking-tight group-hover:translate-x-1.5 transition-transform duration-200">
                                {subItem.label}
                              </span>
                              <ChevronRight className="w-5 h-5 text-forest-deep/35 group-hover:text-terracotta group-hover:translate-x-1.5 transition-all duration-200 shrink-0" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                ) : (
                  <div className="py-8 text-forest-deep/70">
                    <p className="font-serif text-xl mb-4">
                      Temukan informasi lengkap mengenai {activeCategory.label} di Susan Spa & Resort.
                    </p>
                    <Link
                      href={activeCategory.href || '#'}
                      onClick={onClose}
                      className="inline-flex items-center text-xs uppercase font-bold tracking-[0.2em] text-forest-deep hover:text-terracotta border-b border-forest-deep pb-1 transition-colors"
                    >
                      Kunjungi Halaman
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* 2C. Mobile Accordion Navigation (Visible on Small & Medium Screens) */}
            <div className="lg:hidden flex-1">
              <nav aria-label="Menu Mobile">
                <ul className="space-y-1">
                  {menuCategories.map((category) => {
                    const hasSubmenu = Boolean(category.subItems && category.subItems.length > 0);
                    const isExpanded = Boolean(expandedMobileCategories[category.id]);

                    return (
                      <li key={category.id} className="border-b border-stone/15 last:border-b-0 pb-1">
                        {hasSubmenu ? (
                          <div>
                            <button
                              type="button"
                              onClick={() => toggleMobileCategory(category.id)}
                              className="w-full flex items-center justify-between py-3 text-left transition-colors min-h-[48px] focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none"
                              aria-expanded={isExpanded}
                            >
                              <span className="font-serif text-2xl text-forest-deep">
                                {category.label}
                              </span>
                              {isExpanded ? (
                                <ChevronDown className="w-5 h-5 text-terracotta" />
                              ) : (
                                <ChevronRight className="w-5 h-5 text-forest-deep/40" />
                              )}
                            </button>

                            {isExpanded && category.subItems && (
                              <div className="pl-4 pb-3 pt-1 space-y-1 bg-stone/5 rounded-md mb-2">
                                {category.subItems.map((subItem) => (
                                  <Link
                                    key={subItem.label}
                                    href={subItem.href}
                                    onClick={onClose}
                                    className="flex items-center justify-between py-2.5 pr-3 text-forest-deep/90 hover:text-terracotta transition-colors min-h-[44px]"
                                  >
                                    <span className="text-base font-serif">
                                      {subItem.label}
                                    </span>
                                    <ChevronRight className="w-4 h-4 text-forest-deep/30 shrink-0" />
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={category.href || '#'}
                            onClick={onClose}
                            className="flex items-center justify-between py-3 text-forest-deep hover:text-terracotta transition-colors min-h-[48px] focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none"
                          >
                            <span className="font-serif text-2xl">
                              {category.label}
                            </span>
                            <ChevronRight className="w-5 h-5 text-forest-deep/40" />
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Sub-links mobile */}
              <div className="mt-8 pt-6 border-t border-stone/20 flex flex-wrap gap-4 text-xs uppercase font-bold tracking-[0.18em]">
                {subLinks.map((sub) => (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    onClick={onClose}
                    className="inline-flex items-center text-forest-deep/70 hover:text-terracotta transition-colors min-h-[44px]"
                  >
                    <span className="mr-1 text-sm font-light">‹</span>
                    <span>{sub.label}</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. BOTTOM BAR (GREEN BACKGROUND #10241F) */}
      <div className="bg-[#10241F] text-ivory border-t border-champagne/25">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            
            {/* 3A. Weather Widget Column */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-ivory/70 block">
                BANDUNGAN, KAB. SEMARANG
              </span>
              <div className="flex items-baseline space-x-3">
                <span className="font-serif text-3xl lg:text-4xl font-light text-white tracking-tight">
                  {weather.temperature}°C
                </span>
                <span className="text-xs font-medium text-ivory/80">
                  (1.100 mdpl)
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-medium text-champagne">
                <CloudFog className="w-4 h-4 shrink-0 text-champagne" />
                <span>{weather.condition}</span>
              </div>
              <div className="flex items-center space-x-4 text-xs text-ivory/75 pt-1">
                <div className="flex items-center space-x-1.5">
                  <Wind className="w-3.5 h-3.5 text-champagne" />
                  <span>{weather.windSpeed} km/h</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Droplets className="w-3.5 h-3.5 text-champagne" />
                  <span>{weather.humidity}%</span>
                </div>
              </div>
            </div>

            {/* 3B. Main Property & Emergency Contact */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-white">
                SUSAN SPA & RESORT
              </h4>
              <p className="text-xs text-ivory/80 leading-relaxed">
                {SITE_CONFIG.address.fullFormatted}
              </p>
              <div className="pt-2 border-t border-white/10 space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-champagne block">
                  KONTAK DARURAT & FRONT DESK
                </span>
                <p className="text-xs text-white">
                  Front Office (24 Jam):{' '}
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone}`}
                    className="hover:text-champagne underline underline-offset-2"
                  >
                    {SITE_CONFIG.contact.phoneFormatted}
                  </a>
                </p>
              </div>
            </div>

            {/* 3C. Direct Enquiry & Reservation Office */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-white">
                LAYANAN INFORMASI & RESERVASI
              </h4>
              <p className="text-xs text-ivory/80">
                Layanan Tamu: Setiap Hari 07:00 - 22:00 WIB
              </p>
              <div className="space-y-1.5 text-xs text-ivory/90">
                <p>
                  Telepon:{' '}
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone}`}
                    className="text-white hover:text-champagne transition-colors"
                  >
                    {SITE_CONFIG.contact.phoneFormatted}
                  </a>
                </p>
                <p>
                  WhatsApp:{' '}
                  <a
                    href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-champagne transition-colors"
                  >
                    {SITE_CONFIG.contact.whatsappFormatted}
                  </a>
                </p>
                <p>
                  Email:{' '}
                  <a
                    href={`mailto:${SITE_CONFIG.contact.reservationEmail}`}
                    className="text-white hover:text-champagne transition-colors"
                  >
                    {SITE_CONFIG.contact.reservationEmail}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* 3D. Our Properties / Facilities Bottom Bar */}
          <div className="mt-8 pt-6 border-t border-white/15">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-ivory/60 block mb-3">
              FASILITAS & DESTINASI KAMI
            </span>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase font-semibold tracking-wider text-ivory/80">
              {properties.map((prop) => (
                <Link
                  key={prop.name}
                  href={prop.href}
                  onClick={onClose}
                  className="hover:text-champagne flex items-center space-x-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none rounded-sm min-h-[32px]"
                >
                  <Sparkles className="w-3 h-3 text-champagne/70 shrink-0" />
                  <span>{prop.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
