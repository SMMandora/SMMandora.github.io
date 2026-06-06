export function initCounters() {
  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll('[data-counter]');

  const finalText = (el) => {
    const raw = el.dataset.counter;
    const suffix = el.dataset.suffix || '';
    return raw + suffix;
  };

  if (prefersReduced || !('IntersectionObserver' in window)) {
    targets.forEach(t => { t.textContent = finalText(t); });
    return;
  }

  const animate = (el) => {
    const final = parseFloat(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    const isInt = Number.isInteger(final);
    const duration = 800;
    const start = performance.now();

    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = final * eased;
      el.textContent = (isInt ? Math.round(value) : value.toFixed(1)) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animate(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  targets.forEach(t => io.observe(t));
}
