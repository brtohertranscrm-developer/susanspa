'use client';

import React from 'react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header />
      <main className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="font-serif text-3xl sm:text-4xl text-forest-deep">Terms and Conditions</h1>
        <p className="text-xs text-charcoal/60">Last updated: August 2026</p>
        <div className="space-y-4 text-xs text-charcoal/80 leading-relaxed">
          <p>Welcome to Susan Spa & Resort. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions.</p>
          <h2 className="font-serif text-xl text-forest-deep font-semibold pt-2">Reservation & Inquiry Policies</h2>
          <p>Online inquiries submitted via our portal do not constitute a guaranteed reservation until confirmed in writing or via official WhatsApp communication by Susan Spa & Resort reservation staff.</p>
          <h2 className="font-serif text-xl text-forest-deep font-semibold pt-2">Check-in & Check-out</h2>
          <p>Standard check-in time is 14:00 WIB and standard check-out time is 12:00 WIB.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
