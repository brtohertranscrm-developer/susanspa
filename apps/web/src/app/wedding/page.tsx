'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Users,
  MapPin,
  CheckCircle2,
  Church,
  ChevronDown,
} from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { WEDDING_PACKAGES } from '@/data/weddings';

export default function WeddingPage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>();

  const handleInquire = (slug?: string) => {
    setSelectedSlug(slug);
    setIsReserveModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => handleInquire()} />

      {/* Hero Visual: La Kana Chapel + Mountain Background */}
      <section className="relative h-screen min-h-screen flex flex-col justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 bg-forest-deep">
          <Image
            src="/images/wedding/wedding-chapel-1.jpg"
            alt="La Kana Chapel Susan Spa & Resort"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 text-center flex flex-col items-center justify-center">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal text-white text-center tracking-tight max-w-5xl mx-auto drop-shadow-lg">
            Pernikahan di Susan Spa
          </h1>
          
          <p className="mt-4 sm:mt-6 text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-white/90 max-w-2xl mx-auto font-medium text-center drop-shadow-md">
            Perayaan Cinta Berlatar Keindahan Gunung Ungaran
          </p>
        </div>

        <a 
          href="#packages"
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center space-y-1.5 group cursor-pointer"
        >
          <span className="text-white text-lg sm:text-xl font-serif drop-shadow-md">Jelajahi Paket</span>
          <span className="text-white/70 text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-sans group-hover:text-white transition-colors">Explore Below</span>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white group-hover:translate-y-1 transition-all duration-300" />
        </a>
      </section>

      {/* Wedding Packages Section */}
      <section id="packages" className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-botanical font-bold block">
            PILIHAN PAKET PERNIKAHAN
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep">
            Paket Pernikahan Pilihan
          </h2>
          <p className="text-sm text-charcoal/70 leading-relaxed">
            Pilihan paket pernikahan terpadu di Kapel Kaca La Kana, didukung jamuan prasmanan istimewa serta pendampingan wedding coordinator profesional.
          </p>
        </div>

        {/* 3 Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WEDDING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-forest-deep text-ivory overflow-hidden border border-champagne/30 shadow-xl flex flex-col justify-between group hover:border-champagne/70 transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={pkg.image || ''}
                  alt={pkg.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-forest-deep/90 text-champagne text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-champagne/30 font-semibold">
                  {pkg.capacity || pkg.guestCapacity}
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-champagne block font-semibold">
                    {Array.isArray(pkg.venue) ? pkg.venue.join(' • ') : pkg.venue}
                  </span>
                  <h3 className="font-serif text-2xl text-ivory group-hover:text-champagne transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-ivory/75 line-clamp-3 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                {/* Inclusions Highlights */}
                <div className="space-y-2 border-t border-white/10 pt-4 text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-champagne/90 font-semibold block">
                    Fasilitas & Inklusi Utama:
                  </span>
                  <ul className="space-y-1.5 text-ivory/80">
                    {pkg.inclusions.slice(0, 4).map((inc, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-champagne shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs */}
                <div className="pt-2 flex items-center space-x-2">
                  <Link
                    href={`/wedding/${pkg.slug}`}
                    className="flex-1 border border-champagne/40 hover:bg-forest text-ivory text-xs uppercase tracking-wider font-semibold py-2.5 rounded-xl text-center transition-colors"
                  >
                    Detail Paket
                  </Link>
                  <button
                    onClick={() => handleInquire(pkg.slug)}
                    className="bg-champagne hover:bg-champagne-light text-forest-deep text-xs uppercase tracking-wider font-bold py-2.5 px-4 rounded-xl transition-colors shadow-sm"
                  >
                    Konsultasi
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Venues & Atmosphere Highlight */}
      <section className="py-20 bg-ivory-warm border-t border-stone/20">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-botanical font-bold block">
              VENUE PERNIKAHAN IKONIK
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-forest-deep">
              Pilihan Venue Pernikahan Ikonik
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-stone/20 overflow-hidden shadow-sm text-left flex flex-col">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-forest-deep">
                <Image
                  src="/images/wedding/wedding-chapel-1.jpg"
                  alt="La Kana Chapel Venue"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-champagne">
                    <Church className="w-5 h-5 text-champagne" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-botanical">Indoor Chapel</span>
                  </div>
                  <h3 className="font-serif text-xl text-forest-deep">La Kana Chapel</h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed">
                    Kapel kaca berarsitektur segitiga modern dengan altar bening berlatar pegunungan Ungaran, menciptakan momen janji suci yang sakral dan megah.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone/20 overflow-hidden shadow-sm text-left flex flex-col">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-forest-deep">
                <Image
                  src="/images/wedding/wedding-chapel-2.jpg"
                  alt="Sky Garden Outdoor Lawn Venue"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-champagne">
                    <Users className="w-5 h-5 text-champagne" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-botanical">Outdoor Garden</span>
                  </div>
                  <h3 className="font-serif text-xl text-forest-deep">Sky Garden Outdoor Lawn</h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed">
                    Halaman rumput asri berhawa sejuk pegunungan untuk perayaan resepsi pesta kebun beratapkan langit senja atau gemerlap lampu malam hari.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone/20 overflow-hidden shadow-sm text-left flex flex-col">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-forest-deep">
                <Image
                  src="/images/wedding/wedding-chapel-1.jpg"
                  alt="Frangipani Ballroom Venue"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-champagne">
                    <MapPin className="w-5 h-5 text-champagne" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-botanical">Grand Ballroom</span>
                  </div>
                  <h3 className="font-serif text-xl text-forest-deep">Frangipani Ballroom</h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed">
                    Ruang resepsi indoor elegan dengan pencahayaan hangat, panggung megah, dan penataan meja perjamuan makan formal yang nyaman.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        preselectedType="wedding"
        preselectedRoomSlug={selectedSlug}
      />
    </div>
  );
}
