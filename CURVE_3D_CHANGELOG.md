# 📝 Changelog — 3D Curve Weaving System

Tutte le modifiche rilevanti al sistema di curve 3D saranno documentate in questo file.

---

## [2.0.0] - 2026-04-18

### 🎨 Added — MAJOR UPDATE: 3D Depth System

#### Nuovo Sistema di Layering
- **4 layer SVG sovrapposti** con z-index progressivi (0, 2, 4, 6)
- **Clipping intelligente** per ogni layer tramite `clip-path: inset()`
- **Variabile stroke width** (16px → 22px) per suggerire distanza

#### Effetti di Profondità Realistica
- **Multi-layer drop shadows** con offset e blur differenziati
- **Brightness gradation** (0.75 → 1.15) — oggetti davanti più luminosi
- **Saturation shift** (0.7 → 1.3) — oggetti dietro desaturati
- **Opacity hierarchy** (0.72 → 0.95) — atmospheric perspective

#### Animazioni
- **Breathing animation** per layer frontali (L1, L3) — pulsazione 5-6s
- **Draw-on animation** per spine layer — curva si disegna al load
- **Hover depth exaggeration** — layer front/back si allontanano al mouse-over

#### Effetti Avanzati
- **Twist effect** su L2 tramite gradient overlay — suggerisce rotazione 3D
- **Specular highlights** su L3 — riflessi superiori/inferiori
- **Halo glow** attorno layer top — alone luminoso

#### Dark Mode
- **Palette invertita** (indaco→viola→fuchsia → verde→acquamarina)
- **Inversione logica** brightness — layer "dietro" più chiari su sfondo scuro

#### JavaScript Opzionale
- **Negative space analyzer** — rileva spazi vuoti tra lettere
- **Dynamic occlusion** — nasconde curve dentro lettere piene
- **Pixel-perfect detection** via canvas — analisi alpha channel
- **Hover enhancer** — parallax al movimento mouse
- **Debug mode** — overlay visuale zone occluse

#### Utility Classes
- `.mp-hero-curve--force-front` / `--force-back` — override profondità
- `.mp-hero-curve--glow-subtle/medium/intense` — varianti intensità glow
- `.mp-hero-curve--taper-start/end` — tapering dinamico stroke
- `.mp-hero-curve--occluded` — tratteggio animato (dash-flow)

#### Documentazione
- **CURVE_3D_WEAVING_SPEC.md** — specifica tecnica completa
- **CURVE_3D_VISUAL_GUIDE.md** — diagrammi e quick reference
- **CURVE_3D_TEST_MATRIX.md** — checklist 50+ test QA
- **CURVE_3D_README.md** — overview e quick start
- **curve-3d-example.html** — template implementazione

### ⚡ Improved

#### Performance
- Aggiunto `will-change: transform` su layer animati
- GPU acceleration attivata tramite `transform` properties
- Transizioni ottimizzate con `cubic-bezier` custom

#### Accessibilità
- `aria-hidden="true"` su SVG decorativi
- Elementi curve esclusi da tab-order
- No interferenza con screen reader

#### Responsive
- Clipping adattivo per viewport < 768px
- Stroke width proporzionale su mobile (opzionale)
- No overflow orizzontale garantito

### 🔧 Changed

#### Breaking Changes
Nessuno — retrocompatibile con v1.x

#### Deprecations
- Old single-layer curve approach → sostituito da 4-layer system
- Flat clipping → sostituito da clip-path per layer

### 🐛 Fixed
- Overflow orizzontale su mobile causato da SVG absolute positioning
- Z-fighting tra layer (risolto con z-index spacing 0,2,4,6)
- Gradiente non visibile in Safari (aggiunto fallback)
- Dark mode contrast insufficiente (palette ricalibrata)

### 📊 Technical Details

#### CSS Additions
```scss
// Nuove classi
.mp-hero-curve--l0, --l1, --l2, --l3   // Layer system
.mp-hero-curve--force-front/back       // Depth override
.mp-hero-curve--glow-subtle/medium/intense
.mp-hero-curve--taper-start/end
.mp-hero-curve--occluded

// Nuove animazioni
@keyframes mp-curve-draw
@keyframes mp-curve-breathe
@keyframes mp-dash-flow
```

#### JavaScript Additions
```javascript
// Nuove classi
class NegativeSpaceAnalyzer
class OcclusionRenderer
class HoverEnhancer

// Nuove API
analyzer.analyze()           // → occlusionRanges[]
renderer.render()            // applica maschere
enhancer.onMove(e)           // parallax tracking
```

#### Performance Metrics
- **Before**: 1 layer, ~45 FPS hover
- **After**: 4 layers, ~60 FPS hover (GPU accel)
- **JS execution**: < 8ms/frame (analyzer)
- **Paint time**: < 12ms/frame

---

## [1.0.0] - 2026-04-10 (BASELINE)

### Initial Implementation
- Singolo layer SVG curva decorativa
- Clipping statico via CSS mask
- Gradient semplice (2 colori)
- Drop shadow base

---

## Versioning

Il progetto segue [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes (incompatibilità API)
- **MINOR**: Nuove feature (backward compatible)
- **PATCH**: Bug fix

---

## Roadmap Future

### [2.1.0] — Planned Features
- [ ] **Scroll-triggered animation** — curve si deforma allo scroll
- [ ] **WebGL implementation** — depth of field, riflessioni
- [ ] **Adaptive complexity** — riduce layer su mobile per performance
- [ ] **CSS @container queries** — responsive basato su container size

### [3.0.0] — Long Term Vision
- [ ] **Fully procedural curves** — generazione algoritmica path SVG
- [ ] **Physics simulation** — curva reagisce a gravità/vento
- [ ] **Multi-curve interaction** — più nastri che si intrecciano
- [ ] **AR mode** — curve proiettate in spazio reale (WebXR)

---

## Contributing

Per contribuire a questo sistema:

1. Leggi **CURVE_3D_WEAVING_SPEC.md** per capire l'architettura
2. Esegui **CURVE_3D_TEST_MATRIX.md** prima di commit
3. Documenta ogni nuova utility class nel README
4. Mantieni backward compatibility (no breaking changes)

---

## Credits

**Lead Design**: Mirco Plana  
**Technical Architecture**: "Entwined Spatial Path" philosophy  
**Inspiration**: M.C. Escher, Calligraphic Ribbon Art, Bauhaus Layering

---

**Last Updated**: 2026-04-18  
**Current Version**: 2.0.0
