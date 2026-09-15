'use client';

import React from 'react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header />
      <main className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="font-serif text-3xl sm:text-4xl text-forest-deep">Syarat & Ketentuan</h1>
        <p className="text-xs text-charcoal/60">Pembaruan Terakhir: Agustus 2026</p>
        <div className="space-y-4 text-xs text-charcoal/80 leading-relaxed">
          <p>Selamat datang di situs resmi Susan Spa & Resort. Dengan mengakses dan menggunakan layanan di situs ini, Anda menyetujui ketentuan dan panduan yang berlaku berikut ini.</p>
          <h2 className="font-serif text-xl text-forest-deep font-semibold pt-2">Ketentuan Reservasi & Permohonan Informasi</h2>
          <p>Pengisian formulir reservasi secara daring di situs ini merupakan permohonan pengecekan ketersediaan dan penawaran awal. Pemesanan Anda akan terkonfirmasi secara sah setelah tim reservasi kami menerbitkan konfirmasi tertulis resmi atau melalui komunikasi WhatsApp resmi Susan Spa & Resort.</p>
          <h2 className="font-serif text-xl text-forest-deep font-semibold pt-2">Waktu Check-in & Check-out</h2>
          <p>Waktu check-in standar adalah mulai pukul 14:00 WIB, dan waktu check-out standar adalah maksimal pukul 12:00 WIB untuk memastikan kenyamanan dan kesiapan kamar bagi seluruh tamu kami.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
