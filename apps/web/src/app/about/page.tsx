'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Compass, Heart , ChevronDown} from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';

export default function AboutPage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      <section className="relative h-screen min-h-screen flex flex-col justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 bg-forest-deep">
          <Image
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop"
            alt="About Susan Spa"
            fill
            className="object-cover "
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 text-center flex flex-col items-center justify-center">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal text-white text-center tracking-tight max-w-5xl mx-auto drop-shadow-lg">
            Peristirahatan Sejuk di Atas Bandungan
          </h1>
          
          <p className="mt-4 sm:mt-6 text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-white/90 max-w-2xl mx-auto font-medium text-center drop-shadow-md">
            KISAH & FILOSOFI KAMI
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

      <section id="content" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl text-forest-deep">Kesejukan Alami & Keramahan Penuh Ketulusan</h2>
        <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-normal">
          Dihadirkan sebagai tempat rehat yang menenangkan dari padatnya ritme perkotaan, Susan Spa & Resort memadukan keramahtamahan tradisi Jawa dengan fasilitas kenyamanan modern. Dikelilingi udara pegunungan yang bersih, rimbunnya pepohonan lereng bukit, dan panorama lembah yang membentang luas.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-left">
          <div className="p-6 bg-ivory-warm rounded-2xl border border-stone/30 space-y-2">
            <Compass className="w-6 h-6 text-champagne" />
            <h3 className="font-serif text-lg text-forest-deep">Hawa Sejuk Pegunungan</h3>
            <p className="text-xs text-charcoal/70">Suhu udara rata-rata 18°C hingga 24°C di ketinggian ±1.100 mdpl sepanjang tahun.</p>
          </div>

          <div className="p-6 bg-ivory-warm rounded-2xl border border-stone/30 space-y-2">
            <span className="font-serif text-xl font-bold text-champagne block">S</span>
            <h3 className="font-serif text-lg text-forest-deep">Tradisi Spa Autentik</h3>
            <p className="text-xs text-charcoal/70">Terinspirasi dari ritual perawatan lulur rempah warisan budaya keraton Jawa.</p>
          </div>

          <div className="p-6 bg-ivory-warm rounded-2xl border border-stone/30 space-y-2">
            <Heart className="w-6 h-6 text-champagne" />
            <h3 className="font-serif text-lg text-forest-deep">Destinasi Pernikahan Ikonik</h3>
            <p className="text-xs text-charcoal/70">Menghadirkan kapel kaca La Kana dengan latar panorama perbukitan yang megah.</p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <ReservationModal isOpen={isReserveModalOpen} onClose={() => setIsReserveModalOpen(false)} />
    </div>
  );
}
