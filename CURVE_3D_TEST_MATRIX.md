# 🧪 Test Matrix — 3D Curve Weaving System

## Visual Regression Test Checklist

Usa questa checklist per verificare che tutti gli effetti 3D siano visibili e corretti.

---

## 1. LAYER STACK VERIFICATION

### Test: Contare i layer SVG
```javascript
document.querySelectorAll('.mp-hero-curve').length
```
**Expected**: `4`  
**Status**: [ ]

---

### Test: Verificare z-index progression
```javascript
Array.from(document.querySelectorAll('.mp-hero-curve')).map(el => 
  getComputedStyle(el).zIndex
)
```
**Expected**: `["0", "2", "4", "6"]`  
**Status**: [ ]

---

## 2. STROKE WIDTH GRADATION

### Test: Misurare stroke width di ogni layer
```javascript
Array.from(document.querySelectorAll('.mp-hero-curve__body')).map(el => 
  getComputedStyle(el).strokeWidth
)
```
**Expected**: `["16px", "20px", "17px", "22px"]` (o simile)  
**Status**: [ ]

---

### Test visivo: Layer frontali devono apparire più spessi
- [ ] L3 (davanti INTELLIGENCE) è il PIÙ SPESSO
- [ ] L1 (davanti VISION dx) è più spesso di L0
- [ ] L0 (dietro VISION sx) è il PIÙ SOTTILE

---

## 3. OPACITY HIERARCHY

### Test: Verificare trasparenza crescente dal fondo al top
```javascript
Array.from(document.querySelectorAll('.mp-hero-curve__body')).map(el => 
  getComputedStyle(el).opacity
)
```
**Expected**: L0 < L2 < L1 < L3 (es. `["0.72", "0.8", "0.92", "0.95"]`)  
**Status**: [ ]

---

### Test visivo: Opacità percepita
- [ ] L0 (dietro VISION) appare SBIADITO
- [ ] L3 (davanti INTELLIGENCE) appare SOLIDO e definito

---

## 4. COLOR SATURATION

### Test visivo: Saturazione colore
- [ ] L0 (dietro): colori MENO SATURI (grigiasti)
- [ ] L3 (davanti): colori PIÙ SATURI (vividi, brillanti)
- [ ] Transizione graduale da L0 → L3

---

## 5. DROP SHADOW (Profondità)

### Test visivo: Ombre portate
- [ ] L0: ombra MINIMA o assente
- [ ] L1: ombra VISIBILE sotto la curva
- [ ] L3: ombra FORTE e NETTA (più grande offset)

---

### Test: Misurare blur shadow
Ispeziona DevTools → Computed → filter → drop-shadow
- [ ] L0: blur ≈ 3-4px
- [ ] L1: blur ≈ 8-12px
- [ ] L3: blur ≈ 14-16px

---

## 6. CLIPPING ZONES

### Test: Layer L0 visibile SOLO in top-left
```javascript
getComputedStyle(document.querySelector('.mp-hero-curve--l0')).clipPath
```
**Expected**: `inset(0px 50% 54% 0px)` o simile  
**Visual**: Curva visibile solo nella metà SINISTRA del testo VISION  
**Status**: [ ]

---

### Test: Layer L1 visibile SOLO in top-right
```javascript
getComputedStyle(document.querySelector('.mp-hero-curve--l1')).clipPath
```
**Expected**: `inset(0px 0px 54% 50%)`  
**Visual**: Curva visibile solo nella metà DESTRA del testo VISION  
**Status**: [ ]

---

### Test: Layer L2 visibile dal 42% in giù
```javascript
getComputedStyle(document.querySelector('.mp-hero-curve--l2')).clipPath
```
**Expected**: `inset(42% 0px 0px 26%)`  
**Visual**: Curva attorno alla foto e "Into"  
**Status**: [ ]

---

### Test: Layer L3 visibile solo nel bottom 28%
```javascript
getComputedStyle(document.querySelector('.mp-hero-curve--l3')).clipPath
```
**Expected**: `inset(72% 0px 0px 0px)`  
**Visual**: Curva sopra INTELLIGENCE  
**Status**: [ ]

---

## 7. GRADIENT COLORS

### Test: Verificare che i gradienti siano applicati
Ispeziona DevTools → Elements → `<path class="mp-hero-curve__body">`

- [ ] L0: `stroke="url(#curveGradientL0)"`
- [ ] L1: `stroke="url(#curveGradientL1)"`
- [ ] L2: `stroke="url(#curveGradientL2)"`
- [ ] L3: `stroke="url(#curveGradientL3)"`

---

### Test visivo: Progressione colore Light Mode
- [ ] L0: toni INDACO/BLU scuro (#1a1b6e)
- [ ] L1: toni VIOLA (#6d28d9)
- [ ] L2: toni FUCHSIA (#c026d3)
- [ ] L3: toni ROSA NEON (#f43f82)

---

### Test visivo: Progressione colore Dark Mode
Toggle dark mode (se disponibile)
- [ ] L0: verde scuro (#003d22)
- [ ] L1: verde medio (#00994d)
- [ ] L2: verde brillante (#00ff88)
- [ ] L3: acquamarina (#7fffd4)

---

## 8. BREATHING ANIMATION

### Test: Animazione attiva su L1 e L3
Osserva per 10 secondi:
- [ ] L1 (davanti VISION) pulsa LENTAMENTE (≈6s cycle)
- [ ] L3 (davanti INTELLIGENCE) pulsa LENTAMENTE (≈5s cycle)
- [ ] L0 e L2 NON pulsano (statici)

---

### Test: Verifica keyframes esistono
```javascript
document.styleSheets[0].cssRules[0].name
```
Cerca: `mp-curve-breathe`  
**Status**: [ ]

---

## 9. DRAW-ON ANIMATION (Spine)

### Test: Spine si disegna al caricamento pagina
Ricarica la pagina (F5) e osserva:
- [ ] Il filo sottile SOPRA la curva si "disegna" da sinistra a destra
- [ ] Durata ≈ 2-3 secondi
- [ ] Inizia DOPO un piccolo delay (≈0.4s)

---

### Test: Verifica stroke-dasharray applicato
```javascript
getComputedStyle(document.querySelector('.mp-hero-curve__spine')).strokeDasharray
```
**Expected**: Numero grande (es. `3200`)  
**Status**: [ ]

---

## 10. HOVER INTERACTIONS

### Test: Hover sull'hero → depth exaggeration
Passa il mouse sull'area `.mp-cinema-hero`:
- [ ] L1 e L3 si ESPANDONO (stroke più spesso)
- [ ] L0 si RESTRINGE (stroke più sottile)
- [ ] Transizione SMOOTH (≈0.4-0.6s)

---

### Test: Misurare stroke dopo hover
Con mouse OVER l'hero:
```javascript
getComputedStyle(document.querySelector('.mp-hero-curve--l1 .mp-hero-curve__body')).strokeWidth
```
**Expected**: `22px` (più grande del default 20px)  
**Status**: [ ]

---

## 11. PARALLAX MOVEMENT (opzionale, se JS attivo)

### Test: Mouse tracking
Muovi il mouse lentamente sopra l'hero:
- [ ] Layer L3 (z:6) si muove DI PIÙ
- [ ] Layer L0 (z:0) si muove DI MENO o per niente
- [ ] Effetto "3D scene" (layers a profondità diverse)

---

### Test: Verifica transform applicato
Con mouse in movimento:
```javascript
getComputedStyle(document.querySelector('.mp-hero-curve--l3')).transform
```
**Expected**: `matrix(1, 0, 0, 1, X, Y)` dove X,Y ≠ 0  
**Status**: [ ]

---

## 12. DARK MODE INVERSION

### Test: Toggle dark mode
Attiva dark mode e verifica:
- [ ] Colori gradiente CAMBIANO (indaco → verde)
- [ ] Layer L0 diventa PIÙ CHIARO (inversione logica)
- [ ] Contrasto generale rimane LEGGIBILE

---

### Test: Verifica CSS variables
```javascript
getComputedStyle(document.documentElement).getPropertyValue('--mp-curve-c2')
```
**Light mode**: `#c026d3` (fuchsia)  
**Dark mode**: `#00ff88` (verde)  
**Status**: [ ]

---

## 13. RESPONSIVE BEHAVIOR

### Test: Mobile viewport (< 768px)
Ridimensiona finestra a 375px width:
- [ ] Curve si ADATTANO (no overflow orizzontale)
- [ ] Clipping rimane CORRETTO
- [ ] Stroke width si RIDUCE proporzionalmente (opzionale)

---

### Test: No horizontal scroll
```javascript
document.body.scrollWidth <= window.innerWidth
```
**Expected**: `true`  
**Status**: [ ]

---

## 14. PERFORMANCE

### Test: Frame rate durante hover
Apri DevTools → Performance → Registra 3 secondi con hover:
- [ ] FPS ≥ 55 (smooth)
- [ ] No layout thrashing
- [ ] GPU acceleration attiva (check Layer panel)

---

### Test: Verifica hardware acceleration
```javascript
getComputedStyle(document.querySelector('.mp-hero-curve--l1')).willChange
```
**Expected**: `transform` o `auto`  
**Status**: [ ]

---

## 15. ACCESSIBILITY

### Test: Screen reader ignora decorazioni
```javascript
document.querySelector('.mp-hero-curve').getAttribute('aria-hidden')
```
**Expected**: `"true"`  
**Status**: [ ]

---

### Test: Focus non trappolato nelle curve SVG
Tab attraverso la pagina:
- [ ] Focus NON si ferma sugli elementi `.mp-hero-curve`
- [ ] Focus va direttamente dai link/button reali

---

## 16. BROWSER COMPATIBILITY

### Test: Safari
- [ ] Gradienti SVG rendering corretto
- [ ] Drop shadows visibili
- [ ] Clipping funziona

---

### Test: Firefox
- [ ] Background-clip: text funziona (VISION gradient)
- [ ] Filter stack (drop-shadow + brightness) OK
- [ ] No glitch visivi

---

### Test: Chrome/Edge
- [ ] Tutto funziona (baseline)

---

## 17. CONSOLE ERRORS

### Test: No JS errors
Apri DevTools → Console:
- [ ] Nessun errore rosso
- [ ] Se JS caricato, messaggio: `[3D Curve] System initialized ✓`

---

## 18. DEBUG MODE (se JS attivo)

### Test: Attiva debug mode
```javascript
CONFIG.debugMode = true;
// poi ricarica o chiama init()
```
Verifica:
- [ ] Overlay rossi appaiono sulle zone OCCLUSE
- [ ] Confini delle clip-path sono visibili
- [ ] Log dettagliati in console

---

## FINAL CHECKLIST

- [ ] Tutti i 4 layer sono visibili nelle zone corrette
- [ ] Profondità percepita è CHIARA (front vs back)
- [ ] Hover accentua la profondità
- [ ] Animazioni sono smooth (no jank)
- [ ] Colori sono corretti in light/dark mode
- [ ] Responsive funziona senza overflow
- [ ] No errori console
- [ ] Performance accettabile (>55 FPS)

---

## SCORING

Totale test passati: ____ / 50+

- **45-50**: 🏆 Eccellente — Production ready
- **35-44**: ✅ Buono — Minor tweaks needed
- **25-34**: ⚠️ Sufficiente — Richiede fix
- **< 25**: ❌ Critico — Debug necessario

---

**Tester**: _______________  
**Date**: _______________  
**Browser**: _______________  
**Viewport**: _______________  
**Notes**:

```
[Spazio per note aggiuntive o bug trovati]






```

---

**Last Updated**: 2026-04-18  
**Version**: 2.0 — QA Test Matrix
