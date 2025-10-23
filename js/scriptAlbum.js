(function(){
  const slidesEl = document.querySelector('.slides');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.nav.prev');
  const nextBtn = document.querySelector('.nav.next');
  const dotsContainer = document.querySelector('.dots');

  if (!slidesEl || slides.length === 0) return;

  let current = 0;
  const total = slides.length;

  // Création des points
  for (let i = 0; i < total; i++) {
    const b = document.createElement('button');
    b.dataset.index = i;
    if (i === 0) b.classList.add('active');
    dotsContainer.appendChild(b);
  }
  const dots = Array.from(dotsContainer.children);

  function update() {
    slidesEl.style.transform = `translateX(${-current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() { current = (current + 1) % total; update(); }
  function prev() { current = (current - 1 + total) % total; update(); }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  dots.forEach(d => d.addEventListener('click', e => {
    current = Number(e.currentTarget.dataset.index);
    update();
  }));

  // Clavier
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // Swipe tactile
  let startX = 0, deltaX = 0;
  const viewport = document.querySelector('.viewport');
  viewport.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  viewport.addEventListener('touchmove', e => deltaX = e.touches[0].clientX - startX);
  viewport.addEventListener('touchend', () => {
    if (Math.abs(deltaX) > 40) deltaX < 0 ? next() : prev();
    startX = deltaX = 0;
  });
})();
