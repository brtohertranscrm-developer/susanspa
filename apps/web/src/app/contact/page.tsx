'use client';

import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Send, CheckCircle2, Compass } from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { submitInquiry } from '@/lib/inquiries';

export default function ContactPage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    const form = new FormData(e.currentTarget);
    try {
      await submitInquiry({
        type: 'general',
        fullName: String(form.get('fullName') || ''),
        email: String(form.get('email') || ''),
        phone: String(form.get('phone') || ''),
        notes: String(form.get('message') || ''),
        source: 'contact-page',
      });
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Message belum dapat dikirim.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      <section className="pt-32 pb-16 bg-forest-deep text-ivory text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">CONCIERGE & LOCATION</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-normal">Contact Susan Spa & Resort</h1>
          <p className="text-sm text-ivory/80 max-w-xl mx-auto">We look forward to welcoming you to the serene mountain highlands of Bandungan.</p>
        </div>
      </section>

      <section className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Contact Details & Map */}
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] text-botanical font-semibold block font-sans">RESORT ADDRESS</span>
            <h2 className="font-serif text-3xl text-forest-deep">Bandungan Highlands</h2>
            <p className="text-sm text-charcoal/80 leading-relaxed">
              Dusun Piyoto, Bandungan, Semarang Regency, Central Java 50614, Indonesia (~1,100 meters above sea level).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-5 bg-forest-deep text-ivory rounded-2xl border border-champagne/30 space-y-2">
              <Phone className="w-5 h-5 text-champagne" />
              <span className="font-semibold block">Front Desk & Reservations</span>
              <span className="text-ivory/70">+62 298 711111</span>
            </div>

            <div className="p-5 bg-forest-deep text-ivory rounded-2xl border border-champagne/30 space-y-2">
              <MessageCircle className="w-5 h-5 text-champagne" />
              <span className="font-semibold block">WhatsApp Concierge</span>
              <span className="text-ivory/70">+62 812 2811 1111</span>
            </div>

            <div className="p-5 bg-forest-deep text-ivory rounded-2xl border border-champagne/30 space-y-2 sm:col-span-2">
              <Mail className="w-5 h-5 text-champagne" />
              <span className="font-semibold block">Email Concierge</span>
              <span className="text-ivory/70">info@susansparesort.com • reservation@susansparesort.com</span>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-stone/30 bg-forest-deep flex items-center justify-center p-6 text-center text-ivory">
            <div className="space-y-2">
              <Compass className="w-8 h-8 text-champagne mx-auto" />
              <span className="font-serif text-lg text-champagne block">Bandungan Mountain Coordinates</span>
              <span className="text-xs text-ivory/70 block">Latitude: -7.2185 | Longitude: 110.3705</span>
              <a
                href="https://maps.google.com/?q=Susan+Spa+%26+Resort+Bandungan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 bg-champagne text-forest-deep text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wider"
              >
                Open Google Maps Navigation
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="bg-forest-deep text-ivory rounded-3xl p-8 sm:p-10 border border-champagne/40 shadow-2xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-champagne font-semibold block">DIRECT INQUIRY</span>
            <h3 className="font-serif text-2xl text-ivory">Send Us a Message</h3>
            <p className="text-xs text-ivory/70">Fill in the form below and our resort concierge will respond shortly.</p>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-forest rounded-2xl border border-champagne/40 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-champagne mx-auto" />
              <h4 className="font-serif text-xl text-ivory">Message Delivered</h4>
              <p className="text-xs text-ivory/80">Thank you for reaching out to Susan Spa & Resort. We will be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-champagne">Full Name *</label>
                <input name="fullName" type="text" required minLength={2} placeholder="Maya Kusuma" className="w-full bg-forest border border-white/10 rounded-xl px-4 py-3 text-xs text-ivory focus:border-champagne focus:outline-none" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-champagne">Email Address *</label>
                  <input name="email" type="email" required placeholder="maya@example.com" className="w-full bg-forest border border-white/10 rounded-xl px-4 py-3 text-xs text-ivory focus:border-champagne focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-champagne">Phone / WhatsApp *</label>
                  <input name="phone" type="tel" required minLength={8} placeholder="+62 812 3456 7890" className="w-full bg-forest border border-white/10 rounded-xl px-4 py-3 text-xs text-ivory focus:border-champagne focus:outline-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-champagne">Message *</label>
                <textarea name="message" rows={4} required placeholder="How can our concierge assist you?" className="w-full bg-forest border border-white/10 rounded-xl px-4 py-3 text-xs text-ivory focus:border-champagne focus:outline-none" />
              </div>

              {submitError && <p role="alert" className="text-xs text-red-200">{submitError}</p>}
              <button type="submit" disabled={submitting} className="w-full bg-champagne disabled:opacity-60 hover:bg-champagne-light text-forest-deep py-3.5 rounded-full font-semibold uppercase tracking-wider text-xs flex items-center justify-center space-x-2 shadow-lg">
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <ReservationModal isOpen={isReserveModalOpen} onClose={() => setIsReserveModalOpen(false)} />
    </div>
  );
}
