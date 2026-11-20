/* Segueix el fil: los bloques aparecen al bajar, las bolsas se llenan y las cifras cuentan */
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const sel = '.pl-head, .pl-line__head, .pl-card, .pl-facts li, .pl-source, .pl-turn, .pl-quote, .pl-poster, .pl-list li, .pl-swatch, .pl-marker, .pl-brief div, .pl-closing__sign, .pl-closing__es, .pl-logos, .pl-hero__text, .pl-hero__info';
  const items = document.querySelectorAll(sel);
  if (!items.length) return;
  document.documentElement.classList.add('pl-anim');
  items.forEach((el) => {
    el.classList.add('pl-rv');
    const hermanos = [...el.parentElement.children].filter((c) => c.matches(sel));
    const i = hermanos.indexOf(el);
    if (i > 0) el.style.setProperty('--d', Math.min(i, 5) * 0.12 + 's');
  });

  /* Cifras que cuentan desde cero: «3 de 5», «90 %», «15 días» */
  const contar = (b) => {
    const original = b.textContent;
    const m = original.match(/^(\d+)/);
    if (!m) return;
    const fin = parseInt(m[1], 10), resto = original.slice(m[1].length), t0 = performance.now(), dur = 1100;
    const paso = (t) => {
      const p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      b.textContent = Math.round(fin * e) + resto;
      if (p < 1) requestAnimationFrame(paso); else b.textContent = original;
    };
    requestAnimationFrame(paso);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      if (e.target.matches('.pl-facts li')) { const b = e.target.querySelector('b'); if (b) setTimeout(() => contar(b), 150); }
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  items.forEach((el) => io.observe(el));
})();
