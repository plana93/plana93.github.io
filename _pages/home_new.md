---
layout: portfolio
title:
permalink: /
description: "AI Researcher specializing in Computer Vision, Egocentric Vision & Domain Adaptation. PhD @ Politecnico di Torino | ARGO Vision | Italian Institute of Technology."
---

<!-- ================================================================
     HERO — BILLBOARD EDITION
     Ispirato al concept "Transforming Vision Into Intelligence"
     con foto B&W, testo billboard, onde 3D e parallax GSAP
================================================================ -->
<section class="p-hero p-hero--billboard" id="home" aria-label="Hero section">

  <!-- Three.js canvas (sfondo rete neurale) -->
  <canvas id="heroCanvas" class="p-hero__canvas" aria-hidden="true"></canvas>

  <!-- SVG onde — layer decorativo animato -->
  <svg class="p-hero__waves" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice"
       aria-hidden="true" focusable="false">
    <g class="p-waves-group" stroke="var(--p-purple)" stroke-width="2.5" fill="none" opacity="0.55">
      <!-- 4 onde sinusoidali sfasate, animate via CSS/GSAP -->
      <path class="p-wave" d="M-100,300 C50,120 200,480 350,300 S650,120 800,300 S1050,480 1300,300"/>
      <path class="p-wave p-wave--2" d="M-100,340 C50,160 200,520 350,340 S650,160 800,340 S1050,520 1300,340"/>
      <path class="p-wave p-wave--3" d="M-100,260 C50,80  200,440 350,260 S650,80  800,260 S1050,440 1300,260"/>
      <path class="p-wave p-wave--4" d="M-100,310 C50,130 200,490 350,310 S650,130 800,310 S1050,490 1300,310"/>
    </g>
  </svg>

  <!-- ── LAYER 1: TRANSFORMING (overline) ── -->
  <div class="p-bb__overline p-bb__reveal" aria-hidden="true">TRANSFORMING</div>

  <!-- ── LAYER 2: VISION (top word, enorme, gradient) ── -->
  <div class="p-bb__vision p-bb__reveal" aria-label="">
    <span>VISION</span>
  </div>

  <!-- ── LAYER 3: foto B&W (centro, z-index medio) ── -->
  <div class="p-bb__photo-wrap p-bb__reveal">
    <img src="{{ '/assets/img/io_without_bg.png' | relative_url }}"
         alt="Mirco Planamente"
         class="p-bb__photo"
         loading="eager"
         draggable="false" />
    <!-- etichetta "Into" in stile serif italic -->
    <span class="p-bb__into" aria-hidden="true"><em>Into</em></span>
  </div>

  <!-- ── LAYER 4: INTELLIGENCE (bottom, highlight bar verde) ── -->
  <div class="p-bb__intel p-bb__reveal" aria-label="Vision Into Intelligence">
    <span>INTELLIGENCE</span>
  </div>

  <!-- ── LAYER 5: CTA in basso a sinistra ── -->
  <div class="p-bb__footer p-bb__reveal">
    <div class="p-hero__cta">
      <a href="#research"     class="p-btn p-btn--primary">Explore Research</a>
      <a href="#publications" class="p-btn p-btn--outline">Publications</a>
      <a href="https://scholar.google.com/citations?user=GIJ3h4AAAAAJ&hl=en"
         target="_blank" rel="noopener" class="p-btn p-btn--outline">Scholar ↗</a>
    </div>
  </div>

  <!-- nome accessibile per screen reader -->
  <h1 class="p-bb__sr-only" aria-label="Mirco Planamente — AI Researcher">
    Mirco Planamente — Transforming Vision Into Intelligence
  </h1>

  <!-- Scroll hint -->
  <div class="p-hero__scroll-hint" aria-hidden="true">
    <span>scroll</span>
    <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  </div>

</section>

<!-- ================================================================
     RESEARCH IDENTITY
================================================================ -->
<section class="p-section" id="research" data-section="research" aria-label="Research areas">
  <div class="p-container">

    <div class="p-section-header p-reveal">
      <span class="p-overline">From Scholar Profile</span>
      <h2 class="p-h2">Research <span class="p-accent">Identity</span></h2>
      <p class="p-body">
        Five interconnected research areas that form the foundation of my work —
        from fundamental computer vision to applied industrial systems.
      </p>
    </div>

    <div class="p-research-grid">

      <div class="p-research-card p-reveal-right">
        <div class="p-card__icon" style="background:rgba(110,86,255,0.15)">👁️</div>
        <span class="p-card__tag">[01] Primary Focus</span>
        <h3 class="p-research-card__area">Egocentric Vision</h3>
        <p class="p-research-card__desc">
          First-person action recognition &amp; understanding from wearable cameras.
          Bridging human activity analysis with computer vision in unconstrained environments.
        </p>
        <div class="p-research-card__papers">
          <span class="p-research-card__venue">CVPR</span>
          <span class="p-research-card__venue">WACV</span>
          <span class="p-research-card__venue">IEEE RA-L</span>
        </div>
      </div>

      <div class="p-research-card p-reveal-right">
        <div class="p-card__icon" style="background:rgba(0,212,170,0.12)">🎬</div>
        <span class="p-card__tag">[02] Core Research</span>
        <h3 class="p-research-card__area">Action Recognition</h3>
        <p class="p-research-card__desc">
          Temporal video understanding and classification. Designing architectures that
          capture motion dynamics across diverse domains and perspectives.
        </p>
        <div class="p-research-card__papers">
          <span class="p-research-card__venue">ICPR</span>
          <span class="p-research-card__venue">IEEE</span>
        </div>
      </div>

      <div class="p-research-card p-reveal-right">
        <div class="p-card__icon" style="background:rgba(110,86,255,0.15)">🔄</div>
        <span class="p-card__tag">[03] Generalization</span>
        <h3 class="p-research-card__area">Domain Adaptation</h3>
        <p class="p-research-card__desc">
          Building AI systems that generalize across domains without retraining.
          Unsupervised and semi-supervised transfer learning for cross-domain robustness.
        </p>
        <div class="p-research-card__papers">
          <span class="p-research-card__venue">EPIC-KITCHENS</span>
          <span class="p-research-card__venue">CVPR</span>
        </div>
      </div>

      <div class="p-research-card p-reveal-right">
        <div class="p-card__icon" style="background:rgba(255,77,109,0.1)">🔍</div>
        <span class="p-card__tag">[04] Safety & QA</span>
        <h3 class="p-research-card__area">Anomaly Detection</h3>
        <p class="p-research-card__desc">
          Identifying rare, unusual or dangerous events in industrial and video streams.
          Unsupervised and one-class approaches for zero-shot anomaly localization.
        </p>
        <div class="p-research-card__papers">
          <span class="p-research-card__venue">Industry</span>
          <span class="p-research-card__venue">Production</span>
        </div>
      </div>

      <div class="p-research-card p-reveal-right">
        <div class="p-card__icon" style="background:rgba(0,212,170,0.12)">🗺️</div>
        <span class="p-card__tag">[05] Scene Understanding</span>
        <h3 class="p-research-card__area">Semantic Segmentation</h3>
        <p class="p-research-card__desc">
          Pixel-wise classification for dense scene understanding.
          Applications in autonomous systems, industrial inspection and AR interfaces.
        </p>
        <div class="p-research-card__papers">
          <span class="p-research-card__venue">Real-world</span>
          <span class="p-research-card__venue">IIT</span>
        </div>
      </div>

      <!-- Cross-cutting: Multi-Modal -->
      <div class="p-research-card p-reveal-right" style="border-color:rgba(0,212,170,0.3)">
        <div class="p-card__icon" style="background:rgba(0,212,170,0.12)">🎵</div>
        <span class="p-card__tag" style="color:var(--p-teal)">[06] Fusion</span>
        <h3 class="p-research-card__area">Multi-Modal Learning</h3>
        <p class="p-research-card__desc">
          Integrating audio, visual and sensor signals for comprehensive scene understanding.
          Joint representation learning across modalities.
        </p>
        <div class="p-research-card__papers">
          <span class="p-research-card__venue" style="color:var(--p-teal);border-color:rgba(0,212,170,0.3);background:rgba(0,212,170,0.08)">Audio+Vision</span>
          <span class="p-research-card__venue" style="color:var(--p-teal);border-color:rgba(0,212,170,0.3);background:rgba(0,212,170,0.08)">IMU+RGB</span>
        </div>
      </div>

      <!-- Object Detection -->
      <div class="p-research-card p-reveal-right">
        <div class="p-card__icon" style="background:rgba(255,165,0,0.12)">🎯</div>
        <span class="p-card__tag">[07] Localization</span>
        <h3 class="p-research-card__area">Object Detection</h3>
        <p class="p-research-card__desc">
          Real-time and high-accuracy object detection pipelines for unconstrained scenes.
          From anchor-based to transformer-based detectors deployed in production.
        </p>
        <div class="p-research-card__papers">
          <span class="p-research-card__venue">YOLO</span>
          <span class="p-research-card__venue">DETR</span>
          <span class="p-research-card__venue">Industry</span>
        </div>
      </div>

      <!-- Object Recognition / Human Pose -->
      <div class="p-research-card p-reveal-right">
        <div class="p-card__icon" style="background:rgba(255,77,109,0.1)">🔎</div>
        <span class="p-card__tag">[08] Recognition</span>
        <h3 class="p-research-card__area">Object Recognition</h3>
        <p class="p-research-card__desc">
          Fine-grained visual recognition of objects across categories, instances and contexts.
          Metric learning and embedding-based approaches for few-shot and open-set scenarios.
        </p>
        <div class="p-research-card__papers">
          <span class="p-research-card__venue">Few-Shot</span>
          <span class="p-research-card__venue">Open-Set</span>
          <span class="p-research-card__venue">Retrieval</span>
        </div>
      </div>

      <!-- Human Pose -->
      <div class="p-research-card p-reveal-right">
        <div class="p-card__icon" style="background:rgba(255,77,109,0.1)">🧍</div>
        <span class="p-card__tag">[09] Body Understanding</span>
        <h3 class="p-research-card__area">Human Pose Estimation</h3>
        <p class="p-research-card__desc">
          Skeleton-based and heatmap-driven pose estimation for activity monitoring,
          action anticipation and human-machine interaction.
        </p>
        <div class="p-research-card__papers">
          <span class="p-research-card__venue">Skeleton</span>
          <span class="p-research-card__venue">HMI</span>
          <span class="p-research-card__venue">Wearable</span>
        </div>
      </div>

    </div>

    <!-- Problem Board — Chat style -->
    <div class="p-section-header p-reveal" style="margin-top:4rem">
      <span class="p-overline">Actual conversations. Actual pain.</span>
      <h3 class="p-h2" style="font-size:clamp(1.4rem,3vw,2rem)">Real <span class="p-accent">Industrial Problems</span></h3>
      <p class="p-body" style="max-width:52ch">
        don't panic. we'll figure it out.
      </p>
      <p class="p-chat-subtitle-it">mio padre dice sempre: <em>"calma e sangue freddo"</em></p>
    </div>

    <div class="p-chat p-chat--board">

      <div class="p-chat__msg p-chat__msg--them p-chat__msg--reveal" style="--chat-delay:0ms">
        <span class="p-chat__avatar">👷</span>
        <span class="p-chat__bubble">it was working fine yesterday. today it's broken. nothing changed</span>
      </div>

      <div class="p-chat__msg p-chat__msg--them p-chat__msg--reveal" style="--chat-delay:80ms">
        <span class="p-chat__avatar">🧑‍🔧</span>
        <span class="p-chat__bubble">why did it fail on this one? it looks the same as all the others</span>
      </div>

      <div class="p-chat__msg p-chat__msg--them p-chat__msg--reveal" style="--chat-delay:160ms">
        <span class="p-chat__avatar">👩‍💻</span>
        <span class="p-chat__bubble">we have only 3 defect images. how do I train a model?</span>
      </div>

      <div class="p-chat__msg p-chat__msg--them p-chat__msg--reveal" style="--chat-delay:240ms">
        <span class="p-chat__avatar">🧑‍🏭</span>
        <span class="p-chat__bubble">how many images do we actually need?</span>
      </div>

      <div class="p-chat__msg p-chat__msg--them p-chat__msg--reveal" style="--chat-delay:320ms">
        <span class="p-chat__avatar">👩‍🔬</span>
        <span class="p-chat__bubble">the model isn't learning anything</span>
      </div>

      <div class="p-chat__msg p-chat__msg--them p-chat__msg--reveal" style="--chat-delay:400ms">
        <span class="p-chat__avatar">👩‍💼</span>
        <span class="p-chat__bubble">they changed the setup last week. accuracy dropped 30 points. do I need to redo everything?</span>
      </div>

      <div class="p-chat__msg p-chat__msg--them p-chat__msg--reveal" style="--chat-delay:480ms">
        <span class="p-chat__avatar">🧑‍🔧</span>
        <span class="p-chat__bubble">new camera arrives monday. do we start from scratch AGAIN</span>
      </div>

      <div class="p-chat__msg p-chat__msg--them p-chat__msg--reveal" style="--chat-delay:560ms">
        <span class="p-chat__avatar">👩‍🏭</span>
        <span class="p-chat__bubble">the model forgot everything it learned before</span>
      </div>

      <div class="p-chat__msg p-chat__msg--them p-chat__msg--reveal" style="--chat-delay:640ms">
        <span class="p-chat__avatar">👷</span>
        <span class="p-chat__bubble">training takes 6 hours. every time. I can't keep doing this</span>
      </div>

      <div class="p-chat__msg p-chat__msg--them p-chat__msg--reveal" style="--chat-delay:720ms">
        <span class="p-chat__avatar">👩‍💻</span>
        <span class="p-chat__bubble">can this run on a phone?</span>
      </div>

      <div class="p-chat__msg p-chat__msg--them p-chat__msg--reveal" style="--chat-delay:800ms">
        <span class="p-chat__avatar">🧑‍🔬</span>
        <span class="p-chat__bubble">how do I even know what it's actually doing under the hood?</span>
      </div>

      <div class="p-chat__msg p-chat__msg--them p-chat__msg--reveal" style="--chat-delay:880ms">
        <span class="p-chat__avatar">👨‍🏭</span>
        <span class="p-chat__bubble">what does fine-tuning actually mean?</span>
      </div>

      <div class="p-chat__msg p-chat__msg--them p-chat__msg--reveal" style="--chat-delay:960ms">
        <span class="p-chat__avatar">🧑‍💼</span>
        <span class="p-chat__bubble">can't we just use ChatGPT for this?</span>
      </div>

      <div class="p-chat__msg p-chat__msg--them p-chat__msg--reveal" style="--chat-delay:1040ms">
        <span class="p-chat__avatar">👩‍💼</span>
        <span class="p-chat__bubble">I saw a LinkedIn post saying AI can do this in 5 minutes. why is ours taking weeks</span>
      </div>

      <div class="p-chat__msg p-chat__msg--them p-chat__msg--reveal" style="--chat-delay:1120ms">
        <span class="p-chat__avatar">👨‍💼</span>
        <span class="p-chat__bubble">can we plug GPT-4 into the camera and just let it decide?</span>
      </div>

      <div class="p-chat__msg p-chat__msg--them p-chat__msg--reveal" style="--chat-delay:1200ms">
        <span class="p-chat__avatar">🧑‍💼</span>
        <span class="p-chat__bubble">the CEO wants an AI strategy by friday. what do I tell him</span>
      </div>

    </div>
  </div>
</section>

<div class="p-divider"></div>

<!-- ================================================================
     PUBLICATIONS (auto-fetched from Scholar)
================================================================ -->
<section class="p-section" id="publications" data-section="publications" aria-label="Publications">
  <div class="p-container">

    <div class="p-section-header p-section-header--split p-reveal">
      <div>
        <span class="p-overline">Auto-fetched via GitHub Actions</span>
        <h2 class="p-h2">Publications</h2>
        <span class="p-scholar-badge">Live data from Google Scholar</span>
        <div class="p-pub-hook p-reveal" aria-label="Not many, but every single one cost blood, sweat and deadline nights — quality over quantity.">
          <span class="p-pub-hook__label">The hard truth</span>
          <p class="p-pub-hook__hero">Not many.</p>
          <p class="p-pub-hook__mid">But every single one cost</p>
          <p class="p-pub-hook__blood">blood, sweat &amp; deadline nights.</p>
          <p class="p-pub-hook__close">— quality, not quantity.</p>
        </div>
      </div>
      <a href="https://scholar.google.com/citations?user=GIJ3h4AAAAAJ&hl=en"
         target="_blank" rel="noopener"
         class="p-btn p-btn--outline"
         style="align-self:flex-end">
        View All ↗
      </a>
    </div>

  </div>
</section>

<div class="p-divider"></div>

<!-- ================================================================
     PROJECTS — cinematic staggered layout
================================================================ -->
<section class="p-section p-section--dark" id="projects" data-section="projects" aria-label="Projects">
  <div class="p-container">

    <div class="p-section-header p-reveal">
      <span class="p-overline">Open Source &amp; Side Projects</span>
      <h2 class="p-h2">Projects</h2>
    </div>

    <!-- Project 1 — large featured -->
    <a href="https://egocentricvision.github.io/EgocentricVision/"
       target="_blank" rel="noopener"
       class="p-proj-featured p-reveal" aria-label="Egocentric Vision repository">
      <div class="p-proj-featured__img">
        <img src="/assets/img/ego_logo.png" alt="Egocentric Vision" loading="lazy">
      </div>
      <div class="p-proj-featured__body">
        <span class="p-proj-featured__tag">Research · Open Source</span>
        <h3 class="p-proj-featured__title">Egocentric Vision</h3>
        <p class="p-proj-featured__desc">
          Curated collection of papers, datasets, challenges and applications
          on first-person vision. Living repository, community-maintained.
        </p>
        <span class="p-proj-featured__cta">Visit repository ↗</span>
      </div>
    </a>

    <!-- Projects 2–4 — horizontal row -->
    <div class="p-proj-row">

      <a href="https://plana93.github.io/ColorGPTStudio/"
         target="_blank" rel="noopener"
         class="p-proj-mini p-reveal" style="--delay:0ms">
        <div class="p-proj-mini__img">
          <img src="/assets/img/colorgpt_cover.png" alt="ColorGPT Studio" loading="lazy">
          <div class="p-proj-mini__overlay">
            <span class="p-proj-mini__link">View ↗</span>
          </div>
        </div>
        <span class="p-proj-mini__tag">Android · App</span>
        <h3 class="p-proj-mini__title">ColorGPT Studio</h3>
        <p class="p-proj-mini__desc">Tap a pixel, get the color — HEX · RGB · CMYK · offline.</p>
      </a>

      <a href="https://plana93.github.io/good-habits/"
         target="_blank" rel="noopener"
         class="p-proj-mini p-reveal" style="--delay:120ms">
        <div class="p-proj-mini__img">
          <img src="/assets/img/good_habits/good_habits.png" alt="Good-Habits" loading="lazy">
          <div class="p-proj-mini__overlay">
            <span class="p-proj-mini__link">View ↗</span>
          </div>
        </div>
        <span class="p-proj-mini__tag">Android · App</span>
        <h3 class="p-proj-mini__title">Good-Habits</h3>
        <p class="p-proj-mini__desc">Track &amp; build daily habits — minimal, focused on consistency.</p>
      </a>

      <a class="p-proj-mini p-reveal" href="/projects/4_project/" style="--delay:240ms">
        <div class="p-proj-mini__img p-proj-mini__img--art">
          <img src="/assets/img/Art/art_cover.png" alt="Art projects" loading="lazy">
          <div class="p-proj-mini__overlay">
            <span class="p-proj-mini__link">View →</span>
          </div>
        </div>
        <span class="p-proj-mini__tag">Design · Art</span>
        <h3 class="p-proj-mini__title">Art &amp; Design</h3>
        <p class="p-proj-mini__desc">Lab logos, roll-ups and digital art from the PhD years.</p>
      </a>

    </div>
  </div>
</section>

<div class="p-divider"></div>

<!-- ================================================================
     TALKS & ACHIEVEMENTS — photo card layout
================================================================ -->
<section class="p-section" id="talks" data-section="talks" aria-label="Talks and achievements">
  <div class="p-container">

    <div class="p-section-header p-reveal">
      <span class="p-overline">Speaking &amp; Achievements</span>
      <h2 class="p-h2">Featured <span class="p-accent">Talks</span></h2>
    </div>

    <div class="p-talk-cards">

      <!-- EPIC-KITCHENS -->
      <article class="p-talk-card p-reveal" aria-label="EPIC-KITCHENS Challenge">
        <div class="p-talk-card__media">
          <img src="/assets/img/EK100_Challenge_2021_2022/ek_100_2022.jpeg"
               alt="EPIC-KITCHENS 100 Challenge 2022" loading="lazy">
          <div class="p-talk-card__badge">🏆</div>
        </div>
        <div class="p-talk-card__body">
          <span class="p-talk-card__event">CVPR Workshop · 2021–2022</span>
          <h3 class="p-talk-card__title">EPIC-KITCHENS-100 Challenge</h3>
          <p class="p-talk-card__desc">
            <strong style="color:var(--p-teal)">Two-time consecutive winner</strong> of the
            Unsupervised Domain Adaptation track — Top 3 for two years running.
          </p>
          <div class="p-talk-card__links">
            <a href="/ek100-challenge/" class="p-talk-card__link">Details</a>
            <a href="https://epic-kitchens.github.io/2022.html#results" target="_blank"
               rel="noopener" class="p-talk-card__link">Results ↗</a>
          </div>
        </div>
        <div class="p-talk-card__thumb">
          <img src="/assets/img/EK100_Challenge_2021_2022/winners-2021.png"
               alt="EK100 Challenge winners 2021" loading="lazy">
        </div>
      </article>

      <!-- Codemotion -->
      <article class="p-talk-card p-reveal" aria-label="Codemotion 2025">
        <div class="p-talk-card__media">
          <img src="/assets/img/codemotion_01_2025/me_during_code_motion_emotional.jpg"
               alt="Codemotion 2025 talk" loading="lazy">
          <div class="p-talk-card__badge">🎤</div>
        </div>
        <div class="p-talk-card__body">
          <span class="p-talk-card__event">Codemotion Conference · 2025</span>
          <h3 class="p-talk-card__title">From Pixels to Features</h3>
          <p class="p-talk-card__desc">
            From hand-crafted descriptors to foundation models — one backbone to rule them all.
          </p>
          <div class="p-talk-card__links">
            <a href="/codemotion-gallery/" class="p-talk-card__link">Read more</a>
          </div>
        </div>
        <div class="p-talk-card__thumb">
          <img src="/assets/img/codemotion_01_2025/me_during_codemotion_far.jpg"
               alt="Codemotion talk audience view" loading="lazy">
        </div>
      </article>

      <!-- Py4AI -->
      <article class="p-talk-card p-reveal" aria-label="Py4AI 2024">
        <div class="p-talk-card__media">
          <img src="/assets/img/py4ai_05_2024/egocentric_vision_py4ai_poster.jpeg"
               alt="Py4AI 2024 poster" loading="lazy">
          <div class="p-talk-card__badge">🐍</div>
        </div>
        <div class="p-talk-card__body">
          <span class="p-talk-card__event">Py4AI Conference · 2024</span>
          <h3 class="p-talk-card__title">Egocentric Vision: AI Through the Eyes of Users</h3>
          <p class="p-talk-card__desc">
            Presented cutting-edge first-person action recognition to Italy's Python AI community.
          </p>
          <div class="p-talk-card__links">
            <a href="/py4ai-gallery/" class="p-talk-card__link">Gallery</a>
            <a href="https://www.linkedin.com/feed/update/urn:li:activity:7330195774300934145/"
               target="_blank" rel="noopener" class="p-talk-card__link">LinkedIn ↗</a>
          </div>
        </div>
        <div class="p-talk-card__thumb">
          <img src="/assets/img/egocentric_vision_image/ego_logo.jpeg"
               alt="Egocentric Vision Logo" loading="lazy">
        </div>
      </article>

    </div>
  </div>
</section>

<div class="p-divider"></div>

<!-- ================================================================
     CONTACT
================================================================ -->
<section class="p-contact p-section" id="contact" data-section="contact" aria-label="Contact">
  <div class="p-container">

    <span class="p-overline p-reveal" style="text-align:center;display:block">Let's Connect</span>

    <h2 class="p-h2 p-reveal" style="text-align:center;max-width:none;font-size:clamp(2rem,5vw,3.5rem)">
      Interested in collaboration?
    </h2>

    <p class="p-body p-reveal" style="text-align:center;max-width:52ch;margin-inline:auto">
      Open to research collaborations, industry projects and speaking engagements.
      Currently at ARGO Vision · Politecnico di Torino · IIT.
    </p>

    <div class="p-reveal" style="text-align:center">
      <a href="mailto:mirco.pl.93@gmail.com" class="p-contact__email">
        mirco.pl.93@gmail.com
      </a>
    </div>

    <div class="p-contact__social p-reveal">
      <a href="https://github.com/plana93" target="_blank" rel="noopener"
         class="p-contact__link">GitHub</a>
      <a href="https://linkedin.com/in/mirco-planamente-924893198" target="_blank" rel="noopener"
         class="p-contact__link">LinkedIn</a>
      <a href="https://scholar.google.com/citations?user=GIJ3h4AAAAAJ&hl=en" target="_blank" rel="noopener"
         class="p-contact__link">Scholar</a>
      <a href="https://twitter.com/MircoPlanamente" target="_blank" rel="noopener"
         class="p-contact__link">Twitter</a>
    </div>

  </div>
</section>
