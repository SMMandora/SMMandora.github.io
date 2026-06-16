export function initMiniNav() {
  const nav = document.querySelector('[data-mini-nav]');
  const hero = document.querySelector('.hero');
  if (!nav || !hero) return;

  if ('IntersectionObserver' in window) {
    const heroIO = new IntersectionObserver(([entry]) => {
      nav.classList.toggle('is-visible', !entry.isIntersecting);
    }, { rootMargin: '-72px 0px 0px 0px' });
    heroIO.observe(hero);
  }

  const links = [...nav.querySelectorAll('.mini-nav__links a[href^="#"]')];
  const byId = new Map(links.map(l => [l.getAttribute('href').slice(1), l]));
  const sections = [...byId.keys()]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  let raf = 0;
  const update = () => {
    raf = 0;
    const pos = scrollY + innerHeight * 0.38;
    let current = null;
    for (const s of sections) {
      if (s.offsetTop <= pos) current = s;
    }
    links.forEach(l => l.classList.toggle('is-active', !!current && l === byId.get(current.id)));
  };

  addEventListener('scroll', () => {
    if (!raf) raf = requestAnimationFrame(update);
  }, { passive: true });
  update();
}
