# Pixel Portfolio — Hake Acc

A high-performance, cinematic personal portfolio website for **Hake Acc** — **Social Media Manager, Discord Server Developer & Creator Agency Founder**. Powered by Astro and React Islands for near-instant load speeds while keeping all pixel-art visual effects, looping background video, and Framer Motion animations.

## Stack

- **Framework**: Astro 5 (Static Site Generation with React Islands)
- **UI & Islands**: React 18 & Framer Motion v11
- **Styling**: Tailwind CSS v3
- **Typography**: Pixelify Sans (Google Fonts)
- **Language**: TypeScript

## Architecture

- `src/layouts/Layout.astro` — Master Astro layout with full OpenGraph/Twitter social cards, Favicons, JSON-LD Schema, and Google Fonts.
- `src/pages/index.astro` — Main homepage orchestrating interactive React islands (`client:load` / `client:visible`).
- `src/components/` — UI components:
  - `Hero.tsx` — Cinematic video backdrop, pixel celebration animations, and creator badges.
  - `Sidebar.tsx` — Fixed glassmorphic sidebar with Hake Acc avatar logo, online indicator, and section routing.
  - `About.tsx` — Hake Acc profile card with pixel avatar, creator stats, and bio.
  - `Projects.tsx` — Managed YouTubers & Creator channels showcase with direct YouTube links and subscriber metrics.
  - `Skills.tsx` — YouTube Studio, SEO, CTR testing, Discord bot architecture, and creator tool stack.
  - `Experience.tsx` — Agency Founder, Lead YouTube Manager, and Discord Architect timeline.
  - `Services.tsx` — Channel Management, Discord Server Dev, Shorts Scaling, and Creator Monetization.
  - `Testimonials.tsx` — Testimonials from YouTubers and creators.
  - `ContactForm.tsx` — Creator project inquiry form with validation.
  - `Footer.tsx` — Branded footer with Hake Acc logo, links, and socials.
- `src/data/content.json` — Central data source for all text, stats, YouTube channels, and links.
- `public/assets/` — Logo (`hake-logo.png`), background video (`pixelart-bg.mp4` / `pixelart-bg.webm`), and favicons.

## Customization

- To add or edit your managed YouTuber channels, links, subscriber counts, and services: update `src/data/content.json` under `"projects"`.
- To edit social links, email, or bio: update `src/data/content.json`.

## Running & Building

```bash
npm run dev   # starts Astro dev server on port 5000
npm run build # builds static production bundle into dist/
npm run preview # preview production build
```
