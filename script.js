(() => {
  const photos = [...document.querySelectorAll('.hero-photo')];
  const dots = [...document.querySelectorAll('.slider-dot')];
  const caption = document.querySelector('#slide-caption');
  const current = document.querySelector('#slide-current');
  const captions = [
    'Cada vida merece cuidado e respeito.',
    'Um espaço seguro começa com respeito.',
    'Atenção e bem-estar para cada gato.',
    'Cada história merece novos caminhos.',
    'Proteção animal com dignidade.'
  ];
  let activeIndex = 0;

  function showSlide(index) {
    activeIndex = (index + photos.length) % photos.length;
    photos.forEach((photo, i) => {
      const active = i === activeIndex;
      photo.classList.toggle('is-active', active);
      photo.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot, i) => {
      const active = i === activeIndex;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-pressed', String(active));
    });
    caption.textContent = captions[activeIndex];
    current.textContent = String(activeIndex + 1).padStart(2, '0');
  }

  document.querySelectorAll('.slider-arrow').forEach(button => {
    button.addEventListener('click', () => showSlide(activeIndex + (button.dataset.direction === 'next' ? 1 : -1)));
  });
  dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
  showSlide(0);

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const closeMenu = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
