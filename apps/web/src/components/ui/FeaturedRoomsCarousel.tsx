'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Users,
  Maximize2,
  BedDouble,
} from 'lucide-react';
import { Room } from '@/types';
import { roomCapacity } from '@/lib/room-display';

interface FeaturedRoomsCarouselProps {
  rooms: Room[];
  onInquire?: (roomSlug: string) => void;
}

export const FeaturedRoomsCarousel: React.FC<FeaturedRoomsCarouselProps> = ({
  rooms,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Strictly take 3 rooms as requested
  const displayRooms = rooms.slice(0, 3);

  const checkScrollability = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;

    setCanScrollPrev(scrollLeft > 10);
    setCanScrollNext(scrollLeft < maxScroll - 10);

    // Calculate approximate active slide index
    const cardEl = el.firstElementChild as HTMLElement | null;
    if (cardEl) {
      const cardWidth = cardEl.offsetWidth + 24; // width + gap
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(0, index), displayRooms.length - 1));
    }
  }, [displayRooms.length]);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    checkScrollability();
    el.addEventListener('scroll', checkScrollability, { passive: true });
    window.addEventListener('resize', checkScrollability);

    return () => {
      el.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
    };
  }, [checkScrollability]);

  const scrollToIndex = (index: number) => {
    const el = sliderRef.current;
    if (!el) return;

    const cardEl = el.children[index] as HTMLElement | undefined;
    if (cardEl) {
      el.scrollTo({
        left: cardEl.offsetLeft - el.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  const handlePrev = () => {
    const nextIdx = Math.max(0, activeIndex - 1);
    scrollToIndex(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(displayRooms.length - 1, activeIndex + 1);
    scrollToIndex(nextIdx);
  };

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* 1. TOP HEADER: TITLE ON LEFT, EDITORIAL DESCRIPTION ON RIGHT */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-2">
        <div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-forest-deep tracking-tight font-normal leading-tight">
            The Villas
          </h2>
        </div>

        <div className="max-w-md md:text-right">
          <p className="text-xs sm:text-sm text-forest-deep/75 leading-relaxed font-light">
            Dari peristirahatan romantis pasangan hingga hunian luas villa keluarga, setiap akomodasi di Susan Spa & Resort menghadirkan suaka privat dengan ketenangan dan karakter tersendiri.
          </p>
        </div>
      </div>

      {/* 2. CAROUSEL TRACK (2 CARDS VISIBLE ON DESKTOP, 1 ON MOBILE) */}
      <div className="relative group/carousel">
        {/* Left Floating Arrow */}
        <button
          onClick={handlePrev}
          disabled={!canScrollPrev}
          aria-label="Kamar Sebelumnya"
          className={`absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-forest-deep/60 hover:bg-forest-deep text-white border border-white/30 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md ${
            canScrollPrev ? 'opacity-90 hover:opacity-100 hover:scale-105' : 'opacity-0 pointer-events-none'
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Floating Arrow */}
        <button
          onClick={handleNext}
          disabled={!canScrollNext}
          aria-label="Kamar Berikutnya"
          className={`absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-forest-deep/60 hover:bg-forest-deep text-white border border-white/30 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md ${
            canScrollNext ? 'opacity-90 hover:opacity-100 hover:scale-105' : 'opacity-0 pointer-events-none'
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scrollable Slider Container */}
        <div
          ref={sliderRef}
          className="flex gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-2"
        >
          {displayRooms.map((room) => {
            const fallbackImage = '/images/rooms/room-1.jpg';
            const roomImage = room.images?.[0] || fallbackImage;

            return (
              <div
                key={room.id}
                className="w-full md:w-[calc(50%-16px)] shrink-0 snap-start"
              >
                <Link
                  href={`/rooms/${room.slug}`}
                  className="group relative block aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full overflow-hidden rounded-sm bg-forest-deep shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {/* Full Bleed Image with smooth zoom */}
                  <Image
                    src={roomImage}
                    alt={room.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Deep Gradient Overlay to guarantee high contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                  {/* Overlay Bottom Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10 flex items-end justify-between gap-4">
                    {/* Left details */}
                    <div className="space-y-2 max-w-lg">
                      <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-champagne/90 block">
                        SUSAN SPA & RESORT
                      </span>

                      <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-tight group-hover:text-champagne-light transition-colors">
                        {room.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-white/85 line-clamp-2 leading-relaxed font-light">
                        {room.description || room.tagline}
                      </p>

                      {/* Specs Row */}
                      <div className="flex flex-wrap items-center gap-4 pt-2 text-[11px] text-white/80 font-light">
                        <div className="flex items-center space-x-1.5">
                          <Users className="w-3.5 h-3.5 text-champagne/90 shrink-0" />
                          <span>{roomCapacity(room)}</span>
                        </div>

                        {room.sizeSqm && (
                          <div className="flex items-center space-x-1.5">
                            <Maximize2 className="w-3.5 h-3.5 text-champagne/90 shrink-0" />
                            <span>{room.sizeSqm} m²</span>
                          </div>
                        )}

                        {room.bedType && (
                          <div className="flex items-center space-x-1.5">
                            <BedDouble className="w-3.5 h-3.5 text-champagne/90 shrink-0" />
                            <span className="line-clamp-1">{room.bedType}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Circular Action Button */}
                    <div className="shrink-0 mb-1">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-forest-deep flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-champagne group-hover:text-forest-deep transition-all duration-300">
                        <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. BOTTOM CONTROLS: DOTS & VIEW ALL VILLAS BUTTON */}
      <div className="flex flex-col items-center justify-center space-y-6 pt-2">
        {/* Dot Indicators */}
        <div className="flex items-center justify-center space-x-2.5">
          {displayRooms.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Lihat kamar ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? 'w-6 bg-forest-deep'
                  : 'w-2 bg-stone-300 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>

        {/* View All Villas Outlined Button */}
        <div>
          <Link
            href="/rooms"
            className="inline-block border border-forest-deep text-forest-deep hover:bg-forest-deep hover:text-white px-8 sm:px-10 py-3 text-xs uppercase font-bold tracking-[0.2em] transition-all duration-300 text-center rounded-sm"
          >
            VIEW ALL VILLAS
          </Link>
        </div>
      </div>
    </div>
  );
};
