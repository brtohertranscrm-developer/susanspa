'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, Send , ChevronDown} from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { WeddingCard } from '@/components/ui/WeddingCard';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { WEDDING_PACKAGES } from '@/data/weddings';
import { submitInquiry } from '@/lib/inquiries';

export default function WeddingsPage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState('');

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLeadSubmitting(true);
    setLeadError('');
    const form = new FormData(e.currentTarget);
    try {
      await submitInquiry({
        type: 'wedding',
        fullName: String(form.get('fullName') || ''),
        phone: String(form.get('phone') || ''),
        email: String(form.get('email') || ''),
        targetDate: String(form.get('targetDate') || '') || undefined,
        notes: String(form.get('notes') || '') || undefined,
        source: 'wedding-page',
      });
      setLeadSubmitted(true);
    } catch (error) {
      setLeadError(error instanceof Error ? error.message : 'Proposal request belum dapat dikirim.');
    } finally {
      setLeadSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      {/* Hero */}
      <section className="relative h-screen min-h-screen flex flex-col justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 bg-forest-deep">
          <Image
            src="/images/wedding/wedding-chapel-1.jpg"
            alt="La Kana Chapel Wedding"
            fill
            className="object-cover "
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 text-center flex flex-col items-center justify-center">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal text-white text-center tracking-tight max-w-5xl mx-auto drop-shadow-lg">
            Pernikahan Megah di Atas Awan
          </h1>
          
          <p className="mt-4 sm:mt-6 text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-white/90 max-w-2xl mx-auto font-medium text-center drop-shadow-md">
            PEMBERKATAN & PERNIKAHAN SAKRAL
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

      {/* La Kana Chapel Feature */}
      <section id="content" className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-botanical font-semibold block">
            HARMONI ARSITEKTUR & ALAM
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-forest-deep">
            Kapel Kaca Ikonik La Kana
          </h2>
          <p className="text-sm text-charcoal/80 leading-relaxed">
            La Kana Chapel berdiri anggun sebagai simbol cinta abadi di Susan Spa & Resort. Dinding kaca transparan setinggi langit-langit menghadirkan pencahayaan alami dan siluet megah pegunungan langsung ke altar pernikahan Anda.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2 text-xs text-forest-deep">
            <div className="p-4 bg-ivory-warm rounded-2xl border border-stone/30">
              <span className="font-serif text-xl font-bold text-champagne block">Hingga 100 Tamu</span>
              <span>Kapasitas Tempat Duduk Kapel</span>
            </div>
            <div className="p-4 bg-ivory-warm rounded-2xl border border-stone/30">
              <span className="font-serif text-xl font-bold text-champagne block">Hingga 800 Tamu</span>
              <span>Kapasitas Resepsi di Sky Lawn</span>
            </div>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden shadow-2xl border border-stone/30">
          <Image
            src="/images/wedding/wedding-chapel-2.jpg"
            alt="La Kana Chapel Entrance"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Wedding Packages */}
      <section className="py-20 bg-forest-deep text-ivory">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">PILIHAN PAKET ISTIMEWA</span>
            <h2 className="font-serif text-3xl sm:text-5xl text-ivory">Koleksi Paket Pernikahan & Pre-Wedding</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WEDDING_PACKAGES.map((pkg) => (
              <WeddingCard key={pkg.id} pkg={pkg} onInquire={() => setIsReserveModalOpen(true)} />
            ))}
          </div>
        </div>
      </section>

      {/* Customized Wedding Inquiry Form Section */}
      <section className="py-20 bg-ivory max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-deep text-ivory rounded-3xl p-8 sm:p-12 border border-champagne/40 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-champagne font-semibold">KONSULTASI & PROPOSAL ACARA</span>
            <h3 className="font-serif text-3xl text-ivory">Konsultasikan Rencana Pernikahan Anda</h3>
            <p className="text-xs text-ivory/70 max-w-lg mx-auto">
              Tim wedding specialist kami siap mendampingi perencanaan hari bahagia Anda, mulai dari pemilihan venue kapel, tata sesi acara, hingga penyesuaian detail paket yang paling sesuai.
            </p>
          </div>

          {leadSubmitted ? (
            <div className="p-8 text-center bg-forest rounded-2xl border border-champagne/40 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-champagne mx-auto" />
              <h4 className="font-serif text-xl text-ivory">Permohonan Proposal Diterima</h4>
              <p className="text-xs text-ivory/80">Terima kasih atas kepercayaan Anda. Tim wedding specialist Susan Spa & Resort akan segera menghubungi Anda melalui WhatsApp atau Email untuk berdiskusi lebih lanjut.</p>
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="fullName"
                  type="text"
                  required
                  placeholder="Nama Lengkap (Calon Pengantin) *"
                  className="w-full bg-forest border border-white/10 rounded-xl px-4 py-3 text-xs text-ivory focus:border-champagne focus:outline-none"
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="Nomor WhatsApp Aktif *"
                  className="w-full bg-forest border border-white/10 rounded-xl px-4 py-3 text-xs text-ivory focus:border-champagne focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Alamat Email *"
                  className="w-full bg-forest border border-white/10 rounded-xl px-4 py-3 text-xs text-ivory focus:border-champagne focus:outline-none"
                />
                <input
                  name="targetDate"
                  type="date"
                  required
                  className="w-full bg-forest border border-white/10 rounded-xl px-4 py-3 text-xs text-ivory focus:border-champagne focus:outline-none"
                />
              </div>

              <textarea
                name="notes"
                rows={3}
                placeholder="Perkiraan jumlah undangan, pilihan venue (La Kana / Sky Lawn), dan kebutuhan khusus lainnya..."
                className="w-full bg-forest border border-white/10 rounded-xl px-4 py-3 text-xs text-ivory focus:border-champagne focus:outline-none"
              />

              {leadError && <p role="alert" className="text-xs text-red-200">{leadError}</p>}
              <button
                type="submit"
                disabled={leadSubmitting}
                className="w-full bg-champagne disabled:opacity-60 hover:bg-champagne-light text-forest-deep font-semibold uppercase tracking-wider text-xs py-3.5 rounded-full shadow-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>{leadSubmitting ? 'Mengirim Permohonan...' : 'Kirim Permohonan Proposal'}</span>
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppCTA message="Halo Tim Wedding Susan Spa & Resort, saya ingin berkonsultasi mengenai paket pernikahan di La Kana Chapel." />
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        preselectedType="wedding"
      />
    </div>
  );
}
