/* A ras de mar: las tarjetas aparecen suavemente al bajar */
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const sel = '.aq-idea, .aq-step, .aq-progress, .aq-iter, .aq-map, .aq-note, .aq-mupi-stage, .aq-video, .aq-frame, .aq-poster, .aq-brief div, .aq-closing__logo, .aq-closing__quote, .aq-closing__note';
  const items = document.querySelectorAll(sel);
  if (!items.length) return;
  document.documentElement.classList.add('aq-anim');
  items.forEach((el) => {
    el.classList.add('aq-rv');
    const hermanos = [...el.parentElement.children].filter((c) => c.matches(sel));
    const i = hermanos.indexOf(el);
    if (i > 0) el.style.setProperty('--d', Math.min(i, 4) * 0.12 + 's');
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  items.forEach((el) => io.observe(el));
})();
