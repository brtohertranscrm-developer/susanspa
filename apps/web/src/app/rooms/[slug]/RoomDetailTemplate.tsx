'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Users,
  Maximize2,
  BedDouble,
  Eye,
  CheckCircle2,
  Calendar,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { RoomCard } from '@/components/ui/RoomCard';
import { roomCapacity, roomCategoryLabel } from '@/lib/room-display';
import { getDefaultStayDates } from '@/lib/dates';
import { SITE_CONFIG } from '@/data/site';
import type { Room } from '@/types';

interface RoomDetailTemplateProps {
  room: Room;
  rooms: Room[];
}

export default function RoomDetailTemplate({ room, rooms }: RoomDetailTemplateProps) {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const defaults = getDefaultStayDates();
  const [checkInDate, setCheckInDate] = useState(defaults.checkIn);
  const [checkOutDate, setCheckOutDate] = useState(defaults.checkOut);

  // Related rooms (excluding current room)
  const relatedRooms = rooms
    .filter((r) => r.slug !== room.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header rooms={rooms} onOpenReserve={() => setIsReserveModalOpen(true)} />

      {/* Breadcrumb Navigation Bar */}
      <div className="pt-28 pb-4 bg-forest-deep text-ivory border-b border-champagne/20">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <Link
            href="/rooms"
            className="inline-flex items-center space-x-2 text-champagne hover:text-champagne-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Semua Kamar</span>
          </Link>
          <span className="text-ivory/60 hidden sm:inline">
            Kamar / {roomCategoryLabel(room.category)} / {room.name}
          </span>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-12 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Room Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone/30">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-botanical font-bold block">
              {roomCategoryLabel(room.category)}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-forest-deep leading-tight">
              {room.name}
            </h1>
            <p className="text-sm text-charcoal/80 font-normal">
              {room.description || room.tagline || 'Pilihan akomodasi eksklusif di Susan Spa & Resort.'}
            </p>
          </div>

          <div className="text-left md:text-right shrink-0 bg-forest-deep text-ivory p-6 rounded-3xl border border-champagne/30 space-y-3">
            <span className="text-[10px] uppercase tracking-wider text-champagne block font-semibold">
              Ketersediaan & Reservasi
            </span>
            <button
              onClick={() => setIsReserveModalOpen(true)}
              className="w-full bg-champagne hover:bg-champagne-light text-forest-deep font-bold uppercase tracking-wider text-xs py-3 px-6 rounded-full shadow-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservasi Kamar Ini</span>
            </button>
          </div>
        </div>

        {/* 1. Hero Gallery & Interactive Switcher */}
        <div className="space-y-4">
          <div className="relative aspect-[16/9] w-full overflow-hidden shadow-2xl border border-stone/30">
            <Image
              src={room.images[selectedImageIndex] || room.images[0]}
              alt={room.name}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover transition-all duration-500"
            />
          </div>

          {/* Photo Gallery Thumbnails */}
          {room.images.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
              {room.images.map((img, idx) => (
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
                    alt={`${room.name} thumbnail ${idx + 1}`}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. Quick Information Bar: Guest, Room Size, Bed Type, View */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-ivory-warm p-6 rounded-3xl border border-stone/30 text-center shadow-sm">
          <div className="space-y-1">
            <Users className="w-5 h-5 text-champagne mx-auto mb-1" />
            <span className="text-[10px] uppercase text-charcoal/60 block font-semibold">Kapasitas Tamu</span>
            <span className="font-serif text-lg text-forest-deep font-semibold block">
              {roomCapacity(room)}
            </span>
          </div>

          <div className="space-y-1">
            <Maximize2 className="w-5 h-5 text-champagne mx-auto mb-1" />
            <span className="text-[10px] uppercase text-charcoal/60 block font-semibold">Luas Kamar</span>
            <span className="font-serif text-lg text-forest-deep font-semibold block">
              {room.sizeSqm ? `${room.sizeSqm} m²` : 'Sesuai konfirmasi'}
            </span>
          </div>

          <div className="space-y-1">
            <BedDouble className="w-5 h-5 text-champagne mx-auto mb-1" />
            <span className="text-[10px] uppercase text-charcoal/60 block font-semibold">Tipe Kasur</span>
            <span className="font-serif text-lg text-forest-deep font-semibold block">
              {room.bedType || 'Sesuai konfirmasi'}
            </span>
          </div>

          <div className="space-y-1">
            <Eye className="w-5 h-5 text-champagne mx-auto mb-1" />
            <span className="text-[10px] uppercase text-charcoal/60 block font-semibold">Pemandangan</span>
            <span className="font-serif text-lg text-forest-deep font-semibold block">
              {room.view || 'Pegunungan & Lembah Asri'}
            </span>
          </div>
        </div>

        {/* 3. Room Description & Facilities + Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
          {/* Left 2 Cols: Description & Amenities */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl text-forest-deep">Deskripsi Kamar</h2>
              <p className="text-sm text-charcoal/85 leading-relaxed font-normal">
                {room.longDescription || room.description || 'Silakan hubungi tim reservasi kami untuk informasi lebih lengkap mengenai tipe kamar ini.'}
              </p>
            </div>

            {/* Room Facilities */}
            <div className="space-y-4 pt-4 border-t border-stone/20">
              <h3 className="font-serif text-2xl text-forest-deep">Fasilitas Kamar</h3>
              {room.amenities.length === 0 ? (
                <p className="text-sm text-charcoal/70">
                  Data fasilitas kamar sedang diperbarui oleh tim hotel. Silakan hubungi reservasi kami untuk detail lengkap.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {room.amenities.map((amenity, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-3 p-3.5 rounded-2xl bg-white border border-stone/20 text-xs text-charcoal/90 shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-champagne shrink-0" />
                      <span className="font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Col: Availability Widget & Reservation CTA */}
          <div className="space-y-6">
            <div className="bg-forest-deep text-ivory p-8 rounded-3xl border border-champagne/30 space-y-6 shadow-xl sticky top-28">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-champagne block font-semibold">
                  CEK KETERSEDIAAN
                </span>
                <h3 className="font-serif text-2xl text-ivory">Rencanakan Menginap Anda</h3>
              </div>

              {/* Date Inputs */}
              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-champagne/80 font-semibold block">
                    Tanggal Check-In
                  </label>
                  <input
                    type="date"
                    min={defaults.minimumDate}
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-forest border border-white/10 rounded-xl p-2.5 text-ivory text-xs focus:border-champagne focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-champagne/80 font-semibold block">
                    Tanggal Check-Out
                  </label>
                  <input
                    type="date"
                    min={checkInDate || defaults.minimumDate}
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full bg-forest border border-white/10 rounded-xl p-2.5 text-ivory text-xs focus:border-champagne focus:outline-none"
                  />
                </div>
              </div>

              {/* Booking CTA Button */}
              <div className="pt-2 space-y-3">
                <button
                  onClick={() => setIsReserveModalOpen(true)}
                  className="w-full bg-champagne hover:bg-champagne-light text-forest-deep py-3.5 rounded-full font-bold uppercase tracking-wider text-xs shadow-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Cek Ketersediaan Kamar</span>
                </button>

                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                    `Halo Susan Spa & Resort, saya ingin reservasi untuk kamar ${room.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-champagne/50 text-champagne hover:bg-forest py-3 rounded-full font-semibold uppercase tracking-wider text-xs transition-colors flex items-center justify-center space-x-2 text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Konsultasi via WhatsApp</span>
                </a>
              </div>

              {/* Resort Policy Notice */}
              <div className="pt-4 border-t border-white/10 flex items-start space-x-2 text-[11px] text-ivory/60">
                <ShieldCheck className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <span>
                  Konfirmasi ketersediaan dan ketentuan reservasi akan dibantu langsung oleh tim reservasi kami.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Related Rooms */}
        {relatedRooms.length > 0 && (
          <div className="pt-16 border-t border-stone/20 space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-[0.25em] text-botanical font-bold block">
                  PILIHAN LAINNYA
                </span>
                <h2 className="font-serif text-3xl text-forest-deep">
                  Pilihan Kamar Terkait
                </h2>
              </div>

              <Link
                href="/rooms"
                className="text-xs uppercase tracking-wider text-forest-deep hover:text-champagne font-semibold flex items-center space-x-1"
              >
                <span>Lihat Semua Kamar</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedRooms.map((relRoom) => (
                <RoomCard
                  key={relRoom.id}
                  room={relRoom}
                  onInquire={() => {
                    setIsReserveModalOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
      <WhatsAppCTA />
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        rooms={rooms}
        preselectedRoomSlug={room.slug}
        initialCheckIn={checkInDate}
        initialCheckOut={checkOutDate}
      />
    </div>
  );
}
