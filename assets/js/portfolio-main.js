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
        color: Math.random() > 0.6 ? 0xffc400 : 0xff6a2a,
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
      color: 0xffc400,
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
      color: 0xffc400,
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
    var hero = $('.p-hero--billboard');
    var photo = $('.p-bb__photo--base', wrap);
    var label = $('[data-lens-label]', wrap);
    if (!wrap || !hero || !photo || !$('.p-bb__lens-layer', wrap)) return;

    var hideTimer;
    var moveFrame;
    var pendingPoint;
    var alphaMap;

    function buildAlphaMap() {
      if (!photo.naturalWidth || !photo.naturalHeight) return;
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) return;
      canvas.width = 96;
      canvas.height = Math.max(1, Math.round(96 * photo.naturalHeight / photo.naturalWidth));
      try {
        context.drawImage(photo, 0, 0, canvas.width, canvas.height);
        alphaMap = {
          width: canvas.width,
          height: canvas.height,
          pixels: context.getImageData(0, 0, canvas.width, canvas.height).data
        };
      } catch (error) {
        alphaMap = null;
      }
    }

    function personCoverage(localX, localY, rect) {
      if (!alphaMap || !photo.naturalWidth || !photo.naturalHeight) return 0;
      var scale = Math.max(rect.width / photo.naturalWidth, rect.height / photo.naturalHeight);
      var renderedWidth = photo.naturalWidth * scale;
      var renderedHeight = photo.naturalHeight * scale;
      var offsetX = (rect.width - renderedWidth) / 2;
      var offsetY = (rect.height - renderedHeight) * 0.4;
      var radius = Math.min(rect.width, rect.height) * 0.28;
      var occupied = 0;
      var sampled = 0;
      var grid = 15;

      for (var row = 0; row < grid; row += 1) {
        for (var col = 0; col < grid; col += 1) {
          var dx = ((col + 0.5) / grid * 2 - 1) * radius;
          var dy = ((row + 0.5) / grid * 2 - 1) * radius;
          if (dx * dx + dy * dy > radius * radius) continue;
          sampled += 1;
          var pointX = localX + dx;
          var pointY = localY + dy;
          if (pointX < 0 || pointX >= rect.width || pointY < 0 || pointY >= rect.height) continue;

          var sourceX = (pointX - offsetX) / renderedWidth;
          var sourceY = (pointY - offsetY) / renderedHeight;
          var mapX = Math.max(0, Math.min(alphaMap.width - 1, Math.floor(sourceX * alphaMap.width)));
          var mapY = Math.max(0, Math.min(alphaMap.height - 1, Math.floor(sourceY * alphaMap.height)));
          var pixel = (mapY * alphaMap.width + mapX) * 4;
          var alpha = alphaMap.pixels[pixel + 3];
          var light = alphaMap.pixels[pixel] + alphaMap.pixels[pixel + 1] + alphaMap.pixels[pixel + 2];
          if (alpha > 28 && light > 24) occupied += 1;
        }
      }
      return sampled ? occupied / sampled : 0;
    }

    function renderLens(clientX, clientY) {
      var rect = wrap.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      var localX = clientX - rect.left;
      var localY = clientY - rect.top;
      var x = ((clientX - rect.left) / rect.width) * 100;
      var y = ((clientY - rect.top) / rect.height) * 100;
      wrap.style.setProperty('--p-lens-x', x.toFixed(2) + '%');
      wrap.style.setProperty('--p-lens-y', y.toFixed(2) + '%');
      if (label) {
        var score = Math.min(99.8, personCoverage(localX, localY, rect) * 112);
        label.textContent = 'PERSON  ' + score.toFixed(1) + '%';
      }
    }

    function moveLens(event) {
      pendingPoint = { x: event.clientX, y: event.clientY };
      if (moveFrame) return;
      moveFrame = window.requestAnimationFrame(function () {
        moveFrame = null;
        if (pendingPoint) renderLens(pendingPoint.x, pendingPoint.y);
      });
    }

    hero.addEventListener('pointerenter', function (event) {
      if (event.pointerType === 'touch') return;
      moveLens(event);
      wrap.classList.add('is-lens-active');
    });

    hero.addEventListener('pointermove', function (event) {
      if (event.pointerType === 'touch') return;
      moveLens(event);
    }, { passive: true });

    hero.addEventListener('pointerleave', function () {
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
    if (photo.complete) buildAlphaMap();
    else photo.addEventListener('load', buildAlphaMap, { once: true });
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
    var targets = $$('.p-reveal, .p-reveal-left, .p-reveal-right, .p-reveal-scale');
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
     5a. NOTIFICATION STORM — scroll-driven pressure buildup
  ============================================================ */
  function initNotificationStorm() {
    var storms = $$('[data-notification-storm]');
    if (!storms.length) return;

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ticking = false;

    function clamp(value, min, max) {
      return Math.min(max, Math.max(min, value));
    }

    function easeOutCubic(value) {
      return 1 - Math.pow(1 - value, 3);
    }

    function seededUnit(seed) {
      var value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
      return value - Math.floor(value);
    }

    function setCardPosition(card, index) {
      card.style.setProperty('--storm-x', (seededUnit(index + 1) * 36 - 18).toFixed(1) + 'vw');
      card.style.setProperty('--storm-y', (seededUnit(index + 101) * 38 - 19).toFixed(1) + 'vh');
      card.style.setProperty('--storm-mobile-x', (seededUnit(index + 201) * 8 - 4).toFixed(1) + 'vw');
      card.style.setProperty('--storm-mobile-y', (seededUnit(index + 301) * 32 - 16).toFixed(1) + 'vh');
      card.style.setProperty('--storm-rotate', (seededUnit(index + 401) * 6 - 3).toFixed(1) + 'deg');
    }

    function createNotification(message, index) {
      var card = document.createElement('article');
      var icon = document.createElement('span');
      var copy = document.createElement('p');

      card.className = 'p-notification';
      icon.className = 'p-notification__icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = message.icon || '💬';
      copy.textContent = message.text;
      card.appendChild(icon);
      card.appendChild(copy);
      setCardPosition(card, index);
      var order = message.total === 1 ? 0 : index / (message.total - 1);
      card._stormStart = (1 - Math.pow(1 - order, 1.8)) * 0.82;
      card.style.setProperty('--storm-z', String(index + 1));
      return card;
    }

    function parseJsonLines(raw) {
      return raw.split(/\r?\n/).reduce(function (messages, line, index) {
        var trimmed = line.trim();
        if (!trimmed) return messages;
        try {
          var message = JSON.parse(trimmed);
          if (message && typeof message.text === 'string' && message.text.trim()) {
            messages.push({ icon: String(message.icon || '💬'), text: message.text.trim() });
          }
        } catch (error) {
          console.warn('Notification line ' + (index + 1) + ' is not valid JSON and was skipped.');
        }
        return messages;
      }, []);
    }

    function renderStorm(storm, messages) {
      var stage = $('[data-notification-stage]', storm);
      if (!stage) return;
      stage.textContent = '';
      messages.forEach(function (message, index) {
        stage.appendChild(createNotification({ icon: message.icon, text: message.text, total: messages.length }, index));
      });

      // Roughly one viewport per 17 messages, plus a generous reading buffer.
      // The last card arrives at 82%, leaving about 1.5 viewports before release.
      storm.style.height = Math.max(650, 260 + messages.length * 5.8) + 'vh';
      storm.dataset.messageCount = String(messages.length);
      storm.classList.add('is-ready');
    }

    function showLoadError(storm) {
      var stage = $('[data-notification-stage]', storm);
      if (!stage) return;
      stage.textContent = '';
      var message = document.createElement('p');
      message.className = 'p-notification-storm__loading is-error';
      message.textContent = 'the notifications got lost too. refresh to try again.';
      stage.appendChild(message);
      storm.style.height = '100vh';
    }

    function updateStorm(storm) {
      var notifications = $$('.p-notification', storm);
      var counter = $('[data-storm-count]', storm);
      var label = $('[data-storm-label]', storm);
      var hint = $('.p-notification-storm__hint', storm);
      if (!notifications.length) return;
      var rect = storm.getBoundingClientRect();
      if (rect.bottom < -window.innerHeight || rect.top > window.innerHeight * 1.75) return;
      var distance = Math.max(1, storm.offsetHeight - window.innerHeight);
      var leadIn = window.innerHeight * 0.55;
      var progress = clamp((leadIn - rect.top) / (distance + leadIn), 0, 1);
      var opened = 0;

      notifications.forEach(function (notification, index) {
        if (progress > notification._stormStart) opened += 1;
      });

      // Only the newest cards remain animated. Older ones become cheap static ghosts,
      // preserving the crowded look without compositing 100+ moving layers per frame.
      var activeFloor = Math.max(0, opened - (window.innerWidth <= 768 ? 10 : 12));
      var buriedFloor = Math.max(0, opened - 60);

      notifications.forEach(function (notification, index) {
        // Wide gaps first, then an accelerating cascade that crowds the final frames.
        var start = notification._stormStart;
        var age = progress - start;
        if (age <= 0) {
          if (notification.dataset.stormState !== 'future') {
            notification.dataset.stormState = 'future';
            notification.classList.remove('is-storm-ghost', 'is-storm-buried');
            notification.style.removeProperty('--storm-opacity');
            notification.style.removeProperty('--storm-scale');
            notification.style.removeProperty('--storm-lift');
          }
          return;
        }

        if (index < buriedFloor) {
          if (notification.dataset.stormState !== 'buried') {
            notification.dataset.stormState = 'buried';
            notification.classList.remove('is-storm-ghost');
            notification.classList.add('is-storm-buried');
          }
          return;
        }

        if (index < activeFloor || age > 0.42) {
          if (notification.dataset.stormState !== 'ghost') {
            notification.dataset.stormState = 'ghost';
            notification.classList.remove('is-storm-buried');
            notification.classList.add('is-storm-ghost');
            notification.style.setProperty('--storm-opacity', '0.085');
            notification.style.setProperty('--storm-scale', '0.82');
            notification.style.setProperty('--storm-lift', '-28px');
          }
          return;
        }

        notification.dataset.stormState = 'active';
        notification.classList.remove('is-storm-ghost', 'is-storm-buried');
        var enter = clamp(age / 0.055, 0, 1);
        var easedEnter = easeOutCubic(enter);
        var fade = age > 0.19 ? clamp((age - 0.19) / 0.34, 0, 1) : 0;
        var opacity = age <= 0 ? 0 : Math.max(0.11, easedEnter * (1 - fade * 0.89));
        var scale = 0.68 + easedEnter * 0.4 - clamp((age - 0.08) / 0.45, 0, 1) * 0.22;
        var lift = 34 * (1 - easedEnter) - clamp(age - 0.12, 0, 0.5) * 105;

        notification.style.setProperty('--storm-opacity', opacity.toFixed(3));
        notification.style.setProperty('--storm-scale', scale.toFixed(3));
        notification.style.setProperty('--storm-lift', lift.toFixed(1) + 'px');
      });

      if (counter) counter.textContent = String(opened).padStart(2, '0');
      if (label) {
        if (opened < notifications.length) label.textContent = 'incoming';
        else if (progress < 0.96) label.textContent = 'all received · breathe';
        else label.textContent = 'release';
      }
      if (hint) hint.style.opacity = String(clamp(1 - progress * 7, 0, 1));
    }

    function updateAll() {
      storms.forEach(updateStorm);
      ticking = false;
    }

    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateAll);
    }

    function copyText(value) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(value);
      }
      return new Promise(function (resolve, reject) {
        var textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy') ? resolve() : reject(new Error('Copy failed'));
        } catch (error) {
          reject(error);
        }
        textarea.remove();
      });
    }

    var form = $('[data-notification-form]');
    if (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        var iconField = $('[name="icon"]', form);
        var messageField = $('[name="message"]', form);
        var status = $('[data-notification-status]', form);
        var preview = $('[data-notification-preview]');
        var text = messageField ? messageField.value.trim() : '';
        var icon = iconField ? iconField.value : '💬';
        if (!text) return;

        var jsonLine = JSON.stringify({ icon: icon, text: text });
        // Open synchronously from the click so browsers do not block the new tab.
        window.open(form.dataset.editorUrl, '_blank', 'noopener');
        copyText(jsonLine).then(function () {
          if (status) status.textContent = 'Got it. GitHub is open — paste the copied line at the bottom and hit “Propose changes”.';
        }).catch(function () {
          if (status) status.textContent = 'GitHub is open. Add this as the last line: ' + jsonLine;
        });

        if (preview) {
          preview.textContent = '';
          var previewIcon = document.createElement('span');
          var previewText = document.createElement('p');
          previewIcon.textContent = icon;
          previewText.textContent = text;
          preview.appendChild(previewIcon);
          preview.appendChild(previewText);
          preview.hidden = false;
        }
      });
    }

    Promise.all(storms.map(function (storm) {
      return fetch(storm.dataset.source, { cache: 'no-cache' })
        .then(function (response) {
          if (!response.ok) throw new Error('HTTP ' + response.status);
          return response.text();
        })
        .then(function (raw) {
          var messages = parseJsonLines(raw);
          if (!messages.length) throw new Error('No valid notifications');
          renderStorm(storm, messages);
          if (reduceMotion) {
            storm.classList.add('is-static');
            var counter = $('[data-storm-count]', storm);
            var label = $('[data-storm-label]', storm);
            if (counter) counter.textContent = String(messages.length).padStart(2, '0');
            if (label) label.textContent = 'messages';
          }
        })
        .catch(function (error) {
          console.error('Could not load notification storm:', error);
          showLoadError(storm);
        });
    })).then(function () {
      // The storm grows after its messages load. Re-apply an early anchor jump so
      // links to Projects/Talks still land correctly after that layout expansion.
      if (window.location.hash) {
        var hashTarget = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
        if (hashTarget) {
          window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () {
              var root = document.documentElement;
              var previousBehavior = root.style.scrollBehavior;
              root.style.scrollBehavior = 'auto';
              hashTarget.scrollIntoView({ block: 'start' });
              window.requestAnimationFrame(function () {
                root.style.scrollBehavior = previousBehavior;
              });
            });
          });
        }
      }

      if (!reduceMotion) {
        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', requestUpdate, { passive: true });
        updateAll();
      }
    });
  }

  /* ============================================================
     5b. PROJECT FIELD + TALK REEL — staggered editorial motion
  ============================================================ */
  function initProjectCards() {
    var pieces = $$('[data-project-piece]');
    var talks = $$('.p-talk-card');
    if (!pieces.length && !talks.length) return;

    if ('IntersectionObserver' in window && pieces.length) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      pieces.forEach(function (el) { obs.observe(el); });
    }

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      pieces.forEach(function (piece, i) {
        var image = $('.p-project-piece__media img', piece);
        if (!image) return;
        gsap.fromTo(image,
          { yPercent: i % 2 === 0 ? -4 : 4, scale: 1.04 },
          {
          yPercent: i % 2 === 0 ? 5 : -5,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: piece,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1
          }
        });
      });

      talks.forEach(function (card, i) {
        var fromLeft = i % 2 === 0;
        gsap.fromTo(card,
          {
            opacity: 0,
            x: fromLeft ? -42 : 42,
            y: 54,
            rotate: fromLeft ? -1.4 : 1.4,
            scale: 0.97,
            clipPath: 'inset(8% 0 8% 0)'
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            clipPath: 'inset(0% 0 0% 0)',
            duration: 0.82,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 86%',
              toggleActions: 'play none none none'
            },
            delay: i * 0.1
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
     6a. EDITORIAL MOTION — connective line, type strip, image treatment
  ============================================================ */
  function initEditorialMotion() {
    var storyline = $('[data-storyline]');
    var storylinePath = $('[data-storyline-path]');
    var band = $('[data-scroll-band]');
    var bandTrack = $('[data-scroll-band-track]');
    var visualBreaks = $$('[data-visual-break]');
    var scribbles = $$('[data-scroll-scribble]');
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ticking = false;

    function clamp(value, min, max) {
      return Math.min(max, Math.max(min, value));
    }

    function syncStorylineHeight() {
      if (!storyline) return;
      storyline.style.height = Math.max(window.innerHeight, document.documentElement.scrollHeight - window.innerHeight) + 'px';
    }

    function update() {
      var viewportH = window.innerHeight || 1;
      var maxScroll = Math.max(1, document.documentElement.scrollHeight - viewportH);
      var pageProgress = clamp(window.scrollY / maxScroll, 0, 1);

      if (storylinePath) storylinePath.style.strokeDashoffset = (1 - pageProgress).toFixed(4);

      if (band && bandTrack) {
        var bandRect = band.getBoundingClientRect();
        if (bandRect.bottom > -100 && bandRect.top < viewportH + 100) {
          var bandProgress = clamp((viewportH - bandRect.top) / (viewportH + bandRect.height), 0, 1);
          bandTrack.style.transform = 'translate3d(' + (-18 + bandProgress * 24).toFixed(2) + 'vw,0,0)';
        }
      }

      visualBreaks.forEach(function (section) {
        var rect = section.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > viewportH + 100) return;
        var progress = clamp((viewportH - rect.top) / (viewportH + rect.height), 0, 1);
        var media = $('[data-visual-break-media]', section);
        if (!media) return;
        media.style.setProperty('--p-break-gray', (100 - progress * 88).toFixed(1) + '%');
        media.style.setProperty('--p-break-contrast', (1.26 - progress * 0.16).toFixed(3));
        media.style.setProperty('--p-break-scale', (1.14 - progress * 0.08).toFixed(3));
        media.style.setProperty('--p-break-y', (-2 + progress * 4).toFixed(2) + '%');
      });

      scribbles.forEach(function (scribble) {
        var rect = scribble.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > viewportH + 100) return;
        var progress = clamp((viewportH - rect.top) / (viewportH + rect.height), 0, 1);
        scribble.style.setProperty('--p-scribble-y', ((0.5 - progress) * 28).toFixed(1) + 'px');
      });

      ticking = false;
    }

    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    syncStorylineHeight();
    if (reduceMotion) {
      if (storylinePath) storylinePath.style.strokeDashoffset = '0';
      visualBreaks.forEach(function (section) {
        var media = $('[data-visual-break-media]', section);
        if (media) {
          media.style.setProperty('--p-break-gray', '18%');
          media.style.setProperty('--p-break-scale', '1.06');
        }
      });
      return;
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', function () {
      syncStorylineHeight();
      requestUpdate();
    }, { passive: true });
    if ('ResizeObserver' in window && storyline) {
      new ResizeObserver(function () {
        syncStorylineHeight();
        requestUpdate();
      }).observe(document.body);
    }
    update();
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
    initNotificationStorm();
    initEditorialMotion();
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
