// Drifting, twinkling starfield.
// Matches the app's onboarding starfield: 80 stars,
// each with its own size, brightness, twinkle period and slow upward drift.
(function () {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none';
  // On the home page the content sits in an opaque wrapper, so the field goes inside it.
  const host = document.querySelector('.bg-background') || document.body;
  host.prepend(canvas);

  // Seeded so the field looks the same on every page, like the app.
  let seed = 20260916;
  const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const stars = Array.from({ length: 80 }, () => ({
    x: rand(),
    y: rand(),
    r: 0.6 + rand() * 1.4,
    base: 0.12 + rand() * 0.45,
    period: 2.2 + rand() * 4.5,
    phase: rand(),
    drift: 0.004 + rand() * 0.010,
  }));

  const ctx = canvas.getContext('2d');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w = 0, h = 0, dpr = 1;
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  addEventListener('resize', resize);
  resize();

  function draw(ms) {
    const t = reduced ? 0 : ms / 1000;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#fff';
    for (const s of stars) {
      const y = (((s.y - t * s.drift) % 1) + 1) % 1;
      const tw = 0.5 + 0.5 * Math.sin((t / s.period + s.phase) * Math.PI * 2);
      ctx.globalAlpha = Math.min(1, s.base * (0.35 + 0.9 * tw) * 1.6);
      ctx.beginPath();
      ctx.arc(s.x * w, y * h, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!reduced) requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();
