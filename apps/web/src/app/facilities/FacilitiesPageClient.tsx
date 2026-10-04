'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Flower2,
  Utensils,
  Smile,
  Church,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  ChevronDown,
} from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import type { FacilityGroup } from '@/data/facilities';

const CATEGORY_ICONS = {
  Wellness: Flower2,
  Dining: Utensils,
  'Family & Recreation': Smile,
  Events: Church,
  'Guest Services': ShieldCheck,
};

export default function FacilitiesPageClient({ facilityGroups }: { facilityGroups: FacilityGroup[] }) {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredGroups =
    activeCategory === 'All'
      ? facilityGroups
      : facilityGroups.filter((g) => g.category === activeCategory);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      {/* Hero Header */}
      <section className="relative h-screen min-h-screen flex flex-col justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 bg-forest-deep">
          <Image
            src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2000&auto=format&fit=crop"
            alt="Susan Spa Facilities"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 text-center flex flex-col items-center justify-center">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal text-white text-center tracking-tight max-w-5xl mx-auto drop-shadow-lg">
            Fasilitas Resort
          </h1>
          
          <p className="mt-4 sm:mt-6 text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-white/90 max-w-2xl mx-auto font-medium text-center drop-shadow-md">
            FASILITAS & PENGALAMAN RESORT
          </p>
        </div>

        <a 
          href="#content"
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center space-y-1.5 group cursor-pointer"
        >
          <span className="text-white text-lg sm:text-xl font-serif drop-shadow-md">Jelajahi Fasilitas</span>
          <span className="text-white/70 text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-sans group-hover:text-white transition-colors">Explore Below</span>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white group-hover:translate-y-1 transition-all duration-300" />
        </a>
      </section>

      {/* Category Navigation Pills */}
      <div id="content" className="sticky top-20 z-30 bg-ivory/95 backdrop-blur-md border-b border-stone/20 py-3 sm:py-4 shadow-sm">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 flex items-center sm:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth">
          <button
            onClick={() => setActiveCategory('All')}
            className={`shrink-0 px-4 sm:px-5 py-2 min-h-[40px] rounded-full text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center ${
              activeCategory === 'All'
                ? 'bg-forest-deep text-champagne border border-champagne shadow-md'
                : 'bg-ivory-warm text-charcoal/80 hover:text-forest border border-stone/30'
            }`}
          >
            Semua Fasilitas
          </button>
          {facilityGroups.map((group) => {
            const Icon = CATEGORY_ICONS[group.category as keyof typeof CATEGORY_ICONS] || Flower2;
            return (
              <button
                key={group.category}
                onClick={() => setActiveCategory(group.category)}
                className={`shrink-0 inline-flex items-center space-x-1.5 px-4 sm:px-5 py-2 min-h-[40px] rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeCategory === group.category
                    ? 'bg-forest-deep text-champagne border border-champagne shadow-md'
                    : 'bg-ivory-warm text-charcoal/80 hover:text-forest border border-stone/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{group.category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Categorized Groups Sections */}
      <section className="py-16 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {filteredGroups.map((group) => {
          const Icon = CATEGORY_ICONS[group.category as keyof typeof CATEGORY_ICONS] || Flower2;
          return (
            <div key={group.category} className="space-y-8">
              {/* Category Header */}
              <div className="border-b border-stone/30 pb-4">
                <div className="inline-flex items-center space-x-2 text-botanical mb-1">
                  <Icon className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-[0.25em] font-bold">
                    {group.category}
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-forest-deep">
                  {group.title}
                </h2>
                <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
                  {group.description}
                </p>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.items.map((facility) => (
                  <div
                    key={facility.id}
                    id={facility.id}
                    className="bg-forest-deep text-ivory overflow-hidden border border-champagne/25 shadow-xl flex flex-col justify-between group hover:border-champagne/60 transition-all duration-300 scroll-mt-28"
                  >
                    {facility.image && (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={facility.image}
                          alt={facility.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {facility.operatingHours && (
                          <div className="absolute top-3 left-3 bg-forest-deep/90 text-champagne text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-champagne/20 flex items-center space-x-1 font-medium">
                            <Clock className="w-3 h-3" />
                            <span>{facility.operatingHours}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-serif text-xl sm:text-2xl text-ivory group-hover:text-champagne transition-colors">
                          {facility.title}
                        </h3>
                        <p className="text-xs text-ivory/75 leading-relaxed">
                          {facility.description}
                        </p>
                      </div>

                      {facility.highlights && facility.highlights.length > 0 && (
                        <div className="pt-2 space-y-1.5 border-t border-white/10">
                          {facility.highlights.map((highlight, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-2 text-[11px] text-champagne"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                              <span className="text-ivory/80">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Global Bottom CTA: Book Your Stay */}
        <div className="bg-forest-deep text-ivory rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-champagne/30 shadow-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-bold block">
            PERISTIRAHATAN MENENANGKAN DI BANDUNGAN
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-ivory max-w-2xl mx-auto">
            Nikmati Pengalaman Menenangkan Bersama Kami
          </h2>
          <p className="text-sm text-ivory/75 max-w-xl mx-auto">
            Kami mengundang Bapak/Ibu untuk menikmati seluruh fasilitas unggulan Susan Spa & Resort dalam suasana pegunungan yang asri dan sejuk.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setIsReserveModalOpen(true)}
              className="bg-champagne hover:bg-champagne-light text-forest-deep px-8 py-3.5 rounded-full font-bold uppercase tracking-[0.2em] text-xs shadow-lg transition-transform hover:scale-105 inline-flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservasi Kamar Sekarang</span>
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
      />
    </div>
  );
}
