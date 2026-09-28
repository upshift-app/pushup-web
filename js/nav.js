// Shared navbar: fills the mobile menu from the desktop links and toggles it.
(function () {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;
  const links = nav.querySelector('.site-nav-links');
  const toggle = nav.querySelector('.site-nav-toggle');
  const menu = nav.querySelector('.site-nav-menu');
  links.querySelectorAll('a').forEach((a) => menu.appendChild(a.cloneNode(true)));
  const setOpen = (open) => { menu.hidden = !open; toggle.setAttribute('aria-expanded', open); };
  toggle.addEventListener('click', () => setOpen(menu.hidden));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('click', (e) => { if (!nav.contains(e.target)) setOpen(false); });
})();
