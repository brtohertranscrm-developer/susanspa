# Future Task Specification — System Settings & Property Configuration

## Module Overview

This document specifies the technical requirements for the future **System Settings & Property Configuration Panel** (Phase 2 & Phase 3). This panel manages core resort information, operational policies, tax & service charges, notification templates, SEO defaults, and external integration keys.

---

## Setting Categories & Configuration Parameters

### 1. Property Profile & Contact Details
- **Resort Name**: Susan Spa & Resort
- **Location Address**: Dusun Piyoto, Bandungan, Semarang Regency, Central Java 50614, Indonesia
- **Elevation**: ~1,100 Meters Above Sea Level
- **Contact Details**: Phone, General Email, Reservation Email, Official WhatsApp Number (+62).
- **Social Handles**: Instagram, Facebook, YouTube, TikTok.

### 2. Operational & Booking Policies
- **Check-In Time**: Standard 14:00 (2:00 PM) WIB
- **Check-Out Time**: Standard 12:00 (12:00 PM) WIB
- **Cancellation Policy**: Standard 48-hour prior notice for full refund.
- **Children & Extra Bed Policies**: Free for children under 5 using existing bedding.

### 3. Financial & Currency Settings
- **Base Currency**: IDR (Indonesian Rupiah - `Rp`)
- **Display Currency Formats**: IDR (`Rp 2.500.000`), USD (`$165`)
- **Tax Rate**: Standard 10% Government Tax
- **Service Charge**: Standard 10% Hospitality Service Charge

### 4. Integration & Security Configuration
- **Payment Gateway Keys**: Midtrans Server Key, Client Key, Merchant ID (Stored securely in encrypted environment secrets).
- **Notification SMTP**: Email gateway host, port, credentials, and custom email template builder.
- **Analytics & Tracking**: Google Analytics 4 Measurement ID (`G-XXXXXXXX`), Meta Pixel ID.

---

## Security & Access Rules

1. **Secret Masking**: API Keys, Secret Tokens, and Passwords must be masked in the admin UI (`••••••••••••`) and never sent to client-side JS bundles.
2. **Role Restrictions**: Only users with the `Super Admin` role can modify Payment Gateway, Tax, or Integration settings.
3. **Change Auditing**: Any modification to financial rates, tax percentages, or gateway keys generates a high-priority entry in `audit_logs`.

---

## Acceptance Criteria

- [ ] All setting updates save atomically with toast confirmation notifications.
- [ ] Attempting to modify payment keys requires re-entering current user password.
- [ ] Invalid tax/service charge inputs (e.g. negative numbers or strings) are rejected with inline validation messages.
