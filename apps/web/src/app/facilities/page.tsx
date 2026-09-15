'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  Utensils,
  Smile,
  Church,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
} from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { FACILITY_GROUPS } from '@/data/facilities';

const CATEGORY_ICONS = {
  Wellness: Sparkles,
  Dining: Utensils,
  'Family & Recreation': Smile,
  Events: Church,
  'Guest Services': ShieldCheck,
};

export default function FacilitiesPage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredGroups =
    activeCategory === 'All'
      ? FACILITY_GROUPS
      : FACILITY_GROUPS.filter((g) => g.category === activeCategory);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      {/* Hero Header */}
      <section className="relative pt-36 pb-24 bg-forest-deep text-ivory text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2000&auto=format&fit=crop"
            alt="Susan Spa Facilities"
            fill
            priority
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/80 to-forest-deep/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-bold block">
            FASILITAS & PENGALAMAN RESORT
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-normal">
            Fasilitas & Layanan Unggulan
          </h1>
          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-light leading-relaxed">
            Temukan ragam fasilitas lengkap kami yang dirancang untuk relaksasi kebugaran, santap kuliner, keceriaan keluarga, perayaan istimewa, hingga kenyamanan layanan menginap Anda.
          </p>

          <div className="pt-4">
            <button
              onClick={() => setIsReserveModalOpen(true)}
              className="bg-champagne hover:bg-champagne-light text-forest-deep px-8 py-3.5 rounded-full font-bold uppercase tracking-[0.2em] text-xs shadow-lg transition-transform hover:scale-105"
            >
              Reservasi Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* Category Navigation Pills */}
      <div className="sticky top-20 z-30 bg-ivory/95 backdrop-blur-md border-b border-stone/20 py-4 shadow-sm">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
              activeCategory === 'All'
                ? 'bg-forest-deep text-champagne border border-champagne shadow-md'
                : 'bg-ivory-warm text-charcoal/80 hover:text-forest border border-stone/30'
            }`}
          >
            Semua Fasilitas
          </button>
          {FACILITY_GROUPS.map((group) => {
            const Icon = CATEGORY_ICONS[group.category] || Sparkles;
            return (
              <button
                key={group.category}
                onClick={() => setActiveCategory(group.category)}
                className={`inline-flex items-center space-x-1.5 px-4 sm:px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
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
          const Icon = CATEGORY_ICONS[group.category] || Sparkles;
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
                    className="bg-forest-deep text-ivory rounded-3xl overflow-hidden border border-champagne/25 shadow-xl flex flex-col justify-between group hover:border-champagne/60 transition-all duration-300 scroll-mt-28"
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
