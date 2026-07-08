# BUROQ / AETRO Lite — Design System

## Brand
- Company: BUROQ (outdoor-tech). Product: AETRO Lite (smart beach umbrella).
- Domain shown in footer: buroq.co
- Positioning: premium beach-tech, Apple/DJI-like product reveal, warm Mediterranean summer lifestyle. NOT a cheap webshop.

## Typography
- Display font: "Fraunces" (serif, warm, premium editorial) for big headlines — gives it a non-generic, boutique-tech feel.
- Body/UI font: "Poppins" for body copy, nav, buttons, labels.
- Big type scale: hero headline 64–96px desktop, tight tracking, generous line-height on body copy.

## Color System
- Deep navy: #0B1B2B (primary dark background / text)
- Off white / sand: #FBF7F1 (light sections, cards)
- Umbrella accent colors (from product line, used as accent chips/gradients):
  - Pink #F4A9BC
  - Green #A9C79A
  - Blue #A7C6E8
  - Purple #C6B3DE
  - Yellow #F3D477
  - Red #E4685B
  - Orange #F0AE7C
  - Turquoise #9FDCCF
- Gradient backgrounds mix navy → deep teal/blue with soft sun-glow warm accent blobs (peach/coral) for premium beach-tech feel.
- Glass cards: translucent white/navy w/ backdrop-blur, subtle border (1px rgba white 12%).

## Layout & Motion
- Asymmetric hero: copy left, floating product visual right (with drifting/parallax float animation + soft shadow beneath).
- Sections separated with gradient-mesh backgrounds, not flat white blocks.
- Scroll-triggered staggered reveals (Motion/framer-motion) — fade+rise, ~80ms stagger.
- Product showcase: large umbrella cutout centered, animated hotspot pins with pulsing dot + glass tooltip labels.
- Color section: 8 vibrant glass cards in responsive grid, each with real umbrella cutout image, hover lift + glow matching that color.
- Rounded corners are soft but not bubbly (16–24px), avoid "cookie cutter" look via asymmetric section shapes / diagonal dividers / blob shapes.

## Components
- Sticky glass navbar (Product / Features / Colors / Waitlist), navy on scroll.
- Primary button: navy pill bg on light sections, sand/white pill on dark sections; secondary = outline/glass.
- Feature cards: glassmorphism, icon in colored circle, on gradient mesh background.
- Waitlist form: glass panel, email input + button, inline success state (no backend email sending — store lead via API + DB).

## Imagery
- Use provided AETRO Lite umbrella renders (public/umbrellas/*): individual color cutouts (transparent bg) for hero, showcase, and color grid; full-lineup.png as an alt reference/social proof strip.

## Tone
Premium, confident, minimal copy density, short punchy lines, futuristic-but-warm.
