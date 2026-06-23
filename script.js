const header = document.getElementById('header');
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
const cursorGlow = document.getElementById('cursorGlow');
const heroVisual = document.getElementById('heroVisual');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

menuBtn.addEventListener('click', () => nav.classList.toggle('active'));
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('active')));

window.addEventListener('mousemove', (e) => {
  if (cursorGlow) {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  }
  document.querySelectorAll('.service-card,.step,.testimonial').forEach(card => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--x', `${e.clientX - r.left}px`);
    card.style.setProperty('--y', `${e.clientY - r.top}px`);
  });
});

if (heroVisual) {
  heroVisual.addEventListener('mousemove', (e) => {
    const r = heroVisual.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    heroVisual.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  heroVisual.addEventListener('mouseleave', () => heroVisual.style.transform = 'rotateY(0deg) rotateX(0deg)');
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      if (entry.target.classList.contains('stat')) animateStat(entry.target.querySelector('strong'));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal,.stat').forEach(el => observer.observe(el));

function animateStat(el) {
  if (!el || el.dataset.done) return;
  el.dataset.done = 'true';
  const target = Number(el.dataset.count);
  const duration = 1300;
  const start = performance.now();
  function update(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const value = Math.floor(target * eased);
    el.textContent = target >= 1000 ? value.toLocaleString('pt-BR') : value;
    if (p < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();
  const text = `Olá, sou ${name}. Gostaria de solicitar um orçamento com a FRS.%0A%0AWhatsApp: ${phone}%0AE-mail: ${email || 'não informado'}%0AServiço: ${service}%0AMensagem: ${message || 'não informado'}`;
  window.open(`https://wa.me/5551989996674?text=${text}`, '_blank');
});
