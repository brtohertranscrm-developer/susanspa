'use client';

import React, { useState } from 'react';
import { X, Calendar, Users, Home, CheckCircle2, MessageCircle, Send, Sparkles } from 'lucide-react';
import { ROOMS } from '@/data/rooms';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoomSlug?: string;
  preselectedType?: 'room' | 'spa' | 'wedding' | 'event';
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  preselectedRoomSlug,
  preselectedType = 'room',
}) => {
  const [inquiryType, setInquiryType] = useState(preselectedType);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState('2026-09-15');
  const [checkOut, setCheckOut] = useState('2026-09-17');
  const [guests, setGuests] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState(preselectedRoomSlug || 'grand-villa');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-deep/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-forest-deep border border-champagne/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] text-ivory">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-ivory/60 hover:text-champagne transition-colors"
          aria-label="Close Reservation Modal"
        >
          <X className="w-6 h-6" />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 bg-champagne/20 border border-champagne text-champagne rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-ivory">Inquiry Submitted Successfully</h3>
              <p className="text-xs text-ivory/70 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-champagne">{fullName}</strong>. Our reservation concierge team has received your inquiry for Susan Spa & Resort. We will contact you via WhatsApp or Email within 2 hours.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/6281228111111?text=${encodeURIComponent(
                  `Hi Susan Spa Resort, I just submitted an online inquiry for ${selectedRoom}. Reference name: ${fullName}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#25D366] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Concierge</span>
              </a>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto border border-champagne/40 text-ivory px-6 py-3 rounded-full text-xs uppercase tracking-wider hover:bg-forest transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-champagne font-semibold block">
                RESERVATION & INQUIRY PORTAL
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-ivory mt-1">
                Begin Your Highland Escape
              </h3>
              <p className="text-xs text-ivory/70 mt-1">
                Select your preference below to request availability at Susan Spa & Resort, Bandungan.
              </p>
            </div>

            {/* Category Selector Tabs */}
            <div className="grid grid-cols-4 gap-2 bg-forest/80 p-1.5 rounded-xl border border-white/10 text-xs">
              {(['room', 'spa', 'wedding', 'event'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setInquiryType(type)}
                  className={`py-2 rounded-lg uppercase tracking-wider text-[10px] sm:text-xs font-medium transition-all ${
                    inquiryType === type
                      ? 'bg-champagne text-forest-deep font-semibold shadow-md'
                      : 'text-ivory/70 hover:text-ivory'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-champagne">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Maya Kusuma"
                    className="w-full bg-forest border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-ivory focus:border-champagne focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-champagne">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+62 812 3456 7890"
                    className="w-full bg-forest border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-ivory focus:border-champagne focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-champagne">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="maya@example.com"
                  className="w-full bg-forest border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-ivory focus:border-champagne focus:outline-none"
                />
              </div>

              {/* Inquiry Type Specific Fields */}
              {inquiryType === 'room' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-champagne">Check In</label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-forest border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-ivory focus:border-champagne focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-champagne">Check Out</label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-forest border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-ivory focus:border-champagne focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-champagne">Accommodation Choice</label>
                      <select
                        value={selectedRoom}
                        onChange={(e) => setSelectedRoom(e.target.value)}
                        className="w-full bg-forest border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-ivory focus:border-champagne focus:outline-none"
                      >
                        {ROOMS.map((r) => (
                          <option key={r.id} value={r.slug}>
                            {r.name} ({r.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-champagne">Guests</label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full bg-forest border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-ivory focus:border-champagne focus:outline-none"
                      >
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4+ Guests</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {inquiryType === 'wedding' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-champagne">Target Wedding Date</label>
                    <input
                      type="date"
                      className="w-full bg-forest border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-ivory focus:border-champagne focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-champagne">Estimated Guests</label>
                    <select className="w-full bg-forest border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-ivory focus:border-champagne focus:outline-none">
                      <option>Up to 100 (La Kana Chapel)</option>
                      <option>100 - 300 Guests</option>
                      <option>300 - 600 Guests (Sky Lawn)</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-champagne">Special Requests / Notes</label>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Tell us about special occasions, dietary preferences, or room view requests..."
                  className="w-full bg-forest border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-ivory focus:border-champagne focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-champagne hover:bg-champagne-light text-forest-deep py-3 rounded-full font-semibold uppercase tracking-wider text-xs flex items-center justify-center space-x-2 transition-all shadow-lg mt-2"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Processing Inquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Reservation Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
