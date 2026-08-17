# Product Requirements Document (PRD)

## Product Overview

**Project Name**: Susan Spa & Resort Digital Hospitality Platform  
**Target Brand**: Susan Spa & Resort  
**Location**: Bandungan, Central Java, Indonesia (~1,100 meters above sea level near Mount Ungaran)  
**Website URL Baseline**: https://www.susansparesort.com/  
**Visual Quality Benchmark**: https://nihi.com/

The goal of this project is to transform Susan Spa & Resort from an aging informational website into a world-class, immersive digital hospitality experience. The new platform communicates luxury, mountain tranquility, restorative wellness, and editorial sophistication. It serves as a high-converting marketing portal for leisure stays, spa retreats, weddings at the iconic **La Kana Chapel**, corporate gatherings, and culinary experiences.

---

## Business Objectives

1. **Elevate Brand Perception**: Position Susan Spa & Resort as Central Java's premier luxury mountain retreat and wellness destination.
2. **Increase Direct Room Inquiries & Booking Intent**: Improve conversion rates by providing clear room viewings, interactive amenity breakdowns, and effortless reservation inquiry triggers.
3. **Drive High-Value Wedding & Event Leads**: Highlight La Kana Chapel, outdoor lawns, and grand banquet venues with conversion-focused inquiry workflows.
4. **Boost Spa & Wellness Reservations**: Present signature treatments, thermal baths, and spa packages in a serene visual format with dedicated booking channels.
5. **Optimize Organic Search (SEO)**: Capture high-intent queries for Bandungan resorts, luxury Semarang hotels, wedding chapels in Central Java, and wellness getaways.
6. **Future-Proof Software Foundation**: Build a modular, Next.js-based public front-end that seamlessly integrates with future Phase 2 (Booking Engine) and Phase 3 (Payment Gateway & PMS/Channel Manager) systems.

---

## Target Audiences & User Personas

| Persona | Description & Goals | Primary Needs |
|---|---|---|
| **1. Romantic Couples** | Seeking intimate weekend getaways, anniversaries, or proposals in cool mountain air. | Jacuzzi suites, scenic mountain views, private dining, couples spa packages, serene ambiance. |
| **2. Family Leisure Travelers** | Planning school holiday trips, multi-generational stays, or weekend escapes from Semarang/Jakarta. | Spacious family suites/villas, children's playground, heated pool, safety, nearby attractions like Gedong Songo. |
| **3. Spa & Day Wellness Guests** | Local and regional visitors seeking day spa packages, thermal baths, and holistic stress relief. | Clear treatment menus, duration, therapeutic benefits, online appointment inquiries. |
| **4. Wedding Couples** | Engaged couples looking for a dream mountain destination wedding. | High-resolution photography of La Kana Chapel, venue capacities, wedding packages, customized lead inquiry form. |
| **5. Corporate & Event Organizers** | Companies planning executive retreats, team building, or conferences. | Meeting room capacities, AV facilities, group dining menus, corporate package contact forms. |
| **6. Domestic Travelers** | Visitors from Central Java, Jakarta, Surabaya seeking cool mountain weather. | Indonesian language support, WhatsApp direct access, location maps, local climate details. |
| **7. International Travelers** | Tourists seeking authentic Javanese wellness and highland scenery. | English content, currency clarity, airport transfer information, clear booking steps. |
| **8. Travel Agents & Partners** | Tour operators and event planners requiring resort specs. | High-res image downloads, downloadable rate sheets/brochures, quick partner contact. |

---

## Core User Journeys

1. **Exploring Accommodation**: Home -> Stay Overview -> Category Filter (Villa, Suite, Deluxe) -> Room Detail Page -> Room Amenities & Gallery -> Click "Book / Inquire Stay" -> Open Reservation Bar/Modal.
2. **Planning a Mountain Wedding**: Home -> Weddings -> La Kana Chapel Spotlight -> Virtual Tour / Gallery -> Package Comparison -> Submit Wedding Inquiry Form -> Receive Confirmation & WhatsApp follow-up link.
3. **Reserving Spa Treatments**: Home -> Spa & Wellness -> Signature Treatment Showcase -> View Duration & Inclusions -> Click "Book Treatment" -> WhatsApp pre-filled inquiry or online form.
4. **Organizing a Corporate Meeting**: Home -> Meetings & Events -> Venue Specs -> Floor Plans & Capacities -> Request Event Proposal Form.
5. **Exploring Nearby Destinations**: Home -> Nearby -> Map of Bandungan & Gedong Songo -> Itinerary suggestions -> Resort Concierge inquiry.

---

## Information Architecture & Sitemap

The public website consists of 18 dedicated page routes:

1. `/` — **Home** (Hero video/image, brand narrative, quick reservation bar, featured rooms, spa spotlight, La Kana Chapel feature, facilities preview, offers, guest stories, location).
2. `/stay` — **Stay / Accommodation** (Filterable listing of villas, suites, and luxury rooms).
3. `/stay/[slug]` — **Room Detail** (Cinematic image gallery, specs, capacity, bed layout, amenities, policies, booking CTA).
4. `/spa` — **Spa & Wellness** (Restorative treatments, thermal spa facilities, massage packages, appointment inquiry).
5. `/facilities` — **Resort Facilities** (Heated swimming pool, jacuzzi, Sky Garden, fitness center, kids playground, sauna).
6. `/dining` — **Dining & Culinary** (Sky Garden Restaurant, private romantic dining, room service menu overview).
7. `/weddings` — **Weddings at La Kana Chapel** (Chapel spotlight, reception lawns, pre-wedding packages, venue capacities, inquiry form).
8. `/events` — **Meetings & Events** (Function halls, executive retreats, team building, proposal request).
9. `/experiences` — **Resort Experiences** (Mountain trekking, sunrise yoga, coffee tasting, flower garden tours).
10. `/offers` — **Offers & Special Packages** (Romantic escapes, weekend wellness, early bird promotions).
11. `/gallery` — **Visual Gallery** (Filterable grid: All, Rooms, Spa, Weddings, La Kana Chapel, Dining, Grounds).
12. `/about` — **About Susan Spa & Resort** (Resort heritage, Bandungan mountain altitude ~1,100m, design philosophy).
13. `/nearby` — **Nearby Destinations** (Gedong Songo Temple, Ambarawa Railway Museum, Celosia Park, Mount Ungaran).
14. `/journal` — **Journal & Stories** (Editorial articles on wellness, Bandungan travel guides, real wedding features).
15. `/journal/[slug]` — **Story Detail** (Editorial article layout with inline imagery and quote blocks).
16. `/contact` — **Contact & Location** (Interactive Google Map guide, address, phone, email, WhatsApp, inquiry form).
17. `/reserve` — **Reservation Inquiry Portal** (Dedicated check-in/out date selector, room preference, guest count, instant request submission).
18. `/privacy` & `/terms` — **Legal Pages** (Privacy policy, cookie disclosures, terms of service).

---

## Functional Requirements

- **Header & Navigation**: Sticky blur navbar, responsive mobile slide-out drawer, quick reservation button, language toggle.
- **Interactive Reservation Bar**: Floating bar on desktop and sticky bottom bar on mobile to select dates, guests, and check availability/inquire.
- **Inquiry Forms**:
  - Room Reservation Inquiry Form (Dates, Guests, Room Choice, Contact Info).
  - Wedding Inquiry Form (Event Date, Guest Count, Venue Preference, Special Requests).
  - Corporate Event Proposal Form.
  - General Contact Form with email/WhatsApp integration.
- **Media Presentation**: Lazy-loaded responsive imagery, video hero backgrounds with pause/mute toggles, lightboxes for gallery viewing.
- **SEO & Metadata Infrastructure**: Dynamic meta titles, OpenGraph, Twitter Cards, Schema.org `Hotel` and `EventVenue` JSON-LD data, dynamic sitemap (`sitemap.xml`).
- **Language Readiness**: Structural support for English (EN) and Indonesian (ID) content switching.

---

## Non-Functional Requirements

- **Performance**: Mobile PageSpeed score >= 90; Core Web Vitals target (LCP < 2.5s, INP < 200ms, CLS < 0.1).
- **Accessibility**: WCAG 2.2 Level AA compliance, semantic HTML5, visible focus indicators, keyboard drawer navigation, accessible form inputs.
- **Security**: Strict client-side input validation, HTML escaping, no hardcoded API secrets, Content Security Policy headers.
- **Mobile First**: Pixel-perfect layout optimization for smartphones (360px, 390px), tablets (768px), and desktops (1280px, 1440px+).

---

## Scope Phasing

### Phase 1: Premium Public Website (Current Scope)
- Complete luxury front-end application with all 18 pages.
- Interactive date/guest selection bar & reservation inquiry flow.
- Customized lead forms for rooms, spa, weddings, and events.
- SEO & Accessibility engines.
- Detailed design system and architectural documentation.

### Phase 2: Booking Engine (Future Module)
- Real-time room availability matrix and pricing engine.
- Direct booking funnel with instant reservation creation.
- Guest portal for reservation lookup and modifications.

### Phase 3: Payment Gateway & PMS Integration (Future Module)
- Midtrans / Xendit payment gateway integration for credit cards, bank transfers, e-wallets.
- Property Management System (PMS) and Channel Manager synchronization.
- Automated email/WhatsApp confirmation notifications and invoices.

---

## Success Criteria

1. All 18 sitemap routes are fully implemented and navigable.
2. Zero build errors (`npm run build`), type errors (`tsc`), or lint warnings (`eslint`).
3. Form validation triggers correctly for required inputs across all inquiry components.
4. Mobile navigation drawer operates cleanly with lock-scrolling when open.
5. All image assets load efficiently with WebP/AVIF formats and explicit aspect ratios.
