'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

interface ShowcaseItem {
  id: string;
  title: string;
  category: string;
  image: string;
  href: string;
}

const BEST_OF_ITEMS: ShowcaseItem[] = [
  {
    id: 'spa-sanctuary',
    title: 'Spa on the Sky Sanctuary',
    category: 'WELLNESS & SPA',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop',
    href: '/spa',
  },
  {
    id: 'la-kana-wedding',
    title: 'Momen Pernikahan di La Kana',
    category: 'WEDDING & CHAPEL',
    image: '/images/wedding/wedding-chapel-1.jpg',
    href: '/wedding',
  },
  {
    id: 'sky-garden-dining',
    title: 'Sky Garden Dining & Panorama',
    category: 'CULINARY & SCENIC',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    href: '/dining',
  },
  {
    id: 'special-offers',
    title: 'Paket Liburan & Penawaran',
    category: 'OFFERS & RETREATS',
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1200&auto=format&fit=crop',
    href: '/offers',
  },
];

export const BestOfShowcase: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const checkScrollability = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;

    setCanScrollPrev(scrollLeft > 10);
    setCanScrollNext(scrollLeft < maxScroll - 10);

    const cardEl = el.firstElementChild as HTMLElement | null;
    if (cardEl) {
      const cardWidth = cardEl.offsetWidth + 24;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(0, index), BEST_OF_ITEMS.length - 1));
    }
  }, []);

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
    const nextIdx = Math.min(BEST_OF_ITEMS.length - 1, activeIndex + 1);
    scrollToIndex(nextIdx);
  };

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-stone-200/60 overflow-hidden">
      <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        {/* Centered Large Serif Heading (Nihi Style) */}
        <div className="text-center">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-forest-deep font-normal tracking-tight">
            The Best of Susan Spa
          </h2>
        </div>

        {/* Carousel Slider with Tall Portrait Cards */}
        <div className="relative group/carousel">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            disabled={!canScrollPrev}
            aria-label="Item Sebelumnya"
            className={`absolute -left-2 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-forest-deep border border-stone-200/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md ${
              canScrollPrev ? 'opacity-90 hover:opacity-100 hover:scale-105' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            disabled={!canScrollNext}
            aria-label="Item Berikutnya"
            className={`absolute -right-2 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-forest-deep border border-stone-200/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md ${
              canScrollNext ? 'opacity-90 hover:opacity-100 hover:scale-105' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slider Track (4 items on desktop, snap on mobile) */}
          <div
            ref={sliderRef}
            className="flex gap-5 lg:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-2"
          >
            {BEST_OF_ITEMS.map((item) => (
              <div
                key={item.id}
                className="w-[72vw] sm:w-[280px] md:w-[calc(25%-18px)] shrink-0 snap-start"
              >
                <Link
                  href={item.href}
                  className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne rounded-sm"
                >
                  {/* Tall Portrait Photo Container */}
                  <div className="relative aspect-[9/15] w-full overflow-hidden rounded-sm bg-stone-100 shadow-sm transition-all duration-500 group-hover:shadow-md">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 72vw, (max-width: 1024px) 280px, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Subtle top/bottom vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Top-Right Floating Icon Button (Nihi style) */}
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <div className="w-8 h-8 rounded-full bg-white/85 text-forest-deep flex items-center justify-center backdrop-blur-sm shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-white">
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Clean Text Title Below Photo */}
                  <div className="pt-3.5">
                    <h3 className="text-sm sm:text-base font-normal text-forest-deep leading-snug group-hover:text-terracotta transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center space-x-2 pt-2">
          {BEST_OF_ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Pindah ke item ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? 'w-5 bg-forest-deep'
                  : 'w-1.5 bg-stone-300 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
