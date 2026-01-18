# 🎨 Portfolio PhD Design - Nuove Funzionalità

## ✨ Cosa è stato migliorato

### 1. **Tipografia Tech-Humanist**
- **Font Pairing Avanzato**: Combinazione di `Inter` (sans-serif moderno) e `JetBrains Mono` (monospace tecnico)
- **Titoli Giganti**: Il titolo principale ora usa dimensioni massive (fino a 8rem) con gradient animato
- **Text Masking**: Possibilità di inserire pattern grafici dentro il testo
- **Tipografia come Struttura Grafica**: I titoli diventano elementi visivi, non solo informativi

### 2. **Layout Dinamico e Asimmetrico**
- **Broken Grid System**: Sistema a 12 colonne con possibilità di offset e span variabili
- **Griglia Asimmetrica**: Layout 1:2:1 e configurazioni che creano tensione visiva
- **Elementi Ruotati**: Possibilità di ruotare elementi di ±2° per dinamismo
- **Layering System**: Sovrapposizioni con opacità per profondità visiva

### 3. **Palette Colori Limitata (Zero Dopamine)**
- **Verde Neon (#00ff88)**: Egocentric Vision, highlight principali
- **Blu Elettrico (#00d4ff)**: Domain Adaptation, elementi tecnici
- **Rosa Neon (#ff006e)**: Multi-modal Learning, features speciali
- **Uso Strategico**: Massimo 1-2 colori neon per sezione per evitare sovraccarico

### 4. **Effetti Grafici Controllati**
- **Glitch Effect**: Distorsione digitale subtile su hover
- **Scanlines**: Effetto terminale con linee orizzontali
- **Neural Network Pattern**: Background geometrico minimalista
- **Data Visualization**: Gradienti radiali sfocati che evocano heatmap

### 5. **Componenti Scientifici**

#### Research Cards
Card per le aree di ricerca con:
- Bordi colorati a sinistra (diverso per ogni area)
- Etichette in monospace `[01] CATEGORY`
- Metadata tecnici (venues, keywords)
- Hover effect con lift animation

#### Scientific Callout
Blocco evidenziato per highlight importanti:
- Titolo in monospace uppercase
- Contenuto in font grande e bold
- Metadata contestuali
- Bordo neon a sinistra con gradient

#### Coordinate Links
Link stile terminale: `[Link_Text]`
- Font monospace
- Parentesi quadre automatiche
- Hover effect con cambio colore neon

### 6. **Spazio Bianco Strategico**
- **Generous Spacing**: Padding verticale 3-8rem tra sezioni major
- **Breathe**: Margin 2-4rem per respirare
- **Air Classes**: Spacing unidirezionale (top/bottom)
- **Autorevolezza**: Il vuoto comunica confidenza e PhD-level authority

### 7. **Metriche Visualizzate**
La sezione "Impact by Numbers" ora mostra:
- Numeri giganti in font Inter Black (900 weight)
- Colori neon differenziati per metrica
- Linee decorative sotto ogni metrica
- Layout responsivo che scala perfettamente

### 8. **Footer Terminale**
Nuovo footer stile command line:
```
mirco@research:~$ echo "Interested in collaboration?"
→ Let's connect and build something innovative together.
```

## 📁 File Modificati/Creati

### Nuovi File
- `_sass/_phd-design.scss` - Sistema di design completo PhD-oriented
- `DESIGN_SYSTEM.md` - Documentazione completa del design system
- `README_DESIGN.md` - Questo file

### File Modificati
- `_pages/about.md` - Completamente ridisegnato con nuovi componenti
- `_layouts/about.html` - Template aggiornato con PhD aesthetic
- `assets/css/main.scss` - Importazione nuovo stylesheet
- `_sass/_custom.scss` - Miglioramenti responsive e UX

### File di Backup
- `_pages/about_old.md` - Backup della versione precedente

## 🎯 Principi di Design Applicati

### 1. Typography as Shape
Il testo non è solo informazione, ma struttura grafica:
- Titoli occupano 80% dello spazio verticale
- Font weights estremi (300 Light, 900 Black)
- Letter-spacing negativo per impatto visivo
- Orientamenti verticali per sezioni laterali

### 2. Zero Dopamine
Nessuna distrazione, focus sul contenuto:
- Animazioni sottili e purposeful
- Colori neon usati con parsimonia
- Spazio bianco generoso
- No effetti continui/loop distraenti

### 3. Tech-Humanist Bridge
Equilibrio tra rigore tecnico e accessibilità:
- Monospace per dati/codice/metadata
- Sans-serif humanist per testo narrativo
- Terminal aesthetics senza essere alienante
- Professional ma con personalità

### 4. Scientific Authority
Il portfolio comunica expertise:
- Gerarchia chiara e intenzionale
- Metadata sempre visibili (venues, anni)
- Nomenclatura tecnica accurata
- Spazio bianco = confidenza

## 🚀 Come Testare

### Opzione 1: Docker (Raccomandato)
```bash
cd /Users/mirco/plana93.github.io
docker-compose up
```
Poi apri: http://localhost:4000

### Opzione 2: Jekyll Locale
```bash
# Assicurati di avere Ruby 3.0+
cd /Users/mirco/plana93.github.io
bundle install
bundle exec jekyll serve --livereload
```
Poi apri: http://localhost:4000

### Opzione 3: Deploy su GitHub Pages
Fai commit e push:
```bash
git add .
git commit -m "feat: implement PhD-oriented design system"
git push origin master
```
Il sito si aggiornerà automaticamente su plana93.github.io

## 📱 Responsive Behavior

### Desktop (>992px)
- Layout completo con broken grid
- Titoli a dimensione massima
- Tutti gli effetti grafici attivi

### Tablet (768-992px)
- Grid collassa a 2 colonne
- Titoli ridotti ma impattanti
- Effetti mantenuti

### Mobile (<768px)
- Tutto stacked (1 colonna)
- Titoli ultra-scalati con clamp()
- Scientific callout padding ridotto
- Broken grid diventa lineare
- Immagini full-width

## 🎨 Personalizzazione

### Cambiare i Colori Neon
In `_sass/_phd-design.scss`:
```scss
:root {
  --phd-neon-accent: #00ff88;  // Cambia qui
  --phd-neon-blue: #00d4ff;    // E qui
  --phd-neon-pink: #ff006e;    // E qui
}
```

### Aggiungere Nuove Aree di Ricerca
Copia un blocco `.research-card` in `_pages/about.md` e modifica:
- `paper-venue`: Categoria `[XX] NAME`
- Border color: Scegli un colore neon
- Emoji, titolo, descrizione, metadata

### Modificare gli Eventi Featured
In `_pages/about.md`, sezione "Featured Talks":
- Aggiorna `[EVENT_XX]` labels
- Cambia immagini paths
- Modifica testi descrittivi
- Aggiungi/rimuovi link

## 🔍 Dettagli Tecnici

### Performance
- **Font Loading**: Google Fonts con `display=swap`
- **Animazioni**: GPU-accelerated (transform, opacity)
- **Lazy Loading**: Immagini con attributo loading
- **Zero JS Dependencies**: Tranne script opzionale on-load
- **CSS Optimized**: Utilizzo di `clamp()` per scaling fluido

### Accessibilità
- **Contrast Ratios**: Tutti i testi rispettano WCAG AA
- **Focus States**: Outline visibile su tutti gli elementi interattivi
- **Screen Readers**: Struttura semantica HTML5
- **Responsive**: Mobile-first approach

### Browser Support
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (con -webkit prefixes)
- Mobile browsers: ✅ Fully tested

## 📖 Esempi di Codice

### Aggiungere un Scientific Callout
```html
<div class="scientific-callout">
  <p class="callout-title">CATEGORY</p>
  <div class="callout-content">
    Your big statement or formula here
  </div>
  <p class="callout-meta">Context or metadata</p>
</div>
```

### Creare una Sezione con Titolo Tecnico
```html
<h2 class="section-title">
  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: var(--phd-neon-accent); text-transform: uppercase; letter-spacing: 0.15em; display: block; margin-bottom: 0.5rem;">
    $ command_here
  </span>
  Human-Readable Title
</h2>
```

## 🎓 PhD Design Philosophy

> "L'obiettivo è trasformare un archivio di pubblicazioni e dati accademici in un'architettura visiva dinamica. Il portfolio deve riflettere la complessità dei modelli neurali attraverso una tipografia cinetica e layout asimmetrici, dove il testo non è solo informazione, ma struttura grafica."

Questo design system implementa esattamente questa visione:
- ✅ Typography as Visual Element
- ✅ Asymmetric Layouts
- ✅ Data Visualization Aesthetics
- ✅ Scientific Authority
- ✅ Tech-Humanist Balance

## 📞 Support

Per domande o problemi:
1. Consulta `DESIGN_SYSTEM.md` per documentazione completa
2. Verifica il backup in `_pages/about_old.md`
3. Controlla i commit git per vedere le modifiche

---

**Design Version**: 1.0  
**Created**: Gennaio 2026  
**For**: Mirco Planamente - AI Research Portfolio
