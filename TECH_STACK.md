# Stack tecnico del portfolio

Questo documento descrive la tecnologia effettivamente usata dal sito, il ruolo di ogni libreria e dove intervenire. Distingue il portfolio custom dalla parte legacy ereditata dal tema `al-folio`.

## Mappa rapida

| Livello | Tecnologia | Uso nel progetto | File principali |
| --- | --- | --- | --- |
| Generazione statica | Jekyll + Liquid | Compila pagine Markdown/HTML, layout, dati e URL relativi | `_config.yml`, `_pages/`, `_layouts/` |
| Contenuti | Markdown + HTML | Struttura della homepage e delle pagine interne | `_pages/home_new.md` |
| Styling | SCSS | Design system, responsive, poster tipografici, componenti e animazioni CSS | `assets/css/portfolio.scss` |
| Interazione | JavaScript vanilla | Navigazione, reveal, accordion, notification storm, motion e progressive enhancement | `assets/js/portfolio-main.js` |
| Rendering 3D | Three.js r128 | Rete neurale astratta e particelle nel canvas dell'hero | `#heroCanvas`, `initThreeHero()` |
| Motion | GSAP 3.12.5 | Timeline d'ingresso, parallax e animazioni legate allo scroll | `initBillboardHero()`, `initScrollParallax()` |
| Scroll orchestration | GSAP ScrollTrigger | Sincronizza alcuni movimenti con la posizione della pagina | `assets/js/portfolio-main.js` |
| Font | Google Fonts | Syne, Inter, JetBrains Mono, Caveat e Pixelify Sans | `_layouts/portfolio.html` |
| Test visuali | Playwright 1.62.1 | Screenshot responsive e controllo overflow dopo il deploy | `_scripts/capture-site.mjs` |
| Hosting | GitHub Pages | Pubblicazione del sito statico | repository `plana93.github.io` |
| CI visuale | GitHub Actions | Cattura desktop/tablet/mobile e carica un report come artifact | `.github/workflows/visual-snapshots.yml` |

## 1. Jekyll, Liquid e struttura del sito

Jekyll trasforma il repository in HTML statico. La homepage usa front matter YAML e markup HTML dentro `_pages/home_new.md`; il layout `_layouts/portfolio.html` aggiunge `<head>`, navbar, footer, font, CSS e script.

Liquid viene usato per:

- leggere i valori di `_config.yml`, per esempio nome, social e URL;
- generare URL compatibili con GitHub Pages tramite `relative_url` e `absolute_url`;
- inserire metadati SEO e JSON-LD;
- mostrare opzionalmente link come il PDF del CV.

Il CSS custom è collegato come `assets/css/portfolio.css`, ma la sorgente da modificare è `assets/css/portfolio.scss`. Il front matter vuoto all'inizio del file dice a Jekyll di compilarlo.

## 2. SCSS e design system

`assets/css/portfolio.scss` contiene il sistema completo:

- token in `:root` per palette, font, spazi, motion e altezze globali;
- componenti BEM-like con prefisso `p-`;
- layout responsive tramite media query;
- poster tipografici, griglie, halftone e geometrie costruiti in CSS;
- fallback statici quando JavaScript o librerie esterne non sono disponibili;
- trattamento di `prefers-reduced-motion` per limitare il movimento.

La configurazione Jekyll usa `sass.style: compressed`, quindi in produzione il CSS viene minificato.

## 3. JavaScript vanilla

Il sito non usa React, Vue, jQuery o un framework frontend nella homepage custom. `portfolio-main.js` è un'IIFE senza stato globale e inizializza moduli indipendenti:

| Modulo | Responsabilità |
| --- | --- |
| `initProgressBar()` | Aggiorna la linea di avanzamento in cima alla pagina |
| `initNav()` | Cambia il trattamento della navbar dopo lo scroll |
| `initThreeHero()` | Crea nodi, connessioni e particelle nel canvas Three.js |
| `fitIntelBar()` | Riduce la dimensione di `INTELLIGENCE` solo quando rischia overflow |
| `initBillboardHero()` | Orchestra ingresso e parallax dei livelli dell'hero |
| `initScrollReveal()` | Rivela gli elementi quando entrano nel viewport |
| `initResearchDeck()` | Gestisce l'accordion della sezione Research |
| `initNotificationStorm()` | Carica il file JSONL e costruisce le notifiche nel telefono |
| `initProjectCards()` | Aggiunge stagger e movimento editoriale a progetti e talk |
| `initScrollParallax()` | Applica parallax GSAP alle sezioni abilitate |
| `initEditorialMotion()` | Muove storyline, running band, foto e note manoscritte |
| `initKineticSections()` | Sposta lentamente la tipografia gigante delle sezioni |
| `initActiveNav()` | Sincronizza navbar e chapter rail con la sezione corrente |

### Web API native usate

- `IntersectionObserver`: reveal e navigazione attiva senza ascoltare continuamente lo scroll.
- `ResizeObserver`: ricalcola componenti dipendenti dalle dimensioni reali.
- `requestAnimationFrame`: raggruppa gli aggiornamenti visuali e riduce layout thrashing.
- `fetch`: carica `assets/data/notification-storm.jsonl`.
- Canvas 2D/WebGL: WebGL è gestito da Three.js; il resto dell'interfaccia rimane DOM/CSS.
- `matchMedia('(prefers-reduced-motion: reduce)')`: rispetta le preferenze di accessibilità.

## 4. Librerie esterne

### Three.js

Caricata da CDN in `_layouts/portfolio.html`. Serve solo al fondale neurale dell'hero. Il canvas ha bassa opacità: è atmosfera, non contenuto essenziale. Se la libreria non arriva, la funzione termina e il resto dell'hero continua a funzionare.

### GSAP e ScrollTrigger

Caricati da CDN. GSAP gestisce timeline e interpolazioni complesse; ScrollTrigger lega alcuni valori allo scroll. Il contenuto non dipende da GSAP per essere leggibile: il JavaScript prevede un fallback che rende immediatamente visibili gli elementi.

### Google Fonts

| Font | Ruolo |
| --- | --- |
| Syne | Titoli dominanti e parole-poster |
| Inter | Testo editoriale e contenuti lunghi |
| JetBrains Mono | Indici, coordinate, label tecniche e navigazione |
| Caveat | Annotazioni umane, rare e volutamente imperfette |
| Pixelify Sans | `Research` nel poster Research/Build e accenti pixel/tech |

Sono sempre presenti fallback di sistema nel CSS.

## 5. Dati e asset

- `assets/data/notification-storm.jsonl`: una notifica JSON per riga. Il browser lo legge come testo e ignora le righe non valide.
- `assets/img/io_without_bg.png`: ritratto trasparente usato nell'hero.
- `assets/img/partners/`: loghi mostrati prima della call to action finale.
- `_data/*.yml`: dati strutturati del tema e di altre pagine.

Il modulo per aggiungere una notifica crea una preview locale; non scrive direttamente nel repository dal browser.

## 6. Plugin Jekyll presenti nel repository

La homepage custom non usa necessariamente ogni plugin, ma il sito complessivo include:

- `jekyll-archives`: archivi per anno, tag e categorie;
- `jekyll-diagrams`: diagrammi nelle pagine Markdown;
- `jekyll-email-protect`: offuscamento degli indirizzi email;
- `jekyll-feed`: feed RSS/Atom;
- `jekyll-get-json`: import di dati JSON durante la build;
- `jekyll-imagemagick`: trasformazione/ottimizzazione immagini;
- `jekyll-jupyter-notebook`: rendering dei notebook;
- `jekyll-link-attributes`: attributi automatici sui link;
- `jekyll-minifier`: minificazione dell'output;
- `jekyll-paginate-v2`: paginazione;
- `jekyll-sitemap`: sitemap XML;
- `jekyll-toc`: table of contents;
- `jemoji`: emoji in Markdown.

Bootstrap, MDB e altri asset del tema `al-folio` esistono ancora nel repository per le pagine legacy, ma non costituiscono la base della homepage con layout `portfolio`.

## 7. Verifica visuale

Playwright visita il sito reale, forza il rendering delle sezioni e cattura:

- desktop `1440 × 1000`;
- tablet `834 × 1112`;
- mobile `390 × 844`;
- small mobile `320 × 700`.

Controlla anche overflow orizzontale, richieste fallite, errori console e screenshot quasi vuoti. Il workflow viene eseguito sui push che toccano layout, pagine, CSS, JavaScript o lo script di cattura.

## 8. Comandi utili

```bash
# Dipendenze Ruby
bundle install

# Sviluppo locale con live reload
bundle exec jekyll serve --livereload --host 0.0.0.0

# Build di produzione
bundle exec jekyll build

# Dipendenze per i test visuali
npm ci

# Screenshot del sito locale o pubblicato
npm run screenshots -- --url http://localhost:4000
npm run screenshots -- --url https://plana93.github.io/

# Controllo sintattico del JavaScript
node --check assets/js/portfolio-main.js
```

## 9. Cosa estrarre per riusare il portfolio altrove

Il pacchetto minimo è:

1. i token e i componenti necessari da `assets/css/portfolio.scss`;
2. il markup delle sezioni desiderate da `_pages/home_new.md`;
3. i moduli corrispondenti da `assets/js/portfolio-main.js`;
4. i font oppure alternative locali metricamente simili;
5. Three.js/GSAP solo se si vogliono mantenere canvas e motion avanzato.

Jekyll non è obbligatorio per riusare lo stile: Liquid può essere sostituito con qualunque sistema di template, purché classi, ordine dei livelli e token CSS restino coerenti.
