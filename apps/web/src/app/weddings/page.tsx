'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, Send } from 'lucide-react';
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
      <section className="relative pt-32 pb-20 bg-forest-deep text-ivory text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop"
            alt="La Kana Chapel Wedding"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/80 to-forest-deep/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">
            SACRED CELEBRATIONS AT LA KANA CHAPEL
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-normal">
            Weddings Above the Clouds
          </h1>
          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-light leading-relaxed">
            Central Java’s premier glass altar wedding venue. Say &quot;I Do&quot; surrounded by panoramic mountain slopes, cool air, and romantic garden fairy lights.
          </p>
        </div>
      </section>

      {/* La Kana Chapel Feature */}
      <section className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-botanical font-semibold block">
            ARCHITECTURAL HARMONY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-forest-deep">
            The Iconic La Kana Glass Chapel
          </h2>
          <p className="text-sm text-charcoal/80 leading-relaxed">
            La Kana Chapel stands as an emblem of timeless romance at Susan Spa & Resort. Featuring full floor-to-ceiling transparent glass walls, the chapel allows natural sunlight and mountain horizons to illuminate your ceremony.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2 text-xs text-forest-deep">
            <div className="p-4 bg-ivory-warm rounded-2xl border border-stone/30">
              <span className="font-serif text-xl font-bold text-champagne block">100 Guests</span>
              <span>Chapel Seating Capacity</span>
            </div>
            <div className="p-4 bg-ivory-warm rounded-2xl border border-stone/30">
              <span className="font-serif text-xl font-bold text-champagne block">800 Guests</span>
              <span>Sky Lawn Reception Capacity</span>
            </div>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-stone/30">
          <Image
            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop"
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
            <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">CURATED PACKAGES</span>
            <h2 className="font-serif text-3xl sm:text-5xl text-ivory">Wedding & Pre-Wedding Collections</h2>
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
            <span className="text-xs uppercase tracking-[0.2em] text-champagne font-semibold">CUSTOM PROPOSAL</span>
            <h3 className="font-serif text-3xl text-ivory">Request Your Custom Wedding Proposal</h3>
            <p className="text-xs text-ivory/70 max-w-lg mx-auto">
              Our lead wedding stylist will tailor a bespoke itinerary and package quote for your dream wedding at Susan Spa & Resort.
            </p>
          </div>

          {leadSubmitted ? (
            <div className="p-8 text-center bg-forest rounded-2xl border border-champagne/40 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-champagne mx-auto" />
              <h4 className="font-serif text-xl text-ivory">Proposal Request Received</h4>
              <p className="text-xs text-ivory/80">Thank you! Our wedding team will reach out via WhatsApp and Email shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="fullName"
                  type="text"
                  required
                  placeholder="Full Name (Bride / Groom) *"
                  className="w-full bg-forest border border-white/10 rounded-xl px-4 py-3 text-xs text-ivory focus:border-champagne focus:outline-none"
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="WhatsApp Number *"
                  className="w-full bg-forest border border-white/10 rounded-xl px-4 py-3 text-xs text-ivory focus:border-champagne focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email Address *"
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
                placeholder="Estimated guest count, preferred venue (La Kana / Sky Lawn), and special desires..."
                className="w-full bg-forest border border-white/10 rounded-xl px-4 py-3 text-xs text-ivory focus:border-champagne focus:outline-none"
              />

              {leadError && <p role="alert" className="text-xs text-red-200">{leadError}</p>}
              <button
                type="submit"
                disabled={leadSubmitting}
                className="w-full bg-champagne disabled:opacity-60 hover:bg-champagne-light text-forest-deep font-semibold uppercase tracking-wider text-xs py-3.5 rounded-full shadow-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>{leadSubmitting ? 'Sending...' : 'Submit Proposal Request'}</span>
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppCTA message="Hello Susan Spa Wedding Team, I would like to request information on La Kana Chapel wedding packages." />
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        preselectedType="wedding"
      />
    </div>
  );
}
