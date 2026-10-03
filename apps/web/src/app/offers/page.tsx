'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, ChevronDown } from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { OFFERS } from '@/data/offers';

export default function OffersPage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      <section className="relative h-screen min-h-screen flex flex-col justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 bg-forest-deep">
          <Image
            src="https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=2000&auto=format&fit=crop"
            alt="Special Packages"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 text-center flex flex-col items-center justify-center">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal text-white text-center tracking-tight max-w-5xl mx-auto drop-shadow-lg">
            Paket Menginap Pilihan
          </h1>
          
          <p className="mt-4 sm:mt-6 text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-white/90 max-w-2xl mx-auto font-medium text-center drop-shadow-md">
            PENAWARAN SPESIAL
          </p>
        </div>

        <a 
          href="#content"
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center space-y-1.5 group cursor-pointer"
        >
          <span className="text-white text-lg sm:text-xl font-serif drop-shadow-md">Lihat Paket</span>
          <span className="text-white/70 text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-sans group-hover:text-white transition-colors">Explore Below</span>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white group-hover:translate-y-1 transition-all duration-300" />
        </a>
      </section>

      <section id="content" className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {OFFERS.map((offer) => (
            <div key={offer.id} className="bg-forest-deep text-ivory overflow-hidden border border-champagne/30 shadow-2xl flex flex-col justify-between">
              <div className="relative aspect-[16/9]">
                <Image src={offer.image} alt={offer.title} fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-champagne text-forest-deep text-[10px] uppercase font-semibold tracking-wider px-3 py-1 rounded-full">
                  {offer.badge}
                </div>
              </div>

              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] text-champagne uppercase tracking-wider block">{offer.validity}</span>
                  <h3 className="font-serif text-2xl text-ivory">{offer.title}</h3>
                  <p className="text-xs text-ivory/70 leading-relaxed">{offer.description}</p>

                  <div className="pt-3 border-t border-white/10 space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-champagne font-semibold block">Inklusi Paket</span>
                    {offer.inclusions.map((inc, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-ivory/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-champagne shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setIsReserveModalOpen(true)}
                  className="w-full bg-champagne hover:bg-champagne-light text-forest-deep py-3 rounded-full text-xs uppercase tracking-wider font-semibold shadow-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Tanya Ketersediaan Paket</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <ReservationModal isOpen={isReserveModalOpen} onClose={() => setIsReserveModalOpen(false)} />
    </div>
  );
}
