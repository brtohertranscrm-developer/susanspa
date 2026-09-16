'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  Maximize2,
  Users,
  BedDouble,
} from 'lucide-react';
import { Room } from '@/types';
import { roomCapacity, roomCategoryLabel } from '@/lib/room-display';

interface FeaturedRoomsCarouselProps {
  rooms: Room[];
  onInquire?: (roomSlug: string) => void;
}

export const FeaturedRoomsCarousel: React.FC<FeaturedRoomsCarouselProps> = ({
  rooms,
  onInquire,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Take exactly 3 rooms
  const displayRooms = rooms.slice(0, 3);

  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const currentScroll = el.scrollLeft;

    const progress = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0;
    setScrollProgress(progress);

    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).clientWidth + 20
      : 320;
    const index = Math.round(currentScroll / cardWidth);
    setCurrentIndex(Math.min(index, displayRooms.length - 1));
  }, [displayRooms.length]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  return (
    <div className="space-y-10">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-stone-200/70">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-botanical font-bold block">
            PILIHAN AKOMODASI
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep font-normal leading-tight">
            Kamar & Villa untuk Peristirahatan Sempurna
          </h2>
          <p className="editorial-body text-sm sm:text-base">
            Tiga kategori akomodasi unggulan dengan kenyamanan menyeluruh, pemandangan lereng Gunung Ungaran, serta suasana tenang yang menentramkan.
          </p>
        </div>

        {/* Desktop View All Link */}
        <div className="hidden md:flex items-center space-x-6 shrink-0">
          <Link
            href="/rooms"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-forest-deep hover:text-botanical font-bold border-b border-forest-deep hover:border-botanical pb-1 transition-colors"
          >
            <span>Lihat Semua 11 Tipe Akomodasi</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Responsive Presentation: Desktop 3-Column Grid, Mobile Horizontal Snap Track */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
        <div
          ref={scrollContainerRef}
          className="flex md:grid md:grid-cols-3 space-x-5 md:space-x-0 md:gap-8 overflow-x-auto md:overflow-visible snap-x md:snap-none no-scrollbar py-2 px-4 sm:px-6 lg:px-8 scroll-smooth"
        >
          {displayRooms.map((room, idx) => (
            <div
              key={room.id}
              className="group relative w-[85vw] max-w-[340px] sm:w-[360px] md:w-full shrink-0 snap-start bg-white border border-stone-200/90 hover:border-champagne/80 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
            >
              {/* Photo Container (Slightly Larger & Crisp) */}
              <div className="relative aspect-[16/10] overflow-hidden bg-forest-deep">
                <Image
                  src={room.images[0] || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop'}
                  alt={room.name}
                  fill
                  sizes="(max-width: 768px) 85vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/65 via-transparent to-transparent opacity-60" />

                {/* Category Badge & Slide Number */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="bg-forest-deep/90 text-champagne text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-champagne/30 backdrop-blur-md font-semibold">
                    {roomCategoryLabel(room.category)}
                  </span>

                  <span className="bg-white/80 backdrop-blur-md text-forest-deep text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border border-stone-200">
                    0{idx + 1}
                  </span>
                </div>
              </div>

              {/* Content Area (Generous & Breathable) */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl sm:text-[26px] text-forest-deep group-hover:text-botanical transition-colors font-normal leading-snug">
                    {room.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5852] line-clamp-2 leading-relaxed font-normal">
                    {room.description || room.tagline || 'Kenyamanan eksklusif di dataran tinggi Bandungan.'}
                  </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-200/70 text-center">
                  <div className="space-y-1">
                    <Maximize2 className="w-3.5 h-3.5 text-champagne-dark mx-auto" />
                    <span className="text-[10px] text-[#57635E] uppercase block tracking-wider font-medium">Luas Kamar</span>
                    <span className="font-semibold text-forest-deep text-xs sm:text-sm">
                      {room.sizeSqm ? `${room.sizeSqm}m²` : '-'}
                    </span>
                  </div>

                  <div className="space-y-1 border-x border-stone-200/60 px-1">
                    <Users className="w-3.5 h-3.5 text-champagne-dark mx-auto" />
                    <span className="text-[10px] text-[#57635E] uppercase block tracking-wider font-medium">Kapasitas</span>
                    <span className="font-semibold text-forest-deep text-xs sm:text-sm">
                      {roomCapacity(room)}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <BedDouble className="w-3.5 h-3.5 text-champagne-dark mx-auto" />
                    <span className="text-[10px] text-[#57635E] uppercase block tracking-wider font-medium">Tipe Kasur</span>
                    <span className="font-semibold text-forest-deep text-xs sm:text-sm line-clamp-1">
                      {room.bedType || '-'}
                    </span>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="flex items-center space-x-2.5 pt-1">
                  <Link
                    href={`/rooms/${room.slug}`}
                    className="flex-1 border border-stone-300 hover:border-forest text-forest hover:bg-forest hover:text-ivory text-xs uppercase tracking-wider font-semibold py-2.5 rounded-full text-center transition-all duration-300 flex items-center justify-center space-x-1.5"
                  >
                    <span>Detail Kamar</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => onInquire && onInquire(room.slug)}
                    className="bg-forest-deep hover:bg-forest text-champagne hover:text-champagne-light text-xs uppercase tracking-wider font-bold py-2.5 px-5 rounded-full transition-colors"
                  >
                    Pesan Kamar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Swipe Indicators (Hidden on Desktop) */}
      <div className="flex md:hidden items-center justify-between pt-1">
        {/* Progress Line & Slide Counter */}
        <div className="flex items-center space-x-3">
          <div className="w-24 h-[2px] bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-champagne-dark transition-all duration-300 rounded-full"
              style={{ width: `${Math.max(33, scrollProgress)}%` }}
            />
          </div>

          <span className="text-xs font-mono text-stone-500">
            0{currentIndex + 1} <span className="text-stone-300">/</span> 0{displayRooms.length}
          </span>
        </div>

        {/* Mobile Swipe Cue */}
        <div className="flex items-center space-x-1.5 text-[11px] text-botanical font-medium">
          <span className="tracking-wider uppercase">Geser untuk melihat 3 pilihan</span>
          <ArrowRight className="w-3 h-3 animate-pulse" />
        </div>
      </div>

      {/* Navigation Banner for Remaining Accommodations ("Selebihnya pindah halaman") */}
      <div className="mt-8 pt-8 border-t border-stone-200/70 text-center space-y-4">
        <div className="inline-flex items-center space-x-2 text-xs text-stone-500 font-medium tracking-wide">
          <span>Menampilkan 3 dari 11 tipe akomodasi resmi Susan Spa & Resort</span>
        </div>

        <div>
          <Link
            href="/rooms"
            className="inline-flex items-center space-x-2.5 bg-forest-deep hover:bg-forest text-champagne hover:text-champagne-light px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 transform hover:scale-105 shadow-sm"
          >
            <span>Jelajahi 11 Pilihan Kamar & Villa</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
