'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { FEATURED_FACILITIES } from '@/data/facilities';

export const FeaturedFacilitiesCarousel: React.FC = () => {
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
      : 340;
    const index = Math.round(currentScroll / cardWidth);
    setCurrentIndex(Math.min(index, FEATURED_FACILITIES.length - 1));
  }, []);

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
      : 340;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* Section Header with Desktop Navigation Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-bold block">
            PENGALAMAN RESORT
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-ivory">
            Fasilitas Unggulan Resort
          </h2>
          <p className="text-sm text-ivory/75 leading-relaxed font-normal">
            Nikmati kenyamanan fasilitas istimewa kami, mulai dari kolam renang air hangat, kebugaran Spa on the Sky, hingga keanggunan Kapel Kaca La Kana.
          </p>
        </div>

        {/* Desktop Carousel Controls & View All Link */}
        <div className="hidden md:flex items-center space-x-6 shrink-0">
          <Link
            href="/facilities"
            className="text-xs uppercase tracking-wider text-champagne hover:text-champagne-light font-semibold border-b border-champagne pb-1 transition-colors flex items-center space-x-1.5"
          >
            <span>Lihat Semua Fasilitas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Nav Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-3 rounded-full border transition-all duration-300 ${
                canScrollLeft
                  ? 'border-champagne/40 bg-forest-deep hover:bg-champagne hover:text-forest-deep text-champagne cursor-pointer'
                  : 'border-white/10 bg-forest-deep/40 text-white/20 cursor-not-allowed'
              }`}
              aria-label="Scroll facilities left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`p-3 rounded-full border transition-all duration-300 ${
                canScrollRight
                  ? 'border-champagne/40 bg-forest-deep hover:bg-champagne hover:text-forest-deep text-champagne cursor-pointer'
                  : 'border-white/10 bg-forest-deep/40 text-white/20 cursor-not-allowed'
              }`}
              aria-label="Scroll facilities right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Snap Scroll Track */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
        <div
          ref={scrollContainerRef}
          className="flex space-x-5 sm:space-x-6 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 lg:px-8 py-2 no-scrollbar scroll-smooth"
        >
          {FEATURED_FACILITIES.map((facility, index) => (
            <Link
              key={facility.id}
              href="/facilities"
              className="group relative w-[82vw] max-w-[310px] sm:w-[320px] lg:w-[350px] shrink-0 snap-start aspect-[3/4] rounded-3xl overflow-hidden border border-white/15 hover:border-champagne/70 transition-all duration-500 flex flex-col justify-between p-6 sm:p-7 bg-forest-deep cursor-pointer transform hover:-translate-y-1"
            >
              {/* Background Photo */}
              <Image
                src={facility.image}
                alt={facility.name}
                fill
                sizes="(max-width: 640px) 85vw, 360px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Multi-layered Cinematic Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#10241F] via-[#10241F]/60 to-[#10241F]/20 opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* Top Row: Category + Tag */}
              <div className="relative z-10 flex items-center justify-between w-full">
                <span className="bg-forest-deep/85 border border-champagne/30 text-champagne text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full backdrop-blur-md font-semibold">
                  {facility.category}
                </span>

                {facility.tag && (
                  <span className="text-[10px] text-ivory/80 font-medium tracking-wide bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm hidden sm:inline-block border border-white/10">
                    {facility.tag}
                  </span>
                )}
              </div>

              {/* Bottom Content: Number Index, Title, Description, and Action Link */}
              <div className="relative z-10 space-y-3">
                <div className="flex items-center space-x-2 text-champagne/70 text-[11px] font-mono">
                  <span>0{index + 1}</span>
                  <span className="h-[1px] w-6 bg-champagne/40" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-serif text-2xl sm:text-3xl text-ivory group-hover:text-champagne transition-colors leading-snug">
                    {facility.name}
                  </h3>
                  <p className="text-xs text-ivory/75 line-clamp-2 leading-relaxed font-normal">
                    {facility.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center text-xs text-champagne font-semibold tracking-wider uppercase space-x-2 group-hover:translate-x-1 transition-transform">
                  <span>Lihat Fasilitas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Under-Carousel Controls: Progress Indicator & Mobile Helpers */}
      <div className="flex items-center justify-between pt-2">
        {/* Progress Line & Slide Counter */}
        <div className="flex items-center space-x-4">
          <div className="w-32 sm:w-44 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-champagne transition-all duration-300 rounded-full"
              style={{ width: `${Math.max(12, scrollProgress)}%` }}
            />
          </div>

          <span className="text-xs font-mono text-ivory/60">
            0{currentIndex + 1} <span className="text-white/30">/</span> 0{FEATURED_FACILITIES.length}
          </span>
        </div>

        {/* Mobile Swipe Cue */}
        <div className="flex md:hidden items-center space-x-1.5 text-[11px] text-champagne/80">
          <span className="tracking-wider uppercase">Geser untuk melihat lainnya</span>
          <ArrowRight className="w-3 h-3 animate-pulse" />
        </div>

        {/* Mobile View All Button */}
        <div className="block md:hidden">
          <Link
            href="/facilities"
            className="text-[11px] uppercase tracking-wider text-champagne font-semibold border-b border-champagne pb-0.5"
          >
            Semua Fasilitas →
          </Link>
        </div>
      </div>
    </div>
  );
};
