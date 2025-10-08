(function() {
  const $ = (sel, parent = document) => parent.querySelector(sel);
  const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

  // Año en footer
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menú móvil
  const navToggle = $('.nav-toggle');
  const menu = $('#menu');
  if (navToggle && menu) {
    navToggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      // Bloquear scroll del body cuando el menú esté abierto
      document.body.classList.toggle('nav-open', isOpen);
    });
    // Mantener el menú abierto tras hacer clic en enlaces
    // Si más adelante quieres cerrarlo al navegar, reactiva la línea siguiente
    // $$('#menu a').forEach((a) => a.addEventListener('click', () => menu.classList.remove('is-open')));
  }

  // Scroll suave
  $$('#menu a, .cta a, .brand').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = $(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Reveal on scroll
  const revealEls = $$('.reveal');
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));

  // Revelado escalonado por sección
  const sectionsForStagger = ['#habilidades .skills', '#proyectos .projects-grid', '#servicios .services-grid'];
  sectionsForStagger.map((sel) => $$(sel)).flat().forEach((grid) => {
    const children = Array.from(grid.children);
    children.forEach((child, idx) => {
      child.style.transitionDelay = `${Math.min(idx * 60, 400)}ms`;
      child.classList.add('reveal');
      io.observe(child);
    });
  });

  // Scrollspy con aria-current
  const sections = ['#inicio', '#sobre-mi', '#servicios', '#habilidades', '#proyectos', '#experiencia', '#contacto']
    .map((id) => $(id)).filter(Boolean);
  const navLinks = $$('#menu a');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = '#' + entry.target.id;
      const link = navLinks.find((a) => a.getAttribute('href') === id);
      if (link) {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.removeAttribute('aria-current'));
          link.setAttribute('aria-current', 'page');
        }
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.1 });
  sections.forEach((sec) => spy.observe(sec));

  // Canvas de partículas/líneas sutiles
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  let width = 0, height = 0;
  let points = [];
  let animationId = null;
  let particleColor = 'rgba(0,255,136,0.7)';
  let lineColorBase = '#00d5ff';
  let parallaxOffsetY = 0;

  // Toggle de acento (verde <-> cian) con persistencia
  const ACCENT_KEY = 'accent-color';
  const accentBtn = $('#accent-toggle');
  const rootStyle = document.documentElement.style;
  function setAccent(color) {
    rootStyle.setProperty('--accent', color);
    // colorear partículas y líneas según acento
    particleColor = hexToRgba(color, 0.7);
    lineColorBase = color === '#00ff88' ? '#00d5ff' : '#00ff88';
    document.querySelectorAll('.chips li').forEach((chip) => {
      chip.style.background = color === '#00ff88' ? 'rgba(0,255,136,.08)' : 'rgba(0,213,255,.08)';
      chip.style.borderColor = color === '#00ff88' ? 'rgba(0,255,136,.2)' : 'rgba(0,213,255,.2)';
    });
  }
  const savedAccent = localStorage.getItem(ACCENT_KEY);
  if (savedAccent) setAccent(savedAccent);
  if (accentBtn) {
    accentBtn.addEventListener('click', () => {
      const current = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      const next = current === '#00ff88' ? '#00d5ff' : '#00ff88';
      setAccent(next);
      localStorage.setItem(ACCENT_KEY, next);
    });
  }

  function hexToRgba(hex, alpha) {
    const h = hex.replace('#','');
    const bigint = parseInt(h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function resize() {
    if (!canvas || !ctx) return;
    width = canvas.clientWidth = window.innerWidth;
    height = canvas.clientHeight = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initPoints();
  }

  function initPoints() {
    const isMobile = Math.min(window.innerWidth, window.innerHeight) < 760;
    const density = isMobile ? 50 : 80;
    points = Array.from({ length: density }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
  }

  function step() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(0, parallaxOffsetY);
    
    // Partículas
    ctx.fillStyle = particleColor;
    for (const p of points) {
      p.x += p.vx; 
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Líneas
    ctx.strokeStyle = hexToRgba(lineColorBase, 0.2);
    ctx.lineWidth = 0.5;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i], b = points[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const alpha = 1 - dist / 100;
          ctx.strokeStyle = hexToRgba(lineColorBase, alpha * 0.3);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    ctx.restore();
    animationId = requestAnimationFrame(step);
  }

  // Inicializar animación del canvas
  if (canvas && ctx) {
    console.log('Canvas encontrado, iniciando animación...');
    resize();
    window.addEventListener('resize', resize);
    // Parallax sutil con scroll
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const current = window.scrollY;
      const delta = current - lastScrollY;
      lastScrollY = current;
      parallaxOffsetY = Math.max(-40, Math.min(40, parallaxOffsetY + delta * 0.05));
    }, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (animationId) cancelAnimationFrame(animationId);
        animationId = null;
      } else {
        if (!animationId) step();
      }
    });
    step();
  } else {
    console.log('Canvas no encontrado o contexto no disponible');
  }

  // Ripple en clicks de botones y enlaces
  function attachRipple(el) {
    el.addEventListener('click', (e) => {
      const rect = el.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  }
  [...$$('.btn'), ...$$('.site-nav a')].forEach(attachRipple);

  // Header shrink al hacer scroll
  const header = $('.site-header');
  if (header) {
    // Ajustar padding-top del body para evitar solapamiento
    function applyBodyPadding() {
      const h = header.getBoundingClientRect().height;
      document.body.style.paddingTop = h + 'px';
    }
    applyBodyPadding();
    window.addEventListener('resize', applyBodyPadding);

    // Mantener el header visible sin ocultarlo; solo aplicar estado visual shrink
    const onScroll = () => {
      if (window.scrollY > 12) header.classList.add('is-shrink');
      else header.classList.remove('is-shrink');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();


