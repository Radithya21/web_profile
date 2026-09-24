// ============================================
//   BANK SAMPAH AMPANG SAIYO MANDIRI – JAVASCRIPT (OVERHAUL)
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
  '.program-card, .stat-card, .testi-card, .alur-step, .penghargaan-card, ' +
  '.highlight-item, .kontak-item, .about-grid, .circular-wrap, .kontak-wrap, ' +
  '.section-header, #about-img-wrap, #about-content, #circular-content, #circular-image, ' +
  '.visimisi-card, .edukasi-card, .tong-card, .manfaat-item, .produk-card, ' +
  '.org-card, .org-manager-block, .org-sub-card, .org-branch, ' +
  '.mitra-card, .urgency-block, .rw-card, .sched-card, ' +
  '#manfaat-img, .visimisi-quote, .dashboard-wrap, .produk-image-wrap'
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
        const raw = num.dataset.count;
        if (isNaN(Number(raw))) {
          num.textContent = raw;
        } else {
          const target = parseInt(raw);
          animateCounter(num, target);
        }
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
document.querySelectorAll('.stat-card').forEach(card => {
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

// --------- LIGHTBOX / GALLERY ---------
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxImg = document.getElementById('lightbox-img');

// Open lightbox when clicking gallery triggers
document.querySelectorAll('.gallery-trigger').forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    // For now, show the community activity image as gallery
    lightboxImg.src = 'images/community_activity.png';
    lightboxImg.alt = 'Galeri kegiatan Bank Sampah Ampang Saiyo Mandiri';
    lightboxOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// Close lightbox
if (lightboxClose) {
  lightboxClose.addEventListener('click', () => {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

if (lightboxOverlay) {
  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) {
      lightboxOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Close on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightboxOverlay && lightboxOverlay.classList.contains('active')) {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// --------- CHART.JS DASHBOARD ---------
function initCharts() {
  if (typeof Chart === 'undefined') return;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  // Shared chart styling
  Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
  Chart.defaults.font.size = 12;
  Chart.defaults.color = '#4B5563';

  // 1. Nasabah Growth Chart
  const ctxNasabah = document.getElementById('chart-nasabah');
  if (ctxNasabah) {
    new Chart(ctxNasabah.getContext('2d'), {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: '2023',
            data: [20, 28, 35, 42, 50, 58, 65, 72, 80, 88, 95, 100],
            borderColor: '#A5D6A7',
            backgroundColor: 'rgba(165,214,167,0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointRadius: 3,
            pointHoverRadius: 6,
          },
          {
            label: '2024',
            data: [102, 108, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160],
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76,175,80,0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointRadius: 3,
            pointHoverRadius: 6,
          },
          {
            label: '2025',
            data: [162, 164, 166, 168, 170, 172, 175, null, null, null, null, null],
            borderColor: '#1B5E20',
            backgroundColor: 'rgba(27,94,32,0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 7,
            borderDash: [],
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 12,
              font: { size: 11 }
            }
          },
          tooltip: {
            backgroundColor: '#1F2937',
            titleColor: '#fff',
            bodyColor: '#fff',
            cornerRadius: 8,
            padding: 12,
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.parsed.y + ' nasabah';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 200,
            grid: {
              color: 'rgba(0,0,0,0.05)',
            },
            ticks: {
              stepSize: 50,
            }
          },
          x: {
            grid: {
              display: false,
            }
          }
        }
      }
    });
  }

  // 2. Sampah Collection Chart
  const ctxSampah = document.getElementById('chart-sampah');
  if (ctxSampah) {
    new Chart(ctxSampah.getContext('2d'), {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: '2023',
            data: [200, 250, 300, 350, 420, 480, 520, 580, 620, 680, 720, 800],
            backgroundColor: 'rgba(165,214,167,0.7)',
            borderColor: '#A5D6A7',
            borderWidth: 1,
            borderRadius: 4,
          },
          {
            label: '2024',
            data: [820, 850, 880, 900, 920, 950, 980, 1000, 1020, 1050, 1080, 1100],
            backgroundColor: 'rgba(76,175,80,0.7)',
            borderColor: '#4CAF50',
            borderWidth: 1,
            borderRadius: 4,
          },
          {
            label: '2025',
            data: [1050, 1080, 1100, 1120, 1100, 1150, 1100, null, null, null, null, null],
            backgroundColor: 'rgba(27,94,32,0.7)',
            borderColor: '#1B5E20',
            borderWidth: 1,
            borderRadius: 4,
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 12,
              font: { size: 11 }
            }
          },
          tooltip: {
            backgroundColor: '#1F2937',
            titleColor: '#fff',
            bodyColor: '#fff',
            cornerRadius: 8,
            padding: 12,
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.parsed.y + ' kg';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0,0,0,0.05)',
            },
            ticks: {
              callback: function(value) {
                return value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value;
              }
            }
          },
          x: {
            grid: {
              display: false,
            }
          }
        }
      }
    });
  }

  // 3. Asal Nasabah Chart (Doughnut per RW)
  const ctxAsal = document.getElementById('chart-asal');
  if (ctxAsal) {
    new Chart(ctxAsal.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['RW 01', 'RW 02', 'RW 03', 'RW 04', 'RW 05', 'RW 06', 'RW 07', 'RW 08', 'Lainnya'],
        datasets: [{
          data: [32, 28, 25, 22, 20, 18, 15, 14, 13],
          backgroundColor: [
            '#256027',
            '#388E3C',
            '#4CAF50',
            '#76C442',
            '#A5D6A7',
            '#F5A623',
            '#2196F3',
            '#9C27B0',
            '#795548'
          ],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              boxWidth: 6,
              padding: 6,
              font: { size: 9.5 }
            }
          },
          tooltip: {
            backgroundColor: '#1F2937',
            titleColor: '#fff',
            bodyColor: '#fff',
            cornerRadius: 8,
            padding: 12,
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.parsed + ' nasabah';
              }
            }
          }
        },
        cutout: '58%'
      }
    });
  }
}

// --------- INTERACTIVE MANFAAT PHOTO SWITCHER ---------
function initManfaatSwitcher() {
  const manfaatItems = document.querySelectorAll('.manfaat-item');
  const mainImg = document.getElementById('manfaat-main-img');
  const captionTitle = document.getElementById('manfaat-caption-title');

  if (!manfaatItems.length || !mainImg) return;

  manfaatItems.forEach(item => {
    function activateItem() {
      // Deactivate all
      manfaatItems.forEach(el => el.classList.remove('active'));
      // Activate clicked
      item.classList.add('active');

      const newImgSrc = item.getAttribute('data-img');
      const newTitle = item.getAttribute('data-title');

      if (newImgSrc && mainImg.src !== newImgSrc) {
        mainImg.style.opacity = '0.3';
        mainImg.style.transform = 'scale(0.98)';
        setTimeout(() => {
          mainImg.src = newImgSrc;
          mainImg.alt = newTitle || 'Manfaat Menabung Sampah';
          if (captionTitle && newTitle) {
            captionTitle.textContent = newTitle;
          }
          mainImg.style.opacity = '1';
          mainImg.style.transform = 'scale(1)';
        }, 180);
      }
    }

    item.addEventListener('click', activateItem);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateItem();
      }
    });
  });
}

// --------- DAFTAR PETUGAS PIKET (DUMMY DATA & FILTER) ---------
const piketData = {
  "2025": [
    { no: 1, nama: "Yuliusman", jadwal: "Minggu Ke-1 & Ke-3 (08:00 - 12:00)" },
    { no: 2, nama: "Rosmiati", jadwal: "Minggu Ke-1 & Ke-3 (08:00 - 12:00)" },
    { no: 3, nama: "Desni", jadwal: "Minggu Ke-2 & Ke-4 (08:00 - 12:00)" },
    { no: 4, nama: "Zedria Mursi, A.Md", jadwal: "Minggu Ke-2 & Ke-4 (08:00 - 12:00)" },
    { no: 5, nama: "Riko Pratama", jadwal: "Setiap Sabtu (09:00 - 13:00)" },
    { no: 6, nama: "Nurhasanah", jadwal: "Setiap Minggu (08:30 - 12:30)" }
  ],
  "2024": [
    { no: 1, nama: "Hendra Gunawan", jadwal: "Minggu Ke-1 & Ke-3 (08:00 - 12:00)" },
    { no: 2, nama: "Rosmiati", jadwal: "Minggu Ke-1 & Ke-3 (08:00 - 12:00)" },
    { no: 3, nama: "Desni", jadwal: "Minggu Ke-2 & Ke-4 (08:00 - 12:00)" },
    { no: 4, nama: "Herman Syah", jadwal: "Minggu Ke-2 & Ke-4 (08:00 - 12:00)" },
    { no: 5, nama: "Siti Fatimah", jadwal: "Setiap Sabtu (09:00 - 12:00)" }
  ],
  "2023": [
    { no: 1, nama: "Yuliusman", jadwal: "Minggu Ke-1 (08:00 - 11:30)" },
    { no: 2, nama: "Rosmiati", jadwal: "Minggu Ke-2 (08:00 - 11:30)" },
    { no: 3, nama: "Desni", jadwal: "Minggu Ke-3 (08:00 - 11:30)" },
    { no: 4, nama: "Zedria Mursi", jadwal: "Minggu Ke-4 (08:00 - 11:30)" }
  ]
};

function renderPiketTable(year) {
  const tbody = document.getElementById('piket-tbody');
  const emptyState = document.getElementById('piket-empty');
  const table = document.getElementById('piket-table');
  if (!tbody) return;

  const data = piketData[year] || [];
  if (data.length === 0) {
    tbody.innerHTML = '';
    if (table) table.style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (table) table.style.display = 'table';
  if (emptyState) emptyState.style.display = 'none';

  tbody.innerHTML = data.map(item => `
    <tr>
      <td>${item.no}</td>
      <td><strong>${item.nama}</strong></td>
    </tr>
  `).join('');
}

function initPiket() {
  const select = document.getElementById('piket-year-filter');
  if (select) {
    select.addEventListener('change', (e) => {
      renderPiketTable(e.target.value);
    });
    renderPiketTable(select.value);
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // Init Manfaat interactive switcher
  initManfaatSwitcher();

  // Init Piket duty table
  initPiket();

  // Wait for Chart.js to load
  if (typeof Chart !== 'undefined') {
    initCharts();
  } else {
    const checkChart = setInterval(() => {
      if (typeof Chart !== 'undefined') {
        clearInterval(checkChart);
        initCharts();
      }
    }, 100);
    setTimeout(() => clearInterval(checkChart), 10000);
  }
});
