/* ═══════════════════════════════════════════
   Judith Pérez — Portfolio: modal de proyecto
   ═══════════════════════════════════════════ */

(function initPortfolioModal() {
  // Proyectos que se abren en ventana. Los que tienen página propia
  // (p. ej. beanywood.html) son enlaces normales y no están aquí.
  const PROJECTS = [];

  const modal = document.getElementById('pf-modal');
  const grid  = document.getElementById('pf-grid');
  if (!modal || !grid || typeof modal.showModal !== 'function') return;

  const fields = modal.querySelectorAll('[data-field]');
  const img = modal.querySelector('[data-field-img]');
  const placeholder = modal.querySelector('[data-field-placeholder]');

  const setImage = (project) => {
    if (!img || !placeholder) return;
    const hasImage = Boolean(project.image);
    img.hidden = !hasImage;
    placeholder.hidden = hasImage;
    if (hasImage) {
      img.src = project.image;
      img.alt = project.imageAlt || '';
    } else {
      img.removeAttribute('src');
      img.alt = '';
    }
  };

  const gallery = modal.querySelector('[data-field-gallery]');

  const setGallery = (project) => {
    if (!gallery) return;
    gallery.replaceChildren();
    const items = project.gallery || [];
    gallery.hidden = items.length === 0;
    items.forEach(({ src, alt }) => {
      const figure = document.createElement('figure');
      figure.className = 'pf-gallery__item';
      const image = document.createElement('img');
      image.className = 'pf-gallery__img';
      image.src = src;
      image.alt = alt || '';
      image.loading = 'lazy';
      figure.appendChild(image);
      gallery.appendChild(figure);
    });
  };

  const openProject = (index) => {
    const project = PROJECTS[index];
    if (!project) return;

    fields.forEach((el) => { el.textContent = project[el.dataset.field] || ''; });
    setImage(project);
    setGallery(project);
    modal.showModal();
    modal.querySelector('.pf-modal__panel').scrollTop = 0;
    document.body.style.overflow = 'hidden';
  };

  grid.addEventListener('click', (e) => {
    const card = e.target.closest('[data-project]');
    if (card) openProject(Number(card.dataset.project));
  });

  // Enlaces directos (p. ej. proyectos.html#proyecto-01 desde el inicio)
  const hashId = location.hash.slice(1);
  const linked = hashId && document.getElementById(hashId);
  if (linked && grid.contains(linked) && linked.dataset.project) {
    openProject(Number(linked.dataset.project));
  }

  const unlockScroll = () => { document.body.style.overflow = ''; };
  const closeModal = () => { modal.close(); unlockScroll(); };

  modal.querySelectorAll('[data-close]').forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });

  // Cerrar al hacer clic fuera del panel (en el fondo)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Tecla Esc u otros cierres nativos
  modal.addEventListener('cancel', unlockScroll);
  modal.addEventListener('close', unlockScroll);
})();
