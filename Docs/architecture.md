# Technical Architecture Document

## Overview & Technology Stack

The **Susan Spa & Resort** web platform is architected as a modern, high-performance web application utilizing Next.js (App Router), TypeScript, and Tailwind CSS. The system prioritizes server-side rendering for optimal SEO and performance, while using lightweight client components for interactive reservation flows, gallery filtering, and lead capture.

### Core Technology Choices
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (Strict Type Safety)
- **Styling**: Tailwind CSS + Custom CSS Variables for Design Tokens ("Elevated Serenity" Theme)
- **Icons**: Lucide React
- **Animations**: Framer Motion & CSS Micro-interactions
- **Image Handling**: `next/image` with WebP/AVIF optimization and responsive srcset sizing
- **Form Handling**: Native React Hook State + Zod Schema Validation readiness
- **SEO & Structured Data**: Next.js Metadata API + Schema.org JSON-LD

---

## Application Architecture

```
src/
├── app/                  # Next.js App Router Page Routes & API Handlers
│   ├── layout.tsx        # Root Layout (Navbar, Footer, Providers, SEO Defaults)
│   ├── page.tsx          # Homepage
│   ├── stay/             # Accommodations & Detail routes
│   ├── spa/              # Spa & Wellness route
│   ├── facilities/       # Resort Amenities
│   ├── dining/           # Sky Garden & Culinary
│   ├── weddings/         # Weddings & La Kana Chapel
│   ├── events/           # Meetings & Conferences
│   ├── experiences/      # Resort Activities
│   ├── offers/           # Special Packages
│   ├── gallery/          # Visual Gallery
│   ├── about/            # Resort Heritage & Location
│   ├── nearby/           # Destination Guide (Bandungan/Gedong Songo)
│   ├── journal/          # Articles & Stories
│   ├── contact/          # Contact Form & Interactive Map
│   ├── reserve/          # Interactive Reservation Inquiry Portal
│   ├── privacy/          # Legal Privacy Policy
│   └── terms/            # Terms and Conditions
├── components/
│   ├── global/           # Header, Footer, MobileNav, BookingBar, WhatsAppCTA
│   ├── ui/               # Button, Modal, Accordion, Badge, Tabs, Inputs
│   └── sections/         # Page Sections (Hero, RoomGrid, TreatmentGrid, etc.)
├── data/                 # Content Schema & Data Sets (Rooms, Spa, Weddings, etc.)
├── types/                # TypeScript Interfaces & Domain Models
├── lib/                  # Helper Utilities (cn, date-formatters, schema-builders)
└── styles/               # CSS Modules & Global Token Definitions
```

---

## Component Categorization Strategy

### 1. Global Components
- `Header.tsx`: Transparent navigation bar that transitions to a blurred backdrop (`bg-forest-deep/90 backdrop-blur-md`) upon scrolling past 50px.
- `DesktopNav.tsx`: Clean links with active indicators and dropdown submenus.
- `MobileNav.tsx`: Full-screen animated overlay drawer with focus trap, backdrop blur, lock body scroll, and sticky reservation CTA.
- `Footer.tsx`: Rich multi-column footer displaying resort credentials, Bandungan elevation tag (~1,100m ASL), sitemap navigation, newsletter input, and copyright.
- `BookingBar.tsx`: Sticky reservation widget supporting Check-In, Check-Out, Guest Count, and Room selection.
- `WhatsAppCTA.tsx`: Floating action button providing direct instant connection to resort concierge with contextual pre-filled messages.

### 2. Editorial Components
- `ImmersiveHero.tsx`: Full-height visual hero with parallax background effect, subtle gradient overlay, editorial display typography, and scroll indicator.
- `IntroStatement.tsx`: High-craft brand narrative section with large typography and centered accent rules.
- `StoryBlock.tsx`: Split-screen layout combining editorial image displays with text, quote highlights, and primary CTAs.
- `TestimonialCarousel.tsx`: Guest review quotes slider with avatar, rating stars, stay category, and verified guest badges.

### 3. Hospitality Components
- `RoomCard.tsx`: Displays room thumbnail, category badge, capacity icons, bed type, view tags, starting rate, and dual CTAs ("Details" and "Inquire").
- `RoomGallery.tsx`: Interactive image slider with lightbox expansion for room interior/exterior views.
- `SpaTreatmentCard.tsx`: Shows treatment duration, therapeutic benefits, key ingredients, and instant booking modal trigger.
- `WeddingPackageCard.tsx`: Highlights guest capacity, venue inclusions (La Kana Chapel, Lawn, Dining), and proposal request button.

### 4. Utility & UI Primitives
- `Button.tsx`: Variants for `primary` (Gold/Champagne fill), `secondary` (Forest outline), `ghost`, `link`, with `loading` spinner and icon slots.
- `Input.tsx` / `Select.tsx`: Accessible input controls with visible focus rings, helper text, and error states.
- `Modal.tsx`: Accessible overlay dialog built with ARIA attributes (`role="dialog"`, `aria-modal="true"`) and Esc key listener.

---

## Rendering Strategy

- **Static Generation (SSG / Server Components)**: Public informational pages (`/about`, `/facilities`, `/nearby`, `/privacy`, `/terms`) are server-rendered at build time for maximum speed and zero-JS core content delivery.
- **Incremental Static Regeneration (ISR)**: Dynamic content like Room Details (`/stay/[slug]`) and Journal Stories (`/journal/[slug]`) are pre-rendered with on-demand background validation.
- **Client Components (`'use client'`)**: Isolated to interactive UI elements such as `BookingBar`, `MobileNav`, `GalleryFilter`, `ContactForm`, `Modal`, and `WhatsAppCTA` to minimize client JS bundle overhead.

---

## Performance & Optimization Strategy

1. **Image Sizing & Formats**: All image tags use Next.js `Image` component with WebP/AVIF automatic format negotiation, explicit `width`/`height` to avoid cumulative layout shifts (CLS), and priority flags for the main hero image.
2. **Font Optimization**: Headings use Google Fonts (Playfair Display / Cormorant Garamond) loaded via `next/font` with `display: swap` to prevent FOIT (Flash of Unstyled Text).
3. **Bundle Minimization**: Tree-shaking lucide-react icons and avoiding heavy third-party libraries.
4. **Accessible Motion**: All CSS animations respect `@media (prefers-reduced-motion: reduce)`.

---

## Security Foundation

- **Client Input Sanitization**: All contact and inquiry forms validate text inputs against HTML script injection before submission.
- **Environment Variables**: Sensitive API keys and secret tokens are strictly scoped to server-side code (never prefixed with `NEXT_PUBLIC_` unless explicit).
- **Rate Limiting**: Public inquiry endpoints enforce rate limits per IP address to mitigate spam submissions.

---

## Future Booking Platform Architecture (Phase 2 & Phase 3)

The architecture is designed to support seamless addition of backend booking APIs:

```
[ Frontend (Next.js) ]
         │
         ├── REST / GraphQL API Routes (/api/v1/availability)
         │
[ Phase 2: Booking Microservice ]
         ├── Room Inventory Engine
         ├── Rate Plan & Occupancy Pricing Calculator
         ├── Reservation Manager
         │
[ Phase 3: External Integrations ]
         ├── Payment Gateway (Midtrans / Xendit)
         ├── Channel Manager (SiteMinder / Cloudbeds)
         └── PMS Sync Service
```
