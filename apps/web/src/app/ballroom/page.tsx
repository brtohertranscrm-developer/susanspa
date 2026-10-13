'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';

const IMAGE_BASE = 'https://ik.imagekit.io/ro8484nadw/SUSAN%20SPA/update%20konten%20susan%20spa';
const HERO_IMAGE = `${IMAGE_BASE}/MNP_4055%20copy.avif?tr=w-1920`;
const BALLROOM_IMAGE = `${IMAGE_BASE}/MNP_4388%20copy.avif?tr=w-1600`;
const MEETING_IMAGE = `${IMAGE_BASE}/MNP_4026%20copy.avif?tr=w-1600`;

export default function BallroomPage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      <section className="relative min-h-[70svh] md:h-screen flex flex-col justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 bg-forest-deep">
          <Image
            src={HERO_IMAGE}
            alt="Ballroom Susan Spa & Resort dengan meja bundar berhias kain emas dan panggung di bagian belakang"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 py-28 text-center flex flex-col items-center justify-center">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal text-white text-center tracking-tight max-w-5xl mx-auto drop-shadow-lg">
            Ballroom & Meeting Room
          </h1>

          <p className="mt-4 sm:mt-6 text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-white/90 max-w-2xl mx-auto font-medium text-center drop-shadow-md">
            Resepsi, Seminar & Pertemuan Bisnis
          </p>
        </div>

        <a
          href="#content"
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center space-y-1.5 group cursor-pointer focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none rounded-md"
        >
          <span className="text-white text-lg sm:text-xl font-serif drop-shadow-md">Jelajahi</span>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white group-hover:translate-y-1 transition-all duration-300" />
        </a>
      </section>

      <section id="content" className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="space-y-5">
            <span className="text-xs uppercase tracking-wider text-botanical font-semibold block">Ballroom</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-forest-deep">Frangipani Grand Ballroom</h2>
            <p className="text-sm text-charcoal/80 leading-relaxed">
              Ballroom luas dan megah berfasilitas audio-visual modern, siap mengakomodasi resepsi pernikahan, jamuan makan malam keluarga, maupun seminar perusahaan.
            </p>
            <ul className="space-y-2 text-sm text-charcoal/80">
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-2.5 h-px w-4 bg-champagne shrink-0" />
                Tata suara & pencahayaan profesional
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-2.5 h-px w-4 bg-champagne shrink-0" />
                Penataan ruangan fleksibel
              </li>
            </ul>
            <button
              type="button"
              onClick={() => setIsReserveModalOpen(true)}
              className="min-h-[44px] bg-champagne hover:bg-champagne-light text-forest-deep px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-forest-deep focus-visible:outline-none"
            >
              Konsultasi Acara
            </button>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-stone/30 shadow-xl">
            <Image
              src={BALLROOM_IMAGE}
              alt="Ballroom dengan susunan kursi teater menghadap panggung dan dua layar proyektor"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-stone/30 shadow-xl lg:order-1">
            <Image
              src={MEETING_IMAGE}
              alt="Ruang meeting dengan susunan meja berbentuk U, kursi berpita bermotif, dan proyektor"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-5 lg:order-2">
            <span className="text-xs uppercase tracking-wider text-botanical font-semibold block">Ruang Pertemuan</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-forest-deep">Meeting & Conference Rooms</h2>
            <p className="text-sm text-charcoal/80 leading-relaxed">
              Ruang pertemuan representatif dengan tata letak fleksibel, fasilitas proyektor modern, dan layanan jamuan rehat kopi eksklusif untuk kelancaran agenda bisnis Anda.
            </p>
            <ul className="space-y-2 text-sm text-charcoal/80">
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-2.5 h-px w-4 bg-champagne shrink-0" />
                Koneksi WiFi cepat & proyektor
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-2.5 h-px w-4 bg-champagne shrink-0" />
                Tata ruang rapat eksekutif
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-2.5 h-px w-4 bg-champagne shrink-0" />
                Paket katering dapat disesuaikan
              </li>
            </ul>
            <button
              type="button"
              onClick={() => setIsReserveModalOpen(true)}
              className="min-h-[44px] bg-champagne hover:bg-champagne-light text-forest-deep px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-forest-deep focus-visible:outline-none"
            >
              Konsultasi Acara
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA message="Halo Tim Acara Susan Spa & Resort, saya ingin berkonsultasi mengenai penggunaan ballroom dan ruang meeting." />
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        preselectedType="event"
      />
    </div>
  );
}
