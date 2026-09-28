// Replaces the interactivity the original React bundle provided.

// FAQ accordion: fill answers from faq_data.js, toggle open/closed.
document.querySelectorAll('button[data-radix-collection-item]').forEach((btn, i) => {
  const panel = document.getElementById(btn.getAttribute('aria-controls')) || btn.closest('h3').nextElementSibling;
  const item = btn.closest('h3').parentElement;
  const entry = (window.FAQ || []).find(([q]) => q === btn.textContent.trim()) || (window.FAQ || [])[i];
  if (panel && entry) {
    panel.innerHTML = '<div class="pb-4 pt-0 text-muted-foreground text-base md:text-lg">' + entry[1] + '</div>';
  }
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', open);
    [item, btn, btn.closest('h3'), panel].forEach((el) => el && el.setAttribute('data-state', open ? 'open' : 'closed'));
    if (panel) panel.hidden = !open;
  });
});

// Scroll-driven word highlight ("Your mind's tired, ...").
const words = [...document.querySelectorAll('span.transition-colors.duration-200')];
if (words.length) {
  const block = words[0].parentElement;
  const update = () => {
    const r = block.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.4)));
    const lit = Math.round(progress * words.length);
    words.forEach((w, i) => {
      w.classList.toggle('text-foreground', i < lit);
      w.classList.toggle('text-foreground/15', i >= lit);
    });
  };
  addEventListener('scroll', update, { passive: true });
  update();
}
