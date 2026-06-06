export function initProjectCards() {
  const cards = document.querySelectorAll('[data-project-card]');

  cards.forEach((card) => {
    const trigger = card.querySelector('[data-card-trigger]');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const wasOpen = card.classList.contains('is-open');

      cards.forEach((c) => {
        c.classList.remove('is-open');
        const t = c.querySelector('[data-card-trigger]');
        if (t) t.setAttribute('aria-expanded', 'false');
      });

      if (!wasOpen) {
        card.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
