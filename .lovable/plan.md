# Buono Caffè — Landing Page Build Plan

Build the frontend-only landing page based on the "Crema & Carbon" direction. Dark espresso palette with golden crema accent, Playfair Display + Inter + JetBrains Mono typography.

## Design tokens (src/styles.css)
Replace the placeholder OKLCH tokens with the chosen palette:
- `--background` deepest espresso `hsl(30 15% 4%)`
- `--foreground` cream `hsl(40 25% 94%)`
- `--primary` golden crema `hsl(38 52% 64%)`
- `--accent` roasted bean `hsl(20 40% 15%)`
- `--muted-foreground` `hsl(40 10% 60%)`
- `--border` `hsl(40 25% 94% / 0.12)`
- Keep existing shadcn token wiring via `@theme inline`.
- Add `--font-display`, `--font-body`, `--font-mono` tokens.
- Add `@keyframes hero-reveal` and `crema-settle` plus matching utility classes.

## Fonts
Load via `<link rel="stylesheet">` in `src/routes/__root.tsx` head (Google Fonts: Playfair Display 700 italic, Inter 400/500, JetBrains Mono 400). No `@import` in CSS (Lightning CSS can't fetch remote).

## Images
Generate 5 placeholders with `imagegen` saved to `src/assets/`:
1. `hero-espresso.jpg` — overhead steaming espresso in dark minimalist cafe (1920×1080)
2. `about-roaster.jpg` — beans in copper roasting drum (800×1000)
3. `product-latte.jpg` — iced latte fluted glass on marble (600×800)
4. `product-espresso.jpg` — espresso shot in matte black cup (600×800)
5. `product-pourover.jpg` — pour-over with gooseneck kettle (600×800)

## Components (src/components/buono/)
Split for independent editing:
- `Navbar.tsx` — fixed top nav; logo, 4 links, Sign In + Join Us buttons that open modals via state lifted in `Index`.
- `Hero.tsx` — full-screen background image, tagline, two CTAs (Our Menu, Franchise Opportunities).
- `About.tsx` — two-column heritage section with stats.
- `Products.tsx` — 3 product cards with hover scale.
- `Franchise.tsx` — centered CTA section with decorative background word.
- `Footer.tsx` — logo, two link columns, social icons (lucide-react Instagram/Twitter/Facebook), copyright.
- `SignInModal.tsx` — shadcn `Dialog` with Employee/Admin tabs (`Tabs` component); each tab has email+password+button.
- `JoinUsModal.tsx` — shadcn `Dialog` with name, email, password, account-type `Select` (Customer / Franchisee), review-note text, submit button.

## Page assembly
`src/routes/index.tsx`:
- Update head meta: title "Buono Caffè — The Ritual of the Perfect Pour", description, og tags.
- Component `<Index>` holds `signInOpen` and `joinOpen` state, renders Navbar + sections + Footer + both modals.

## Responsiveness
Mobile-first per existing guidelines: nav collapses links on `md:`, hero text scales from `text-5xl` to `text-8xl`, sections stack to single column under `md`, footer columns to 1.

## Out of scope (frontend-only)
No backend, no real auth, modal submit buttons are non-functional. Lovable Cloud not enabled.
