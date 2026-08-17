# Database & Entity Schema Documentation (Phase 2 & Phase 3 Ready)

> **Implementation status — Demo 1 (August 2026):** dua PostgreSQL fisik/logis terpisah sudah tersedia melalui Docker Compose. `susan_cms` (host port 5433) hanya untuk Payload/content; `susan_booking` (host port 5434) untuk transaksi. Migration booking saat ini membuat tabel `inquiries`; entity reservasi, inventory, payment, dan audit di bawah tetap merupakan rancangan fase berikutnya.

## Data Architecture & Entity Relationship Overview

Although the Phase 1 implementation uses a content-driven data layer (`src/data/`), the database schema below provides the complete future-ready relational structure for Phase 2 (Direct Booking System) and Phase 3 (Payments, Invoicing, PMS, and Channel Manager integration).

```
+------------------+         +--------------------+         +-------------------+
|      users       |<--------|       roles        |         |      guests       |
+------------------+         +--------------------+         +-------------------+
         |                                                            |
         v                                                            v
+------------------+         +--------------------+         +-------------------+
|   audit_logs     |         |     room_types     |<--------|   reservations    |
+------------------+         +--------------------+         +-------------------+
                                      |                               |
                                      v                               v
                             +--------------------+         +-------------------+
                             |       rooms        |         | reservation_rooms |
                             +--------------------+         +-------------------+
                                                                      |
                                                                      v
                                                            +-------------------+
                                                            |     payments      |
                                                            +-------------------+
```

---

## Core Entities & Field Specifications

### 1. `users`
- `id` (UUID, PK)
- `email` (VARCHAR(255), UNIQUE, NOT NULL)
- `password_hash` (VARCHAR(255), NOT NULL)
- `full_name` (VARCHAR(150), NOT NULL)
- `role_id` (UUID, FK -> roles.id)
- `status` (ENUM('active', 'inactive', 'suspended'), DEFAULT 'active')
- `created_at` (TIMESTAMPTZ, DEFAULT NOW())
- `updated_at` (TIMESTAMPTZ, DEFAULT NOW())

### 2. `roles` & `permissions`
- `roles.id` (UUID, PK)
- `roles.name` (VARCHAR(50), UNIQUE) — e.g. `admin`, `manager`, `reservation_staff`, `finance`, `content_editor`
- `permissions.id` (UUID, PK)
- `permissions.code` (VARCHAR(100), UNIQUE) — e.g. `reservations:read`, `rates:write`

### 3. `guests`
- `id` (UUID, PK)
- `first_name` (VARCHAR(100), NOT NULL)
- `last_name` (VARCHAR(100), NOT NULL)
- `email` (VARCHAR(255), NOT NULL, INDEX)
- `phone_number` (VARCHAR(50), NOT NULL)
- `whatsapp_number` (VARCHAR(50))
- `country_code` (VARCHAR(5))
- `identity_type` (ENUM('passport', 'ktp', 'sim'))
- `identity_number` (VARCHAR(100))
- `created_at` (TIMESTAMPTZ)

### 4. `room_types`
- `id` (UUID, PK)
- `slug` (VARCHAR(100), UNIQUE, NOT NULL) — e.g. `grand-villa`, `royal-suite`
- `name` (VARCHAR(150), NOT NULL)
- `short_description` (TEXT)
- `full_description` (TEXT)
- `base_capacity_adults` (INT, DEFAULT 2)
- `base_capacity_children` (INT, DEFAULT 1)
- `max_capacity_adults` (INT, DEFAULT 4)
- `bed_type` (VARCHAR(100)) — e.g. `1 King Bed + Mountain Balcony`
- `room_size_sqm` (DECIMAL(6,2))
- `base_price_idr` (DECIMAL(12,2), NOT NULL)
- `status` (ENUM('active', 'draft', 'archived'), DEFAULT 'active')

### 5. `rooms`
- `id` (UUID, PK)
- `room_type_id` (UUID, FK -> room_types.id, NOT NULL)
- `room_number` (VARCHAR(20), UNIQUE, NOT NULL)
- `floor` (INT)
- `status` (ENUM('clean', 'dirty', 'maintenance', 'out_of_order'))

### 6. `rate_plans` & `room_inventory`
- `rate_plans.id` (UUID, PK)
- `rate_plans.name` (VARCHAR(100)) — e.g. `Standard Rate`, `Breakfast Included`, `Weekend Romantic Getaway`
- `room_inventory.date` (DATE, NOT NULL, INDEX)
- `room_inventory.room_type_id` (UUID, FK -> room_types.id)
- `room_inventory.total_allocated` (INT, NOT NULL)
- `room_inventory.total_booked` (INT, DEFAULT 0)
- `room_inventory.rate_override_idr` (DECIMAL(12,2))

### 7. `reservations` & `reservation_rooms`
- `id` (UUID, PK)
- `booking_reference` (VARCHAR(20), UNIQUE, NOT NULL, INDEX) — e.g. `SSR-202608-8839`
- `guest_id` (UUID, FK -> guests.id, NOT NULL)
- `check_in_date` (DATE, NOT NULL, INDEX)
- `check_out_date` (DATE, NOT NULL, INDEX)
- `status` (ENUM('pending_payment', 'confirmed', 'checked_in', 'checked_out', 'cancelled'), DEFAULT 'pending_payment')
- `total_amount_idr` (DECIMAL(12,2), NOT NULL)
- `tax_amount_idr` (DECIMAL(12,2), NOT NULL)
- `service_charge_idr` (DECIMAL(12,2), NOT NULL)
- `special_requests` (TEXT)
- `idempotency_key` (VARCHAR(100), UNIQUE)
- `created_at` (TIMESTAMPTZ, DEFAULT NOW())

### 8. `payments` & `payment_events`
- `id` (UUID, PK)
- `reservation_id` (UUID, FK -> reservations.id)
- `gateway_name` (VARCHAR(50)) — e.g. `Midtrans`, `Xendit`
- `transaction_id` (VARCHAR(100), UNIQUE)
- `payment_method` (VARCHAR(50)) — e.g. `credit_card`, `bank_transfer`, `gopay`
- `amount_idr` (DECIMAL(12,2), NOT NULL)
- `status` (ENUM('pending', 'settled', 'expired', 'failed', 'refunded'))
- `settled_at` (TIMESTAMPTZ)

### 9. `contact_inquiries`, `wedding_inquiries`, `event_inquiries`
- `id` (UUID, PK)
- `inquiry_type` (ENUM('room', 'spa', 'wedding', 'event', 'general'))
- `full_name` (VARCHAR(150), NOT NULL)
- `email` (VARCHAR(255), NOT NULL)
- `phone` (VARCHAR(50), NOT NULL)
- `target_date` (DATE)
- `guest_count` (INT)
- `message` (TEXT)
- `status` (ENUM('new', 'in_progress', 'contacted', 'closed'), DEFAULT 'new')
- `created_at` (TIMESTAMPTZ, DEFAULT NOW())

---

## Critical Booking & Financial Integrity Rules

1. **Overlapping Booking Guard**: Database transaction locking or double-allocation checks (`SELECT COUNT(*) FROM reservation_rooms WHERE room_id = X AND check_in < end_date AND check_out > start_date`) must be executed prior to confirming a booking.
2. **Idempotency Keys**: All payment transaction webhooks must specify an `idempotency_key` to avoid duplicate payment processing.
3. **Audit Records**: Financial tables (`reservations`, `payments`, `invoices`) must never be hard-deleted (`DELETE`); soft deletes (`archived_at`) or status changes (`cancelled`) must be used exclusively.
