# 🎨 Portfolio Hero — Note di Sviluppo

> Documento interno per ricordare come è strutturata la hero section del nuovo design e quali problemi si sono incontrati durante lo sviluppo.

---

## 📁 File Coinvolti

| File | Ruolo |
|------|-------|
| `_pages/home_new.md` | Markup HTML della homepage (permalink `/new/`) |
| `assets/css/portfolio.scss` | Tutto il CSS del design system (1600+ righe) |
| `assets/js/portfolio-main.js` | Three.js + GSAP animations + logica JS |
| `_layouts/portfolio.html` | Layout wrapper con navbar |
| `assets/data/scholar.json` | Dati pubblicazioni da Google Scholar |

---

## 🏗️ Struttura della Hero Section (Billboard Edition)

La hero è basata su un layout a **strati assoluti** (`position: absolute`) dentro un contenitore `position: relative; min-height: 100dvh`.

```
┌─────────────────────────────────────────┐
│  [canvas Three.js]          z-index: 0  │
│  [SVG waves animati]        z-index: 2  │
│  [TRANSFORMING overline]    z-index: 3  │
│  [VISION gradient testo]    z-index: 3  │
│  [Foto B&W + "Into"]        z-index: 4  │
│  [██ INTELLIGENCE ████]     z-index: 5  │
│  [bottoni CTA]              z-index: 6  │
│  [scroll hint]              z-index: 7  │
└─────────────────────────────────────────┘
```

### Classi CSS principali

```scss
.p-hero--billboard        // contenitore principale
.p-bb__overline           // "TRANSFORMING" piccolo in alto
.p-bb__vision             // "VISION" grande con gradient
.p-bb__photo-wrap         // wrapper foto B&W
.p-bb__photo              // <img> con filter: grayscale
.p-bb__into               // label "Into" sovrapposta alla foto
.p-bb__intel              // barra verde "INTELLIGENCE"
.p-bb__footer             // bottoni CTA in basso
```

---

## 🐛 Problemi Incontrati e Soluzioni

### 1. `overflow: hidden` sul contenitore tagliava INTELLIGENCE a sinistra

**Problema:** `.p-hero--billboard` aveva `overflow: hidden`. Quando il testo "INTELLIGENCE" era troppo largo e veniva scalato con `scaleX()` via JS, il browser applicava il clipping simmetricamente — tagliando la parte sinistra della parola.

**Causa:** `overflow: hidden` crea un nuovo contesto di formattazione che taglia tutto ciò che esce dai bordi, incluso il lato sinistro quando `transform-origin` non è perfettamente centrato.

**Soluzione:**
```scss
// ❌ Prima
overflow: hidden;

// ✅ Dopo
overflow-x: clip;
overflow-y: hidden;
```

`overflow-x: clip` taglia senza creare un nuovo scroll container, preservando meglio il comportamento del transform.

---

### 2. INTELLIGENCE non centrato nonostante `text-align: center`

**Problema:** Lo span con il testo "INTELLIGENCE" era `display: inline-block` dentro un contenitore con `text-align: center`. Quando `fitIntelBar()` applicava `scaleX()`, il punto di origine del transform non coincideva con il centro visivo del testo, causando un offset verso destra.

**Soluzione:** Sostituire il centering inline con flexbox e usare `display: block` sullo span:

```scss
// ❌ Prima
.p-bb__intel {
  text-align: center;
  span { display: inline-block; }
}

// ✅ Dopo
.p-bb__intel {
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    display: block;
    width: fit-content;
    transform-origin: 50% 50%;
  }
}
```

E in `fitIntelBar()` nel JS:
```javascript
// ✅ Sempre impostare transform-origin prima dello scaleX
span.style.transformOrigin = '50% 50%';
span.style.transform = 'scaleX(' + scale + ')';
```

---

### 3. `max-width` + `overflow: hidden` sullo span tagliavano il testo

**Problema:** Per prevenire l'overflow, era stato aggiunto `max-width: 96vw; overflow: hidden` direttamente sullo span. Questo causava il taglio del testo dal lato sinistro (il browser taglia da destra per default con `overflow: hidden` su testo LTR, ma con transform applicato il comportamento era imprevedibile).

**Soluzione:** Rimuovere `max-width` e `overflow: hidden` dallo span e affidarsi **esclusivamente** a `fitIntelBar()` in JS per il ridimensionamento tramite `scaleX()`.

```scss
// ❌ Rimosso
max-width: 96vw;
overflow: hidden;
```

```javascript
// ✅ fitIntelBar() gestisce tutto
function fitIntelBar() {
  var span = $('.p-bb__intel').querySelector('span');
  var spanW = span.scrollWidth;
  var vw = window.innerWidth;
  if (spanW > vw * 0.96) {
    var scale = (vw * 0.96) / spanW;
    span.style.transformOrigin = '50% 50%';
    span.style.transform = 'scaleX(' + scale + ')';
  } else {
    span.style.transformOrigin = '50% 50%';
    span.style.transform = '';
  }
}
```

---

### 4. Il cognome "Planamente" veniva troncato nella navbar

**Problema:** Il template usava `slice:0` sul cognome invece di mostrarlo intero.

**Soluzione:** Nel layout `portfolio.html`, usare direttamente `{{ site.last_name }}` senza filtri slice.

---

### 5. Warning non bloccanti (non sono errori reali)

Durante il build appaiono questi warning che **non bloccano** il sito:

| Warning | Causa | Azione |
|---------|-------|--------|
| `sh: convert: command not found` | ImageMagick non installato — Jekyll prova a generare `.webp` | Ignorabile in locale, funziona in produzione |
| `@import deprecated in Dart Sass` | Font Awesome usa `@import` legacy | Ignorabile finché non si aggiorna FA |
| `KeyError: 'template_paths'` | Versione vecchia di `nbconvert` Python 3.7 | Ignorabile, riguarda i notebook Jupyter |
| `uglifier_args` ripetuto | Jekyll Minifier filtra opzioni legacy di Uglifier | Ignorabile |

---

## 🔧 Come fare modifiche alla Hero

### Spostare INTELLIGENCE in verticale
```scss
// In assets/css/portfolio.scss → .p-bb__intel
bottom: clamp(5rem, 12vw, 9rem);  // aumenta per alzarla, diminuisci per abbassarla
```

### Cambiare dimensione font INTELLIGENCE
```scss
// In assets/css/portfolio.scss → .p-bb__intel span
font-size: clamp(2.5rem, 9vw, 10rem);
```

### Spostare i bottoni CTA
```scss
// In assets/css/portfolio.scss → .p-bb__footer
bottom: clamp(0.25rem, 0.8vw, 0.75rem);
left: clamp(1.25rem, 4vw, 3rem);
```

### Aggiungere/rimuovere elementi dalla hero
Editare `_pages/home_new.md` nella sezione `<section class="p-hero p-hero--billboard">`.

---

## 🚀 Build e Preview locale

```bash
# Build
bundle exec jekyll build

# Serve (porta 4001)
bundle exec jekyll serve --port 4001 --no-watch

# Preview
open http://localhost:4001/new/
```

---

## 📋 TODO / Pending

- [ ] Migrare il permalink da `/new/` a `/` per rendere la billboard hero la homepage principale
- [ ] Verificare rendering sezione Publications (top 3 paper più citati da `scholar.json`)
- [ ] Test responsiveness mobile (breakpoint `@media (max-width: 640px)`)
