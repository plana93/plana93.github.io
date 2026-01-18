# PhD Design System - Portfolio Documentation

## 🎨 Design Philosophy

Questo portfolio è stato progettato seguendo i principi di **"Typography as Shape"** e **"Zero Dopamine Design"**, creando un'esperienza visiva che riflette l'estremo rigore scientifico di un ricercatore PhD mantenendo una visione d'avanguardia.

## 🔤 Tipografia - Tech-Humanist Pairing

### Font Stack
- **Sans-Serif Principal**: `Inter` - Per titoli e testo principale
  - Peso: 300 (Light), 400 (Regular), 700 (Bold), 800 (ExtraBold), 900 (Black)
  - Tracking: -0.02em to -0.05em (tight per look moderno)

- **Monospace Tecnico**: `JetBrains Mono` - Per codice, etichette tecniche, metadati
  - Peso: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
  - Tracking: 0 to 0.15em (per leggibilità)

### Gerarchia Tipografica
```scss
// Hero Titles (Giganti)
.hero-title: clamp(3rem, 10vw, 8rem) | font-weight: 900

// Section Titles
.section-title: clamp(1.8rem, 4vw, 2.8rem) | font-weight: 800

// Sottotitoli Tecnici
.subtitle-tech: clamp(0.875rem, 2vw, 1.1rem) | monospace | uppercase

// Body Text
body: 1rem | Inter Regular

// Technical Labels
.technical-text: 0.75rem - 0.875rem | monospace | uppercase
```

## 🎨 Color Palette - Limited & Intentional

### Colori Principali
```scss
--phd-neon-accent: #00ff88  // Verde neon - Highlight principale
--phd-neon-blue: #00d4ff    // Blu elettrico - Accento secondario
--phd-neon-pink: #ff006e    // Rosa neon - Accento terziario
--global-theme-color: (from config) // Colore tema del sito
```

### Utilizzo
- **Verde (#00ff88)**: Egocentric Vision, Research highlights, CTA buttons
- **Blu (#00d4ff)**: Domain Adaptation, Technical elements
- **Rosa (#ff006e)**: Multi-modal Learning, Special features
- **Tema**: Industrial Vision, Links standard

## 📐 Layout System

### Broken Grid (12 colonne)
```html
<div class="broken-grid">
  <div class="span-6">...</div>  <!-- 50% width -->
  <div class="span-4 offset-2">...</div>  <!-- 33% width, offset 16% -->
</div>
```

### Asymmetric Grid
Usato per layout 1:2:1 o layout variabili che creano tensione visiva.

### Spacing System
```scss
.generous-spacing: clamp(3rem, 10vw, 8rem) verticale
.breathe: clamp(2rem, 5vw, 4rem) verticale
.air-top / .air-bottom: Spacing unidirezionale
```

## 🔬 Componenti Scientifici

### Research Cards
Card con bordo colorato a sinistra, hover effect, e metadata in monospace.
```html
<div class="research-card hover-lift">
  <p class="paper-venue">[01] CATEGORY</p>
  <h3 class="paper-title">Title</h3>
  <p>Description</p>
  <p class="paper-meta">Meta info</p>
</div>
```

### Scientific Callout
Grande blocco citazione per highlight di ricerca o formule.
```html
<div class="scientific-callout">
  <p class="callout-title">CATEGORY</p>
  <div class="callout-content">Big statement</div>
  <p class="callout-meta">Context</p>
</div>
```

### Coordinate Links
Link minimalisti stile terminale con parentesi quadre.
```html
<a href="#" class="coord-link">Link_Text</a>
<!-- Renders as: [Link_Text] -->
```

## ✨ Effetti Grafici

### Glitch Effect (Controllato)
```html
<div class="glitch" data-text="Your Text">Your Text</div>
```
Subtle glitch effect su hover con colori neon.

### Scanlines
```html
<div class="scanlines">Content</div>
```
Sottili linee orizzontali che simulano un terminale.

### Neural Network Pattern
```html
<div class="neural-network-pattern">...</div>
```
Background pattern geometrico minimalista.

### Data Visualization Background
```html
<div class="data-viz-bg">Content</div>
```
Gradient radiali sfocati che evocano visualizzazioni di dati.

## 🎭 Animazioni

### Fade In Up
```scss
.animate-in         // Fade in con translate Y
.stagger-1 to .stagger-4  // Delay progressivo
```

### Hover Effects
```scss
.hover-lift         // Translate Y up su hover
.hover-glow         // Box shadow neon su hover
```

## 📱 Responsive Design

- **Desktop (>992px)**: Layout completo con griglia asimmetrica
- **Tablet (768px - 992px)**: Griglia a 2 colonne, font ridotti
- **Mobile (<768px)**: Tutto stacked, griglia 1 colonna, titoli scalati

Auto-collapsing delle grid complesse via media queries.

## 🎯 Best Practices

### Do's
✅ Usa monospace per tutto ciò che è tecnico/metadata  
✅ Mantieni ampio spazio bianco tra sezioni  
✅ Limita i colori neon a highlights strategici  
✅ Usa font-weight 700+ per titoli importanti  
✅ Aggiungi data-attributes per effetti speciali  

### Don'ts
❌ Non sovraccaricare con troppi effetti glitch  
❌ Non usare più di 3 colori neon nella stessa sezione  
❌ Non ridurre lo spacing per "riempire" spazio  
❌ Non mescolare troppi font weights (max 3 per elemento)  
❌ Non usare animazioni continue aggressive  

## 🚀 Performance

- Font caricati via Google Fonts con `display=swap`
- Animazioni GPU-accelerated (transform, opacity)
- Lazy loading per immagini
- CSS minificato in produzione
- Zero JavaScript dependencies (tranne animazioni on-load opzionali)

## 📚 Esempi di Utilizzo

### Sezione Hero
```html
<div class="generous-spacing data-viz-bg">
  <p class="subtitle-tech">Category</p>
  <h1 class="hero-title">Big Title</h1>
  <p>Description text</p>
</div>
```

### Sezione con Titolo Tecnico
```html
<h2 class="section-title">
  <span style="font-family: 'JetBrains Mono'...">$ command</span>
  Human Title
</h2>
```

### Metrics Display
```html
<div style="text-align: center;">
  <div style="font-size: 5rem; font-weight: 900; color: var(--phd-neon-accent);">
    26+
  </div>
  <div style="font-family: 'JetBrains Mono'...">
    LABEL
  </div>
</div>
```

## 🔧 Manutenzione

### Aggiungere un nuovo colore accent
1. Definirlo in `_phd-design.scss` sotto `:root`
2. Creare utility class `.accent-[name]`
3. Documentare l'uso semantico

### Aggiungere un nuovo componente
1. Creare in `_phd-design.scss` con commento header
2. Seguire naming convention esistente
3. Aggiungere esempio qui in documentazione
4. Testare responsive behavior

---

**Design System Version**: 1.0  
**Last Updated**: Gennaio 2026  
**Designed for**: PhD-level AI Research Portfolio
