export function initClock() {
  const el = document.querySelector('[data-clock]');
  if (!el) return;

  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const tick = () => {
    el.textContent = fmt.format(new Date()) + ' EST';
  };

  tick();
  setInterval(tick, 30_000);
}
