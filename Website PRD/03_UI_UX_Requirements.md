# UI/UX Requirements

## Color Palette

The website uses a cinematic nighttime palette inspired by pixel-art landscapes at dusk. Colors should feel atmospheric, immersive, and premium while maintaining excellent readability.

- Primary: #6AA9FF (Sky Blue)
- Secondary: #8B7CF6 (Twilight Purple)
- Accent: #F4B860 (Warm Lantern Gold)
- Background: #0D0F14 (Deep Midnight)
- Surface: #1A1F2B (Dark Slate)
- Text: #F5F7FA (Soft White)
- Muted Text: #A7B0C0
- Border: rgba(255,255,255,0.08)
- Success: #4ADE80
- Warning: #FBBF24
- Error: #F87171

The UI should rely on subtle gradients, soft shadows, and restrained contrast. Avoid neon colors, pure black (#000000), pure white (#FFFFFF), or highly saturated accents. The warm gold accent should be reserved for primary CTAs, highlights, and interactive elements to emulate the glow of lanterns within the pixel-art environment.
| Font Family| Pixelify Sans |

**Design Direction**  
- Interface components (buttons, cards, inputs) use the **Primary** color for primary actions, **Accent** for highlights, **Secondary** for subdued UI elements, and **Surface** for background layers.  
- **Text** uses the **Text** token for high readability on dark surfaces.  
- The **Background** token sets the overall page backdrop; **Surface** is used for secondary panels and modals.  
- All interactive elements respect a 1.5 px focus ring using **Accent** to ensure keyboard visibility.  

**Core Screens**  
- Hero (full‑screen animated background)  
- Navigation Bar  
- About Section  
- Projects Grid & Detail Pages  
- Skills Overview  
- Experience Timeline  
- Services Section  
- Testimonials Slider  
- Contact Form  
- Footer  

**Responsive Breakpoints**  
- **Mobile**: ≤ 640 px – stacked layout, simplified navigation, larger tap targets.  
- **Tablet**: 641‑1024 px – two‑column grid for projects, adjusted font sizes.  
- **Desktop**: > 1024 px – multi‑column layouts, richer animations, expanded content.  

**Accessibility Expectations**  
- Contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text against **Surface** and **Background**.  
- All interactive components reachable via keyboard; visible focus state using **Accent**.  
- Images and animations include descriptive `alt` text or aria‑descriptions.  
- Content is structured with semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).  
- Language declared (`<html lang="en">`) and reading direction set to left‑to‑right.  

**Micro‑Interaction Guidance**  
- Use `framer-motion` for smooth entrance/exit animations.  
- Hover states should transition using the **Primary** and **Accent** colors with a 0.2 s ease‑out curve.  
- Scroll‑triggered reveals should respect reduced‑motion preferences.