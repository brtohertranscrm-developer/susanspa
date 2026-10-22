'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useSiteConfig } from '@/components/global/SiteConfigProvider';
import { useLayoutContent } from '@/components/global/SiteContentProvider';

interface WhatsAppCTAProps {
  message?: string;
}

export const WhatsAppCTA: React.FC<WhatsAppCTAProps> = ({ message }) => {
  const site = useSiteConfig();
  const { whatsapp } = useLayoutContent();
  const whatsappNumber = site.contact.whatsapp;
  const encodedMessage = encodeURIComponent(message || whatsapp.message);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3 sm:p-3.5 min-w-[48px] min-h-[48px] rounded-full shadow-2xl flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105 group border border-white/20 print:hidden"
      aria-label={`${whatsapp.label}: ${site.name}`}
    >
      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
      <span className="hidden md:inline-block text-xs font-semibold uppercase tracking-wider pr-1">
        {whatsapp.label}
      </span>
    </a>
  );
};
