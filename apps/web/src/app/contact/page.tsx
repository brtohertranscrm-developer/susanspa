'use client';

import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Send, CheckCircle2, MapPin, Navigation } from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { submitInquiry } from '@/lib/inquiries';
import { SITE_CONFIG } from '@/data/site';

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
        notes: `[Subject: ${String(form.get('subject') || 'General')}] ${String(form.get('message') || '')}`,
        source: 'contact-page',
      });
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Pesan belum dapat dikirim.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      {/* Hero Header */}
      <section className="pt-36 pb-20 bg-forest-deep text-ivory text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-bold block">
            GET IN TOUCH
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-normal">
            Contact & Location
          </h1>
          <p className="text-sm sm:text-base text-ivory/80 max-w-xl mx-auto font-light leading-relaxed">
            Kami siap melayani kebutuhan informasi, reservasi kamar, jadwal spa, hingga konsultasi pernikahan Anda di Susan Spa & Resort.
          </p>
        </div>
      </section>

      {/* Contact Info, Form & Map Section */}
      <section className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Official Contact & Address Details */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-botanical font-bold block">
                OFFICIAL ADDRESS & CONCIERGE
              </span>
              <h2 className="font-serif text-3xl text-forest-deep">
                Find Us in Bandungan
              </h2>
              <p className="text-sm text-charcoal/80 leading-relaxed">
                Susan Spa & Resort terletak di dataran tinggi lereng Gunung Ungaran (~1,100 meter ASL) dengan suasana sejuk dan pemandangan memukau.
              </p>
            </div>

            {/* Address Card */}
            <div className="p-6 bg-forest-deep text-ivory rounded-3xl border border-champagne/30 space-y-4 shadow-xl">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-champagne shrink-0 mt-1" />
                <div className="space-y-1">
                  <span className="font-serif text-lg text-champagne block">
                    Resort Address
                  </span>
                  <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed">
                    {SITE_CONFIG.address.street}
                    <br />
                    {SITE_CONFIG.address.village}, {SITE_CONFIG.address.district}
                    <br />
                    {SITE_CONFIG.address.regency}, {SITE_CONFIG.address.province} {SITE_CONFIG.address.postalCode}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-wrap gap-4 text-xs">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-champagne" />
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone}`}
                    className="hover:text-champagne transition-colors font-medium"
                  >
                    {SITE_CONFIG.contact.phoneFormatted}
                  </a>
                </div>

                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-champagne" />
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="hover:text-champagne transition-colors"
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Concierge Card */}
            <div className="p-6 bg-ivory-warm rounded-3xl border border-stone/30 flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-botanical font-bold block">
                  Quick Response
                </span>
                <h4 className="font-serif text-lg text-forest-deep">
                  WhatsApp Concierge
                </h4>
                <p className="text-xs text-charcoal/70">
                  Konsultasi cepat dengan staf reservasi kami.
                </p>
              </div>

              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                  'Halo Susan Spa & Resort, saya ingin bertanya tentang informasi reservasi.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-lg transition-transform hover:scale-110 shrink-0"
                aria-label="WhatsApp Concierge"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-forest-deep text-ivory p-8 sm:p-10 rounded-3xl border border-champagne/30 shadow-2xl space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-champagne font-bold block">
                ONLINE INQUIRY FORM
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-ivory">
                Send Us a Message
              </h3>
              <p className="text-xs text-ivory/70">
                Isi formulir di bawah ini dan tim concierge kami akan segera menghubungi Anda.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-forest rounded-2xl border border-champagne/40 text-center space-y-3 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-champagne mx-auto" />
                <h4 className="font-serif text-xl text-ivory">Terima Kasih</h4>
                <p className="text-xs text-ivory/80 leading-relaxed max-w-sm mx-auto">
                  Pesan Anda telah berhasil kami terima. Tim reservasi kami akan merespons melalui Email atau WhatsApp segera.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs uppercase tracking-wider text-champagne underline hover:text-champagne-light"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {submitError && (
                  <div className="p-3 rounded-xl bg-red-900/50 border border-red-500/50 text-red-200 text-xs">
                    {submitError}
                  </div>
                )}

                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-champagne/90 font-semibold block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Nama lengkap Anda"
                    className="w-full bg-forest border border-white/10 rounded-xl px-4 py-3 text-ivory placeholder:text-ivory/40 focus:border-champagne focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-champagne/90 font-semibold block">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="alamat@email.com"
                    className="w-full bg-forest border border-white/10 rounded-xl px-4 py-3 text-ivory placeholder:text-ivory/40 focus:border-champagne focus:outline-none"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-champagne/90 font-semibold block">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+62 812 xxxx xxxx"
                    className="w-full bg-forest border border-white/10 rounded-xl px-4 py-3 text-ivory placeholder:text-ivory/40 focus:border-champagne focus:outline-none"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-champagne/90 font-semibold block">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Contoh: Reservasi Kamar, Paket Wedding, Spa"
                    className="w-full bg-forest border border-white/10 rounded-xl px-4 py-3 text-ivory placeholder:text-ivory/40 focus:border-champagne focus:outline-none"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-champagne/90 font-semibold block">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                    className="w-full bg-forest border border-white/10 rounded-xl px-4 py-3 text-ivory placeholder:text-ivory/40 focus:border-champagne focus:outline-none resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-champagne hover:bg-champagne-light text-forest-deep font-bold uppercase tracking-[0.2em] text-xs py-3.5 rounded-full shadow-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Map Embed Section */}
        <div className="space-y-6 pt-6 border-t border-stone/20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-botanical font-bold block">
                INTERACTIVE MAP
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-forest-deep">
                Location on Google Maps
              </h3>
            </div>

            <a
              href={SITE_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-champagne hover:bg-champagne-light text-forest-deep px-6 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-bold shadow-md transition-all inline-flex items-center space-x-2 shrink-0 self-start"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </a>
          </div>

          <div className="relative aspect-[16/10] sm:aspect-[21/9] rounded-3xl overflow-hidden border border-stone/30 shadow-xl bg-forest-deep">
            <iframe
              title="Susan Spa & Resort Map Embed"
              src={SITE_CONFIG.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
      />
    </div>
  );
}
