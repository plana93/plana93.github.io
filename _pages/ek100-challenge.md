---
layout: page
title: EPIC-KITCHENS-100 Challenge
permalink: /ek100-challenge/
description: Two-time consecutive winner of the Unsupervised Domain Adaptation Challenge
nav: false
---

<div class="mp-page-header">
  <p class="mp-label">[ACHIEVEMENT] 2021–2022</p>
  <h1 class="mp-page-header__title">EPIC-KITCHENS-100 Challenge 🏆</h1>
  <p class="mp-page-header__sub">
    Two-Time Consecutive Winner of the Unsupervised Domain Adaptation Challenge
    at <strong>CVPR</strong> — competing against leading research institutions worldwide.
  </p>
</div>

<div class="mp-callout">
  <p class="mp-callout__eyebrow">ACHIEVEMENT_SUMMARY</p>
  <p class="mp-callout__body">
    <strong>3rd place in 2021</strong> and <strong>Top 3 in 2022</strong> at the
    EPIC-KITCHENS Unsupervised Domain Adaptation Challenge.
  </p>
  <p class="mp-callout__meta">PhD @ Politecnico di Torino · Computer Vision · Egocentric Action Recognition</p>
</div>

<hr class="mp-divider">

<div class="mp-year-block">
  <div class="mp-year-block__header">
    <h2 class="mp-year-block__title">2022 — CVPR Workshop</h2>
    <span class="mp-pill mp-pill--pink">TOP 3 WINNER</span>
  </div>
  <p class="mp-year-block__body">
    Our <strong>"Multi-Source Multi-Target Unsupervised Domain Adaptation"</strong> approach
    secured a position among the top 3 winner teams at the EPIC-KITCHENS UDA Challenge
    presented at <strong>CVPR 2022</strong>.
  </p>
  <div class="mp-infobox mp-infobox--blue">
    <h3>Challenge Context</h3>
    <p>
      The challenge focused on <strong>multi-source multi-target domain adaptation</strong>,
      testing how models generalize across different kitchen environments and temporal shifts
      in egocentric action recognition.
    </p>
    <p>
      <strong>Key Innovation:</strong> We developed a novel approach to leverage multiple source
      domains while adapting to multiple unlabeled target domains simultaneously, achieving
      robust performance across all evaluation metrics.
    </p>
  </div>
</div>

<div class="mp-year-block">
  <div class="mp-year-block__header">
    <h2 class="mp-year-block__title">2021 — CVPR Workshop</h2>
    <span class="mp-pill mp-pill--green">3RD PLACE</span>
  </div>
  <p class="mp-year-block__body">
    Together with <strong>Chiara Plizzari</strong>, we achieved <strong>3rd place</strong>
    in the third edition of the challenge, presented at the
    <strong>CVPR 2021 Workshop on Egocentric Perception, Interaction and Computing</strong>.
  </p>
  <div class="mp-infobox">
    <h3>Technical Approach</h3>
    <p>
      We re-purposed the <strong>Relative Norm Alignment (RNA) loss</strong>, a multi-modal
      loss recently proposed for Domain Generalization, to operate between different backbone
      architectures in order to enhance their collaboration.
    </p>
    <p>
      <strong>Results:</strong> Top performance across all evaluation categories:
      verb, noun, and action recognition.
    </p>
  </div>
</div>

<hr class="mp-divider">

<section class="mp-section">
  <p class="mp-label">$ info --dataset EPIC-KITCHENS-100</p>
  <h2 class="mp-heading">About the Dataset</h2>

  <p>
    <strong>EPIC-KITCHENS-100</strong> is the largest-scale egocentric dataset,
    collected by 32 participants in their native kitchen environments,
    densely annotated with actions and object interactions.
  </p>

  <div class="mp-stat-grid">
    <div class="mp-stat">
      <span class="mp-stat__num">125</span>
      <span class="mp-stat__label">Verb Classes</span>
    </div>
    <div class="mp-stat">
      <span class="mp-stat__num">331</span>
      <span class="mp-stat__label">Noun Classes</span>
    </div>
    <div class="mp-stat">
      <span class="mp-stat__num">32</span>
      <span class="mp-stat__label">Participants</span>
    </div>
  </div>

  <div class="mp-infobox mp-mt-4">
    <h3>Unsupervised Domain Adaptation Challenge</h3>
    <p>
      The challenge tests how models cope with <strong>temporal domain shift</strong> in
      action recognition. Videos recorded in 2018 (EPIC-KITCHENS-55) constitute the labeled
      source domain, while videos recorded two years later (EPIC-KITCHENS-100 extension)
      constitute the unlabeled target domain.
    </p>
    <p>
      <strong>Objective:</strong> Assign accurate (verb, noun) labels to trimmed segments
      following the Unsupervised Domain Adaptation paradigm.
    </p>
  </div>
</section>

<div class="mp-cta-row">
  <a href="https://epic-kitchens.github.io/2022.html#results"
     target="_blank" rel="noopener" class="mp-btn mp-btn--primary">View Official Results ↗</a>
  <a href="/" class="mp-btn mp-btn--ghost">← Back to Home</a>
</div>
