'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  type GalleryCategory,
} from '@/data/gallery';

export const GalleryGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('Semua');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(12);

  const filteredItems =
    activeCategory === 'Semua'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const displayedItems = filteredItems.slice(0, visibleCount);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  return (
    <div className="space-y-10">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
        {GALLERY_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setVisibleCount(12);
            }}
            className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-forest-deep text-champagne border border-champagne shadow-md'
                : 'bg-ivory-warm text-charcoal/80 hover:text-forest border border-stone/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry / Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedItems.map((item, idx) => {
          const aspectClass =
            item.aspectRatio === 'tall'
              ? 'aspect-[3/4] sm:row-span-2'
              : item.aspectRatio === 'wide'
              ? 'aspect-[16/10]'
              : 'aspect-square';

          return (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer border border-stone/30 hover:border-champagne shadow-md hover:shadow-2xl transition-all duration-500 bg-forest-deep ${aspectClass}`}
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/30 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6 text-ivory">
                <span className="text-[10px] uppercase tracking-widest text-champagne font-semibold">
                  {item.category}
                </span>
                <h4 className="font-serif text-lg text-ivory mt-1 font-medium leading-snug">
                  {item.title}
                </h4>
                <div className="mt-3 flex items-center text-xs text-champagne font-semibold space-x-1">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Perbesar Foto</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredItems.length && (
        <div className="text-center pt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="bg-forest-deep hover:bg-forest text-champagne px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-md transition-colors"
          >
            Muat Foto Lainnya
          </button>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {selectedImageIndex !== null && filteredItems[selectedImageIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-deep/95 backdrop-blur-xl animate-fade-in">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 text-ivory hover:text-champagne transition-colors z-50 focus:outline-none"
            aria-label="Tutup Galeri"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-ivory hover:text-champagne bg-forest/60 hover:bg-forest rounded-full transition-colors z-50"
            aria-label="Foto Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-ivory hover:text-champagne bg-forest/60 hover:bg-forest rounded-full transition-colors z-50"
            aria-label="Foto Berikutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Container */}
          <div className="max-w-5xl w-full space-y-4">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-champagne/40 shadow-2xl bg-black/40">
              <Image
                src={filteredItems[selectedImageIndex].image}
                alt={filteredItems[selectedImageIndex].title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
              />
            </div>
            <div className="text-center text-ivory space-y-1">
              <span className="text-xs uppercase tracking-widest text-champagne font-semibold block">
                {filteredItems[selectedImageIndex].category}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl">
                {filteredItems[selectedImageIndex].title}
              </h3>
              <p className="text-xs text-ivory/60">
                {selectedImageIndex + 1} dari {filteredItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
