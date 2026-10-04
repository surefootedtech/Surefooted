// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

function setMenu(open) {
  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// Highlight the nav link for the section in view
const links = [...nav.querySelectorAll('a[href^="#"]')];
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach((s) => observer.observe(s));

// Assemble email links at runtime so the address isn't in the HTML for scrapers
const reverse = (s) => s.split('').reverse().join('');
document.querySelectorAll('.js-email').forEach((a) => {
  const addr = reverse(a.dataset.u) + '@' + reverse(a.dataset.d);
  a.href = 'mailto:' + addr;
  a.textContent = addr;
});

document.getElementById('year').textContent = new Date().getFullYear();
