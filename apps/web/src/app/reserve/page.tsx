'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Users,
  CheckCircle2,
  MessageCircle,
  Phone,
  ShieldCheck,
  ArrowRight,
  BedDouble,
  Clock,
} from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { ROOMS } from '@/data/rooms';
import { getDefaultStayDates } from '@/lib/dates';
import { SITE_CONFIG } from '@/data/site';
import { roomCapacity } from '@/lib/room-display';
import type { InquiryReceipt } from '@susan/contracts';

type ServiceType = 'room' | 'spa' | 'wedding';

export default function ReservePage() {
  const defaults = useMemo(() => getDefaultStayDates(), []);
  const [serviceType, setServiceType] = useState<ServiceType>('room');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState(defaults.checkIn);
  const [checkOut, setCheckOut] = useState(defaults.checkOut);
  const [guests, setGuests] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0]?.slug || '');
  const [targetDate, setTargetDate] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<InquiryReceipt | null>(null);
  const [submitError, setSubmitError] = useState('');

  const currentRoom = useMemo(() => {
    return ROOMS.find((r) => r.slug === selectedRoom) || ROOMS[0];
  }, [selectedRoom]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const payload = {
      type: serviceType,
      fullName,
      email,
      phone,
      specialRequests,
      ...(serviceType === 'room'
        ? { checkIn, checkOut, guests, roomSlug: selectedRoom }
        : { targetDate }),
    };

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const body = (await res.json()) as InquiryReceipt | { error?: string };
      if (!res.ok || !('id' in body)) {
        throw new Error('error' in body ? body.error : 'Gagal mengirim formulir reservasi.');
      }
      setReceipt(body);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Terjadi kendala saat mengirim reservasi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-[#252A28] font-sans selection:bg-champagne selection:text-forest-deep">
      <Header />

      {/* Hero Header */}
      <section className="pt-32 pb-14 bg-forest-deep text-ivory border-b border-champagne/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">
            LAYANAN RESERVASI RESMI
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-ivory leading-tight font-normal">
            Rencanakan Kunjungan Anda di Susan Spa & Resort
          </h1>
          <p className="text-xs sm:text-sm text-ivory/80 max-w-xl mx-auto leading-relaxed">
            Ketinggian ±1.100 mdpl lereng Gunung Ungaran, Bandungan. Silakan lengkapi formulir reservasi di bawah ini atau hubungi tim reservasi kami secara langsung via WhatsApp.
          </p>
        </div>
      </section>

      {/* Main Reservation Container */}
      <main className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Form / Confirmation (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-xl">
            {receipt ? (
              <div className="py-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-forest-deep text-champagne flex items-center justify-center mx-auto border border-champagne/30">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h2 className="font-serif text-2xl sm:text-3xl text-forest-deep">
                    Permintaan Reservasi Berhasil Diterima
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    Terima kasih, Bapak/Ibu <strong className="text-forest-deep">{fullName}</strong>. Data permintaan Anda telah tercatat dengan kode referensi:{' '}
                    <span className="font-mono font-bold text-terracotta">{receipt.id.slice(0, 8).toUpperCase()}</span>.
                  </p>
                </div>

                <div className="bg-ivory/70 border border-stone-200 rounded-2xl p-5 text-left text-xs space-y-2 text-[#333D39]">
                  <div className="flex justify-between border-b border-stone-200/70 pb-2">
                    <span className="text-stone-500 font-medium">Layanan</span>
                    <span className="font-semibold text-forest-deep uppercase">{serviceType}</span>
                  </div>
                  {serviceType === 'room' && (
                    <>
                      <div className="flex justify-between border-b border-stone-200/70 pb-2">
                        <span className="text-stone-500 font-medium">Akomodasi</span>
                        <span className="font-semibold text-forest-deep">{currentRoom.name}</span>
                      </div>
                      <div className="flex justify-between border-b border-stone-200/70 pb-2">
                        <span className="text-stone-500 font-medium">Jadwal Menginap</span>
                        <span className="font-semibold text-forest-deep">{checkIn} s.d. {checkOut}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500 font-medium">Jumlah Tamu</span>
                        <span className="font-semibold text-forest-deep">{guests} Tamu</span>
                      </div>
                    </>
                  )}
                  {serviceType !== 'room' && targetDate && (
                    <div className="flex justify-between">
                      <span className="text-stone-500 font-medium">Rencana Tanggal</span>
                      <span className="font-semibold text-forest-deep">{targetDate}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                      `Halo Susan Spa & Resort, saya telah mengirim formulir reservasi dengan kode ref: ${receipt.id.slice(0, 8).toUpperCase()} atas nama ${fullName}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Konfirmasi via WhatsApp</span>
                  </a>
                  <button
                    onClick={() => setReceipt(null)}
                    className="w-full sm:w-auto border border-stone-300 hover:border-forest text-forest-deep px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Buat Reservasi Baru
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Selector Tabs */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#57635E] font-bold block">
                    Pilih Kategori Reservasi
                  </label>
                  <div className="grid grid-cols-3 gap-2 p-1 bg-ivory rounded-2xl border border-stone-200">
                    <button
                      type="button"
                      onClick={() => setServiceType('room')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                        serviceType === 'room'
                          ? 'bg-forest-deep text-champagne shadow-sm font-bold'
                          : 'text-stone-600 hover:text-forest-deep'
                      }`}
                    >
                      Kamar & Villa
                    </button>
                    <button
                      type="button"
                      onClick={() => setServiceType('spa')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                        serviceType === 'spa'
                          ? 'bg-forest-deep text-champagne shadow-sm font-bold'
                          : 'text-stone-600 hover:text-forest-deep'
                      }`}
                    >
                      Spa & Wellness
                    </button>
                    <button
                      type="button"
                      onClick={() => setServiceType('wedding')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                        serviceType === 'wedding'
                          ? 'bg-forest-deep text-champagne shadow-sm font-bold'
                          : 'text-stone-600 hover:text-forest-deep'
                      }`}
                    >
                      Pernikahan
                    </button>
                  </div>
                </div>

                {submitError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                    {submitError}
                  </div>
                )}

                {/* Service-Specific Fields */}
                {serviceType === 'room' ? (
                  <div className="space-y-4 pt-2 border-t border-stone-100">
                    <div className="space-y-1">
                      <label htmlFor="reserve-room" className="text-[10px] uppercase tracking-wider text-[#57635E] font-bold block">
                        Pilihan Tipe Kamar / Villa *
                      </label>
                      <select
                        id="reserve-room"
                        value={selectedRoom}
                        onChange={(e) => setSelectedRoom(e.target.value)}
                        className="w-full bg-ivory/50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-forest-deep font-medium focus:border-forest-deep focus:outline-none"
                      >
                        {ROOMS.map((room) => (
                          <option key={room.id} value={room.slug}>
                            {room.name} ({room.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label htmlFor="reserve-checkin" className="text-[10px] uppercase tracking-wider text-[#57635E] font-bold block">
                          Check-In *
                        </label>
                        <input
                          id="reserve-checkin"
                          type="date"
                          required
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full bg-ivory/50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-forest-deep focus:border-forest-deep focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="reserve-checkout" className="text-[10px] uppercase tracking-wider text-[#57635E] font-bold block">
                          Check-Out *
                        </label>
                        <input
                          id="reserve-checkout"
                          type="date"
                          required
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full bg-ivory/50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-forest-deep focus:border-forest-deep focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="reserve-guests" className="text-[10px] uppercase tracking-wider text-[#57635E] font-bold block">
                          Jumlah Tamu *
                        </label>
                        <select
                          id="reserve-guests"
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          className="w-full bg-ivory/50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-forest-deep font-medium focus:border-forest-deep focus:outline-none"
                        >
                          {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                            <option key={num} value={num}>
                              {num} Tamu
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 pt-2 border-t border-stone-100">
                    <div className="space-y-1">
                      <label htmlFor="reserve-target-date" className="text-[10px] uppercase tracking-wider text-[#57635E] font-bold block">
                        Rencana Tanggal Kunjungan *
                      </label>
                      <input
                        id="reserve-target-date"
                        type="date"
                        required
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="w-full bg-ivory/50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-forest-deep focus:border-forest-deep focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Personal Information */}
                <div className="space-y-3 pt-2 border-t border-stone-100">
                  <div className="space-y-1">
                    <label htmlFor="reserve-name" className="text-[10px] uppercase tracking-wider text-[#57635E] font-bold block">
                      Nama Lengkap Anda *
                    </label>
                    <input
                      id="reserve-name"
                      type="text"
                      required
                      placeholder="Nama lengkap pemesan"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-ivory/50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-forest-deep placeholder:text-stone-400 focus:border-forest-deep focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="reserve-phone" className="text-[10px] uppercase tracking-wider text-[#57635E] font-bold block">
                        Nomor WhatsApp Aktif *
                      </label>
                      <input
                        id="reserve-phone"
                        type="tel"
                        required
                        placeholder="+62 812 xxxx xxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-ivory/50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-forest-deep placeholder:text-stone-400 focus:border-forest-deep focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="reserve-email" className="text-[10px] uppercase tracking-wider text-[#57635E] font-bold block">
                        Alamat Email *
                      </label>
                      <input
                        id="reserve-email"
                        type="email"
                        required
                        placeholder="alamat@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-ivory/50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-forest-deep placeholder:text-stone-400 focus:border-forest-deep focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="reserve-notes" className="text-[10px] uppercase tracking-wider text-[#57635E] font-bold block">
                      Permintaan Khusus / Catatan Tambahan (Opsional)
                    </label>
                    <textarea
                      id="reserve-notes"
                      rows={3}
                      placeholder="Contoh: Permintaan early check-in, dekorasi khusus honeymoon, dll."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full bg-ivory/50 border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-forest-deep placeholder:text-stone-400 focus:border-forest-deep focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-forest-deep hover:bg-forest text-champagne hover:text-champagne-light py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Memproses Reservasi...</span>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4" />
                        <span>Kirim Permintaan Reservasi</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-stone-500 text-center pt-2">
                    Tim kami akan menghubungi Anda untuk konfirmasi ketersediaan dan detail instruksi pembayaran.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Accommodation Preview & Quick Concierge (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Selected Room Preview Card */}
            {serviceType === 'room' && currentRoom && (
              <div className="bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-lg space-y-4 p-5 sm:p-6">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-forest-deep">
                  <Image
                    src={currentRoom.images[0] || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200'}
                    alt={currentRoom.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-forest-deep/90 text-champagne text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-champagne/30 font-semibold">
                    {currentRoom.category}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-xl sm:text-2xl text-forest-deep font-normal">
                    {currentRoom.name}
                  </h3>
                  <p className="text-xs text-[#57635E] leading-relaxed line-clamp-2">
                    {currentRoom.description || currentRoom.tagline}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 py-3 border-y border-stone-100 text-xs text-forest-deep">
                  <div className="flex items-center space-x-2">
                    <BedDouble className="w-4 h-4 text-champagne-dark" />
                    <span>{currentRoom.bedType || 'Kasur Nyaman'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-champagne-dark" />
                    <span>{roomCapacity(currentRoom)}</span>
                  </div>
                </div>

                <Link
                  href={`/rooms/${currentRoom.slug}`}
                  className="inline-flex items-center space-x-1.5 text-xs text-forest-deep hover:text-botanical font-bold uppercase tracking-wider pt-1 transition-colors"
                >
                  <span>Lihat Detail Lengkap Kamar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* Direct WhatsApp Concierge Card */}
            <div className="bg-forest-deep text-ivory rounded-3xl p-6 sm:p-8 space-y-4 border border-champagne/30 shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-champagne">Butuh Bantuan Cepat?</h4>
                  <p className="text-xs text-ivory/70">Hubungi langsung staf concierge Susan Spa</p>
                </div>
              </div>

              <p className="text-xs text-ivory/80 leading-relaxed">
                Untuk pertanyaan ketersediaan tanggal, promo grup, atau pengaturan pernikahan di La Kana, tim kami aktif melayani setiap hari:
              </p>

              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-ivory/90">
                  <Clock className="w-4 h-4 text-champagne" />
                  <span>Pelayanan Chat: 07.00 - 22.00 WIB</span>
                </div>
                <div className="flex items-center space-x-2 text-ivory/90">
                  <Phone className="w-4 h-4 text-champagne" />
                  <a href={`tel:${SITE_CONFIG.contact.phone}`} className="hover:text-champagne transition-colors">
                    {SITE_CONFIG.contact.phoneFormatted}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                    'Halo Susan Spa & Resort, saya ingin bertanya mengenai ketersediaan reservasi penginapan.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat WhatsApp Resmi</span>
                </a>
              </div>
            </div>

            {/* Direct Booking Guarantee */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 text-xs space-y-2 text-[#4A5852]">
              <div className="flex items-center space-x-2 font-bold text-forest-deep uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-botanical" />
                <span>Keuntungan Reservasi Langsung</span>
              </div>
              <ul className="space-y-1.5 pl-6 list-disc">
                <li>Jaminan harga terbaik langsung dari manajemen resort</li>
                <li>Konfirmasi instan tanpa biaya perantara tersembunyi</li>
                <li>Fleksibilitas penjadwalan ulang sesuai syarat dan ketentuan</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppCTA />
    </div>
  );
}
