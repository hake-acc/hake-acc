# Pixel Portfolio — Alex Chen

A breathtaking, cinematic personal portfolio website for a software engineer and creative developer. The experience immerses visitors in a living pixel-art world using a looping full-screen background video, with a lightweight, elegant UI floating above.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion v11
- **Typography**: Pixelify Sans (Google Fonts)
- **Language**: TypeScript

## Architecture

- `src/app/` — Next.js App Router pages and layout
- `src/components/` — All UI components (Hero, Navigation, About, Projects, Skills, Experience, Services, Testimonials, ContactForm, Footer)
- `src/data/content.json` — All site content (projects, skills, experience, testimonials, contact)
- `src/lib/utils.ts` — Utility functions
- `public/assets/pixelart-bg.mp4` — Looping pixel-art background video

## Design System

- **Primary**: #6AA9FF (Sky Blue)
- **Secondary**: #8B7CF6 (Twilight Purple)
- **Accent**: #F4B860 (Warm Lantern Gold)
- **Background**: #0D0F14 (Deep Midnight)
- **Surface**: #1A1F2B (Dark Slate)
- **Font**: Pixelify Sans

## Running

```bash
npm run dev   # starts on port 5000
npm run build # production build
```

## User Preferences

- All content is driven by `src/data/content.json` — update that file to personalize
- Video background lives at `public/assets/pixelart-bg.mp4`
- Port: 5000 (Replit webview)
