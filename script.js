(() => {
  const photos = [...document.querySelectorAll('.hero-photo')];
  const dots = [...document.querySelectorAll('.slider-dot')];
  const caption = document.querySelector('#slide-caption');
  const current = document.querySelector('#slide-current');
  const carousel = document.querySelector('.hero-photo-frame');
  const captions = [
    'Cada vida merece cuidado e respeito.',
    'Água limpa e atenção todos os dias.',
    'Proteção em um ambiente acolhedor.',
    'Cuidado atento para cada gato.',
    'Todo gato merece um lugar seguro.',
    'Presença e respeito em cada etapa.',
    'Um espaço tranquilo também é cuidado.',
    'Acolhimento que respeita o tempo de cada um.',
    'Saúde e proteção em todos os caminhos.',
    'Conforto para descansar com segurança.',
    'Pontos de água e alimento bem cuidados.',
    'Um cantinho de descanso faz diferença.'
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

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let autoplayTimer = null;
  const stopAutoplay = () => { window.clearInterval(autoplayTimer); autoplayTimer = null; };
  const startAutoplay = () => {
    if (reduceMotion || autoplayTimer || document.hidden) return;
    autoplayTimer = window.setInterval(() => showSlide(activeIndex + 1), 6500);
  };
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('focusout', event => {
    if (!carousel.contains(event.relatedTarget)) startAutoplay();
  });
  document.addEventListener('visibilitychange', () => document.hidden ? stopAutoplay() : startAutoplay());
  startAutoplay();

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
