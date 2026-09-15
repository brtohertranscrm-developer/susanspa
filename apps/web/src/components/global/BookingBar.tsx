'use client';

import React, { useState } from 'react';
import { Tag, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { getDefaultStayDates } from '@/lib/dates';

export interface BookingSearchParams {
  checkIn: string;
  checkOut: string;
  guests?: number;
  category?: string;
  promoCode?: string;
}

interface BookingBarProps {
  onSearch: (params: BookingSearchParams) => void;
  ctaText?: string;
}

export const BookingBar: React.FC<BookingBarProps> = ({
  onSearch,
  ctaText = 'Book Now',
}) => {
  const defaults = getDefaultStayDates();
  const [checkIn, setCheckIn] = useState(defaults.checkIn);
  const [checkOut, setCheckOut] = useState(defaults.checkOut);
  const [promoCode, setPromoCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ checkIn, checkOut, promoCode, guests: 2, category: 'All Categories' });
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-forest-deep/95 backdrop-blur-xl border border-champagne/40 rounded-2xl p-4 sm:p-5 shadow-2xl relative z-20">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
      >
        {/* Arrival Date */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-[0.15em] text-champagne flex items-center space-x-1.5">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Arrival Date</span>
          </label>
          <div className="bg-forest/90 border border-white/10 focus-within:border-champagne rounded-xl px-3.5 py-2.5 text-xs text-ivory transition-colors">
            <input
              type="date"
              required
              min={defaults.minimumDate}
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (checkOut <= e.target.value) setCheckOut('');
              }}
              aria-label="Arrival Date"
              className="bg-transparent text-ivory text-xs focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Departure Date */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-[0.15em] text-champagne flex items-center space-x-1.5">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Departure Date</span>
          </label>
          <div className="bg-forest/90 border border-white/10 focus-within:border-champagne rounded-xl px-3.5 py-2.5 text-xs text-ivory transition-colors">
            <input
              type="date"
              required
              min={checkIn || defaults.minimumDate}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              aria-label="Departure Date"
              className="bg-transparent text-ivory text-xs focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Promo Code */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-[0.15em] text-champagne flex items-center space-x-1.5">
            <Tag className="w-3.5 h-3.5" />
            <span>Promo Code</span>
          </label>
          <div className="bg-forest/90 border border-white/10 focus-within:border-champagne rounded-xl px-3.5 py-2.5 text-xs text-ivory transition-colors">
            <input
              type="text"
              placeholder="Optional code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="bg-transparent text-ivory placeholder:text-ivory/40 text-xs focus:outline-none w-full uppercase tracking-wider"
            />
          </div>
        </div>

        {/* Book Now Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-champagne hover:bg-champagne-light text-forest-deep py-2.5 px-6 rounded-xl font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center space-x-2 shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};
