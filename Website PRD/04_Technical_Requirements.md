# Technical Requirements

**Technology Stack**  
- Frontend: Next.js 14 (App Router)  
- Dark‑Mode Management: `next-themes`  
- Animation: `framer-motion`  
- SEO Enhancements: `next-sitemap`, built‑in `next/font` for Pixelify Sans  
- Data Storage: Static JSON files in `/data` loaded at build time (no backend)  

**Recommended Libraries**  
- `next-themes` – persistent dark‑mode support.  
- `framer-motion` – declarative animation for pixel‑art elements and UI components.  
- `next-sitemap` – automatic sitemap generation for SEO.  
- `@radix-ui/react-icons` – optional icon set for skills and services.  

**Folder / Architecture Overview**  

```
/app
  /layout
    RootLayout.tsx          // global providers, ThemeProvider
  /page
    index.tsx               // Hero
    about.tsx
    projects/
      [slug].tsx            // Project detail
    skills.tsx
    experience.tsx
    services.tsx
    testimonials.tsx
    contact.tsx
    footer.tsx
  /components
    Hero.tsx
    Navigation.tsx
    ProjectCard.tsx
    SkillSet.tsx
    Timeline.tsx
    ContactForm.tsx
    Footer.tsx
  /data
    content.json            // aggregated content (projects, experience, skills, etc.)
public/
  /assets
    pixelart-bg.mp4         // looping background video or sprite sheet
    fonts/
      PixelifySans/*.woff2  // self‑hosted Pixelify Sans files
```

**Data Flow**  
- Content is defined in `/data/content.json`.  
- At build time, Next.js `getStaticProps` (or `fetch` in Server Components) reads the JSON and passes it as props to components.  
- No API routes are required; all data is rendered statically.  
- For the contact form, a lightweight serverless function (`/api/contact`) can forward submissions to an external service (e.g., Formspree) or use `emailjs`.  

**Key API Endpoints**  
- `GET /api/contact` – receives POST from contact form, returns success/failure JSON.  
- No other backend endpoints; all UI state managed client‑side.  

**Data Schema (content.json)**  

```json
{
  "hero": {
    "title": "Your Name",
    "tagline": "Creative Developer & Designer",
    "ctaLabel": "Explore My Work"
  },
  "projects": [
    {
      "id": "1",
      "title": "Project One",
      "description": "Brief description.",
      "media": ["/images/project1-1.png", "/images/project1-2.png"],
      "tech": ["React", "Next.js"],
      "demoUrl": "https://example.com/project1"
    }
    // ...additional projects
  ],
  "skills": [
    {"name": "React", "icon": "/icons/react.svg"},
    {"name": "Next.js", "icon": "/icons/next.svg"},
    {"name": "Pixel Art", "icon": "/icons/pixel.svg"}
  ],
  "experience": [
    {
      "position": "Senior Developer",
      "company": "Company X",
      "date": "2021–Present",
      "details": ["Led a team of 5", "Delivered 10+ features"]
    }
  ],
  "services": [
    {"title": "Web Development", "description": "Full‑stack solutions."},
    {"title": "Design Systems", "description": "Scalable component libraries."}
  ],
  "testimonials": [
    {
      "quote": "Excellent collaboration on the redesign.",
      "author": "Jane Doe, Client"
    }
  ],
  "contact": {
    "email": "you@example.com"
  }
}
```

**Performance & Build Considerations**  
- Optimize the pixel‑art background using compressed WebM/MP4 with `next/optimize/image` fallback.  
- Enable `next-font` to preload Pixelify Sans with `font-display: swap`.  
- Use `next-image` for all static assets to serve appropriately sized images.  
- Generate a static sitemap with `next-sitemap` for search engine indexing.  

**Accessibility Implementation**  
- Apply `aria-label` and `role` attributes to navigation and interactive components.  
- Ensure focus outlines are visible using the **Accent** token.  
- Test with Lighthouse Accessibility audit; target WCAG AA compliance.  

**Deployment**  
- Deploy to Vercel (or any static host) – no serverless backend required beyond optional contact function.  
- Enable automatic HTTPS, CDN caching, and incremental static regeneration for content updates.  
===FILE:04_Technical_Requirements===