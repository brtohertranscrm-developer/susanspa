'use client';

import React from 'react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header />
      <main className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="font-serif text-3xl sm:text-4xl text-forest-deep">Privacy Policy</h1>
        <p className="text-xs text-charcoal/60">Last updated: August 2026</p>
        <div className="space-y-4 text-xs text-charcoal/80 leading-relaxed">
          <p>
            Susan Spa & Resort values your privacy. This privacy policy discloses how we collect, use, and protect your personal information when visiting our website or submitting reservation inquiries.
          </p>
          <h2 className="font-serif text-xl text-forest-deep font-semibold pt-2">Information We Collect</h2>
          <p>We collect personal details such as full name, email address, WhatsApp telephone number, check-in dates, and special stay requests when you submit an inquiry form or contact our concierge.</p>
          <h2 className="font-serif text-xl text-forest-deep font-semibold pt-2">How We Use Your Data</h2>
          <p>Your data is strictly utilized to communicate reservation availability, confirm wedding proposals, process stay requests, and send optional seasonal resort promotions.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
