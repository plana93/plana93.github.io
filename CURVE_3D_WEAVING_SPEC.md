# 🎨 3D Curve Weaving System — Technical Specification

## Concept: "Entwined Spatial Path"

Il sistema implementa un **percorso spaziale intrecciato** che si comporta come un nastro fisico che attraversa la composizione rispettando gli spazi vuoti e creando profondità realistica.

---

## 🏗️ Architettura dei Layer

### Layer Stack (dal fondo verso l'alto)

```
Z-INDEX    LAYER         ZONA                  COMPORTAMENTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   0       L0           Top 46%, sx 50%       DIETRO "VIS" di VISION
                                              → più scura, desaturata
                                              → stroke 16px, opacity 0.72

   2       L1           Top 46%, dx 50%       DAVANTI "ION" di VISION  
                                              → ombra portata forte
                                              → stroke 20px, opacity 0.92
                                              → glow accent, breathing animation

   4       L2           Da 42%, sx 26%        DAVANTI foto, DIETRO "Into"
                                              → tapering (stroke 17px)
                                              → twist gradient overlay
                                              → saturazione ridotta

   6       L3           Bottom 28%            DAVANTI "INTELLIGENCE"
                                              → massima presenza visiva
                                              → stroke 22px, opacity 0.95
                                              → ombra drammatica, glow alone
                                              → riflessi speculari
```

---

## 🎭 Tecniche di Profondità 3D

### 1. **Variable Stroke Width** (Tapering)
```scss
// Layer frontale (più vicino)
stroke-width: 22px;  

// Layer intermedio (passaggio)
stroke-width: 17px;  

// Layer posteriore (più lontano)
stroke-width: 16px;  
```

**Razionale**: oggetti più vicini appaiono più spessi, più lontani più sottili.

---

### 2. **Opacity Gradation**
```scss
// Primo piano (davanti)
opacity: 0.95;

// Piano intermedio
opacity: 0.80;

// Sfondo (dietro)
opacity: 0.72;
```

**Razionale**: simula atmospheric perspective — gli oggetti lontani sono meno definiti.

---

### 3. **Color Saturation Shift**
```scss
// Davanti (massima saturazione)
saturate(1.3);

// Intermedio
saturate(0.9);

// Dietro (desaturato, "in ombra")
saturate(0.7);
```

**Razionale**: gli oggetti dietro altri sono parzialmente in ombra, quindi meno saturi.

---

### 4. **Brightness Control**
```scss
// Layer frontale (illuminato)
brightness(1.15);

// Layer intermedio (neutro)
brightness(0.95);

// Layer posteriore (in ombra)
brightness(0.75);
```

**Razionale**: la luce colpisce prima gli oggetti davanti, quelli dietro sono più scuri.

---

### 5. **Drop Shadow (Ombra Portata)**

#### Layer L1 (davanti VISION):
```scss
filter: 
  drop-shadow(0 4px 8px rgba(0,0,0,0.3))      // ombra forte
  drop-shadow(0 0 12px var(--mp-curve-c2))    // glow colorato
  drop-shadow(0 1px 0 rgba(255,255,255,0.15)); // riflesso superiore
```

#### Layer L3 (davanti INTELLIGENCE):
```scss
filter: 
  drop-shadow(0 6px 14px rgba(0,0,0,0.4))     // ombra drammatica
  drop-shadow(0 0 16px var(--mp-curve-c3))    // glow intenso
  drop-shadow(0 2px 0 rgba(255,255,255,0.2))  // riflesso speculare
  drop-shadow(0 -1px 0 rgba(0,0,0,0.3));      // ombra inferiore
```

**Razionale**: gli oggetti in primo piano proiettano ombre sugli elementi dietro di loro.

---

### 6. **Twist Effect** (Torsione Visiva)

Layer L2 usa un pseudo-elemento con gradiente per suggerire rotazione 3D:

```scss
.mp-hero-curve--l2::before {
  background: linear-gradient(145deg, 
    transparent 0%, 
    rgba(0,255,136,0.05) 30%,    // faccia anteriore
    rgba(0,212,255,0.08) 70%,     // faccia posteriore
    transparent 100%
  );
  mix-blend-mode: screen;
}
```

**Razionale**: un nastro che ruota mostra sfumature diverse sulla superficie.

---

### 7. **Breathing Animation**

```scss
@keyframes mp-curve-breathe {
  0%, 100% { opacity: 0.85; filter: brightness(1); }
  50%      { opacity: 0.92; filter: brightness(1.08); }
}
```

Applicata ai layer frontali (L1, L3) per dare "vita" al nastro.

**Razionale**: oggetti in primo piano sono più attivi e dinamici.

---

## 🎯 Clipping Strategy (Occlusione Intelligente)

### Maschere di Clipping

Ogni layer usa `clip-path: inset()` per definire la zona visibile:

```scss
// L0: top-left quadrant (dietro VISION sinistra)
clip-path: inset(0 50% 54% 0);
//              top right bottom left

// L1: top-right quadrant (davanti VISION destra)
clip-path: inset(0 0 54% 50%);

// L2: middle-bottom, offset left (foto + "Into")
clip-path: inset(42% 0 0 26%);

// L3: bottom strip (davanti INTELLIGENCE)
clip-path: inset(72% 0 0 0);
```

---

## 🔄 Interactive Depth Enhancement

Hover sull'hero accentua dinamicamente le differenze di profondità:

```scss
.mp-cinema-hero:hover {
  .mp-hero-curve--l1 .mp-hero-curve__body {
    stroke-width: 22px;  // espansione frontale
    opacity: 1;
  }
  .mp-hero-curve--l0 .mp-hero-curve__body {
    stroke-width: 14px;  // restringimento posteriore
    opacity: 0.6;
  }
}
```

**Effetto**: al passaggio del mouse, i layer "si allontanano" ulteriormente.

---

## 🌗 Dark Mode Adaptation

In modalità scura, la logica di luminosità si inverte:

```scss
html[data-theme='dark'] {
  .mp-hero-curve--l0 {
    // Layer "dietro" → PIÙ CHIARO (controintuitivo ma necessario)
    filter: brightness(1.1) saturate(1.2);
  }
  .mp-hero-curve--l1 {
    // Layer "davanti" → saturazione alta, brightness neutra
    filter: brightness(1.0) saturate(1.3);
  }
}
```

**Razionale**: su sfondo scuro, gli oggetti "dietro" devono staccarsi essendo più chiari.

---

## 🎨 Color Palette (Gradient Stops)

```scss
:root {
  --mp-curve-c0: #1a1b6e;   // indigo profondo (base)
  --mp-curve-c1: #6d28d9;   // viola (ombra)
  --mp-curve-c2: #c026d3;   // fuchsia (transizione)
  --mp-curve-c3: #f43f82;   // rosa neon (highlight)
}

html[data-theme='dark'] {
  --mp-curve-c0: #003d22;   // verde scuro
  --mp-curve-c1: #00994d;   // verde medio
  --mp-curve-c2: #00ff88;   // accent verde brillante
  --mp-curve-c3: #7fffd4;   // acquamarina
}
```

---

## 📐 Advanced Technique: Occlusione Dinamica

Per nascondere segmenti che passano attraverso lettere piene:

```scss
.mp-hero-curve--occluded {
  .mp-hero-curve__body {
    stroke-dasharray: 40 15;  // tratteggio
    stroke-dashoffset: 0;
    animation: mp-dash-flow 1.5s linear infinite;
  }
}
```

Questa classe può essere applicata **via JavaScript** analizzando gli elementi DOM sottostanti.

---

## 🧪 Implementation Checklist

- [x] 4 layer SVG sovrapposti con z-index diversi
- [x] Clipping preciso per ogni zona (VISION sx/dx, foto, INTELLIGENCE)
- [x] Variable stroke width (16px → 22px)
- [x] Opacity gradation (0.72 → 0.95)
- [x] Saturation shift (0.7 → 1.3)
- [x] Brightness control (0.75 → 1.15)
- [x] Multi-layered drop shadows
- [x] Twist effect con gradient overlay
- [x] Breathing animation su layer frontali
- [x] Hover interaction (dynamic depth)
- [x] Dark mode color inversion
- [x] Draw-on animation (spine layer)
- [ ] **OPZIONALE**: JS-based dynamic occlusion per negative space detection

---

## 🎬 Visual Result

L'utente percepisce:

1. **Intreccio realistico**: la curva passa alternando dietro/davanti
2. **Profondità spaziale**: differenze di spessore, luminosità, ombre
3. **Torsione 3D**: il nastro sembra ruotare su se stesso
4. **Reazione dinamica**: hover accentua le distanze tra i layer
5. **Coerenza fisica**: rispetta le leggi di luce/ombra/occlusione

---

## 🚀 Next Steps (Enhancement Ideas)

1. **Parallax Scrolling**: i layer si muovono a velocità diverse
2. **Mouse Tracking**: la curva si deforma seguendo il cursore
3. **WebGL Implementation**: per effetti ancora più complessi (riflessioni, depth of field)
4. **Negative Space Detection**: algoritmo JS che analizza le lettere e nasconde automaticamente i segmenti

---

## 📝 Credits

Design Philosophy: **"Entwined Spatial Path"**  
Implementation: CSS Advanced Filters + SVG Layering  
Inspiration: M.C. Escher, Impossible Objects, Calligraphic Ribbon Art

---

**Status**: ✅ Production Ready  
**Last Updated**: 2026-04-18  
**Version**: 2.0 — 3D Depth System
