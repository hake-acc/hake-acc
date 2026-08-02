---
name: Pixel Portfolio Setup
description: Next.js 14 App Router pixel-art portfolio — hydration fixes, font loading, animation approach.
---

# Pixel Portfolio — Durable Notes

## Font Loading
Use `next/font/google` (`Pixelify_Sans`) — never add `<link>` tags manually to `<head>` in App Router layouts. Manual `<link>` tags in the App Router `<head>` cause hydration mismatches ("Expected server HTML to contain a matching <link> in <head>").

**Why:** Next.js App Router manages `<head>` specially; injecting raw link/script tags bypasses its reconciliation and triggers client/server HTML mismatches on hydration.

**How to apply:** Always use `next/font/google` or `next/font/local`. Apply the font as a CSS variable (`variable: "--font-pixelify"`) and reference it in `tailwind.config.ts` as `var(--font-pixelify)`.

## Framer Motion Initial-Load Animations
Do NOT use `initial={{ opacity: 0 }}` on "above-the-fold" hero/nav elements. The SSR renders them with opacity 0 and the screenshot/first-paint shows a blank page.

**Why:** Framer Motion's `initial` prop sets the SSR-rendered inline style. Before JS hydrates, those elements are invisible.

**How to apply:** Use CSS `@keyframes` entrance animations (`.anim-enter`, `.anim-enter-d1` etc. in `globals.css`) for hero and nav content. Keep Framer Motion for hover states, scroll-triggered reveals (useInView), and interactive micro-animations only. Delays should be ≤ 0.55s total for all above-the-fold elements.

## Hydration Suppressions
- `<html>` and `<body>` both need `suppressHydrationWarning` when using class-based theming.
- JSON-LD `<script>` tags with `dangerouslySetInnerHTML` do NOT need `suppressHydrationWarning` when placed correctly in the App Router layout (they hydrate fine).

## `new Date()` in Client Components
Never call `new Date()` directly in render for copyright year — causes SSR/client mismatch. Hardcode the year or use `suppressHydrationWarning` on the element.

## Video Background
The `<video>` element with `autoPlay loop muted playsInline` works correctly in the browser but will not appear in screenshot tools (they capture a static frame before the video loads). The dark overlay gradients on the video container ensure legible text even before the video loads.

## Port
Always run on port 5000 (`next dev -p 5000`) for Replit webview.
