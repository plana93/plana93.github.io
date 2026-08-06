/**
 * portfolio-main.js
 * Three.js neural network hero + GSAP scroll animations
 * Mirco Planamente Portfolio v3
 */

(function () {
  'use strict';

  /* ============================================================
     UTILITIES
  ============================================================ */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  /* ============================================================
     1. SCROLL PROGRESS BAR
  ============================================================ */
  function initProgressBar() {
    var bar = document.getElementById('p-progress-bar');
    if (!bar) return;
    window.addEventListener('scroll', function () {
      var max  = document.documentElement.scrollHeight - window.innerHeight;
      var pct  = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ============================================================
     2. NAV SCROLL BEHAVIOR
  ============================================================ */
  function initNav() {
    var nav = document.getElementById('pNav');
    if (!nav) return;
    function update() {
      if (window.scrollY > 60) nav.classList.add('p-nav--scrolled');
      else nav.classList.remove('p-nav--scrolled');
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ============================================================
     3. THREE.JS NEURAL NETWORK HERO
  ============================================================ */
  function initThreeHero() {
    var canvas = document.getElementById('heroCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    var W = canvas.clientWidth;
    var H = canvas.clientHeight;

    // Renderer
    var renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    // Scene + Camera
    var scene  = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 200);
    camera.position.set(0, 0, 28);

    // ── Nodes ────────────────────────────────────────────────
    var NODE_COUNT = 80;
    var nodes  = [];
    var nodeGroup = new THREE.Group();

    var sphereGeo = new THREE.SphereGeometry(0.12, 8, 8);

    for (var i = 0; i < NODE_COUNT; i++) {
      var mat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.6 ? 0x6e56ff : 0x00d4aa,
        transparent: true,
        opacity: 0.55 + Math.random() * 0.45
      });
      var mesh = new THREE.Mesh(sphereGeo, mat);
      var theta = Math.random() * Math.PI * 2;
      var phi   = Math.acos(2 * Math.random() - 1);
      var r     = 8 + Math.random() * 10;
      mesh.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.7,
        r * Math.cos(phi)
      );
      // Store initial + drift
      mesh.userData = {
        ox: mesh.position.x,
        oy: mesh.position.y,
        oz: mesh.position.z,
        speed: 0.2 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2
      };
      nodeGroup.add(mesh);
      nodes.push(mesh);
    }
    scene.add(nodeGroup);

    // ── Edges (lines between nearby nodes) ──────────────────
    var edgesMat = new THREE.LineBasicMaterial({
      color: 0x6e56ff,
      transparent: true,
      opacity: 0.12,
      linewidth: 1
    });

    var CONNECT_DIST = 5.5;
    var edgesGroup = new THREE.Group();
    for (var a = 0; a < NODE_COUNT; a++) {
      for (var b = a + 1; b < NODE_COUNT; b++) {
        var pa = nodes[a].position;
        var pb = nodes[b].position;
        var d  = pa.distanceTo(pb);
        if (d < CONNECT_DIST) {
          var geo  = new THREE.BufferGeometry().setFromPoints([pa.clone(), pb.clone()]);
          var line = new THREE.Line(geo, edgesMat.clone());
          // Store references to update edge opacity with distance
          line.userData = { a: a, b: b };
          edgesGroup.add(line);
        }
      }
    }
    scene.add(edgesGroup);

    // ── Ambient particles ────────────────────────────────────
    var particleCount = 140;
    var pPositions    = new Float32Array(particleCount * 3);
    var pSpeeds       = [];
    for (var i = 0; i < particleCount; i++) {
      pPositions[i * 3 + 0] = (Math.random() - 0.5) * 50;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      pSpeeds.push({ vx: (Math.random() - 0.5) * 0.008, vy: (Math.random() - 0.5) * 0.005 });
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    var pMat = new THREE.PointsMaterial({
      color: 0x6e56ff,
      size: 0.08,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true
    });
    var particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Mouse parallax ───────────────────────────────────────
    var mouse = { x: 0, y: 0 };
    var targetRot = { x: 0, y: 0 };
    window.addEventListener('mousemove', function (e) {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    // ── Scroll pull-down ─────────────────────────────────────
    var scrollY = 0;
    window.addEventListener('scroll', function () {
      scrollY = window.scrollY;
    }, { passive: true });

    // ── Resize ───────────────────────────────────────────────
    window.addEventListener('resize', function () {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    });

    // ── Animate ──────────────────────────────────────────────
    var clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      var t = clock.getElapsedTime();

      // Rotate node group slowly
      nodeGroup.rotation.y = t * 0.04;
      nodeGroup.rotation.x = Math.sin(t * 0.025) * 0.1;

      // Mouse parallax
      targetRot.x += (-mouse.y * 0.12 - targetRot.x) * 0.04;
      targetRot.y += ( mouse.x * 0.18 - targetRot.y) * 0.04;
      scene.rotation.x = targetRot.x;
      scene.rotation.y = targetRot.y;

      // Scroll: camera drifts back + scene dims as you scroll
      var scrollFactor = scrollY / (window.innerHeight || 1);
      camera.position.z = 28 + scrollFactor * 8;
      scene.children.forEach(function (child) {
        if (child.material) {
          child.material.opacity = Math.max(0, 1 - scrollFactor * 0.8);
        }
      });
      nodeGroup.position.y = -scrollFactor * 4;

      // Drift nodes
      nodes.forEach(function (n) {
        var u = n.userData;
        n.position.y = u.oy + Math.sin(t * u.speed + u.phase) * 0.5;
        n.position.x = u.ox + Math.cos(t * u.speed * 0.7 + u.phase) * 0.3;
      });

      // Move particles
      var pos = pGeo.attributes.position.array;
      for (var i = 0; i < particleCount; i++) {
        pos[i * 3 + 0] += pSpeeds[i].vx;
        pos[i * 3 + 1] += pSpeeds[i].vy;
        if (Math.abs(pos[i * 3 + 0]) > 25) pSpeeds[i].vx *= -1;
        if (Math.abs(pos[i * 3 + 1]) > 18) pSpeeds[i].vy *= -1;
      }
      pGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }
    animate();
  }

  /* ============================================================
     3b. HERO BILLBOARD — entrance + parallax foto + scroll layers
  ============================================================ */

  function initVisionLens() {
    var wrap = $('.p-bb__photo-wrap');
    if (!wrap || !$('.p-bb__lens-layer', wrap)) return;

    var hideTimer;

    function moveLens(event) {
      var rect = wrap.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      var x = Math.max(5, Math.min(95, ((event.clientX - rect.left) / rect.width) * 100));
      var y = Math.max(5, Math.min(95, ((event.clientY - rect.top) / rect.height) * 100));
      wrap.style.setProperty('--p-lens-x', x.toFixed(2) + '%');
      wrap.style.setProperty('--p-lens-y', y.toFixed(2) + '%');
    }

    wrap.addEventListener('pointerenter', function (event) {
      if (event.pointerType === 'touch') return;
      moveLens(event);
      wrap.classList.add('is-lens-active');
    });

    wrap.addEventListener('pointermove', function (event) {
      if (event.pointerType === 'touch') return;
      moveLens(event);
    }, { passive: true });

    wrap.addEventListener('pointerleave', function () {
      wrap.classList.remove('is-lens-active');
    });

    // Touch devices get a tap interaction plus one short introductory scan.
    wrap.addEventListener('pointerdown', function (event) {
      if (event.pointerType !== 'touch') return;
      clearTimeout(hideTimer);
      wrap.classList.remove('is-auto-scanning');
      moveLens(event);
      wrap.classList.add('is-lens-active');
      hideTimer = setTimeout(function () {
        wrap.classList.remove('is-lens-active');
      }, 1400);
    }, { passive: true });

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var mobile = window.matchMedia && window.matchMedia('(max-width: 640px)').matches;
    if (mobile && !reduceMotion) wrap.classList.add('is-auto-scanning');
  }

  function initCardSpotlights() {
    $$('.p-research-card').forEach(function (card) {
      card.addEventListener('pointermove', function (event) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--p-spot-x', (event.clientX - rect.left) + 'px');
        card.style.setProperty('--p-spot-y', (event.clientY - rect.top) + 'px');
      }, { passive: true });
    });
  }

  // Ridimensiona il titolo usando la larghezza realmente disponibile.
  // Cambiare il font-size (invece di scaleX) mantiene intatte le proporzioni
  // delle lettere e funziona anche con font scaling/accessibility del browser.
  function fitIntelBar() {
    var intel = $('.p-bb__intel');
    if (!intel) return;
    var span = intel.querySelector('span');
    if (!span) return;
    span.style.fontSize = '';

    var availableWidth = Math.max(0, intel.clientWidth - 32);
    var naturalWidth = span.scrollWidth;
    if (!availableWidth || naturalWidth <= availableWidth) return;

    var naturalSize = parseFloat(window.getComputedStyle(span).fontSize);
    var fittedSize = Math.max(18, naturalSize * availableWidth / naturalWidth);
    span.style.fontSize = fittedSize.toFixed(2) + 'px';
  }

  function initBillboardHero() {
    var isBillboard = !!$('.p-hero--billboard');
    if (!isBillboard) return;

    // Adatta la larghezza subito e al resize
    fitIntelBar();
    var resizeT;
    window.addEventListener('resize', function () {
      clearTimeout(resizeT);
      resizeT = setTimeout(fitIntelBar, 80);
    }, { passive: true });

    // Web fonts can change the measured word width after first paint.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fitIntelBar);
    }

    if ('ResizeObserver' in window) {
      new ResizeObserver(fitIntelBar).observe($('.p-bb__intel'));
    }

    var overline  = $('.p-bb__overline');
    var vision    = $('.p-bb__vision');
    var photoWrap = $('.p-bb__photo-wrap');
    var intel     = $('.p-bb__intel');
    var photo     = $('.p-bb__photo');

    // Utility: mostra tutti gli elementi senza animazione
    function showAllImmediate() {
      [overline, vision, photoWrap, intel].forEach(function(el) {
        if (!el) return;
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.filter = '';
        el.classList.add('is-visible');
      });
    }

    var hero = $('.p-hero--billboard');

    // ── Mobile (< 768px): CSS entrance via classe, niente GSAP ──
    if (window.innerWidth < 768) {
      // Triggera le animazioni CSS mobile aggiungendo la classe dopo 1 frame
      requestAnimationFrame(function() {
        if (hero) hero.classList.add('p-hero--ready');
      });
      return;
    }

    // ── Fallback senza GSAP (desktop) ────────────────────────
    if (typeof gsap === 'undefined') {
      showAllImmediate();
      return;
    }

    // ── Entrance timeline ────────────────────────────────────
    var tl = gsap.timeline({ delay: 0.1 });

    // 1. "TRANSFORMING" scrosciante dall'alto
    if (overline) tl.to(overline, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out'
    });

    // 2. "VISION" sale dal basso con blur (effetto cinema)
    if (vision) tl.fromTo(vision,
      { opacity: 0, y: 60, filter: 'blur(18px)' },
      { opacity: 1, y: 0,  filter: 'blur(0px)', duration: 1.1, ease: 'expo.out' },
      '-=0.2'
    );

    // 3. Foto: fade in sul WRAP (preserva il CSS translate), scale sull'IMG interna
    //    NON animare scale su photoWrap: GSAP bakerebbe translate(-50%,-44%) in px
    //    e la posizione divergerebbe dopo resize o caricamento immagine.
    if (photoWrap) tl.to(photoWrap,
      { opacity: 1, duration: 0.9, ease: 'power2.out' },
      '-=0.6'
    );
    if (photo) tl.fromTo(photo,
      { scale: 0.86 },
      { scale: 1, duration: 1.0, ease: 'power3.out' },
      '<'  // parte insieme al fade del wrap
    );

    // 4. "INTELLIGENCE" barra verde sale da sotto
    if (intel) tl.to(intel,
      { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)' },
      '-=0.5'
    );

    // ── Parallax scroll (solo testo, NON la foto) ─────────────
    // La foto rimane ferma — serve come ancora visiva.
    // VISION e INTEL si muovono a velocità diverse per la profondità.
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // "VISION" va su più veloce (piano lontano)
      if (vision) gsap.to(vision, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6
        }
      });

      // "INTELLIGENCE" va giù lentamente (piano più vicino)
      if (intel) gsap.to(intel, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.0
        }
      });

      // Onde: drift orizzontale al scroll
      var waves = $$('.p-wave');
      waves.forEach(function(wave, i) {
        gsap.to(wave, {
          xPercent: (i % 2 === 0 ? -8 : 8),
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1 + i * 0.3
          }
        });
      });
    }
  }

  /* ============================================================
     5. SCROLL REVEAL (IntersectionObserver)
  ============================================================ */
  function initScrollReveal() {
    var targets = $$('.p-reveal, .p-reveal-left, .p-reveal-right, .p-reveal-scale, .p-chat__msg--reveal');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    // Stagger automatico delle research card da sinistra a destra.
    // Il delay riparte a ogni riga della griglia a tre colonne.
    var revealRight = $$('.p-reveal-right');
    revealRight.forEach(function (el, i) {
      var col = i % 3;
      el.style.transitionDelay = (col * 100) + 'ms';
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ============================================================
     5b. PROJECT MINI CARDS — staggered reveal + GSAP tilt
  ============================================================ */
  function initProjectCards() {
    // reveal con delay CSS var
    var minis = $$('.p-proj-mini');
    if (!minis.length) return;

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    minis.forEach(function (el) { obs.observe(el); });

    // GSAP scroll: featured project parallax image
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      var feat = $('.p-proj-featured__img img');
      if (feat) {
        gsap.to(feat, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: '.p-proj-featured',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        });
      }

      // talk cards staggered entrance
      $$('.p-talk-card').forEach(function (card, i) {
        gsap.fromTo(card,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none'
            },
            delay: i * 0.12
          }
        );
      });

      // app strip cards staggered
      $$('.p-app-card').forEach(function (card, i) {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none'
            },
            delay: i * 0.08
          }
        );
      });
    }
  }

  /* ============================================================
     6. GSAP SECTION PARALLAX (scroll)
  ============================================================ */
  function initScrollParallax() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Parallax each section slightly
    $$('.p-section').forEach(function (section) {
      gsap.fromTo(section,
        { y: 0 },
        {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        }
      );
    });

  }

  /* ============================================================
     6b. KINETIC SECTION TYPOGRAPHY
  ============================================================ */
  function initKineticSections() {
    var sections = $$('.p-section[data-kinetic]');
    if (!sections.length) return;

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    var ticking = false;

    function update() {
      var viewportH = window.innerHeight || 1;
      sections.forEach(function (section, i) {
        var rect = section.getBoundingClientRect();
        var distance = (rect.top + rect.height * 0.5 - viewportH * 0.5) / (viewportH + rect.height);
        var direction = i % 2 === 0 ? 1 : -1;
        var shift = Math.max(-7, Math.min(7, distance * 14 * direction));
        section.style.setProperty('--p-kinetic-x', shift.toFixed(2) + 'vw');
      });
      ticking = false;
    }

    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    update();
  }

  /* ============================================================
     7. ACTIVE NAV LINK (IntersectionObserver)
  ============================================================ */
  function initActiveNav() {
    var sections = $$('[data-section]');
    var links    = $$('.p-nav__link[data-nav]');
    var journeyLinks = $$('.p-journey__link[data-journey]');
    if (!sections.length || (!links.length && !journeyLinks.length)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.dataset.section;
        links.forEach(function (l) {
          if (l.dataset.nav === id) l.classList.add('active');
          else l.classList.remove('active');
        });
        journeyLinks.forEach(function (l) {
          if (l.dataset.journey === id) {
            l.classList.add('active');
            l.setAttribute('aria-current', 'true');
          } else {
            l.classList.remove('active');
            l.removeAttribute('aria-current');
          }
        });
      });
    }, {
      threshold: 0,
      // A narrow viewport band also works for very tall sections such as Research.
      rootMargin: '-25% 0px -65% 0px'
    });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ============================================================
     INIT
  ============================================================ */
  function init() {
    initProgressBar();
    initNav();
    initScrollReveal();
    initProjectCards();
    initVisionLens();
    initCardSpotlights();
    initBillboardHero();
    initKineticSections();
    initActiveNav();

    // Three.js and GSAP load async — wait for them
    function waitForLibs(tries) {
      if (typeof THREE !== 'undefined') initThreeHero();
      else if (tries > 0) setTimeout(function () { waitForLibs(tries - 1); }, 150);

      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') initScrollParallax();
      else if (tries > 0) setTimeout(function () {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') initScrollParallax();
      }, 300);
    }
    waitForLibs(20);
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', init);
  else init();

})();
