# Design System Specification — "Elevated Serenity"

## Visual Concept & Brand Identity

The design system for **Susan Spa & Resort** is built around the core concept of **"Elevated Serenity"**. Situated ~1,100 meters above sea level in Bandungan, Central Java, the resort's visual identity balances high mountain tranquility, lush botanical landscapes, crisp highland air, and refined luxury hospitality inspired by benchmark editorial properties like NIHI.

Key Brand Values:
- **Serene & Calming**: Restful palettes, generous white space, smooth interactions.
- **Editorial & Immersive**: High-impact typography, cinematic photography, storytelling rhythm.
- **Natural & Organic**: Forest greens, natural stone neutrals, mist tones, warm ivory, antique gold accents.
- **Sophisticated & Timeless**: Refined serif headings paired with clean, accessible sans-serif typography.

---

## Color Palette & Token Definitions

The color system meets WCAG 2.2 AA contrast standards against its respective background surfaces.

### Primary Brand Palette

| Token Name | Hex Code | Purpose / Usage |
|---|---|---|
| `--color-forest-deep` | `#10241F` | Darkest background surface, luxury dark sections, footer, primary text on light backgrounds. |
| `--color-forest` | `#19372F` | Primary brand background, luxury header navigation bar, accent containers. |
| `--color-botanical` | `#607B69` | Muted sage green, subtle badges, hover states, secondary highlights. |
| `--color-mist` | `#E6EBE7` | Light mist background tint, subtle card fills, secondary section dividers. |
| `--color-ivory` | `#F5F1E8` | Warm off-white surface color, primary text surface, luxury card background. |
| `--color-stone` | `#B8B0A2` | Muted natural stone border color, subtle body text, passive badges. |
| `--color-champagne` | `#B59A63` | Antique gold accent color, primary buttons, star ratings, luxury highlights. |
| `--color-charcoal` | `#252A28` | High-contrast body text for light surfaces. |
| `--color-white` | `#FFFFFF` | Crisp white for overlays, contrast text, and card surfaces. |

```css
/* CSS Token Mapping */
:root {
  --color-forest-deep: #10241F;
  --color-forest: #19372F;
  --color-botanical: #607B69;
  --color-mist: #E6EBE7;
  --color-ivory: #F5F1E8;
  --color-stone: #B8B0A2;
  --color-champagne: #B59A63;
  --color-charcoal: #252A28;
  --color-white: #FFFFFF;
}
```

---

## Typography Hierarchy

The design pairs a distinguished editorial serif for headings with a clean, legible sans-serif for UI elements, labels, and body text.

### Font Families
- **Display / Editorial Heading**: `Playfair Display`, `Cormorant Garamond`, or serif fallback (`serif`).
- **Body & Interface**: `Plus Jakarta Sans`, `Inter`, or system sans-serif (`sans-serif`).

### Type Scale

| Level | Size (Mobile) | Size (Desktop) | Line Height | Weight | Usage |
|---|---|---|---|---|---|
| **Display Hero** | 2.5rem (40px) | 4.5rem (72px) | 1.1 | 500 / Medium | Homepage Hero, Key Landings |
| **H1 Title** | 2.0rem (32px) | 3.25rem (52px) | 1.2 | 500 / Medium | Section Headings, Page Titles |
| **H2 Subtitle** | 1.5rem (24px) | 2.25rem (36px) | 1.25 | 400 / Normal | Sub-sections, Card Titles |
| **H3 Feature** | 1.25rem (20px) | 1.5rem (24px) | 1.3 | 500 / Medium | Room Names, Spa Treatments |
| **Body Lead** | 1.0rem (16px) | 1.125rem (18px) | 1.6 | 400 / Normal | Intro Paragraphs, Story Copy |
| **Body Regular** | 0.875rem (14px) | 1.0rem (16px) | 1.6 | 400 / Normal | General Body Text, Descriptions |
| **Caption / Label** | 0.75rem (12px) | 0.875rem (14px) | 1.4 | 500 / Medium | Eyebrow badges, Dates, Tags |

---

## Spacing & Responsive Grid

The layout system enforces a generous white-space policy to reflect peace and calm.

- **Mobile Grid**: 4 Columns | 16px Gutters | 16px Margin
- **Tablet Grid**: 8 Columns | 24px Gutters | 32px Margin
- **Desktop Grid**: 12 Columns | 32px Gutters | Auto Margin (Max-width: `1440px`, Inner Content: `1280px`)

### Section Vertical Spacing
- Small Section: `py-12 md:py-16`
- Medium Section: `py-16 md:py-24`
- Large Section / Hero: `py-24 md:py-32`

---

## Interactive Component States

### Primary Button (`.btn-champagne`)
- **Default**: Background `#B59A63`, Text `#FFFFFF`, Border None, Rounded-full or rounded-sm.
- **Hover**: Background `#A0854E`, Scale `1.02`, Transition 200ms ease.
- **Focus**: Outline 2px solid `#B59A63`, Offset 2px.
- **Active**: Background `#8C723F`, Scale `0.98`.
- **Disabled**: Background `#D4C7AA`, Text `#FFFFFF`, Cursor Not-Allowed, Opacity `0.6`.
- **Loading**: Text invisible, centered gold spinner animation.

### Secondary Button (`.btn-outline-ivory`)
- **Default**: Background Transparent, Text `#F5F1E8`, Border 1px solid `#B59A63`.
- **Hover**: Background `#B59A63`, Text `#10241F`.
- **Focus**: Outline 2px solid `#F5F1E8`.

---

## Imagery & Media Guidelines

1. **Cinematic Aspect Ratios**:
   - Hero Media: `16:9` or `21:9` wide crop.
   - Room / Feature Cards: `4:3` or `3:2`.
   - Editorial Story Blocks: `4:5` vertical portrait.
2. **Color Integrity**: Avoid heavy artificial color filters or high-saturation pop filters. Maintain natural greens, stone textures, and soft warm daylight tones.
3. **Hover Micro-Interactions**: Subtle zoom effect (`scale-105`) over 500ms smooth transition inside an `overflow-hidden` container.

---

## Motion & Micro-Animation Guidelines

- **Duration**: 200ms for small UI elements (buttons, inputs), 400ms-600ms for section entrances and drawers.
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (Out-Expo curve for natural luxury deceleration).
- **Reduced Motion**: If user prefers reduced motion (`prefers-reduced-motion: reduce`), fade animations substitute for slide/parallax movements.
