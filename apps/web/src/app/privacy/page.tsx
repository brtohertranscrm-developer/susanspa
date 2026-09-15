'use client';

import React from 'react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header />
      <main className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="font-serif text-3xl sm:text-4xl text-forest-deep">Kebijakan Privasi</h1>
        <p className="text-xs text-charcoal/60">Pembaruan Terakhir: Agustus 2026</p>
        <div className="space-y-4 text-xs text-charcoal/80 leading-relaxed">
          <p>
            Susan Spa & Resort berkomitmen untuk senantiasa menjaga privasi dan keamanan data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data yang Anda berikan saat mengakses situs web kami maupun saat mengajukan permohonan reservasi.
          </p>
          <h2 className="font-serif text-xl text-forest-deep font-semibold pt-2">Informasi yang Kami Terima</h2>
          <p>Kami mencatat data yang Anda berikan secara sukarela, seperti nama lengkap, alamat email, nomor telepon/WhatsApp, tanggal rencana menginap, serta catatan permohonan khusus saat Anda mengisi formulir reservasi atau menghubungi concierge kami.</p>
          <h2 className="font-serif text-xl text-forest-deep font-semibold pt-2">Penggunaan Informasi</h2>
          <p>Informasi Anda dipergunakan semata-mata untuk mengonfirmasi ketersediaan kamar atau paket, menyusun proposal pernikahan atau acara, menindaklanjuti permohonan layanan tamu, serta menyampaikan penawaran istimewa dari Susan Spa & Resort bila Anda berkenan menerimanya.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
