// src/lib/page-transitions.ts
// Intelligent Codrops-style CSS View Transitions Controller for Hake Portfolio
// Physical horizontal swipe & zoom choreography based on link position & context

const PAGE_ORDER: Record<string, number> = {
  '/': 0,
  '/services': 1,
  '/experience': 2,
  '/about': 3,
  '/contact': 4,
};

function cleanPath(raw: string): string {
  if (!raw) return '/';
  try {
    const url = new URL(raw, window.location.origin);
    const p = url.pathname.replace(/\/$/, '');
    return p === '' ? '/' : p;
  } catch {
    const p = raw.split('?')[0].split('#')[0].replace(/\/$/, '');
    return p === '' ? '/' : p;
  }
}

export function determineTransition(
  link: HTMLAnchorElement,
  fromRaw: string,
  toRaw: string
): string {
  // 1. Explicit data-transition attribute takes highest priority
  const explicit = link.getAttribute('data-transition');
  if (explicit) return explicit;

  const from = cleanPath(fromRaw);
  const to = cleanPath(toRaw);

  if (from === to) return 'slide-left';

  // 2. Check if link is an in-page button, card, or content CTA
  // This satisfies: "if its a button inside then zoom in and etcetc"
  const isTopNav = Boolean(
    link.closest('#siteHeader, .hake-navbar, .nav-links, .drawer-nav-list, .mobile-quickbar')
  );

  const isButtonOrCard = Boolean(
    link.closest(
      '.btn-primary-action, .btn-secondary-action, .hero-button-group, .footer-cta-actions, ' +
      '.service-card-item, .service-inquire-link, .experience-card, .service-cta-btn, ' +
      '.btn-submit-inquiry, .card-action-btn, .footer-cta-btn, .footer-cta-sec-btn, ' +
      '.drawer-inquire-btn, .drawer-cta-wrapper'
    ) ||
    link.classList.contains('btn-primary-action') ||
    link.classList.contains('btn-secondary-action') ||
    link.classList.contains('service-inquire-link') ||
    link.classList.contains('service-cta-btn') ||
    link.classList.contains('footer-cta-btn') ||
    link.classList.contains('footer-cta-sec-btn')
  );

  // If clicked element is an in-page button/card (and not the top navbar)
  if (isButtonOrCard && !link.classList.contains('brand-logo') && !isTopNav) {
    if (
      link.classList.contains('back-link') ||
      link.getAttribute('aria-label')?.toLowerCase().includes('back')
    ) {
      return 'zoom-out';
    }
    return 'zoom-in';
  }

  // 3. Top header / nav link position logic
  return determineTransitionFromPaths(from, to);
}

export function determineTransitionFromPaths(from: string, to: string): string {
  // Homepage to subpage: swipe from right
  if (from === '/' && to !== '/') {
    return 'slide-left'; // ptMoveToLeft / ptMoveFromRight
  }

  // Subpage to homepage: swipe from left
  if (from !== '/' && to === '/') {
    return 'slide-right'; // ptMoveToRight / ptMoveFromLeft
  }

  // Subpage to subpage rank comparison
  const fromRank = PAGE_ORDER[from] ?? 1;
  const toRank = PAGE_ORDER[to] ?? 1;

  if (toRank > fromRank) {
    // Forward in navigation: swipe from right
    return 'slide-left';
  } else if (toRank < fromRank) {
    // Backward in navigation: swipe from left
    return 'slide-right';
  }

  return 'slide-left';
}

export function initPageTransitions(): void {
  if (typeof window === 'undefined') return;

  // Pre-prime transition attribute on click so Astro snapshots with the exact transition primed
  document.addEventListener('click', (e: MouseEvent) => {
    const target = (e.target as HTMLElement)?.closest('a');
    if (!target) return;

    const href = target.getAttribute('href');
    if (
      !href ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      target.target === '_blank'
    ) {
      return;
    }

    const fromPath = window.location.pathname;
    const transitionType = determineTransition(target, fromPath, href);

    document.documentElement.setAttribute('data-transition', transitionType);
    document.documentElement.setAttribute('data-astro-transition', transitionType);
  });

  // Handle Astro before-preparation
  document.addEventListener('astro:before-preparation', (event: any) => {
    const fromPath = event.from ? event.from.pathname : window.location.pathname;
    const toPath = event.to ? event.to.pathname : '';

    // Handle browser back button handoff
    if (event.direction === 'back') {
      document.documentElement.setAttribute('data-transition', 'slide-right');
      document.documentElement.setAttribute('data-astro-transition', 'slide-right');
      event.direction = 'slide-right';
      return;
    }

    let current = document.documentElement.getAttribute('data-transition');
    if (!current) {
      current = determineTransitionFromPaths(cleanPath(fromPath), cleanPath(toPath));
      document.documentElement.setAttribute('data-transition', current);
      document.documentElement.setAttribute('data-astro-transition', current);
    }
    event.direction = current;
  });

  // Synchronize incoming document before DOM swap to prevent flash
  document.addEventListener('astro:before-swap', (event: any) => {
    const current =
      document.documentElement.getAttribute('data-transition') || 'slide-left';

    if (event.newDocument) {
      event.newDocument.documentElement.setAttribute('data-transition', current);
      event.newDocument.documentElement.setAttribute('data-astro-transition', current);

      // Preserve active theme class across document swap
      const isDark = document.documentElement.classList.contains('dark-theme');
      if (isDark) {
        event.newDocument.documentElement.classList.add('dark-theme');
        if (event.newDocument.body) {
          event.newDocument.body.classList.remove('hake-theme-light');
          event.newDocument.body.classList.add('hake-theme-dark');
        }
      } else {
        event.newDocument.documentElement.classList.remove('dark-theme');
        if (event.newDocument.body) {
          event.newDocument.body.classList.remove('hake-theme-dark');
          event.newDocument.body.classList.add('hake-theme-light');
        }
      }
    }
  });

  // Post-swap state synchronization and interactive element binding
  document.addEventListener('astro:page-load', () => {
    const path = cleanPath(window.location.pathname);

    // Sync active nav item classes
    document
      .querySelectorAll('.nav-links .nav-item, .drawer-nav-list .drawer-nav-item, .mobile-quickbar .quickbar-action-item')
      .forEach((item) => {
        const href = item.getAttribute('href');
        if (!href) return;
        const targetClean = cleanPath(href);
        const isActive =
          targetClean === path || (targetClean !== '/' && path.startsWith(targetClean));
        item.classList.toggle('active', isActive);
      });

    // Sync theme toggle icons state
    const isDark = document.documentElement.classList.contains('dark-theme');
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      toggleBtn.setAttribute('title', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
    }

    // Replay SVG underline animation on home if present
    const togetherAccent = document.getElementById('heroTogetherAccent');
    if (togetherAccent) {
      const isCached = sessionStorage.getItem('hake_underline_cached');
      if (isCached === 'true') {
        togetherAccent.classList.add('underline-cached');
      } else {
        togetherAccent.classList.add('animating-underline');
        try {
          sessionStorage.setItem('hake_underline_cached', 'true');
        } catch (e) {}
      }
    }
  });

  // Delegated Theme Toggle Handler (persistently active on document)
  document.addEventListener('click', (e: MouseEvent) => {
    const toggle = (e.target as HTMLElement)?.closest('#themeToggle');
    if (!toggle) return;

    const isCurrentlyDark = document.documentElement.classList.contains('dark-theme');
    const newTheme = isCurrentlyDark ? 'light' : 'dark';

    document.documentElement.classList.toggle('dark-theme', newTheme === 'dark');
    if (document.body) {
      document.body.className = newTheme === 'dark' ? 'hake-theme-dark' : 'hake-theme-light';
    }

    toggle.setAttribute('aria-label', newTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    toggle.setAttribute('title', newTheme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme');

    try {
      localStorage.setItem('hake-theme', newTheme);
    } catch (err) {}
  });

  // Delegated Mobile Drawer Handlers
  document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    // Open Drawer
    if (target.closest('#mobileMenuToggle, #quickbarMenuBtn')) {
      const drawer = document.getElementById('mobileDrawer');
      const overlay = document.getElementById('drawerOverlay') || document.getElementById('mobileDrawerOverlay');
      const menuBtn = document.getElementById('mobileMenuToggle');
      if (drawer && overlay) {
        drawer.classList.add('open');
        drawer.removeAttribute('inert');
        drawer.setAttribute('aria-hidden', 'false');
        overlay.classList.add('open', 'active');
        overlay.setAttribute('aria-hidden', 'false');
        menuBtn?.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
      return;
    }

    // Close Drawer
    if (
      target.closest('#drawerCloseBtn, #mobileDrawerClose, #drawerOverlay, #mobileDrawerOverlay, .drawer-nav-item, #drawerCtaBtn')
    ) {
      const drawer = document.getElementById('mobileDrawer');
      const overlay = document.getElementById('drawerOverlay') || document.getElementById('mobileDrawerOverlay');
      const menuBtn = document.getElementById('mobileMenuToggle');
      if (drawer && overlay) {
        drawer.classList.remove('open');
        drawer.setAttribute('inert', '');
        drawer.setAttribute('aria-hidden', 'true');
        overlay.classList.remove('open', 'active');
        overlay.setAttribute('aria-hidden', 'true');
        menuBtn?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }
  });

  // Escape key closes drawer
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      const drawer = document.getElementById('mobileDrawer');
      const overlay = document.getElementById('drawerOverlay') || document.getElementById('mobileDrawerOverlay');
      const menuBtn = document.getElementById('mobileMenuToggle');
      if (drawer && overlay) {
        drawer.classList.remove('open');
        drawer.setAttribute('inert', '');
        overlay.classList.remove('open', 'active');
        menuBtn?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }
  });
}
