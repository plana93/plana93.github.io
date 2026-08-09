# Guida allo stile editorial neo-brutalist

Questa è la ricetta portabile dello stile del portfolio. Non descrive soltanto i colori: definisce il modo in cui testo, immagini, griglia, spazio e movimento devono interagire per ottenere la stessa identità su un sito diverso.

## 1. Definizione dello stile

Lo stile è **editorial neo-brutalist con linguaggio tecnico**:

- brutalist perché mostra griglia, bordi, gerarchie e struttura senza nasconderli;
- neo-brutalist perché usa colori saturi, fotografia grande, ombre dure e personalità;
- editoriale perché titoli, indici, didascalie e ritmo ricordano poster e riviste;
- tecnico perché label mono, coordinate, processi e piccoli dati rendono l'estetica coerente con ricerca e AI.

Non è caos casuale. Ogni collisione deve spiegare una gerarchia: dietro, davanti, collegamento o transizione.

## 2. Principi non negoziabili

### La tipografia è architettura

Le parole principali occupano lo spazio come forme. Devono informare anche quando vengono percepite prima come silhouette. Un titolo gigante sostituisce molte decorazioni minori.

### La struttura resta visibile

Griglie, bordi, indici, linee di separazione e moduli non vanno addolciti. Sono parte dell'identità e aiutano l'orientamento.

### Le sovrapposizioni hanno una grammatica

Per ogni elemento sovrapposto deve essere possibile rispondere a tre domande:

1. qual è il livello di sfondo;
2. qual è il soggetto o contenuto;
3. quale frammento torna davanti e perché.

Se la risposta non è evidente, la sovrapposizione sembra un bug.

### Il colore è un segnale

Nero e carta costruiscono il campo. Un colore saturo identifica l'azione principale; un secondo può comparire come offset, errore di stampa o indicatore. Tutti gli altri restano silenziosi.

### Lo spazio vuoto ha tensione, non riempimento

Le pause servono a respirare. Possono contenere una forma, un indice, una traccia o una linea, ma non devono diventare un collage uniforme di decorazioni.

### Funzione prima dell'effetto

La personalità è forte, ma titoli, navigazione, link e contenuti devono rimanere immediatamente riconoscibili. Questo è coerente con i principi del brutalismo e del neo-brutalismo descritti nella [guida DesignMantic](https://www.designmantic.com/blog/brutalism-in-web-design/): grandi heading, UI esposta, divisori, colori saturi e tipografia usata anche come componente visuale.

## 3. Token di base

```css
:root {
  --ink: #0b0b08;
  --surface: #12110d;
  --paper: #f2efe6;
  --yellow: #ffe600;
  --orange: #ff5a2f;
  --blue: #2415ff;
  --pink: #f2a8ff;

  --font-display: "Syne", Arial Black, sans-serif;
  --font-body: "Inter", Arial, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --font-human: "Caveat", cursive;
  --font-pixel: "Pixelify Sans", monospace;

  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-4: 2rem;
  --space-8: 4rem;
  --space-12: 6rem;
  --space-16: 8rem;

  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
}
```

Regola colore consigliata per un singolo modulo:

- 70–85% ink/paper;
- 10–25% colore segnale principale;
- 0–8% secondo accento.

Evita gradienti cosmetici. Halftone, retini, offset e texture devono sembrare materiali di stampa o strumenti di misura.

## 4. Sistema tipografico

| Ruolo | Famiglia | Trattamento |
| --- | --- | --- |
| Parola dominante | display sans | `clamp()`, peso 650–800, line-height 0.72–0.92 |
| Titolo di sezione | display sans | grande, compatto, allineamento netto |
| Dato/indice | mono | uppercase, tracking 0.12–0.20em |
| Corpo | sans neutra | larghezza 45–70 caratteri, line-height 1.5–1.75 |
| Nota umana | handwriting | rara, inclinata, mai per informazioni essenziali |
| Accento tech | pixel/mono | una sola parola o passaggio, non paragrafi |

### Tecniche ammesse

- `scaleY()` per allungare una parola senza aumentarne il peso;
- copie duplicate e ritagliate con `clip-path` per creare uno slittamento di stampa;
- una copia solida o outlined per far tornare un frammento davanti a una foto;
- contrasto tra sans display, mono informativo e una nota serif/handwritten;
- tracking estremo soltanto su label brevi.

### Tecniche da evitare

- rendere un font più bold quando si vuole soltanto allungarlo;
- comprimere tanto una parola da perdere l'identità delle lettere;
- coprire il centro di più lettere consecutive senza un livello di ritorno;
- usare tre o più distorsioni diverse sulla stessa parola;
- sovrapporre body copy o CTA essenziali.

## 5. Grammatica dei livelli

Usa una scala z-index corta e dichiarata:

| Livello | Funzione |
| --- | --- |
| 0 | canvas o atmosfera |
| 1 | griglia e texture |
| 2–3 | parola gigante di fondo |
| 4 | fotografia o oggetto principale |
| 5 | frammento tipografico di ritorno e parola di chiusura |
| 6–7 | label, processo, didascalie |
| 1000 | navigazione globale |

Una parola può attraversare il soggetto con due copie coordinate:

```html
<div class="hero-word hero-word--back">VISION</div>
<div class="hero-word hero-word--front" aria-hidden="true">VISION</div>
<figure class="hero-subject">...</figure>
```

```css
.hero-word {
  position: absolute;
  inset-inline: 0;
  font: 800 clamp(4rem, 17vw, 12rem)/0.88 var(--font-display);
  letter-spacing: -0.04em;
  text-align: center;
}

.hero-word--back { z-index: 3; color: var(--paper); }
.hero-subject { z-index: 4; }

.hero-word--front {
  z-index: 5;
  color: var(--paper);
  clip-path: polygon(0 28%, 100% 28%, 100% 38%, 0 38%);
  pointer-events: none;
}
```

Il frammento davanti deve essere stretto. La sua funzione è ricostruire la leggibilità e dichiarare la profondità, non coprire nuovamente il soggetto.

## 6. Ricetta dell'hero

Ordine consigliato:

1. navbar monospaced con indice e identità unica;
2. griglia esposta e canvas atmosferico;
3. micro-label che dichiara il tema;
4. parola dominante dietro al ritratto;
5. ritratto senza cornice morbida, su campo colore geometrico;
6. eventuale frammento della parola davanti al ritratto, solo se la leggibilità lo richiede;
7. parola/conclusione su barra ad alto contrasto;
8. piccola pipeline informativa in uno spazio laterale.

### Controlli di qualità dell'overlap

- tutte le lettere decisive devono restare riconoscibili nel risultato complessivo;
- il ritorno davanti deve avere lo stesso allineamento e la stessa metrica del livello dietro;
- il campo colore deve partire abbastanza in basso da non cancellare parola e soggetto insieme;
- una forma circolare non deve essere tagliata accidentalmente da una box: o è chiaramente contenuta, o attraversa volutamente il bordo, mai quasi entrambe;
- la navbar non deve ripetere il nome già presente nell'hero;
- a 320 px non deve esistere overflow orizzontale della pagina.

## 7. Ricetta Research / Build

La sezione è un poster di cambio modalità, non un banner convenzionale.

```html
<section class="mode-shift">
  <small>02 / change of mode</small>
  <span class="route">hypothesis → prototype → real world</span>
  <span class="research">Research</span>
  <span class="amp">&amp;</span>
  <span class="build">Build</span>
</section>
```

Gerarchia:

- `Research`: leggermente più grande, pixel/editorial, sopra il campo blu;
- `&`: ancora più grande, **dietro Research e davanti Build**;
- `Build`: display sans, stesso peso ottico, allungata verticalmente con `scaleY()`;
- route e caption: trasformano il poster in informazione, non in pura decorazione.

Per l'effetto di `Build`, mantieni la base leggibile e distorci solo due fasce:

```css
.build {
  position: relative;
  font-weight: 650;
  transform: scaleY(1.36);
}

.build::before,
.build::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
}

.build::before {
  clip-path: polygon(0 43%, 100% 39%, 100% 51%, 0 58%);
  transform: translateX(0.08em) skewX(-15deg);
}

.build::after {
  clip-path: polygon(0 56%, 100% 49%, 100% 61%, 0 70%);
  transform: translate(0.15em, 0.025em) skewX(9deg);
}
```

## 8. Ritmo, densità e pause

Alterna tre tipi di capitolo:

1. **denso**: contenuti, card, pubblicazioni;
2. **transizione**: parola-poster, running band o fotografia;
3. **respiro attivo**: spazio ampio con uno o due segnali geometrici.

Regole pratiche:

- dopo due gruppi concettualmente densi, inserisci una pausa visuale;
- usa `padding-block: clamp(5rem, 10vw, 8rem)` come base, aumentandolo nei cambi di capitolo;
- un'area di respiro può contenere un bersaglio, un indice, una traccia o una sola forma;
- non distribuire le forme in modo uniforme: crea un punto di tensione e lascia il resto quieto;
- non usare lo stesso poster geometrico in tutte le pause; varia cerchi, retini, linee e tipografia mantenendo palette e griglia.

## 9. Geometrie e texture

Vocabolario ammesso:

- quadrati pieni o outlined;
- cerchi e anelli;
- croci, reticoli e coordinate;
- retino a punti;
- linee da diagramma;
- ombre offset senza blur;
- foto in bianco e nero su campi saturi;
- piccoli errori di registro simulati.

Ogni elemento deve agganciarsi alla griglia o a un allineamento tipografico. Se può essere spostato ovunque senza cambiare il significato della composizione, probabilmente è decorazione superflua.

## 10. Responsive

Il mobile conserva la stessa idea, non la stessa scala.

- ricalcola separatamente posizione di parola, ritratto e barra finale;
- mantieni l'ordine dietro/davanti identico al desktop;
- riduci il numero delle forme, non soltanto la loro dimensione;
- nascondi la navigazione secondaria prima che entri in conflitto col brand;
- usa `clamp()` e dimensioni relative al viewport, ma imponi limiti minimi e massimi;
- controlla almeno `1440`, `834`, `390` e `320` px;
- su schermi bassi verifica anche la relazione verticale, non solo la larghezza.

## 11. Motion

Il movimento deve spiegare profondità o progressione:

- parola dietro e parola davanti si muovono insieme;
- il soggetto resta più stabile e funziona da ancora;
- le running band possono traslare orizzontalmente con lo scroll;
- le immagini possono cambiare lentamente contrasto, scala o grayscale;
- note manoscritte possono avere un piccolo drift, mai un'animazione continua invadente.

Tutto il contenuto deve essere leggibile senza GSAP. Con `prefers-reduced-motion: reduce`, mostra lo stato finale ed elimina parallax e loop non essenziali.

## 12. Accessibilità e robustezza

- usa un solo `h1` semanticamente completo, anche se la composizione lo frammenta visivamente;
- le copie decorative della stessa parola devono avere `aria-hidden="true"`;
- conserva contrasto sufficiente per testo e CTA;
- non affidare significato soltanto al colore;
- usa `pointer-events: none` sui livelli puramente visuali;
- evita che pseudo-elementi coprano link o controlli;
- fornisci fallback font e stati visibili senza JavaScript;
- usa `overflow-x: clip` localmente, non per nascondere problemi globali.

## 13. Procedura di riuso

1. Copia i token e rinominali per il nuovo brand.
2. Scegli una sola coppia dominante ink/paper e massimo due segnali cromatici per scena.
3. Assegna un ruolo preciso a ciascun font.
4. Disegna prima la griglia e la gerarchia dei contenuti.
5. Costruisci una parola dominante e un solo soggetto principale.
6. Definisci esplicitamente lo stack z-index.
7. Aggiungi un ritorno solido o outlined solo se serve alla leggibilità.
8. Inserisci micro-dati reali: indice, processo, categoria, anno o stato.
9. Progetta una pausa visuale dopo i gruppi più densi.
10. Adatta mobile come composizione autonoma.
11. Verifica overflow, contrasto, reduced motion e fallback senza JavaScript.
12. Solo alla fine aggiungi motion e texture.

## 14. Checklist finale

- [ ] Il nome/brand appare una sola volta nella prima viewport.
- [ ] Il titolo dominante è leggibile anche con la fotografia sovrapposta.
- [ ] Ogni overlap ha un ordine davanti/dietro evidente.
- [ ] Nessuna forma sembra tagliata per errore.
- [ ] `Build` è allungata, non semplicemente più bold.
- [ ] Gli accenti saturi sono pochi e intenzionali.
- [ ] Le sezioni dense sono intervallate da pause visuali.
- [ ] Gli spazi ampi hanno tensione ma non rumore.
- [ ] Desktop, tablet e mobile raccontano la stessa identità.
- [ ] Il sito resta utilizzabile senza librerie di motion.

## Riferimenti visivi

- [Nothing Playground](https://playground.nothing.tech/) — geometrie, moduli e linguaggio tecnico.
- [Type Department / tmpstate](https://type.tmpstate.net/preview/overview/) — tipografia come contenuto dominante.
- [Schultzschultz](https://schultzschultz.com/) — ritmo editoriale e composizione sperimentale.
- [DesignMantic: Brutalism in Web Design](https://www.designmantic.com/blog/brutalism-in-web-design/) — caratteristiche e criteri di equilibrio del neo-brutalismo.
