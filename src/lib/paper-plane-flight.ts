// src/lib/paper-plane-flight.ts
// Interactive Aerodynamic Paper Plane Flight Controller with Auto-Orientation,
// Dynamic Fast-Slow-Freeze-Zoom Pacing, Scale Perspective, and State Pausing

function getTargetTextRect(ornament: HTMLElement) {
  // 1. Landing page: .section-header-wrap inside .contact-header-container
  const headerWrap = ornament.closest('.contact-header-container')?.querySelector('.section-header-wrap')
                  || document.querySelector('.section-header-wrap');
  if (headerWrap) {
    return headerWrap.getBoundingClientRect();
  }

  // 2. Subpage: .subpage-title and .subpage-subtitle
  const title = document.querySelector('.subpage-title');
  const sub = document.querySelector('.subpage-subtitle');
  if (title && sub) {
    const r1 = title.getBoundingClientRect();
    const r2 = sub.getBoundingClientRect();
    return {
      left: Math.min(r1.left, r2.left),
      right: Math.max(r1.right, r2.right),
      top: Math.min(r1.top, r2.top),
      bottom: Math.max(r1.bottom, r2.bottom),
      width: Math.max(r1.right, r2.right) - Math.min(r1.left, r2.left),
      height: Math.max(r1.bottom, r2.bottom) - Math.min(r1.top, r2.top)
    };
  }

  // Fallback
  return ornament.parentElement?.getBoundingClientRect() || ornament.getBoundingClientRect();
}

export function initPaperPlaneFlight() {
  const ornaments = document.querySelectorAll<HTMLElement>('.contact-plane-ornament');
  if (!ornaments.length) return;

  ornaments.forEach((ornament) => {
    // Avoid double-binding
    if (ornament.dataset.flightBound === 'true') return;
    ornament.dataset.flightBound = 'true';

    const glider = ornament.querySelector<HTMLElement>('.plane-vector-glider');
    if (!glider) return;

    ornament.addEventListener('click', () => {
      // Guard: strictly 1 flight at a time, prevent re-triggering mid-flight
      if (ornament.dataset.flying === 'true') return;
      ornament.dataset.flying = 'true';

      // Clear any prior paused state on takeoff so it flies freshly
      ornament.classList.remove('is-paused');

      const oRect = ornament.getBoundingClientRect();
      const tRect = getTargetTextRect(ornament);

      const homeX = 83;
      const homeY = -3;

      // Safe outer perimeter coordinates around the text block:
      // Clearances account for plane width and center of gravity rotation
      const flyLeft = (tRect.left - oRect.left) - 180;
      const flyRight = (tRect.right - oRect.left) + 20;
      const flyTop = (tRect.top - oRect.top) - 100;
      const flyBottom = (tRect.bottom - oRect.top) + 65;
      const midX = (flyLeft + homeX) * 0.48;

      // Dynamic Cinematic Waypoints:
      // Pacing breakdown:
      // 1. FAST SPRINT (0% -> 14%): explosive takeoff vaulting into the climb
      // 2. SLOW FREEZE / HANG TIME (20% -> 42%): hovering leisurely across the top text in float state
      // 3. CATCHING PATH SPEED & ZOOMING (48% -> 76%): high-velocity banking swoop curving past left & underneath
      // 4. DECELERATION FLARING (84% -> 96%): scooping up and braking smoothly
      // 5. TOUCHDOWN (100%): perfect touchdown at original coordinates, changing state to PAUSED
      const keyframes = [
        // 0%: Resting launch point
        { transform: `translate(${homeX}px, ${homeY}px) rotate(0deg) scale(1)`, offset: 0.00 },
        // 6%: Explosive takeoff sprint - nose pitches up, rapid acceleration
        { transform: `translate(${homeX - 45}px, ${homeY - 45}px) rotate(-28deg) scale(1.08)`, offset: 0.06 },
        // 14%: Climbing rapidly into high altitude above the text
        { transform: `translate(${flyRight * 0.20}px, ${flyTop - 10}px) rotate(-65deg) scale(1.18)`, offset: 0.14 },
        // 22%: Leveling out into top cruise, momentum begins to slow
        { transform: `translate(${midX + 110}px, ${flyTop - 25}px) rotate(-92deg) scale(1.25)`, offset: 0.22 },
        // 34%: "ALMOST LIKE A FREEZE" - Floating in slow-motion hang time across top of heading
        { transform: `translate(${midX}px, ${flyTop - 28}px) rotate(-98deg) scale(1.26)`, offset: 0.34 },
        // 44%: Hang time ends, nose dips and banks into leftward curve
        { transform: `translate(${flyLeft + 90}px, ${flyTop - 10}px) rotate(-130deg) scale(1.24)`, offset: 0.44 },
        // 52%: "CATCHING PATH SPEED & ZOOMING" - High-velocity swoop around left perimeter
        { transform: `translate(${flyLeft + 15}px, ${(flyTop + flyBottom) * 0.38}px) rotate(-170deg) scale(1.18)`, offset: 0.52 },
        // 60%: Peak zoom velocity carving past the heading & eyebrow
        { transform: `translate(${flyLeft}px, ${(flyTop + flyBottom) * 0.65}px) rotate(-205deg) scale(1.14)`, offset: 0.60 },
        // 68%: Fast swoop beneath the left side of the paragraph
        { transform: `translate(${flyLeft + 80}px, ${flyBottom + 12}px) rotate(-245deg) scale(1.18)`, offset: 0.68 },
        // 77%: Blazing horizontal under-glide cleanly beneath the paragraph
        { transform: `translate(${midX + 60}px, ${flyBottom + 18}px) rotate(-275deg) scale(1.22)`, offset: 0.77 },
        // 85%: Swooping up past bottom-right of text block
        { transform: `translate(${flyRight * 0.18}px, ${flyBottom - 18}px) rotate(-315deg) scale(1.16)`, offset: 0.85 },
        // 92%: Decelerating return arc toward starting trail
        { transform: `translate(${homeX - 35}px, ${homeY + 28}px) rotate(-346deg) scale(1.08)`, offset: 0.92 },
        // 97%: Flare air-brake before touchdown
        { transform: `translate(${homeX - 6}px, ${homeY + 6}px) rotate(-362deg) scale(1.02)`, offset: 0.97 },
        // 100%: Touchdown at original place
        { transform: `translate(${homeX}px, ${homeY}px) rotate(-360deg) scale(1)`, offset: 1.00 }
      ];

      // Enter active flying state
      ornament.classList.add('is-flying');
      glider.style.transformOrigin = '36px 35px';

      const animation = glider.animate(keyframes, {
        duration: 3200,
        easing: 'linear', // Keyframe offsets manage the dynamic Fast -> Slow Freeze -> Zoom velocity pacing
        fill: 'forwards'
      });

      animation.onfinish = () => {
        // Return cleanly to resting state
        glider.style.transform = `translate(${homeX}px, ${homeY}px) rotate(0deg) scale(1)`;
        glider.style.transformOrigin = '';
        ornament.classList.remove('is-flying');
        ornament.dataset.flying = 'false';

        // State is changed to pause only when the plane is back at original place
        ornament.classList.add('is-paused');
      };
    });
  });
}
