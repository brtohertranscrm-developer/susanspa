'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const currentScroll = el.scrollLeft;

    setCanScrollLeft(currentScroll > 15);
    setCanScrollRight(currentScroll < maxScroll - 15);

    const progress = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0;
    setScrollProgress(progress);

    // Approximate active card index
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).clientWidth + 20
      : 300;
    const index = Math.round(currentScroll / cardWidth);
    setCurrentIndex(Math.min(index, rooms.length - 1));
  }, [rooms.length]);

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

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).clientWidth + 20
      : 300;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* Header Row with Desktop Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-stone-200/70">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-botanical font-bold block">
            ACCOMMODATION SELECTION
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep font-normal">
            Suites & Villas Tailored for Rejuvenation
          </h2>
          <p className="editorial-body text-sm sm:text-base">
            Pilihan akomodasi unggulan dengan kenyamanan elegan, balkon berpanorama asri, serta privasi eksklusif di lereng Gunung Ungaran.
          </p>
        </div>

        {/* Desktop Controls & View All Link */}
        <div className="hidden md:flex items-center space-x-6 shrink-0">
          <Link
            href="/rooms"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-forest-deep hover:text-champagne font-bold border-b border-forest-deep hover:border-champagne pb-1 transition-colors"
          >
            <span>View All 11 Room Types</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Navigation Arrows */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-3 rounded-full border transition-all duration-300 ${
                canScrollLeft
                  ? 'border-stone-300 hover:border-forest text-forest hover:bg-forest hover:text-ivory cursor-pointer'
                  : 'border-stone-200 text-stone-300 cursor-not-allowed'
              }`}
              aria-label="Scroll rooms left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`p-3 rounded-full border transition-all duration-300 ${
                canScrollRight
                  ? 'border-stone-300 hover:border-forest text-forest hover:bg-forest hover:text-ivory cursor-pointer'
                  : 'border-stone-200 text-stone-300 cursor-not-allowed'
              }`}
              aria-label="Scroll rooms right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
        <div
          ref={scrollContainerRef}
          className="flex space-x-5 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 lg:px-8 py-3 no-scrollbar scroll-smooth"
        >
          {rooms.map((room) => (
            <div
              key={room.id}
              className="group relative w-[76vw] max-w-[285px] sm:w-[295px] lg:w-[315px] shrink-0 snap-start bg-white border border-stone-200/90 hover:border-champagne/80 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              {/* Compact Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-forest-deep">
                <Image
                  src={room.images[0] || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop'}
                  alt={room.name}
                  fill
                  sizes="(max-width: 640px) 80vw, 320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent opacity-60" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-forest-deep/90 text-champagne text-[9px] uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full border border-champagne/30 backdrop-blur-md font-semibold">
                    {roomCategoryLabel(room.category)}
                  </span>
                </div>
              </div>

              {/* Compact Content Area */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl sm:text-2xl text-forest-deep group-hover:text-champagne transition-colors font-normal leading-snug line-clamp-1">
                    {room.name}
                  </h3>
                  <p className="text-[11px] text-[#4A5852] line-clamp-2 leading-relaxed font-normal">
                    {room.description || room.tagline || 'Kenyamanan eksklusif di dataran tinggi Bandungan.'}
                  </p>
                </div>

                {/* Compact Specs Grid */}
                <div className="grid grid-cols-3 gap-1 py-2.5 border-y border-stone-200/70 text-center">
                  <div className="space-y-0.5">
                    <Maximize2 className="w-3 h-3 text-champagne-dark mx-auto" />
                    <span className="text-[9px] text-stone-500 uppercase block font-medium">Size</span>
                    <span className="text-[11px] font-semibold text-forest-deep">
                      {room.sizeSqm ? `${room.sizeSqm}m²` : '—'}
                    </span>
                  </div>

                  <div className="space-y-0.5 border-x border-stone-200/60 px-1">
                    <Users className="w-3 h-3 text-champagne-dark mx-auto" />
                    <span className="text-[9px] text-stone-500 uppercase block font-medium">Capacity</span>
                    <span className="text-[11px] font-semibold text-forest-deep">
                      {roomCapacity(room)}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <BedDouble className="w-3 h-3 text-champagne-dark mx-auto" />
                    <span className="text-[9px] text-stone-500 uppercase block font-medium">Bed</span>
                    <span className="text-[11px] font-semibold text-forest-deep line-clamp-1">
                      {room.bedType || '—'}
                    </span>
                  </div>
                </div>

                {/* Compact Action CTAs */}
                <div className="flex items-center space-x-2 pt-1">
                  <Link
                    href={`/rooms/${room.slug}`}
                    className="flex-1 border border-stone-300 hover:border-forest text-forest hover:bg-forest hover:text-ivory text-[11px] uppercase tracking-wider font-semibold py-2 rounded-full text-center transition-all duration-300 flex items-center justify-center space-x-1"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>

                  <button
                    onClick={() => onInquire && onInquire(room.slug)}
                    className="bg-forest-deep hover:bg-forest text-champagne hover:text-champagne-light text-[11px] uppercase tracking-wider font-bold py-2 px-3.5 rounded-full transition-colors"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Under-Carousel Controls: Progress Indicator & Mobile Helpers */}
      <div className="flex items-center justify-between pt-1">
        {/* Progress Line & Slide Counter */}
        <div className="flex items-center space-x-4">
          <div className="w-28 sm:w-40 h-[2px] bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-champagne-dark transition-all duration-300 rounded-full"
              style={{ width: `${Math.max(16, scrollProgress)}%` }}
            />
          </div>

          <span className="text-xs font-mono text-stone-500">
            0{currentIndex + 1} <span className="text-stone-300">/</span> 0{rooms.length}
          </span>
        </div>

        {/* Mobile Swipe Cue */}
        <div className="flex md:hidden items-center space-x-1.5 text-[11px] text-botanical font-medium">
          <span className="tracking-wider uppercase">Swipe to explore</span>
          <ArrowRight className="w-3 h-3 animate-pulse" />
        </div>

        {/* Mobile View All Button */}
        <div className="block md:hidden">
          <Link
            href="/rooms"
            className="text-[11px] uppercase tracking-wider text-forest-deep font-bold border-b border-forest-deep pb-0.5"
          >
            All Rooms →
          </Link>
        </div>
      </div>
    </div>
  );
};
