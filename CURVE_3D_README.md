# 🎨 3D Curve Weaving System

> **"Entwined Spatial Path"** — Un sistema avanzato di weaving 3D che crea profondità realistica attraverso clipping intelligente, variazione di spessore, e effetti di luce/ombra.

---

## 🎯 Obiettivo

Creare l'illusione che una curva decorativa **passi attraverso** gli elementi della pagina, rispettando gli spazi vuoti e creando un senso di profondità tridimensionale.

---

## 🏗️ Architettura

### Layer System (4 livelli sovrapposti)

```
Z-INDEX    LAYER    ZONA                  EFFETTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   0       L0      Dietro VISION sx      Scuro, sottile
   2       L1      Davanti VISION dx     Brillante, spesso
   4       L2      Attorno foto          Tapering, twist
   6       L3      Davanti INTELLIGENCE  Massima presenza
```

---

## 🎨 Tecniche di Profondità 3D

| Tecnica               | L0 (Back)   | L1 (Front)  | L2 (Mid)    | L3 (Top)    |
|-----------------------|-------------|-------------|-------------|-------------|
| **Stroke Width**      | 16px        | 20px        | 17px        | 22px        |
| **Opacity**           | 0.72        | 0.92        | 0.80        | 0.95        |
| **Brightness**        | 0.75        | 1.1         | 0.95        | 1.15        |
| **Saturation**        | 0.7         | 1.2         | 0.9         | 1.3         |
| **Shadow Blur**       | 3px         | 8px         | 6px         | 14px        |
| **Glow**              | Minimo      | Medio       | Medio       | Intenso     |

### Risultato Visivo

- **Oggetti vicini**: più spessi, luminosi, saturi, ombre forti
- **Oggetti lontani**: più sottili, scuri, desaturati, ombre deboli
- **Transizioni**: smooth tra i layer per coerenza fisica

---

## 📂 File del Sistema

```
📦 3D Curve Weaving System
├── 📄 _sass/_custom.scss              # CSS principale (layer, effetti)
├── 📄 assets/js/curve-3d-weaving.js   # JS opzionale (occlusione dinamica)
├── 📄 _includes/curve-3d-example.html # Esempio implementazione
├── 📘 CURVE_3D_WEAVING_SPEC.md        # Specifica tecnica completa
├── 📗 CURVE_3D_VISUAL_GUIDE.md        # Guida visuale quick reference
└── 📙 CURVE_3D_TEST_MATRIX.md         # Checklist test QA
```

---

## 🚀 Quick Start

### 1. HTML: Definisci i layer SVG

```html
<!-- Layer 0: dietro VISION sinistra -->
<svg class="mp-hero-curve mp-hero-curve--l0" viewBox="0 0 1000 800">
  <path class="mp-hero-curve__body" stroke="url(#grad0)" d="M..."/>
</svg>

<!-- Layer 1: davanti VISION destra -->
<svg class="mp-hero-curve mp-hero-curve--l1" viewBox="0 0 1000 800">
  <path class="mp-hero-curve__body" stroke="url(#grad1)" d="M..."/>
</svg>

<!-- Layer 2: attorno foto -->
<svg class="mp-hero-curve mp-hero-curve--l2" viewBox="0 0 1000 800">
  <path class="mp-hero-curve__body" stroke="url(#grad2)" d="M..."/>
</svg>

<!-- Layer 3: davanti INTELLIGENCE -->
<svg class="mp-hero-curve mp-hero-curve--l3" viewBox="0 0 1000 800">
  <path class="mp-hero-curve__body" stroke="url(#grad3)" d="M..."/>
</svg>
```

### 2. CSS: Già incluso in `_custom.scss`

Tutte le classi `.mp-hero-curve--l0`, `.mp-hero-curve--l1`, ecc. sono già definite con:
- `clip-path` per nascondere le zone non volute
- `filter` per ombre, saturazione, luminosità
- `animation` per breathing effect

### 3. JS (Opzionale): Includi script per occlusione avanzata

```html
<script src="/assets/js/curve-3d-weaving.js" defer></script>
```

Configurazione in `curve-3d-weaving.js`:
```javascript
const CONFIG = {
  enableDynamicOcclusion: true,   // nasconde curve dentro lettere
  enableHoverEnhancement: true,    // parallax al mouse
  debugMode: false                 // overlay debug
};
```

---

## 🎛️ Utility Classes

### Force Depth Override

```html
<!-- Forza massima profondità (primo piano) -->
<svg class="mp-hero-curve mp-hero-curve--force-front">...</svg>

<!-- Forza minima profondità (sfondo) -->
<svg class="mp-hero-curve mp-hero-curve--force-back">...</svg>
```

### Glow Intensity

```html
<svg class="mp-hero-curve mp-hero-curve--glow-subtle">...</svg>
<svg class="mp-hero-curve mp-hero-curve--glow-medium">...</svg>
<svg class="mp-hero-curve mp-hero-curve--glow-intense">...</svg>
```

### Tapering (stroke width variabile)

```html
<svg class="mp-hero-curve mp-hero-curve--taper-start">...</svg>
<svg class="mp-hero-curve mp-hero-curve--taper-end">...</svg>
```

### Occlusione Dinamica

```html
<!-- Nasconde curve dietro lettere (tratteggio animato) -->
<svg class="mp-hero-curve mp-hero-curve--occluded">...</svg>
```

---

## 🌗 Dark Mode

Il sistema si adatta automaticamente a dark mode con palette invertita:

**Light Mode**: Indaco → Viola → Fuchsia → Rosa  
**Dark Mode**: Verde scuro → Verde medio → Verde brillante → Acquamarina

```scss
html[data-theme='dark'] {
  --mp-curve-c0: #003d22;
  --mp-curve-c1: #00994d;
  --mp-curve-c2: #00ff88;
  --mp-curve-c3: #7fffd4;
}
```

---

## 🔬 Testing

Usa la matrice di test per verificare tutti gli effetti:

```bash
# Controlla layer count
document.querySelectorAll('.mp-hero-curve').length
# Expected: 4

# Verifica z-index stack
Array.from(document.querySelectorAll('.mp-hero-curve'))
  .map(el => getComputedStyle(el).zIndex)
# Expected: ["0", "2", "4", "6"]

# Attiva debug mode (se JS caricato)
CONFIG.debugMode = true;
```

Vedi **CURVE_3D_TEST_MATRIX.md** per checklist completa (50+ test).

---

## 📊 Performance

| Aspetto                  | Metrica          |
|--------------------------|------------------|
| FPS durante hover        | ≥ 55 FPS         |
| Layout thrashing         | ❌ None          |
| GPU acceleration         | ✅ Attiva        |
| JS execution time        | < 10ms/frame     |
| Compatibilità browser    | Chrome, Firefox, Safari, Edge |

---

## 🎓 Concetti Chiave

### 1. **Negative Space Weaving**
La curva "cerca" gli spazi vuoti tra lettere e immagini, infilandosi come un filo attraverso un tessuto.

### 2. **Layered Occlusion**
Ogni segmento della curva è duplicato in 4 layer con z-index diversi, poi nascosto/mostrato via `clip-path`.

### 3. **Variable Stroke Width** (Tapering)
Lo spessore diminuisce quando la curva "entra" in spazi stretti, aumenta quando emerge.

### 4. **Multi-Layer Drop Shadows**
Ogni layer proietta ombra sugli elementi dietro, creando separazione spaziale.

### 5. **Atmospheric Perspective**
Oggetti lontani sono desaturati, scuri, sfocati (come nella realtà).

### 6. **Twist Effect**
Gradient overlay suggerisce che il nastro ruota su se stesso nello spazio 3D.

---

## 🎬 Effetto Finale

L'utente percepisce:

✅ **Intreccio realistico**: curva passa alternando dietro/davanti  
✅ **Profondità spaziale**: differenze di spessore, luce, ombre  
✅ **Torsione 3D**: il nastro sembra ruotare  
✅ **Reazione dinamica**: hover accentua le distanze  
✅ **Coerenza fisica**: rispetta leggi di occlusione e illuminazione

---

## 🛠️ Personalizzazione

### Cambia il percorso della curva

Modifica il parametro `d=""` dell'elemento `<path>`:

```html
<path d="M 100,150 
         Q 250,120 350,180 
         Q 450,240 500,300 
         ..." />
```

Usa un editor SVG (Figma, Illustrator) per disegnare visualmente.

### Cambia colori

Modifica le CSS variables in `:root`:

```scss
:root {
  --mp-curve-c0: #1a1b6e;  // cambia questi
  --mp-curve-c1: #6d28d9;
  --mp-curve-c2: #c026d3;
  --mp-curve-c3: #f43f82;
}
```

### Modifica profondità

Cambia parametri in `_custom.scss`:

```scss
.mp-hero-curve--l3 {
  .mp-hero-curve__body {
    stroke-width: 28px;        // aumenta spessore
    opacity: 1;                // opacità massima
  }
  filter: brightness(1.3);     // più brillante
}
```

---

## 🐛 Troubleshooting

| Problema                     | Soluzione                                   |
|------------------------------|---------------------------------------------|
| Curve non visibili           | Verifica che SVG siano dentro `.mp-cinema-hero` |
| No profondità percepita      | Controlla che `filter: drop-shadow()` sia applicato |
| Clipping non funziona        | Verifica sintassi `clip-path: inset(...)` |
| Animazione non smooth        | Aggiungi `will-change: transform` |
| Dark mode colori sbagliati   | Verifica override in `html[data-theme='dark']` |

---

## 📚 Risorse

- **CURVE_3D_WEAVING_SPEC.md** — Specifica tecnica completa
- **CURVE_3D_VISUAL_GUIDE.md** — Diagrammi e quick reference
- **CURVE_3D_TEST_MATRIX.md** — Checklist QA per testing
- **curve-3d-example.html** — Template implementazione

---

## 📄 License

Parte del MP Design System — 2026

---

## 🤝 Credits

**Design Philosophy**: "Entwined Spatial Path"  
**Implementation**: CSS Advanced Filters + SVG Multi-Layering  
**Inspiration**: M.C. Escher, Calligraphic Ribbon Art, Impossible Geometry

---

**Status**: ✅ Production Ready  
**Version**: 2.0 — 3D Depth System  
**Last Updated**: 2026-04-18
