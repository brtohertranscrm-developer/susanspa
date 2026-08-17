'use client';

import React, { useState } from 'react';
import { getDefaultStayDates } from '@/lib/dates';

export interface BookingSearchParams {
  checkIn: string;
  checkOut: string;
  guests: number;
  category: string;
}

interface BookingBarProps {
  onSearch: (params: BookingSearchParams) => void;
}

export const BookingBar: React.FC<BookingBarProps> = ({ onSearch }) => {
  const defaults = getDefaultStayDates();
  const [checkIn, setCheckIn] = useState(defaults.checkIn);
  const [checkOut, setCheckOut] = useState(defaults.checkOut);
  const [guests, setGuests] = useState(2);
  const [category, setCategory] = useState('All Categories');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ checkIn, checkOut, guests, category });
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-forest-deep/90 backdrop-blur-xl border border-champagne/30 rounded-2xl p-4 sm:p-6 shadow-2xl relative z-20">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* Dates Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium uppercase tracking-[0.15em] text-champagne block">
            Check In — Check Out
          </label>
          <div className="flex items-center space-x-2 bg-forest/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-ivory">
            <input
              type="date"
              required
              min={defaults.minimumDate}
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (checkOut <= e.target.value) setCheckOut('');
              }}
              aria-label="Check-in date"
              className="bg-transparent text-ivory text-xs focus:outline-none w-full"
            />
            <span className="text-champagne/60">-</span>
            <input
              type="date"
              required
              min={checkIn || defaults.minimumDate}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              aria-label="Check-out date"
              className="bg-transparent text-ivory text-xs focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Guests Count */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium uppercase tracking-[0.15em] text-champagne block">
            Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-forest/80 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-ivory focus:border-champagne focus:outline-none"
          >
            <option value={1}>1 Guest (Solo Retreat)</option>
            <option value={2}>2 Guests (Couples Stay)</option>
            <option value={3}>3 Guests (Family / Friends)</option>
            <option value={4}>4+ Guests (Grand Villa / Group)</option>
          </select>
        </div>

        {/* Room Category */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium uppercase tracking-[0.15em] text-champagne block">
            Accommodation Type
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-forest/80 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-ivory focus:border-champagne focus:outline-none"
          >
            <option value="All Categories">All Accommodations</option>
            <option value="Villa">Villas & Private Dip Pools</option>
            <option value="Suite">Royal Jacuzzi Suites</option>
            <option value="Deluxe">Deluxe Mountain Rooms</option>
            <option value="Family">Family Suites</option>
          </select>
        </div>

        {/* Search / Inquire Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-champagne hover:bg-champagne-light text-forest-deep py-2.5 px-6 rounded-xl font-semibold uppercase tracking-[0.15em] text-xs flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            Check Availability
          </button>
        </div>
      </form>
    </div>
  );
};
