/* ═══════════════════════════════════════════
   Proyectos: filtros por disciplina
   ═══════════════════════════════════════════ */

(function initFilters() {
  const buttons = document.querySelectorAll('.wk-filter');
  const items = document.querySelectorAll('.wk-item');
  const empty = document.querySelector('.wk-empty');
  if (!buttons.length || !items.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      buttons.forEach((b) => {
        const on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', String(on));
      });

      let shown = 0;
      items.forEach((item) => {
        const tags = (item.dataset.tags || '').split(' ');
        const visible = filter === 'todo' || tags.includes(filter);
        item.hidden = !visible;
        if (visible) shown += 1;
      });

      if (empty) empty.hidden = shown > 0;
    });
  });
})();
