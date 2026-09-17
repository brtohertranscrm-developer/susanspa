'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Users,
  MapPin,
  Clock,
  CheckCircle2,
  Calendar,
  ArrowLeft,
  MessageCircle,
} from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { SITE_CONFIG } from '@/data/site';
import type { WeddingPackage } from '@/types';

interface WeddingDetailTemplateProps {
  pkg: WeddingPackage;
}

export default function WeddingDetailTemplate({ pkg }: WeddingDetailTemplateProps) {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const images = pkg.images && pkg.images.length > 0 ? pkg.images : [pkg.image || ''];

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      {/* Breadcrumb Navigation Bar */}
      <div className="pt-28 pb-4 bg-forest-deep text-ivory border-b border-champagne/20">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <Link
            href="/wedding"
            className="inline-flex items-center space-x-2 text-champagne hover:text-champagne-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Pilihan Paket Pernikahan</span>
          </Link>
          <span className="text-ivory/60 hidden sm:inline">
            Pernikahan / {pkg.name}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="py-12 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. Header & Quick Info */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone/30">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-botanical font-bold block">
              PERNIKAHAN & PERAYAAN SAKRAL
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-forest-deep leading-tight">
              {pkg.name}
            </h1>
            <p className="text-sm text-charcoal/80 font-normal">
              {pkg.tagline || pkg.description}
            </p>
          </div>

          <div className="text-left md:text-right shrink-0 bg-forest-deep text-ivory p-6 rounded-3xl border border-champagne/30 space-y-3">
            <span className="text-[10px] uppercase tracking-wider text-champagne block font-semibold">
              KONSULTASI PERNIKAHAN
            </span>
            <button
              onClick={() => setIsReserveModalOpen(true)}
              className="w-full bg-champagne hover:bg-champagne-light text-forest-deep font-bold uppercase tracking-wider text-xs py-3 px-6 rounded-full shadow-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Konsultasi Pernikahan</span>
            </button>
          </div>
        </div>

        {/* 2. Hero Image & Switcher */}
        <div className="space-y-4">
          <div className="relative aspect-[16/9] w-full overflow-hidden shadow-2xl border border-stone/30">
            <Image
              src={images[selectedImageIndex] || images[0]}
              alt={pkg.name}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover transition-all duration-500"
            />
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative aspect-[4/3] overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-champagne scale-95 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${pkg.name} thumbnail ${idx + 1}`}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. Key Details Bar: Guest Capacity, Venue, Schedule */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-ivory-warm p-6 rounded-3xl border border-stone/30 text-center shadow-sm">
          <div className="space-y-1">
            <Users className="w-5 h-5 text-champagne mx-auto mb-1" />
            <span className="text-[10px] uppercase text-charcoal/60 block font-semibold">Kapasitas Tamu</span>
            <span className="font-serif text-lg text-forest-deep font-semibold block">
              {pkg.capacity || pkg.guestCapacity || 'Sesuai reservasi'}
            </span>
          </div>

          <div className="space-y-1">
            <MapPin className="w-5 h-5 text-champagne mx-auto mb-1" />
            <span className="text-[10px] uppercase text-charcoal/60 block font-semibold">Venue Utama</span>
            <span className="font-serif text-lg text-forest-deep font-semibold block">
              {Array.isArray(pkg.venue) ? pkg.venue.join(', ') : pkg.venue || 'La Kana Chapel'}
            </span>
          </div>

          <div className="space-y-1">
            <Clock className="w-5 h-5 text-champagne mx-auto mb-1" />
            <span className="text-[10px] uppercase text-charcoal/60 block font-semibold">Jadwal & Sesi Acara</span>
            <span className="font-serif text-sm sm:text-base text-forest-deep font-semibold block">
              {pkg.schedule && pkg.schedule.length > 0 ? pkg.schedule.join(' • ') : 'Pagi / Sore'}
            </span>
          </div>
        </div>

        {/* 4. Package Description & Inclusions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-forest-deep">Deskripsi Paket</h2>
              <p className="text-sm sm:text-base text-charcoal/85 leading-relaxed font-normal">
                {pkg.description}
              </p>
            </div>

            {/* What's Included */}
            <div className="space-y-4 pt-4 border-t border-stone/20">
              <h3 className="font-serif text-2xl text-forest-deep">Fasilitas & Inklusi Paket</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.inclusions.map((inclusion, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-3.5 rounded-2xl bg-white border border-stone/20 text-xs text-charcoal/90 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-champagne shrink-0" />
                    <span className="font-medium">{inclusion}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Consultation & CTA */}
          <div className="space-y-6">
            <div className="bg-forest-deep text-ivory p-8 rounded-3xl border border-champagne/30 space-y-6 shadow-xl sticky top-28">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-champagne block font-semibold">
                  KONSULTASI PERNIKAHAN
                </span>
                <h3 className="font-serif text-2xl text-ivory">Rencanakan Momen Bahagia Anda</h3>
                <p className="text-xs text-ivory/70 leading-relaxed pt-1">
                  Konsultasikan konsep pernikahan impian Anda bersama tim wedding coordinator Susan Spa & Resort.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setIsReserveModalOpen(true)}
                  className="w-full bg-champagne hover:bg-champagne-light text-forest-deep py-3.5 rounded-full font-bold uppercase tracking-wider text-xs shadow-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Ajukan Konsultasi & Proposal</span>
                </button>

                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                    `Halo Susan Spa & Resort, saya tertarik berkonsultasi mengenai ${pkg.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-champagne/50 text-champagne hover:bg-forest py-3 rounded-full font-semibold uppercase tracking-wider text-xs transition-colors flex items-center justify-center space-x-2 text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat WhatsApp Wedding Specialist</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppCTA />
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        preselectedType="wedding"
        preselectedRoomSlug={pkg.slug}
      />
    </div>
  );
}
