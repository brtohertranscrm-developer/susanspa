'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Flame,
  Waves,
  Dumbbell,
  Droplets,
  Utensils,
  Coffee,
  CupSoda,
  Smile,
  HeartHandshake,
  Compass,
  Church,
  Crown,
  Briefcase,
  Wifi,
  Shirt,
  ShieldCheck,
  GlassWater,
  Bell,
  ArrowRight,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import { FACILITIES } from '@/data/facilities';
import type { Facility } from '@/types';

// Icon mapping per facility iconName
const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  Flame,
  Waves,
  Dumbbell,
  Droplets,
  Utensils,
  Coffee,
  CupSoda,
  Smile,
  HeartHandshake,
  Compass,
  Church,
  Crown,
  Briefcase,
  Wifi,
  Shirt,
  ShieldCheck,
  GlassWater,
  Bell,
};

// Category tabs definition
const CATEGORIES: Array<{
  id: 'All' | Facility['category'];
  label: string;
  count: number;
}> = [
  { id: 'All', label: 'Semua Fasilitas', count: FACILITIES.length },
  { id: 'Wellness', label: 'Wellness & Spa', count: FACILITIES.filter((f) => f.category === 'Wellness').length },
  { id: 'Dining', label: 'Santap Kuliner', count: FACILITIES.filter((f) => f.category === 'Dining').length },
  { id: 'Family & Recreation', label: 'Rekreasi Keluarga', count: FACILITIES.filter((f) => f.category === 'Family & Recreation').length },
  { id: 'Events', label: 'Acara & Pernikahan', count: FACILITIES.filter((f) => f.category === 'Events').length },
  { id: 'Guest Services', label: 'Layanan Tamu', count: FACILITIES.filter((f) => f.category === 'Guest Services').length },
];

export const FacilitiesIconGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | Facility['category']>('All');

  const displayedFacilities =
    selectedCategory === 'All'
      ? FACILITIES
      : FACILITIES.filter((f) => f.category === selectedCategory);

  return (
    <div className="w-full space-y-10 sm:space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/10">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 text-champagne">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold">
              FASILITAS & LAYANAN RESORT
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory font-normal leading-tight">
            Kenyamanan Lengkap di Lereng Pegunungan
          </h2>
          <p className="text-xs sm:text-sm text-ivory/75 font-light leading-relaxed">
            Menyajikan {FACILITIES.length} fasilitas terpadu di ketinggian ±1.100 mdpl untuk memanjakan relaksasi tubuh, cita rasa kuliner, rekreasi keluarga, hingga kelancaran momen istimewa Anda.
          </p>
        </div>

        <Link
          href="/facilities"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-bold text-champagne hover:text-champagne-light transition-colors shrink-0 group self-start md:self-end pb-1"
        >
          <span>Lihat Galeri Foto & Jam Buka</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Category Filter Tabs (Pills) */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200 flex items-center space-x-1.5 ${
                isActive
                  ? 'bg-champagne text-forest-deep font-semibold shadow-sm scale-105'
                  : 'bg-white/[0.06] text-ivory/80 hover:text-ivory hover:bg-white/[0.12] border border-white/10'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-forest-deep/20 text-forest-deep' : 'bg-white/10 text-ivory/60'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Icon Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {displayedFacilities.map((facility) => {
          const IconComponent = (facility.iconName && ICON_MAP[facility.iconName]) || Sparkles;
          const firstHighlight = facility.highlights?.[0] || facility.category;

          return (
            <Link
              key={facility.id}
              href={`/facilities#${facility.id}`}
              className="group relative p-4 sm:p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-champagne/60 transition-all duration-300 flex flex-col justify-between items-start text-left min-h-[140px] sm:min-h-[155px]"
            >
              {/* Top Row: Icon & subtle arrow */}
              <div className="w-full flex items-center justify-between mb-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-forest-light/60 border border-white/10 group-hover:border-champagne/50 group-hover:bg-champagne/15 flex items-center justify-center text-champagne transition-all duration-300">
                  <IconComponent className="w-5 h-5 sm:w-5.5 sm:h-5.5" strokeWidth={1.6} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/25 group-hover:text-champagne group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              {/* Bottom Content: Title & Highlight */}
              <div className="space-y-1 w-full">
                <h3 className="font-serif text-sm sm:text-base text-ivory font-medium group-hover:text-champagne transition-colors line-clamp-1">
                  {facility.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-ivory/60 font-light line-clamp-1">
                  {firstHighlight}
                </p>
                <span className="text-[10px] text-champagne/75 uppercase tracking-wider block pt-0.5 font-medium">
                  {facility.category}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Subtle Bottom Strip */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-ivory/70">
        <div className="flex items-center space-x-2.5 text-center sm:text-left">
          <span className="w-2 h-2 rounded-full bg-champagne shrink-0" />
          <span>Semua fasilitas resort dikelola dengan standar kebersihan dan keramahan prima.</span>
        </div>
        <Link
          href="/facilities"
          className="text-champagne hover:text-champagne-light font-semibold uppercase tracking-wider transition-colors inline-flex items-center space-x-1 shrink-0"
        >
          <span>Buka Direktori Lengkap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
