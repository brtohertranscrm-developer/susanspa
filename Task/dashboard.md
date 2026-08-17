# Future Task Specification — Administration Dashboard

## Module Overview

This document specifies the technical design and UI requirements for the future **Administration Dashboard** (Phase 2 & Phase 3). The dashboard provides resort operators, reservation managers, and event coordinators with a centralized interface to manage bookings, track room availability, respond to inquiries, and update site content.

---

## Core Dashboard Modules

```
[ Admin Dashboard Header ]
├── Executive Overview Stats (Occupancy %, Monthly Revenue, Active Inquiries, Upcoming Weddings)
├── Quick Actions (Create Reservation, Add Inquiry, Block Inventory)
└── Main Navigation Tabs
    ├── 1. Occupancy & Calendar Matrix
    ├── 2. Reservation Management
    ├── 3. Room & Inventory Controller
    ├── 4. Lead & Inquiry Desk (Rooms, Weddings, Events, Spa)
    ├── 5. Content & Media Management (CMS)
    ├── 6. Financial Reports & Invoicing
    └── 7. Audit & System Activity Logs
```

---

## Module Specifications

### 1. Executive Summary & KPIs
- **Key Metrics**: Daily Occupancy Rate (%), Average Daily Rate (ADR in IDR), Revenue Per Available Room (RevPAR), Pending Wedding Inquiries, Unprocessed Direct Reservations.
- **Visuals**: Line chart for 30-day booking trend, pie chart for revenue breakdown (Rooms, Spa, Dining, Weddings).

### 2. Interactive Calendar & Inventory Grid
- Grid visualizer mapping physical room numbers against calendar days.
- Drag-and-drop capability for moving reservations between available rooms of the same category.
- Ability to manually set room status (`Out of Service`, `Maintenance`, `VIP Reserved`).

### 3. Lead & Inquiry Desk
- Filterable table managing incoming leads from the public website:
  - **Wedding Inquiries** (La Kana Chapel, estimated guests, target date, stage: `New` -> `Proposal Sent` -> `Contract Signed`).
  - **Corporate Event Inquiries**.
  - **Spa Package Reservations**.
- Direct WhatsApp integration links to start instant conversation with pre-filled inquiry details.

### 4. Content & Media Library (CMS)
- WYSIWYG editor to manage room descriptions, spa treatment prices, offers, and journal articles.
- High-res photo uploader with automated WebP conversion and crop previews.

---

## UI Components & Tables

- **DataTable Component**: Supports column sorting, multi-column search, status filtering, date range picker, and CSV/PDF export.
- **Empty States**: Friendly illustrations and actions when zero records match a filter.
- **Pagination**: Server-side pagination defaulting to 25 items per page.

---

## Acceptance Criteria & Testing Checklist

- [ ] KPI cards update in real time or upon manual refresh.
- [ ] Calendar grid correctly indicates room lock states and prevents double-allocations.
- [ ] Lead desk updates lead status (`New` -> `In Progress`) with staff user timestamp.
- [ ] Data tables support responsive horizontal scrolling on mobile and tablet displays.
