'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X } from 'lucide-react';

interface GalleryItem {
  id: string;
  category: 'Rooms' | 'Spa' | 'La Kana Chapel' | 'Dining' | 'Grounds';
  title: string;
  image: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: '1', category: 'La Kana Chapel', title: 'La Kana Glass Chapel at Sunset', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop' },
  { id: '2', category: 'Rooms', title: 'Grand Mountain Villa Private Dip Pool', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop' },
  { id: '3', category: 'Spa', title: 'Herbal Thermal Bath Suite', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600&auto=format&fit=crop' },
  { id: '4', category: 'Dining', title: 'Sky Garden Candlelight Dining', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop' },
  { id: '5', category: 'Grounds', title: 'Heated Infinity Pool Overlooking Valley', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1600&auto=format&fit=crop' },
  { id: '6', category: 'Rooms', title: 'Royal Jacuzzi Suite Interior', image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1600&auto=format&fit=crop' },
  { id: '7', category: 'La Kana Chapel', title: 'Bridal Ceremony Entrance', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop' },
  { id: '8', category: 'Spa', title: 'Couples Massage Suite', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1600&auto=format&fit=crop' },
  { id: '9', category: 'Grounds', title: 'Sky Garden Flower Walkway', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1600&auto=format&fit=crop' },
];

export const GalleryGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = ['All', 'La Kana Chapel', 'Rooms', 'Spa', 'Dining', 'Grounds'];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
              activeCategory === cat
                ? 'bg-champagne text-forest-deep font-semibold shadow-md'
                : 'bg-forest/80 text-ivory/80 hover:text-champagne border border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border border-champagne/20 shadow-md hover:shadow-2xl transition-all"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/20 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6 text-ivory">
              <span className="text-[10px] uppercase tracking-widest text-champagne">{item.category}</span>
              <h4 className="font-serif text-lg text-ivory mt-1">{item.title}</h4>
              <div className="mt-3 flex items-center text-xs text-champagne">
                <Maximize2 className="w-4 h-4 mr-1" />
                <span>Expand View</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-deep/95 backdrop-blur-xl animate-fade-in">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-3 text-ivory hover:text-champagne"
            aria-label="Close Lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-5xl w-full space-y-4">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-champagne/40 shadow-2xl">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center text-ivory">
              <span className="text-xs uppercase tracking-widest text-champagne">{selectedImage.category}</span>
              <h3 className="font-serif text-2xl mt-1">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
