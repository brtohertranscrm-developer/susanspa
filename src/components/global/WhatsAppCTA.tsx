'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppCTAProps {
  message?: string;
}

export const WhatsAppCTA: React.FC<WhatsAppCTAProps> = ({
  message = 'Hello Susan Spa & Resort, I would like to inquire about room availability and spa packages.',
}) => {
  const whatsappNumber = '6281228111111';
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl flex items-center space-x-2 transition-all duration-300 transform hover:scale-110 group border border-white/20"
      aria-label="Contact Susan Spa Concierge on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider pr-1">
        WhatsApp Concierge
      </span>
    </a>
  );
};
