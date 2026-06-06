export function initCopyEmail() {
  const buttons = document.querySelectorAll('[data-copy-email]');

  buttons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = btn.dataset.copyEmail;
      const label = btn.querySelector('[data-copy-label]') || btn;
      const original = label.textContent;

      const showCopied = () => {
        btn.classList.add('is-copied');
        label.textContent = 'copied!';
        setTimeout(() => {
          label.textContent = original;
          btn.classList.remove('is-copied');
        }, 1500);
      };

      try {
        await navigator.clipboard.writeText(email);
        showCopied();
      } catch {
        const tmp = document.createElement('textarea');
        tmp.value = email;
        tmp.setAttribute('readonly', '');
        tmp.style.position = 'fixed';
        tmp.style.opacity = '0';
        document.body.appendChild(tmp);
        tmp.select();
        try { document.execCommand('copy'); showCopied(); } catch {}
        document.body.removeChild(tmp);
      }
    });
  });
}
