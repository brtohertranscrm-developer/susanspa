'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, MessageCircle, Send, X } from 'lucide-react';
import type { InquiryReceipt, InquirySubmission } from '@susan/contracts';
import { ROOMS } from '@/data/rooms';
import { roomCategoryLabel } from '@/lib/room-display';
import { SPA_TREATMENTS } from '@/data/spa';
import { getDefaultStayDates } from '@/lib/dates';
import type { Room } from '@/types';

type InquiryType = Exclude<InquirySubmission['type'], 'general'>;

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoomSlug?: string;
  preselectedType?: InquiryType;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  rooms?: Room[];
}

export const ReservationModal: React.FC<ReservationModalProps> = (props) => {
  if (!props.isOpen) return null;
  return <ReservationModalContent {...props} />;
};

const ReservationModalContent: React.FC<ReservationModalProps> = ({
  onClose,
  preselectedRoomSlug,
  preselectedType = 'room',
  initialCheckIn,
  initialCheckOut,
  initialGuests,
  rooms = ROOMS,
}) => {
  const defaults = useMemo(() => getDefaultStayDates(), []);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [inquiryType, setInquiryType] = useState<InquiryType>(preselectedType);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState(initialCheckIn || defaults.checkIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut || defaults.checkOut);
  const [guests, setGuests] = useState(initialGuests || 2);
  const [selectedRoom, setSelectedRoom] = useState(preselectedRoomSlug || rooms[0]?.slug || '');
  const [targetDate, setTargetDate] = useState('');
  const [venuePreference, setVenuePreference] = useState('');
  const [treatmentPreference, setTreatmentPreference] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<InquiryReceipt | null>(null);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const payload: InquirySubmission = {
      type: inquiryType,
      fullName,
      email,
      phone,
      guests,
      notes: specialRequests || undefined,
      source: 'reservation-modal',
      ...(inquiryType === 'room'
        ? { checkIn, checkOut, roomSlug: selectedRoom }
        : { targetDate: targetDate || undefined }),
      ...(inquiryType === 'spa' ? { treatmentPreference: treatmentPreference || undefined } : {}),
      ...(inquiryType === 'wedding' || inquiryType === 'event'
        ? { venuePreference: venuePreference || undefined }
        : {}),
    };

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = (await response.json()) as InquiryReceipt | { error?: string };
      if (!response.ok || !('id' in body)) {
        throw new Error('error' in body ? body.error : 'Permintaan reservasi belum dapat dikirim. Silakan coba kembali.');
      }
      setReceipt(body);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Permintaan reservasi belum dapat dikirim.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-deep/80 backdrop-blur-md animate-fade-in"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-dialog-title"
        className="relative w-full max-w-2xl bg-forest-deep border border-champagne/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] text-ivory"
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-ivory/60 hover:text-champagne transition-colors"
          aria-label="Tutup jendela reservasi"
        >
          <X className="w-6 h-6" />
        </button>

        {receipt ? (
          <div className="py-12 text-center space-y-6">
            <CheckCircle2 className="w-14 h-14 text-champagne mx-auto" />
            <div className="space-y-2">
              <h3 id="reservation-dialog-title" className="font-serif text-2xl sm:text-3xl text-ivory font-normal">
                Permintaan Reservasi Telah Diterima
              </h3>
              <p className="text-sm text-ivory/80 max-w-md mx-auto leading-relaxed">
                Terima kasih, Bapak/Ibu <strong className="text-champagne font-semibold">{fullName}</strong>. Permintaan Anda telah tercatat dengan nomor referensi:{' '}
                <span className="font-mono text-champagne">{receipt.id.slice(0, 8).toUpperCase()}</span>.
              </p>
              <p className="text-xs text-ivory/65 max-w-md mx-auto">
                Tim concierge Susan Spa & Resort akan segera menghubungi Anda melalui WhatsApp atau email untuk konfirmasi ketersediaan kamar dan panduan pembayaran.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href={`https://wa.me/6281228111111?text=${encodeURIComponent(`Halo Susan Spa & Resort, saya telah mengirimkan permintaan reservasi dengan nomor referensi ${receipt.id.slice(0, 8).toUpperCase()} atas nama ${fullName}. Mohon konfirmasinya. Terima kasih.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Hubungi WhatsApp Concierge
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto border border-champagne/40 hover:bg-forest text-champagne px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-colors"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-champagne font-bold">Layanan Reservasi & Informasi</span>
              <h3 id="reservation-dialog-title" className="font-serif text-2xl sm:text-3xl text-ivory mt-1 font-normal">
                Rencanakan Kunjungan Istimewa Anda
              </h3>
              <p className="text-xs text-ivory/75 mt-1 font-light">
                Silakan lengkapi formulir di bawah ini. Tim concierge kami akan dengan senang hati memeriksa ketersediaan dan menghubungi Anda secara pribadi.
              </p>
            </div>

            {/* Type Switcher Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-forest/80 p-1.5 rounded-2xl border border-white/10 text-xs">
              {[
                { key: 'room', label: 'Kamar & Villa' },
                { key: 'spa', label: 'Spa Ritual' },
                { key: 'wedding', label: 'Pernikahan' },
                { key: 'event', label: 'Acara / Meeting' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setInquiryType(tab.key as InquiryType)}
                  aria-pressed={inquiryType === tab.key}
                  className={`py-2 px-2 rounded-xl uppercase tracking-wider text-[10px] sm:text-xs font-medium transition-all ${
                    inquiryType === tab.key
                      ? 'bg-champagne text-forest-deep font-bold shadow-sm'
                      : 'text-ivory/70 hover:text-ivory'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Nama Lengkap" id="inquiry-name">
                  <input
                    id="inquiry-name"
                    required
                    minLength={2}
                    placeholder="Contoh: Bapak Hendra Kusuma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="field"
                  />
                </Field>
                <Field label="Nomor WhatsApp / Telepon" id="inquiry-phone">
                  <input
                    id="inquiry-phone"
                    type="tel"
                    required
                    minLength={8}
                    placeholder="Contoh: 08123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="field"
                  />
                </Field>
              </div>

              <Field label="Alamat Email" id="inquiry-email">
                <input
                  id="inquiry-email"
                  type="email"
                  required
                  placeholder="Contoh: hendra@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="field"
                />
              </Field>

              {inquiryType === 'room' ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Tanggal Check-In" id="inquiry-check-in">
                      <input
                        id="inquiry-check-in"
                        type="date"
                        required
                        min={defaults.minimumDate}
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="field"
                      />
                    </Field>
                    <Field label="Tanggal Check-Out" id="inquiry-check-out">
                      <input
                        id="inquiry-check-out"
                        type="date"
                        required
                        min={checkIn}
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="field"
                      />
                    </Field>
                  </div>
                  <Field label="Pilihan Akomodasi" id="inquiry-room">
                    <select
                      id="inquiry-room"
                      value={selectedRoom}
                      onChange={(e) => setSelectedRoom(e.target.value)}
                      className="field"
                    >
                      {rooms.map((room) => (
                        <option key={room.id} value={room.slug} className="bg-forest-deep text-ivory">
                          {room.name} ({roomCategoryLabel(room.category)})
                        </option>
                      ))}
                    </select>
                  </Field>
                </>
              ) : (
                <Field
                  label={inquiryType === 'spa' ? 'Rencana Tanggal Perawatan' : 'Perkiraan Tanggal Acara'}
                  id="inquiry-target-date"
                >
                  <input
                    id="inquiry-target-date"
                    type="date"
                    min={defaults.minimumDate}
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="field"
                  />
                </Field>
              )}

              {inquiryType === 'spa' && (
                <Field label="Pilihan Perawatan Spa" id="inquiry-treatment">
                  <select
                    id="inquiry-treatment"
                    value={treatmentPreference}
                    onChange={(e) => setTreatmentPreference(e.target.value)}
                    className="field"
                  >
                    <option value="" className="bg-forest-deep text-ivory">Konsultasikan rekomendasi terbaik dengan terapis</option>
                    {SPA_TREATMENTS.map((treatment) => (
                      <option key={treatment.id} value={treatment.title} className="bg-forest-deep text-ivory">
                        {treatment.title}
                      </option>
                    ))}
                  </select>
                </Field>
              )}

              {(inquiryType === 'wedding' || inquiryType === 'event') && (
                <Field label="Preferensi Venue / Lokasi" id="inquiry-venue">
                  <input
                    id="inquiry-venue"
                    value={venuePreference}
                    onChange={(e) => setVenuePreference(e.target.value)}
                    className="field"
                    placeholder="Contoh: La Kana Chapel, Sky Garden Outdoor, Frangipani Ballroom..."
                  />
                </Field>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Perkiraan Jumlah Tamu" id="inquiry-guests">
                  <input
                    id="inquiry-guests"
                    type="number"
                    min={1}
                    max={1000}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="field"
                  />
                </Field>
                <Field label="Catatan Tambahan / Permintaan Khusus" id="inquiry-notes">
                  <textarea
                    id="inquiry-notes"
                    rows={2}
                    placeholder="Contoh: Permintaan ranjang bayi, preferensi lantai, dsb."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="field"
                  />
                </Field>
              </div>

              {submitError && (
                <p role="alert" className="text-xs text-red-200 bg-red-950/40 border border-red-300/30 rounded-xl p-3">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-champagne hover:bg-champagne-light disabled:opacity-60 text-forest-deep py-3.5 rounded-full font-bold uppercase tracking-[0.18em] text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <Send className="w-4 h-4" /> {isSubmitting ? 'Mengirimkan Permintaan...' : 'Kirimkan Permintaan Reservasi'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const Field = ({ label, id, children }: { label: string; id: string; children: React.ReactNode }) => (
  <div className="space-y-1">
    <label htmlFor={id} className="text-[11px] uppercase tracking-wider text-champagne font-medium">
      {label}
    </label>
    {children}
  </div>
);
