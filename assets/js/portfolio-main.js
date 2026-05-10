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

  // Scala la span di INTELLIGENCE in modo che non esca dal viewport
  function fitIntelBar() {
    var intel = $('.p-bb__intel');
    if (!intel) return;
    var span = intel.querySelector('span');
    if (!span) return;
    span.style.transform = ''; // reset
    var spanW = span.scrollWidth;
    var vw    = window.innerWidth;
    if (spanW > vw * 0.96) {
      var scale = (vw * 0.96) / spanW;
      span.style.transformOrigin = '50% 50%';
      span.style.transform = 'scaleX(' + scale + ')';
    } else {
      span.style.transformOrigin = '50% 50%';
      span.style.transform = '';
    }
  }

  // Use Fitty to better fit large headline text into available width
  function initFittyForHero() {
    // guard
    if (typeof fitty === 'undefined') return;
    try {
      // Fitty on VISION (the big gradient word)
      var visionSpan = document.querySelector('.p-bb__vision span');
      if (visionSpan) {
        // limit size via options: minSize, maxSize (px)
        fitty(visionSpan, { minSize: 40, maxSize: 400, multiLine: false });
      }

      // Fitty on INTELLIGENCE bar
      var intelSpan = document.querySelector('.p-bb__intel span');
      if (intelSpan) {
        fitty(intelSpan, { minSize: 18, maxSize: 200, multiLine: false });
      }

      // Re-run fitIntelBar fallback resize logic after fitty settles
      window.addEventListener('resize', function () {
        setTimeout(function () { fitIntelBar(); }, 80);
      }, { passive: true });

      // Also re-run when the hero image loads (it can affect layout)
      var heroImg = document.querySelector('.p-bb__photo');
      if (heroImg) {
        if (heroImg.complete) fitIntelBar();
        else heroImg.addEventListener('load', fitIntelBar);
      }
    } catch (e) {
      // silent
      console.warn('fitty init failed', e);
    }
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
    });

    var overline  = $('.p-bb__overline');
    var vision    = $('.p-bb__vision');
    var photoWrap = $('.p-bb__photo-wrap');
    var intel     = $('.p-bb__intel');
    var footer    = $('.p-bb__footer');
    var photo     = $('.p-bb__photo');

    // Utility: mostra tutti gli elementi senza animazione
    function showAllImmediate() {
      [overline, vision, photoWrap, intel, footer].forEach(function(el) {
        if (!el) return;
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.filter = '';
        el.classList.add('is-visible');
      });
    }

    // ── Mobile (< 768px): niente GSAP/parallax, layout CSS gestisce tutto ──
    if (window.innerWidth < 768) {
      showAllImmediate();
      // Ri-controlla se ruota lo schermo
      window.addEventListener('resize', function() {
        if (window.innerWidth < 768) showAllImmediate();
      }, { passive: true });
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

    // 3. Foto emerge al centro con scale
    if (photoWrap) tl.fromTo(photoWrap,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1,   duration: 1.0, ease: 'power3.out' },
      '-=0.6'
    );

    // 4. "INTELLIGENCE" barra verde sale da sotto
    if (intel) tl.to(intel,
      { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)' },
      '-=0.5'
    );

    // 5. Footer stats + CTA
    if (footer) tl.to(footer,
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );

    // ── Parallax foto sullo scroll ────────────────────────────
    // La foto sale più lentamente del testo quando si scrolla giù
    if (typeof ScrollTrigger !== 'undefined' && photo) {
      gsap.registerPlugin(ScrollTrigger);

      var hero = $('.p-hero--billboard');

      // Foto: movimento verticale lento (parallax profondità)
      gsap.to(photo, {
        y: '-15%',
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });

      // "VISION" va su più veloce (piano lontano)
      if (vision) gsap.to(vision, {
        y: '-30%',
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8
        }
      });

      // "INTELLIGENCE" va giù lentamente (piano più vicino)
      if (intel) gsap.to(intel, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });

      // Onde: drift orizzontale al scroll
      var waves = $$('.p-wave');
      waves.forEach(function(wave, i) {
        gsap.to(wave, {
          x: (i % 2 === 0 ? '-8%' : '8%'),
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
     4. HERO TEXT ENTRANCE (GSAP) — layout classico (non billboard)
  ============================================================ */
  function initHeroEntrance() {
    // Se è il billboard, già gestito da initBillboardHero
    if ($('.p-hero--billboard')) return;

    if (typeof gsap === 'undefined') {
      $$('.p-hero__name-line > span').forEach(function (el) {
        el.style.transform = 'translateY(0)';
        el.style.opacity = '1';
      });
      var sub = $('.p-hero__subtitle');
      var cta = $('.p-hero__cta');
      var stats = $('.p-hero__stats');
      if (sub)   { sub.style.opacity = '1'; sub.style.transform = 'none'; }
      if (cta)   { cta.style.opacity = '1'; cta.style.transform = 'none'; }
      if (stats) { stats.style.opacity = '1'; stats.style.transform = 'none'; }
      return;
    }

    var tl = gsap.timeline({ delay: 0.3 });
    var lines = $$('.p-hero__name-line > span');
    if (lines.length) {
      tl.to(lines, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.12 });
    }
    tl.to('.p-hero__subtitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4');
    tl.to('.p-hero__cta',      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5');
    tl.to('.p-hero__stats',    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4');
  }

  /* ============================================================
     5. SCROLL REVEAL (IntersectionObserver)
  ============================================================ */
  function initScrollReveal() {
    var targets = $$('.p-reveal, .p-reveal-left, .p-reveal-scale');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

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

    // Number counter animation for stats
    $$('.p-stat__num[data-count]').forEach(function (el) {
      var target = parseInt(el.dataset.count);
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: function () {
          var obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: function () {
              el.textContent = Math.round(obj.val) + (el.dataset.suffix || '');
            }
          });
        }
      });
    });
  }

  /* ============================================================
     7. ACTIVE NAV LINK (IntersectionObserver)
  ============================================================ */
  function initActiveNav() {
    var sections = $$('[data-section]');
    var links    = $$('.p-nav__link[data-nav]');
    if (!sections.length || !links.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.dataset.section;
        links.forEach(function (l) {
          if (l.dataset.nav === id) l.classList.add('active');
          else l.classList.remove('active');
        });
      });
    }, { threshold: 0.4 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ============================================================
     8. PUBLICATIONS: LOAD FROM JSON
  ============================================================ */
  function initPublications() {
    var container = document.getElementById('pubContainer');
    if (!container) return;

    var skeleton = document.getElementById('pubSkeleton');

    fetch('/assets/data/scholar.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (skeleton) skeleton.style.display = 'none';
        if (!data || !data.publications || !data.publications.length) {
          container.innerHTML = '<p class="p-body" style="text-align:center;opacity:0.5;">Publications loading…</p>';
          return;
        }

        // Show top 8 by citation count
        var pubs = data.publications
          .sort(function (a, b) { return (b.citedBy || 0) - (a.citedBy || 0); })
          .slice(0, 8);

        container.innerHTML = pubs.map(function (p, i) {
          return '<article class="p-pub p-reveal" aria-label="' + (p.title || '') + '">'
            + '<div class="p-pub__year">' + (p.year || '—') + '</div>'
            + '<div class="p-pub__body">'
            +   '<h3 class="p-pub__title">'
            +     (p.url ? '<a href="' + p.url + '" target="_blank" rel="noopener" style="color:inherit;text-decoration:none;" onmouseover="this.style.color=\'var(--p-purple)\'" onmouseout="this.style.color=\'inherit\'">' : '')
            +     (p.title || 'Untitled')
            +     (p.url ? '</a>' : '')
            +   '</h3>'
            +   '<p class="p-pub__authors">' + (p.authors || '') + '</p>'
            +   '<span class="p-pub__venue">' + (p.venue || '') + '</span>'
            + '</div>'
            + '<div class="p-pub__cite" title="Citations">'
            +   '<span class="p-pub__cite-num">' + (p.citedBy || 0) + '</span>'
            +   '<span class="p-pub__cite-label">cit.</span>'
            + '</div>'
            + '</article>';
        }).join('');

        // Trigger reveal for newly added elements
        initScrollReveal();

        // Update stats if present
        var totalCites = data.publications.reduce(function (s, p) { return s + (p.citedBy || 0); }, 0);
        var elCites = document.querySelector('[data-count="citations"]');
        if (elCites) elCites.dataset.count = totalCites;
        var elPubs = document.querySelector('[data-count="publications"]');
        if (elPubs) elPubs.dataset.count = data.publications.length;
      })
      .catch(function () {
        if (skeleton) skeleton.style.display = 'none';
        container.innerHTML = '<p class="p-body" style="text-align:center;opacity:0.5;">See publications on <a href="https://scholar.google.com/citations?user=GIJ3h4AAAAAJ" target="_blank" style="color:var(--p-purple)">Google Scholar</a></p>';
      });
  }

  /* ============================================================
     INIT
  ============================================================ */
  function init() {
    initProgressBar();
    initNav();
    initScrollReveal();
    initProjectCards();
    initBillboardHero();  // billboard hero (nuovo design)
    initHeroEntrance();   // fallback per layout classico
    initActiveNav();
    initPublications();
    initFittyForHero();   // Fitty: adatta testo hero alla viewport

    // Ricalcola il font-size al resize (es. rotazione schermo)
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(fitHeroTitle, 80);
    });

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
