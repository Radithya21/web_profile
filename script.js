// ============================================
//   BSU AMPANG SAIYO – JAVASCRIPT
// ============================================

// --------- NAVBAR SCROLL ---------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --------- HAMBURGER MENU ---------
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');

hamburgerBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburgerBtn.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  spans[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
  spans[1].style.opacity = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
});

// Close menu on link click
navLinks.querySelectorAll('.nav-item').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburgerBtn.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '1';
    });
  });
});

// --------- ACTIVE NAV LINK ON SCROLL ---------
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.id;
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// --------- ANIMATE ON SCROLL (Intersection Observer) ---------
const animateElements = document.querySelectorAll(
  '.layanan-card, .program-card, .stat-card, .testi-card, .alur-step, ' +
  '.highlight-item, .kontak-item, .about-grid, .circular-wrap, .kontak-wrap, ' +
  '.section-header, #about-img-wrap, #about-content, #circular-content, #circular-image'
);

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (idx % 6));
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animateElements.forEach(el => {
  el.classList.add('animate-on-scroll');
  observer.observe(el);
});

// --------- COUNTER ANIMATION ---------
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start).toLocaleString('id-ID');
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('[data-count]');
      nums.forEach(num => {
        const target = parseInt(num.dataset.count);
        animateCounter(num, target);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.hero-stats, .stat-cards').forEach(section => {
  counterObserver.observe(section);
});

// --------- FLOATING PARTICLES ---------
function createParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;
  const count = 18;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 12 + 5;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: ${Math.random() * 0.4 + 0.1};
      background: rgba(${Math.random() > 0.5 ? '118,196,66' : '245,166,35'},${Math.random() * 0.3 + 0.1});
    `;
    container.appendChild(p);
  }
}

createParticles();

// --------- BACK TO TOP ---------
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --------- SMOOTH PARALLAX ON HERO ---------
const heroBgImg = document.querySelector('.hero-bg-img');
window.addEventListener('scroll', () => {
  if (heroBgImg) {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBgImg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }
});

// --------- CARD TILT ON HOVER ---------
document.querySelectorAll('.stat-card, .layanan-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -5;
    const rotateY = ((x - cx) / cx) * 5;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
