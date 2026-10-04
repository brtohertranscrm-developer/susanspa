'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageCircle, ChevronDown } from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { SITE_CONFIG } from '@/data/site';
import type { DiningVenue } from '@/types';

export default function DiningPageClient({ venues }: { venues: DiningVenue[] }) {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      <section className="relative h-screen min-h-screen flex flex-col justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 bg-forest-deep">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop"
            alt="Sky Garden Restaurant"
            fill
            className="object-cover "
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 text-center flex flex-col items-center justify-center">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal text-white text-center tracking-tight max-w-5xl mx-auto drop-shadow-lg">
            Restoran & Kuliner Pilihan
          </h1>
          
          <p className="mt-4 sm:mt-6 text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-white/90 max-w-2xl mx-auto font-medium text-center drop-shadow-md">
            PENGALAMAN KULINER PEGUNUNGAN
          </p>
        </div>

        <a 
          href="#content"
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center space-y-1.5 group cursor-pointer"
        >
          <span className="text-white text-lg sm:text-xl font-serif drop-shadow-md">Jelajahi</span>
          <span className="text-white/70 text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-sans group-hover:text-white transition-colors">Explore Below</span>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white group-hover:translate-y-1 transition-all duration-300" />
        </a>
      </section>

      <section id="content" className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {venues.map((venue) => (
          <div key={venue.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-forest-deep text-ivory p-8 sm:p-12 border border-champagne/30 shadow-2xl">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={venue.image} alt={venue.name} fill className="object-cover" />
            </div>

            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-champagne block">{venue.operatingHours}</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ivory">{venue.name}</h2>
              <p className="text-xs text-champagne/90 italic">{venue.subtitle}</p>
              <p className="text-xs text-ivory/80 leading-relaxed">{venue.description}</p>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-champagne block">Menu Pilihan</span>
                <ul className="space-y-1 text-xs text-ivory/90">
                  {venue.menuHighlights?.map((dish, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="text-champagne">•</span>
                      <span>{dish}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                  `Halo Tim Restoran Susan Spa & Resort, saya ingin reservasi meja di ${venue.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-champagne hover:bg-champagne-light text-forest-deep px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Reservasi Meja Restoran</span>
              </a>
            </div>
          </div>
        ))}
      </section>

      <Footer />
      <WhatsAppCTA message="Halo Concierge Restoran Susan Spa, saya ingin menanyakan reservasi meja di Sky Garden Restaurant." />
      <ReservationModal isOpen={isReserveModalOpen} onClose={() => setIsReserveModalOpen(false)} />
    </div>
  );
}
