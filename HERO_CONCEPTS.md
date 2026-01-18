# 🎨 Hero Typography Concepts - Documentation

## Overview

Ho implementato **4 concept tipografici avanzati** per l'hero section del portfolio, basati sui principi di **Typography as Shape** e **Kinetic Typography**.

## 🎯 Concept Implementato: "The Hybrid Stack"

Il concept attualmente attivo in `about.md` è il **Concept 4: "The Hybrid Stack"**, che combina i migliori elementi dei 3 concept originali.

### Caratteristiche Principali

#### 1. **Line Numbers (da IDE)**
```
001
002  ← Numeri di riga in JetBrains Mono
003     Opacità 0.4, colore neon
004
```

#### 2. **TRANSFORMING (Spaced Out)**
```
T R A N S F O R M I N G
```
- Font: JetBrains Mono
- Letter-spacing: 0.8em (ultra-wide)
- Opacità: 0.5 (ghosted)
- Size: responsive clamp(0.875rem, 2vw, 1.1rem)

#### 3. **VISION (Gigante con Gradient)**
```
VISION
```
- Font: Inter Black (weight 900)
- Size: clamp(4.5rem, 13vw, 10rem)
- Gradient animato: text-color → neon-accent → text-color
- Animation: `gradient-shift 8s ease infinite`
- Letter-spacing: -0.04em (tight)

#### 4. **Dots + into (Data Flow Style)**
```
................................. into
```
- Dots: JetBrains Mono, opacity 0.4
- "into": Georgia Serif Italic (contrasto humanist)

#### 5. **INTELLI-GENCE (Word Breaking)**
```
INTELLI-
   GENCE
```
- Font: JetBrains Mono Bold
- Parola spezzata a metà per rallentare l'occhio
- Prima parte: neon-accent (#00ff88)
- Seconda parte: neon-blue (#00d4ff)
- Indent: 3rem sulla seconda riga
- Letter-spacing: 0.15em

#### 6. **Multi-Color Divider**
```
━━━━━━━━━━━━━━━━━━
```
- Gradient orizzontale 90°
- Colori: transparent → accent → blue → pink → transparent
- Height: 2px

#### 7. **BRIDGING (Verticale + Scala)**
```
B       AI Research
R         &
I           Real-World
D             Applications
G
I
N
G
```
- "BRIDGING": Verticale sul margine sinistro
- Testo principale: Disposizione a scaletta (ogni riga più indentata)
- Font: Inter per leggibilità

#### 8. **System Tag**
```
[ egocentric_action_recognition ]
```
- Box con background rgba neon (0.1 opacity)
- Border: 1px solid neon-accent
- Font: JetBrains Mono
- Position: Allineato alla fine della scala

#### 9. **Background "PhD"**
```
          P h D
```
- Testo enorme (15rem) in background
- Opacity: 0.02 (quasi invisibile)
- Position: Absolute, z-index -1
- Effetto watermark subtile

---

## 📐 Struttura Completa

```
[001]  T R A N S F O R M I N G
[002]  
[003]  VISION ←── Gradient animato gigante
[004]  
       ................................. into
       
       INTELLI-
          GENCE ←── Spezzato, multi-color
       
       ━━━━━━━━━━━━━━━━━━ ←── Divider rainbow
       
B      AI Research
R        &
I          Real-World
D            Applications
G              [ egocentric_action_recognition ]
I
N
G

       [View_Research]  [Contact]
       
                            P h D ←── Watermark
```

---

## 🎨 Altri Concept Disponibili

### Concept 1: "The Neural Stack"
**File**: `_includes/hero-concepts.html` (linee 1-100)

Caratteristiche:
- TRANSFORMING: Sans-Serif Ultrabold 80pt all caps
- vision: Serif Italic 40pt lowercase
- into INTELLIGENCE: Monospace 60pt bold, letter-spacing ampio
- Linea orizzontale con gradient
- "Bridging" ruotato 90° sul margine
- Testo a scaletta progressiva
- System tag grigio chiaro

**Uso**: Più formale e strutturato, ideale per portfolio accademico classico

### Concept 2: "The Data Flow"
**File**: `_includes/hero-concepts.html` (linee 102-200)

Caratteristiche:
- T R A N S F O R M I N G: Lettere ultra-spaziate
- VISION: Enorme bold (12vw)
- Dots: .......................... into
- INTELLIGENCE: Monospace gigante
- Frecce: [Box] → [Box]
- "egocentric" overlay sovrapposto ad ACTION RECOGNITION

**Uso**: Più dinamico e tech-forward, evidenzia il flow di informazioni

### Concept 3: "The Academic Glitch"
**File**: `_includes/hero-concepts.html` (linee 202-300)

Caratteristiche:
- Line numbers da IDE (01, 02, 03...)
- "Transforming": Piccolissimo (12pt, quasi invisibile)
- VISION: Massiva (15vw, tutta la larghezza)
- "into Intelligence": Serif corsivo elegante
- INTELLI- / GENCE: Spezzatura con indent
- Testo verticale dietro come watermark
- "Bridging AI Research & Real-World Applications": A capo "sbagliato" per enfasi

**Uso**: Massima autorità PhD, focus sulla parola come architettura

---

## 🔄 Come Cambiare Concept

### Metodo 1: Copia/Incolla
1. Apri `_includes/hero-concepts.html`
2. Copia il concept desiderato (es. Concept 1, 2, o 3)
3. Sostituisci l'intero blocco hero in `_pages/about.md` (dalla riga ~20 alla ~180)
4. Salva e ricarica

### Metodo 2: Include Dinamico
Aggiungi in `_pages/about.md`:
```liquid
{% include hero-concepts.html concept="1" %}
```
(Richiede modifiche al file include per supportare parametri)

---

## 🎯 Principi di Design Applicati

### 1. **Gerarchia Decostruita**
✅ Cambio drastico di dimensioni (0.875rem → 10rem)  
✅ Mix di font families (Serif, Sans, Mono)  
✅ Pesi variabili (300 Light → 900 Black)  

### 2. **Tipografia Cinetica**
✅ Lettere spaziate (letter-spacing 0.8em)  
✅ Parole spezzate (INTELLI- / GENCE)  
✅ Text orientation (vertical-rl)  
✅ Gradient animato  

### 3. **Layering & Depth**
✅ Z-index differenziati (-1, 0, 1, 2)  
✅ Opacità variabili (0.02 → 1)  
✅ Position absolute per overlays  
✅ Background watermark  

### 4. **Code Aesthetics**
✅ Line numbers da IDE  
✅ Monospace per elementi tecnici  
✅ Bracket notation [text]  
✅ System tags con border  

### 5. **Rhythm & Flow**
✅ Scaletta progressiva (margin-left crescente)  
✅ Vertical alignment con ruotazione  
✅ Spazi bianchi generosi  
✅ Linee divisorie animate  

---

## 📱 Responsive Behavior

### Desktop (>992px)
- Tutti gli effetti attivi
- Line numbers visibili
- Layout a scaletta completo
- Testo verticale sul margine

### Tablet (768-992px)
- Dimensioni font ridotte con clamp()
- Line numbers ridotti
- Scaletta mantenuta ma con meno indent

### Mobile (<768px)
- Line numbers nascosti (`display: none`)
- Testo verticale → orizzontale
- Scaletta → Stack verticale (margin-left: 0)
- INTELLIGENCE spezzato con indent ridotto (1rem invece di 3rem)
- Tutti i testi centrati o left-aligned

---

## 🎨 Palette Colori Usata

```scss
--phd-neon-accent: #00ff88  // Verde - INTELLI
--phd-neon-blue: #00d4ff    // Blu - GENCE
--phd-neon-pink: #ff006e    // Rosa - Divider
--global-text-color: (tema) // Testo principale
```

---

## 💡 Tips per Personalizzazione

### Cambiare le Parole
```html
<!-- Invece di VISION -->
<h1>RESEARCH</h1>

<!-- Invece di INTELLIGENCE -->
<div>INNOVA-<br>TION</div>
```

### Cambiare i Colori
```scss
// In _phd-design.scss
:root {
  --phd-neon-accent: #YOUR_COLOR;
  --phd-neon-blue: #YOUR_COLOR;
}
```

### Aggiungere Effetti
```html
<!-- Glitch effect -->
<h1 class="glitch" data-text="VISION">VISION</h1>

<!-- Scanlines -->
<div class="scanlines">...</div>
```

### Modificare Animazioni
```scss
// Cambia velocità gradient
animation: gradient-shift 5s ease infinite; // Invece di 8s

// Disabilita animazione
animation: none;
```

---

## 🔍 Dettagli Tecnici

### Font Loading
```scss
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Inter:wght@300;600;900&display=swap');
```

### Gradient Text
```css
background: linear-gradient(135deg, ...);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Vertical Text
```css
writing-mode: vertical-rl;
text-orientation: mixed;
```

### Word Breaking
```html
INTELLI-<br>
<span style="margin-left: 3rem;">GENCE</span>
```

---

## 📖 Riferimenti

**Ispirazione Design**:
- Bauhaus Typography
- Swiss Design System
- Brutalist Web Design
- Terminal/IDE Aesthetics
- Data Visualization Graphics

**Fonts Simili**:
- Inter → Helvetica Now, PP Neue Montreal
- JetBrains Mono → Input Mono, Fira Code
- Georgia → PP Editorial New, Times New Roman

---

## 🚀 Performance

- **CSS Only**: Zero JavaScript per typography
- **GPU Accelerated**: Transform e opacity animations
- **Font Display**: `display=swap` per Google Fonts
- **Clamp()**: Scaling fluido senza media queries multiple
- **Animation**: Solo su load (1s), poi statico

---

**Version**: 2.0  
**Created**: 18 Gennaio 2026  
**Concept**: The Hybrid Stack (Neural + Data + Academic)
