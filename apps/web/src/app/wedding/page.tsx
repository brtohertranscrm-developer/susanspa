'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Users,
  MapPin,
  CheckCircle2,
  Church,
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
      <section className="relative pt-36 pb-24 bg-forest-deep text-ivory text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://ik.imagekit.io/ro8484nadw/SUSAN%20SPA/MNP_4104%20copy%202-2.jpeg?updatedAt=1790906706093"
            alt="La Kana Chapel Susan Spa & Resort"
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/80 to-forest-deep/50" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-bold block">
            PERNIKAHAN & PERAYAAN ISTIMEWA
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-normal">
            Pernikahan di Susan Spa & Resort
          </h1>
          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-light leading-relaxed">
            Wujudkan momen ikrar janji suci dan perayaan cinta berlatar keindahan panorama lereng Gunung Ungaran yang romantis dan sejuk.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleInquire('wedding-package')}
              className="bg-champagne hover:bg-champagne-light text-forest-deep px-8 py-3.5 rounded-full font-bold uppercase tracking-[0.2em] text-xs shadow-lg transition-transform hover:scale-105"
            >
              Konsultasi Pernikahan
            </button>
            <a
              href="#packages"
              className="border border-champagne/40 hover:bg-forest/60 text-ivory px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Lihat Paket Pernikahan
            </a>
          </div>
        </div>
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
                  src="https://ik.imagekit.io/ro8484nadw/SUSAN%20SPA/MNP_4104%20copy%202-2.jpeg?updatedAt=1790906706093"
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
                  src="https://ik.imagekit.io/ro8484nadw/SUSAN%20SPA/MNP_4388%20copy.jpeg?updatedAt=1790906708529"
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
                  src="https://ik.imagekit.io/ro8484nadw/SUSAN%20SPA/MNP_4104%20copy%202-2.jpeg?updatedAt=1790906706093"
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
