---
layout: portfolio
title: Mirco Planamente
seo_title: "Mirco Planamente — AI Researcher in Computer Vision"
permalink: /
description: "Mirco Planamente is an AI researcher working on Computer Vision, Egocentric Vision and Domain Adaptation—from research models to systems people can use."
---

<!-- ================================================================
     HERO — BILLBOARD EDITION
     Ispirato al concept "Transforming Vision Into Intelligence"
     con foto B&W, testo billboard, onde 3D e parallax GSAP
================================================================ -->
<section class="p-hero p-hero--billboard" id="home" data-section="home" aria-label="Hero section">

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
         class="p-bb__photo p-bb__photo--base"
         loading="eager"
         draggable="false" />
    <div class="p-bb__lens-layer" aria-hidden="true">
      <img src="{{ '/assets/img/io_without_bg.png' | relative_url }}"
           alt=""
           class="p-bb__lens-photo"
           draggable="false" />
      <div class="p-bb__lens-halftone"></div>
    </div>
    <div class="p-bb__lens-aura" aria-hidden="true"></div>
    <div class="p-bb__lens-reticle" aria-hidden="true">
      <span class="p-bb__lens-corner p-bb__lens-corner--tl"></span>
      <span class="p-bb__lens-corner p-bb__lens-corner--tr"></span>
      <span class="p-bb__lens-corner p-bb__lens-corner--bl"></span>
      <span class="p-bb__lens-corner p-bb__lens-corner--br"></span>
      <span class="p-bb__lens-label" data-lens-label>PERSON&nbsp;&nbsp;99.8%</span>
    </div>
    <!-- etichetta "Into" in stile serif italic -->
    <span class="p-bb__into" aria-hidden="true"><em>Into</em></span>
  </div>

  <!-- ── LAYER 4: INTELLIGENCE (bottom, highlight bar verde) ── -->
  <div class="p-bb__intel p-bb__reveal" aria-label="Vision Into Intelligence">
    <span>INTELLIGENCE</span>
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
<section class="p-section p-section--paper" id="research" data-section="research" data-kinetic="VISION" aria-label="Research areas">
  <div class="p-container">

    <div class="p-section-header p-reveal">
      <span class="p-overline">From Academia to Industry</span>
      <h2 class="p-h2">Research <span class="p-accent">Identity</span></h2>
    </div>

    <p class="p-scribble p-scribble--research" data-scroll-scribble style="--p-scribble-r:-5deg">
      where I got it wrong—<br>often enough to learn.
    </p>

    <div class="p-research-deck p-reveal" data-research-deck>
      <article class="p-research-item is-open" data-research-item>
        <h3>
          <button class="p-research-item__trigger" type="button" aria-expanded="true" aria-controls="research-panel-01">
            <span class="p-research-item__index">01</span>
            <span class="p-research-item__icon" aria-hidden="true">👁️</span>
            <span class="p-research-item__title">Egocentric Vision</span>
            <span class="p-research-item__kind">primary focus</span>
            <span class="p-research-item__toggle" aria-hidden="true">+</span>
          </button>
        </h3>
        <div class="p-research-item__panel" id="research-panel-01">
          <div class="p-research-item__panel-inner">
            <p>First-person action recognition and understanding from wearable cameras—where real life rarely holds still for the model.</p>
            <div class="p-research-item__papers"><span>CVPR</span><span>WACV</span><span>IEEE RA-L</span><span>IJCV</span></div>
          </div>
        </div>
      </article>

      <article class="p-research-item" data-research-item>
        <h3>
          <button class="p-research-item__trigger" type="button" aria-expanded="false" aria-controls="research-panel-02">
            <span class="p-research-item__index">02</span>
            <span class="p-research-item__icon" aria-hidden="true">🎬</span>
            <span class="p-research-item__title">Video Understanding</span>
            <span class="p-research-item__kind">time + motion</span>
            <span class="p-research-item__toggle" aria-hidden="true">+</span>
          </button>
        </h3>
        <div class="p-research-item__panel" id="research-panel-02" hidden>
          <div class="p-research-item__panel-inner">
            <p>Architectures that read motion across time, domains and viewpoints—not just the one clean clip used in the demo.</p>
            <div class="p-research-item__papers"><span>2D / 3D</span><span>Untrimmed</span><span>Summarization</span><span>Retrieval</span></div>
          </div>
        </div>
      </article>

      <article class="p-research-item" data-research-item>
        <h3>
          <button class="p-research-item__trigger" type="button" aria-expanded="false" aria-controls="research-panel-03">
            <span class="p-research-item__index">03</span>
            <span class="p-research-item__icon" aria-hidden="true">↝</span>
            <span class="p-research-item__title">Domain Adaptation</span>
            <span class="p-research-item__kind">generalization</span>
            <span class="p-research-item__toggle" aria-hidden="true">+</span>
          </button>
        </h3>
        <div class="p-research-item__panel" id="research-panel-03" hidden>
          <div class="p-research-item__panel-inner">
            <p>Teaching systems to survive a change of camera, factory or context without starting training from zero every time.</p>
            <div class="p-research-item__papers"><span>UDA</span><span>Open-world</span><span>Cross-domain</span></div>
          </div>
        </div>
      </article>

      <article class="p-research-item" data-research-item>
        <h3>
          <button class="p-research-item__trigger" type="button" aria-expanded="false" aria-controls="research-panel-04">
            <span class="p-research-item__index">04</span>
            <span class="p-research-item__icon" aria-hidden="true">⌁</span>
            <span class="p-research-item__title">Anomaly Detection</span>
            <span class="p-research-item__kind">when things go wrong</span>
            <span class="p-research-item__toggle" aria-hidden="true">+</span>
          </button>
        </h3>
        <div class="p-research-item__panel" id="research-panel-04" hidden>
          <div class="p-research-item__panel-inner">
            <p>Finding rare, unusual or dangerous events when examples are scarce and “normal” keeps changing in production.</p>
            <div class="p-research-item__papers"><span>Industry</span><span>Production</span><span>One-class</span></div>
          </div>
        </div>
      </article>

      <article class="p-research-item" data-research-item>
        <h3>
          <button class="p-research-item__trigger" type="button" aria-expanded="false" aria-controls="research-panel-05">
            <span class="p-research-item__index">05</span>
            <span class="p-research-item__icon" aria-hidden="true">✣</span>
            <span class="p-research-item__title">Perception Systems</span>
            <span class="p-research-item__kind">applied vision</span>
            <span class="p-research-item__toggle" aria-hidden="true">+</span>
          </button>
        </h3>
        <div class="p-research-item__panel" id="research-panel-05" hidden>
          <div class="p-research-item__panel-inner">
            <p>Detection, segmentation, recognition and pose estimation assembled into pipelines people can actually depend on.</p>
            <div class="p-research-item__papers"><span>Detection</span><span>Segmentation</span><span>Recognition</span><span>Pose</span></div>
          </div>
        </div>
      </article>

      <article class="p-research-item" data-research-item>
        <h3>
          <button class="p-research-item__trigger" type="button" aria-expanded="false" aria-controls="research-panel-06">
            <span class="p-research-item__index">06</span>
            <span class="p-research-item__icon" aria-hidden="true">◉</span>
            <span class="p-research-item__title">Multi-Modal Learning</span>
            <span class="p-research-item__kind">signals in conversation</span>
            <span class="p-research-item__toggle" aria-hidden="true">+</span>
          </button>
        </h3>
        <div class="p-research-item__panel" id="research-panel-06" hidden>
          <div class="p-research-item__panel-inner">
            <p>Combining vision, audio, sensors and language when no single signal tells the whole story.</p>
            <div class="p-research-item__papers"><span>Vision</span><span>Audio</span><span>Sensors</span><span>Language</span></div>
          </div>
        </div>
      </article>
    </div>

    <div class="p-research-pulse p-reveal">
      <span class="p-research-pulse__label">[ WORKING RULE ]</span>
      <p class="p-research-pulse__statement">
        Stay close to people who can explain their <strong>no.</strong>
        <small>That's how you build a yes that holds.</small>
      </p>
      <span class="p-research-pulse__trace" aria-hidden="true"></span>
    </div>

    <!-- Problem Board — Chat style -->
    <div class="p-section-header p-reveal" style="margin-top:4rem">
      <span class="p-overline">Before the clean result</span>
      <h3 class="p-h2" style="font-size:clamp(1.4rem,3vw,2rem)">The work you <span class="p-accent">don't see.</span></h3>
    </div>

    <div class="p-notification-storm" id="message-storm" data-notification-storm
         data-source="{{ '/assets/data/notification-storm.jsonl' | relative_url }}">
      <div class="p-notification-storm__sticky">
        <div class="p-notification-storm__scene">
          <p class="p-notification-storm__note" aria-hidden="true">
            <strong>121</strong>
            <span>messages later,<br>still “one quick thing”.</span>
          </p>

          <blockquote class="p-notification-storm__advice">
            <span>mio padre dice sempre:</span>
            <strong>“calma e sangue freddo”</strong>
          </blockquote>

          <div class="p-notification-storm__phone" aria-label="A phone filling up with realistic AI project messages">
            <div class="p-notification-storm__screen">
              <div class="p-notification-storm__phonebar" aria-hidden="true">
                <span>09:41</span>
                <i></i>
                <span>5G&nbsp; ▰</span>
              </div>

              <div class="p-notification-storm__status" aria-hidden="true">
                <span class="p-notification-storm__pulse"></span>
                <span><strong data-storm-count>00</strong> <span data-storm-label>incoming</span></span>
              </div>

              <div class="p-notification-storm__stage" data-notification-stage tabindex="0"
                   aria-label="A growing stream of realistic questions from AI projects">
                <span class="p-notification-storm__loading">loading incoming messages…</span>
              </div>

              <span class="p-notification-storm__homebar" aria-hidden="true"></span>
            </div>
          </div>

          <span class="p-notification-storm__pace" aria-hidden="true">scroll inside the screen ↕</span>
        </div>
      </div>
    </div>

    <div class="p-notification-contribute p-reveal">
      <div>
        <span class="p-overline">Your turn</span>
        <h4 class="p-notification-contribute__title">Seen worse?</h4>
        <p class="p-notification-contribute__copy">Surprise me.</p>
      </div>
      <form class="p-notification-form" data-notification-form
            data-editor-url="https://github.com/plana93/plana93.github.io/edit/master/assets/data/notification-storm.jsonl">
        <label class="p-bb__sr-only" for="notificationMessage">Your notification</label>
        <div class="p-notification-form__row">
          <select name="icon" aria-label="Notification emoji">
            <option>💥</option><option>🤬</option><option>🫠</option><option>🤖</option>
            <option>🔥</option><option>🧨</option><option>☕</option><option>🤷</option>
          </select>
          <input id="notificationMessage" name="message" type="text" maxlength="220"
                 placeholder="ragazzi, chi ha fatto il deploy?" required autocomplete="off">
          <button type="submit" class="p-btn p-btn--primary">Add yours ↗</button>
        </div>
        <p class="p-notification-form__status" data-notification-status aria-live="polite"></p>
      </form>
      <div class="p-notification-contribute__preview" data-notification-preview hidden></div>
    </div>
  </div>
</section>

<div class="p-divider"></div>

<!-- ================================================================
     PUBLICATIONS
================================================================ -->
<section class="p-section" id="publications" data-section="publications" data-kinetic="PAPERS" aria-label="Publications">
  <div class="p-container">

    <div class="p-section-header p-section-header--split p-reveal">
      <div>
        <span class="p-overline">Selected Research Output</span>
        <h2 class="p-h2">Publications</h2>
        <div class="p-pub-hook p-reveal" aria-label="What the PDF leaves out. The paper is the clean version. The useful part was messier: wrong turns, rejected ideas and one more experiment. Most of the learning never made the abstract.">
          <span class="p-pub-hook__label">[ What the PDF leaves out ]</span>
          <p class="p-pub-hook__hero">The paper is<br>the clean version.</p>
          <p class="p-pub-hook__mid">The useful part was messier:</p>
          <p class="p-pub-hook__blood">wrong turns, rejected ideas &amp; one more experiment.</p>
          <p class="p-pub-hook__close">Most of the learning never made the abstract.</p>
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

<div class="p-running-band" data-scroll-band aria-hidden="true">
  <div class="p-running-band__track" data-scroll-band-track>
    TEST IT · BREAK IT · LEARN · SHIP IT ·&nbsp; TEST IT · BREAK IT · LEARN · SHIP IT ·&nbsp;
    TEST IT · BREAK IT · LEARN · SHIP IT ·&nbsp; TEST IT · BREAK IT · LEARN · SHIP IT ·&nbsp;
  </div>
</div>

<div class="p-mode-shift p-reveal" id="mode-shift" aria-label="Research becomes building: models to systems to experiences">
  <div class="p-mode-shift__poster">
    <span class="p-mode-shift__index">02 / change of mode</span>
    <span class="p-mode-shift__research" data-text="Research">Research</span>
    <span class="p-mode-shift__arrow" aria-hidden="true">&amp;</span>
    <span class="p-mode-shift__build">Build</span>
    <span class="p-mode-shift__aside">same curiosity.<br>more consequences.</span>
    <span class="p-mode-shift__caption">models → systems → experiences</span>
  </div>
</div>

<!-- ================================================================
     PROJECTS — cinematic staggered layout
================================================================ -->
<section class="p-section p-section--dark" id="projects" data-section="projects" data-kinetic="BUILD" aria-label="Projects">
  <div class="p-container">

    <div class="p-section-header p-projects-heading p-reveal">
      <span class="p-overline">Projects · experiments · side quests</span>
      <h2 class="p-h2">Built on the <span class="p-accent">side.</span></h2>
      <p class="p-scribble p-scribble--projects" data-scroll-scribble style="--p-scribble-r:3deg">
        mostly curiosity.<br>occasionally poor time management.
      </p>
    </div>

    <div class="p-project-field">
      <a href="https://egocentricvision.github.io/EgocentricVision/"
         target="_blank" rel="noopener" class="p-project-piece p-reveal"
         data-project-piece style="--delay:0ms" aria-label="Egocentric Vision repository">
        <figure class="p-project-piece__media p-project-piece__media--contain">
          <img src="/assets/img/ego_logo.png" alt="Egocentric Vision" loading="lazy">
        </figure>
        <div class="p-project-piece__copy">
          <span class="p-project-piece__index">01 / Research · Open Source</span>
          <h3>Egocentric Vision</h3>
          <p>Papers, datasets and challenges for seeing the world from a first-person point of view.</p>
          <span class="p-project-piece__cta">Visit repository ↗</span>
        </div>
      </a>

      <a href="https://plana93.github.io/ColorGPTStudio/"
         target="_blank" rel="noopener" class="p-project-piece p-reveal"
         data-project-piece style="--delay:100ms">
        <figure class="p-project-piece__media">
          <img src="/assets/img/colorgpt_cover.png" alt="ColorGPT Studio" loading="lazy">
        </figure>
        <div class="p-project-piece__copy">
          <span class="p-project-piece__index">02 / Android · App</span>
          <h3>ColorGPT Studio</h3>
          <p>Tap a pixel, get the colour. HEX, RGB and CMYK—even offline.</p>
          <span class="p-project-piece__cta">Open project ↗</span>
        </div>
      </a>

      <a href="https://plana93.github.io/good-habits/"
         target="_blank" rel="noopener" class="p-project-piece p-reveal"
         data-project-piece style="--delay:200ms">
        <figure class="p-project-piece__media">
          <img src="/assets/img/good_habits/good_habits.png" alt="Good-Habits" loading="lazy">
        </figure>
        <div class="p-project-piece__copy">
          <span class="p-project-piece__index">03 / Android · App</span>
          <h3>Good-Habits</h3>
          <p>A quiet habit tracker built around consistency, not streak anxiety.</p>
          <span class="p-project-piece__cta">Open project ↗</span>
        </div>
      </a>

      <a href="/projects/4_project/" class="p-project-piece p-reveal"
         data-project-piece style="--delay:300ms">
        <figure class="p-project-piece__media p-project-piece__media--contain">
          <img src="/assets/img/Art/art_cover.png" alt="Art projects" loading="lazy">
        </figure>
        <div class="p-project-piece__copy">
          <span class="p-project-piece__index">04 / Design · Art</span>
          <h3>Art &amp; Design</h3>
          <p>Logos, roll-ups and visual experiments collected through the PhD years.</p>
          <span class="p-project-piece__cta">Browse the work →</span>
        </div>
      </a>
    </div>
  </div>
</section>

<section class="p-visual-break" id="visual-break" data-visual-break aria-label="From prototypes to real audiences">
  <div class="p-visual-break__media" data-visual-break-media
       style="background-image:url('{{ '/assets/img/codemotion_01_2025/me_during_code_motion_emotional.jpg' | relative_url }}')"></div>
  <div class="p-visual-break__wash" aria-hidden="true"></div>
  <div class="p-visual-break__content">
    <span class="p-overline">After the prototype</span>
    <p class="p-visual-break__statement"><span>It works.</span><br><span>Now make it</span><br><span>make sense.</span></p>
    <p class="p-scribble p-scribble--light" data-scroll-scribble style="--p-scribble-r:4deg">
      if you can't explain it simply,<br>the build isn't finished →
    </p>
  </div>
</section>

<!-- ================================================================
     TALKS & ACHIEVEMENTS — photo card layout
================================================================ -->
<section class="p-section p-section--paper p-section--talks-paper" id="talks" data-section="talks" data-kinetic="SPEAK" aria-label="Talks and achievements">
  <div class="p-container">

    <div class="p-section-header p-talks-heading p-reveal">
      <span class="p-overline">Speaking &amp; workshops</span>
      <h2 class="p-h2">Ideas need an <span class="p-accent">audience.</span></h2>
      <p class="p-scribble p-scribble--talks" data-scroll-scribble style="--p-scribble-r:-3deg">
        and a ruthless Q&amp;A →
      </p>
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
            Unsupervised Domain Adaptation track — Top 3 for two consecutive years.
          </p>
          <div class="p-talk-card__links">
            <a href="/ek100-challenge/" class="p-talk-card__link p-talk-card__link--stretched">Details</a>
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
            <a href="/codemotion-gallery/" class="p-talk-card__link p-talk-card__link--stretched">Read more</a>
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
            <a href="/py4ai-gallery/" class="p-talk-card__link p-talk-card__link--stretched">Gallery</a>
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
<section class="p-contact p-section" id="contact" data-section="contact" data-kinetic="HELLO" aria-label="Contact">
  <div class="p-container">

    <span class="p-overline p-reveal" style="text-align:center;display:block">Research · Industry · Speaking</span>

    <h2 class="p-h2 p-reveal" style="text-align:center;max-width:none;font-size:clamp(2rem,5vw,3.5rem)">
      Interested in collaboration?
    </h2>

    <p class="p-body p-reveal" style="text-align:center;max-width:52ch;margin-inline:auto">
      ARGO Vision · Politecnico di Torino · IIT
    </p>

    <div class="p-reveal" style="text-align:center">
      <a href="mailto:mirco.pl.93@gmail.com" class="p-contact__email">
        mirco.pl.93@gmail.com
      </a>
    </div>

    <p class="p-scribble p-scribble--contact" data-scroll-scribble style="--p-scribble-r:-3deg">
      weird ideas welcome.
    </p>

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
