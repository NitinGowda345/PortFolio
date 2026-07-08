/* ============================================================
   NITIN GOWDA — PORTFOLIO SCRIPT
   Vanilla JS only. Organized by feature, each self-contained.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. PRELOADER ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 400);
  });
  // fallback in case 'load' already fired or is slow
  setTimeout(() => preloader && preloader.classList.add('hidden'), 2500);

  /* ---------- 2. FOOTER YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 3. STICKY NAVBAR ---------- */
  const navbar = document.getElementById('navbar');
  const onScrollNav = () => {
    if (window.scrollY > 24) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* ---------- 4. MOBILE MENU ---------- */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuBackdrop = document.getElementById('menuBackdrop');

  const closeMenu = () => {
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    menuBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };
  const openMenu = () => {
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    menuBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  navToggle.addEventListener('click', () => {
    navToggle.classList.contains('open') ? closeMenu() : openMenu();
  });
  menuBackdrop.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  /* ---------- 5. ACTIVE NAV LINK ON SCROLL ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('[data-nav]');

  const setActiveLink = (id) => {
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
    });
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActiveLink(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ---------- 6. SCROLL REVEAL ANIMATIONS ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- 7. ANIMATED SKILL PROGRESS BARS ---------- */
  const skillFills = document.querySelectorAll('.skill-bar-fill');
  const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const pct = el.getAttribute('data-fill') || 0;
        requestAnimationFrame(() => { el.style.width = pct + '%'; });
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(el => skillObserver.observe(el));

  /* ---------- 8. HERO TYPEWRITER ---------- */
  const typewriterEl = document.getElementById('typewriter');
  const phrases = [
    'Java Backend Developer',
    'Spring Boot Enthusiast',
    'REST API Builder',
    'MCA Graduate',
    'SQL Query Optimizer'
  ];
  let phraseIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const current = phrases[phraseIndex];
    if (!deleting) {
      charIndex++;
      typewriterEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      typewriterEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  if (typewriterEl) typeLoop();

  /* ---------- 9. TERMINAL SIMULATED REQUEST/RESPONSE ---------- */
  const terminalBody = document.getElementById('terminalBody');
  const terminalScript = [
    { text: '$ curl -X GET /api/v1/developer', cls: 'prompt', pause: 500 },
    { text: '{', cls: '', pause: 80 },
    { text: '  "name": "Nitin Gowda",', cls: 'string', pause: 80 },
    { text: '  "role": "Java Backend Developer",', cls: 'string', pause: 80 },
    { text: '  "stack": ["Java", "Spring Boot", "MySQL"],', cls: 'string', pause: 80 },
    { text: '  "status": "open_to_work"', cls: 'string', pause: 80 },
    { text: '}', cls: '', pause: 600 },
    { text: '$ echo $STATUS', cls: 'prompt', pause: 400 },
    { text: '200 OK — response time: 12ms', cls: 'key', pause: 1600 },
  ];

  function runTerminal() {
    terminalBody.innerHTML = '';
    let i = 0;
    function next() {
      if (i >= terminalScript.length) {
        setTimeout(runTerminal, 1200);
        return;
      }
      const step = terminalScript[i];
      const line = document.createElement('div');
      line.className = 'line' + (step.cls ? ' ' + step.cls : '');
      line.textContent = step.text;
      terminalBody.appendChild(line);
      terminalBody.scrollTop = terminalBody.scrollHeight;
      i++;
      setTimeout(next, step.pause);
    }
    next();
  }
  if (terminalBody) setTimeout(runTerminal, 900);

  /* ---------- 10. BACK TO TOP ---------- */
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 11. CONTACT FORM (front-end only) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }
    const name = document.getElementById('cf-name').value.trim();
    formStatus.textContent = `Thanks, ${name}! Your message is ready — connect this form to an email service or backend to actually deliver it.`;
    formStatus.className = 'form-status show success';
    contactForm.reset();
  });

});
