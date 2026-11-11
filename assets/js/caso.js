/* ═══════════════════════════════════════════
   Páginas de caso: aparición suave de bloques al hacer scroll
   ═══════════════════════════════════════════ */

(function initReveal() {
  const items = document.querySelectorAll('.bw-reveal, .ed-reveal');
  if (!items.length || !('IntersectionObserver' in window)) return;

  // Sin esta clase (sin JS) los bloques se ven desde el principio.
  document.documentElement.classList.add('js');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

  items.forEach((el) => observer.observe(el));
})();

/* Carné de vecino lector (caso La Esquina): pulsar un círculo pone un sello de cera */
(function initCarnet() {
  const carnet = document.querySelector('[data-carnet]');
  if (!carnet) return;

  const stamps = carnet.querySelectorAll('.ed-stamp');
  const status = carnet.querySelector('[data-carnet-status]');
  const total = stamps.length;

  const update = () => {
    const folded = carnet.querySelectorAll('.ed-stamp.is-stamped').length;
    const complete = folded === total;
    carnet.classList.toggle('is-complete', complete);
    if (status) {
      status.textContent = complete
        ? '¡Diez sellos! El próximo libro lo elige el librero.'
        : `Llevas ${folded} de ${total} sellos`;
    }
  };

  stamps.forEach((stamp) => {
    stamp.addEventListener('click', () => {
      const stamped = stamp.classList.toggle('is-stamped');
      stamp.setAttribute('aria-pressed', String(stamped));
      update();
    });
  });

  update();
})();
