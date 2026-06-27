// ----- Compass tabs -----
const compassBtns = document.querySelectorAll('.compass-pt, .compass-tab-btn');
const compassTabs = document.querySelectorAll('.compass-tab');
compassBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const idx = btn.dataset.tab;
    document.querySelectorAll('.compass-pt').forEach(p => p.classList.toggle('is-active', p.dataset.tab === idx));
    document.querySelectorAll('.compass-tab-btn').forEach(p => p.classList.toggle('is-active', p.dataset.tab === idx));
    compassTabs.forEach(t => t.classList.toggle('is-active', t.dataset.tab === idx));
  });
});

// ----- Stage accordion -----
document.querySelectorAll('.stage').forEach(stage => {
  const head = stage.querySelector('.stage-head');
  head.addEventListener('click', () => {
    const wasOpen = stage.classList.contains('is-open');
    document.querySelectorAll('.stage').forEach(s => s.classList.remove('is-open'));
    if (!wasOpen) stage.classList.add('is-open');
  });
});

// ----- Program accordion (allow multiple open) -----
document.querySelectorAll('.program').forEach(program => {
  const head = program.querySelector('.program-head');
  head.addEventListener('click', (e) => {
    if (e.target.closest('.btn')) return;
    program.classList.toggle('is-open');
  });
});

// ----- Clinical line accordion (per program, independent) -----
document.querySelectorAll('.line').forEach(line => {
  const head = line.querySelector('.line-head');
  if (!head) return;
  head.addEventListener('click', (e) => {
    e.stopPropagation();
    line.classList.toggle('is-open');
  });
});

// ----- Smooth-scroll #contacts links so the form lands centered in viewport -----
(() => {
  const scrollFormIntoCenter = () => {
    const form = document.getElementById('consultation-form');
    if (!form) return;
    // Native API handles body zoom and scroll-snap correctly
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  document.querySelectorAll('a[href="#contacts"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      scrollFormIntoCenter();
    });
  });
  window.__scrollFormIntoCenter = scrollFormIntoCenter;
})();

// ----- Program CTA -> form -----
document.querySelectorAll('[data-program-cta]').forEach(cta => {
  cta.addEventListener('click', (e) => {
    e.preventDefault();
    const interest = cta.dataset.programCta;
    document.getElementById('program-interest').value = interest;
    if (window.__scrollFormIntoCenter) window.__scrollFormIntoCenter();
    setTimeout(() => {
      const nameField = document.getElementById('name');
      if (nameField) nameField.focus({preventScroll:true});
    }, 700);
  });
});

// ----- Channel selector -----
document.querySelectorAll('.channel-opt').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.channel-opt').forEach(o => o.classList.remove('is-active'));
    opt.classList.add('is-active');
  });
});

// ----- Form submission (mock) -----
const form = document.getElementById('consultation-form');
const toast = document.getElementById('toast');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const contact = document.getElementById('contact').value.trim();
  if (!name || !contact) {
    toast.textContent = 'Заполните имя и контакт.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
    return;
  }
  // In production: send to CRM / backend
  console.log('Submission:', {
    name,
    contact,
    channel: document.querySelector('.channel-opt.is-active').dataset.channel,
    program: document.getElementById('program-interest').value || ''
  });
  toast.textContent = 'Получили. Свяжемся в течение рабочего дня.';
  toast.classList.add('show');
  form.reset();
  document.querySelectorAll('.channel-opt').forEach((o, i) => o.classList.toggle('is-active', i === 0));
  setTimeout(() => toast.classList.remove('show'), 4000);
});

// ----- Language toggle (placeholder) -----
const langBtn = document.getElementById('lang-toggle');
langBtn.addEventListener('click', () => {
  const isRU = langBtn.textContent.trim() === 'RU';
  langBtn.textContent = isRU ? 'EN' : 'RU';
  toast.textContent = isRU ? 'EN version coming soon.' : 'Переключено на русский.';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
});

// ----- Mobile burger menu -----
(() => {
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobile-menu');
  if (!burger || !menu) return;
  const close = () => {
    burger.classList.remove('is-open');
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  };
  const open = () => {
    burger.classList.add('is-open');
    menu.classList.add('is-open');
    document.body.classList.add('menu-open');
    burger.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
  };
  burger.addEventListener('click', () => {
    menu.classList.contains('is-open') ? close() : open();
  });
  menu.querySelectorAll('[data-menu-link]').forEach(a => {
    a.addEventListener('click', close);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) close();
  });
  const mobileLang = document.getElementById('mobile-lang');
  if (mobileLang) {
    mobileLang.addEventListener('click', () => {
      const langBtn = document.getElementById('lang-toggle');
      if (langBtn) langBtn.click();
    });
  }
})();

// ----- Team carousel -----
(() => {
  const track = document.getElementById('team-track');
  const prev = document.getElementById('team-prev');
  const next = document.getElementById('team-next');
  const dots = document.getElementById('team-dots');
  if (!track) return;
  const cards = [...track.querySelectorAll('.member')];

  const step = () => {
    const first = cards[0];
    const second = cards[1];
    if (!second) return first.getBoundingClientRect().width;
    return second.getBoundingClientRect().left - first.getBoundingClientRect().left;
  };

  const visibleCount = () => Math.max(1, Math.round(track.clientWidth / step()));
  const pageCount = () => Math.max(1, cards.length - visibleCount() + 1);

  // Build dots
  const renderDots = () => {
    dots.innerHTML = '';
    const total = pageCount();
    if (total <= 1) { dots.style.display = 'none'; return; }
    dots.style.display = 'flex';
    for (let i = 0; i < total; i++) {
      const b = document.createElement('button');
      b.className = 'team-dot';
      b.setAttribute('aria-label', `Перейти к карточке ${i + 1}`);
      b.addEventListener('click', () => track.scrollTo({ left: i * step(), behavior: 'smooth' }));
      dots.appendChild(b);
    }
  };

  const updateState = () => {
    const x = track.scrollLeft;
    const max = track.scrollWidth - track.clientWidth - 1;
    prev.disabled = x <= 2;
    next.disabled = x >= max;
    const idx = Math.round(x / step());
    [...dots.children].forEach((d, i) => d.classList.toggle('is-active', i === idx));
  };

  prev.addEventListener('click', () => track.scrollBy({ left: -step() * Math.max(1, visibleCount() - 1), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left:  step() * Math.max(1, visibleCount() - 1), behavior: 'smooth' }));
  track.addEventListener('scroll', updateState, { passive: true });
  window.addEventListener('resize', () => { renderDots(); updateState(); });

  renderDots();
  updateState();
})();

// ----- Open first program by default for demo visibility -----
// document.querySelector('.program').classList.add('is-open');