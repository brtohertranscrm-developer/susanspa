'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site';

interface WhatsAppCTAProps {
  message?: string;
}

export const WhatsAppCTA: React.FC<WhatsAppCTAProps> = ({
  message = 'Halo Susan Spa & Resort, perkenalkan saya ingin menanyakan ketersediaan kamar dan paket reservasi. Mohon informasinya, terima kasih.',
}) => {
  const whatsappNumber = SITE_CONFIG.contact.whatsapp;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3 sm:p-3.5 min-w-[48px] min-h-[48px] rounded-full shadow-2xl flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105 group border border-white/20 print:hidden"
      aria-label="Hubungi Susan Spa Concierge via WhatsApp"
    >
      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
      <span className="hidden md:inline-block text-xs font-semibold uppercase tracking-wider pr-1">
        WhatsApp Concierge
      </span>
    </a>
  );
};
