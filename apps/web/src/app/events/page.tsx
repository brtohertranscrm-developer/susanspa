'use client';

import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';

export default function EventsPage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      <section className="relative h-screen min-h-screen flex flex-col justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 bg-forest-deep">
          <Image
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop"
            alt="Meetings and Events"
            fill
            className="object-cover "
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 text-center flex flex-col items-center justify-center">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal text-white text-center tracking-tight max-w-5xl mx-auto drop-shadow-lg">
            Ruang Pertemuan & Acara Privat
          </h1>
          
          <p className="mt-4 sm:mt-6 text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-white/90 max-w-2xl mx-auto font-medium text-center drop-shadow-md">
            PERTEMUAN BISNIS & GATHERING
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

      <section id="content" className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-forest-deep text-ivory p-8 rounded-3xl border border-champagne/30 space-y-4 shadow-xl">
            <span className="text-xs uppercase tracking-wider text-champagne font-semibold block">BALLROOM & RUANG PERTEMUAN</span>
            <h2 className="font-serif text-3xl text-ivory">Grand Mountain Ballroom</h2>
            <p className="text-xs text-ivory/70 leading-relaxed">
              Dilengkapi sistem audio visual modern, koneksi Wi-Fi stabil, dan tata pendingin udara. Siap mengakomodasi hingga 350 peserta dalam susunan teater.
            </p>
            <button
              onClick={() => setIsReserveModalOpen(true)}
              className="bg-champagne hover:bg-champagne-light text-forest-deep px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Konsultasi Acara
            </button>
          </div>

          <div className="bg-forest-deep text-ivory p-8 rounded-3xl border border-champagne/30 space-y-4 shadow-xl">
            <span className="text-xs uppercase tracking-wider text-champagne font-semibold block">AREA OUTDOOR & TEAM BUILDING</span>
            <h2 className="font-serif text-3xl text-ivory">Sky Lawn Outward Bound</h2>
            <p className="text-xs text-ivory/70 leading-relaxed">
              Hamparan rumput hijau asri yang luas, ideal untuk aktivitas team-building, peregangan pagi, serta acara malam ramah tamah bernuansa alam terbuka.
            </p>
            <button
              onClick={() => setIsReserveModalOpen(true)}
              className="bg-champagne hover:bg-champagne-light text-forest-deep px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Konsultasi Acara
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA message="Halo Tim Acara Susan Spa & Resort, saya ingin berkonsultasi mengenai penyelenggaraan meeting/gathering." />
      <ReservationModal isOpen={isReserveModalOpen} onClose={() => setIsReserveModalOpen(false)} preselectedType="event" />
    </div>
  );
}
