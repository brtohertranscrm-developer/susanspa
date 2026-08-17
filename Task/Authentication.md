# Future Task Specification — Admin Authentication & Access Control

## Module Overview

This document specifies the technical design and implementation requirements for the future **Admin Authentication & Access Control System** (Phase 2). This system controls administrative access to the resort management console, reservation engine, inventory manager, and content management tools.

---

## Key Features & Requirements

### 1. Admin Login & Credentials
- **Authentication Method**: Email and password authentication utilizing `Argon2id` or `bcrypt` (cost factor 12) for secure password hashing.
- **Session Management**: JWT (JSON Web Tokens) or HTTP-only, secure, `SameSite=Strict` session cookies with a 24-hour expiration.
- **Multi-Factor Authentication (MFA)**: Optional TOTP-based 2FA for Super Admin and Finance roles.

### 2. Role-Based Access Control (RBAC)

| Role Name | Scope & Permissions |
|---|---|
| **Super Admin** | Full system access, setting configurations, user management, audit logs. |
| **Resort Manager** | Rate management, room inventory override, promotions, operational reporting. |
| **Reservation Staff** | Read/write reservations, guest check-in/out, inquiry status updates. |
| **Finance Officer** | Read/write payments, invoices, revenue reporting, refund authorizations. |
| **Content Editor** | Manage public website content, journal stories, gallery imagery, room descriptions. |

### 3. Password Reset & Verification
- Token-based email password reset link with a 15-minute validity window.
- Mandatory password strength criteria: minimum 12 characters, including uppercase, lowercase, numbers, and special symbols.

### 4. Security & Rate Limiting
- **Brute Force Protection**: Maximum 5 failed login attempts per 15-minute window per IP address; triggers account lockout or CAPTCHA requirement.
- **Audit Trail Logging**: Every authentication event (login success, login failure, logout, password change, permission modification) writes an immutable log to `audit_logs`.

---

## State Variants & UI Flow

- `Idle`: Clean luxury login form with email, password, and "Remember me" checkbox.
- `Submitting`: Button enters disabled state with animated gold loading spinner.
- `Error`: Inline contextual error message ("Invalid credentials" or "Account locked").
- `Authenticated`: Automatic redirect to `/admin/dashboard`.

---

## Acceptance Criteria & Testing Checklist

- [ ] Unauthenticated requests to `/admin/*` routes are intercepted and redirected to `/admin/login`.
- [ ] Session cookies are set with `HttpOnly`, `Secure`, and `SameSite=Strict` flags.
- [ ] Failed login attempts increment counter and trigger IP throttling after 5 attempts.
- [ ] Changing a user role updates permission checks immediately upon next request.
