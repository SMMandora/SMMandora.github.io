import { initClock } from './clock.js';
import { initReveals } from './reveals.js';
import { initCounters } from './counters.js';
import { initProjectCards } from './project-cards.js';
import { initCopyEmail } from './copy-email.js';

async function loadCurrently() {
  const root = document.querySelector('[data-currently]');
  if (!root) return;
  try {
    const res = await fetch('./data/currently.json', { cache: 'no-cache' });
    if (!res.ok) return;
    const data = await res.json();
    const setField = (key, value) => {
      const el = root.querySelector(`[data-currently-${key}]`);
      if (el && value) el.textContent = value;
    };
    setField('shipping', data.shipping);
    setField('learning', data.learning);
    setField('reading', data.reading);
  } catch {
    /* leave defaults */
  }
}

async function loadBuildTimestamp() {
  const el = document.querySelector('[data-deployed-at]');
  if (!el) return;
  try {
    const res = await fetch('./data/build.json', { cache: 'no-cache' });
    if (!res.ok) return;
    const data = await res.json();
    const d = new Date(data.deployedAt);
    if (Number.isNaN(d.getTime())) return;
    const fmt = new Intl.DateTimeFormat('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: false,
      timeZone: 'UTC',
    });
    el.textContent = fmt.format(d) + ' UTC';
  } catch {
    /* leave default */
  }
}

function init() {
  initClock();
  initCounters();
  initProjectCards();
  initCopyEmail();
  loadCurrently();
  loadBuildTimestamp();
  initReveals();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
