# WP_1_Amir_Avdic — IPI Akademija Web Aplikacija

Web aplikacija IPI Akademije razvijena u sklopu predmeta **Web programiranje**, akademska godina 2025/2026.

**Student:** Amir Avdić  
**GitHub:** [WP_1_Amir_Avdic](https://github.com/amir123124/WP_1_Amir_Avdic)


## O projektu

Aplikacija je izrađena korištenjem čistog **HTML5**, **CSS3** i **JavaScript-a** (bez frameworka). Sastoji se od četiri informacijske stranice i pet interaktivnih alata unutar sekcije **Student Fun Zone**, koji se otvaraju unutar iframe frameworka glavne stranice.


## Struktura projekta

```
ipi-akademija/
├── index.html              # Glavna stranica (O kursevima) + iframe framework
├── style.css               # Glavni stilski fajl (navigacija, layout, footer)
├── javascript.js           # Dropdown meni, iframe show/hide i auto-resize logika
├── popis.html              # Popis dostupnih kurseva
├── raspored.html           # Raspored nastave i laboratorijskih vježbi
├── kontakt.html            # Kontakt forma (mailto metoda)
│
├── Bingo/
│   ├── bingo.html          # IT Bingo Kviz stranica
│   ├── bingo-script.js     # Logika igre, generisanje ploče, provjera BINGO-a
│   └── bingo-style.css     # Stilovi za Bingo
│
├── Kviz/
│   ├── kviz.html           # IT Kviz stranica
│   ├── kviz-script.js      # Pitanja, progress bar, bodovanje, restart
│   └── kviz-style.css      # Stilovi za Kviz
│
├── kanban/
│   ├── kanban.html         # Mini Kanban ploča
│   ├── kb-script.js        # Drag & drop, dodavanje zadataka, PNG/PDF export, email popup
│   └── kb-style.css        # Stilovi za Kanban
│
├── visionboard/
│   ├── visualboard.html    # Vision Board stranica
│   ├── vb-script.js        # Dodavanje bilješki/slika/citata, PDF export, email popup
│   ├── vb-style.css        # Stilovi za Vision Board
│   ├── slika1.png
│   ├── slika2.png
│   ├── slika3.png
│   └── slika4.png
│
├── whiteboard/
│   ├── whiteboard.html     # Interaktivni Whiteboard
│   ├── wb-script.js        # Canvas crtanje, brisač, PNG/PDF export, email popup
│   └── wb-style.css        # Stilovi za Whiteboard
│
└── slike/
    ├── logo-ipi.png
    ├── tecajevi1.png
    ├── tecajevi2.jpg
    ├── tecajevi3.jpg
    └── srce.jpg
```


## Pokretanje projekta

Nije potrebna instalacija niti server. Klonirati repozitorij i otvoriti `index.html` u browser-u:

```bash
git clone https://github.com/amir123124/WP_1_Amir_Avdic.git
cd WP_1_Amir_Avdic
# Otvoriti index.html u browser-u (Chrome, Firefox, Edge...)
```

> **Napomena:** Zbog sigurnosnih ograničenja browser-a (`iframe` same-origin), preporučuje se pokretanje putem lokalnog servera (npr. Live Server ekstenzija u VS Code).


## Stranice i funkcionalnosti

### Informacijske stranice

| Stranica | Fajl | Opis |
|---|---|---|
| O kursevima | `index.html` | Početna stranica sa opisom akademije, ponudom kurseva i iframe kontejnerom za Student Fun Zone |
| Popis kurseva | `popis.html` | Lista kurseva u 4 kategorije: Osnove računarstva, Web razvoj, Sistemska administracija, Baze podataka |
| Raspored kurseva | `raspored.html` | Aktualni raspored nastave i laboratorijskih vježbi za tekući mjesec |
| Kontakt | `kontakt.html` | Fizička adresa i email akademije + kontakt forma koja koristi `mailto` metodu |

### Navigacija i iframe framework

Navigacijski meni (`<nav>`) se nalazi unutar `index.html` i sadrži padajući submeni **Student Fun Zone** s pet stavki. Klikom na bilo koju stavku submenija:

1. Početni sadržaj (`#pocetniSadrzaj`) se skriva
2. `<iframe name="sadrzaj-okvir">` postaje vidljiv i učitava odabranu stranicu
3. `javascript.js` automatski prilagođava visinu iframe-a visini učitanog sadržaja


## Student Fun Zone — Interaktivni alati

### Interaktivni Whiteboard (`whiteboard/whiteboard.html`)

Digitalna tabla za crtanje i skiciranje bazirana na HTML5 `<canvas>` elementu.

**Alati:**
- Odabir boje putem color picker-a
- Podešavanje veličine kista (range slider, 1–20px)
- **Brisač** — prebacuje na eraser mode
- **Očisti** — briše cijeli canvas
- **Snimi PNG** — preuzima crtež kao `.png` sliku
- **Snimi PDF** — eksportuje crtež kao PDF (`html2pdf.js`)
- **Pošalji mailom** — otvara popup sa email input poljem; šalje putem `mailto` metode

**Vanjske biblioteke:** `html2pdf.js` (CDN)


### Vision Board (`visionboard/visualboard.html`)

Alat za vizualno planiranje i motivaciju — slobodno raspoređivanje sadržaja po ploči.

**Dugmad:**
- **Bilješka** — dodaje tekstualnu bilješku kao karticu na ploču
- **Slika** — otvara popup za upload slike s računara ili unos URL-a
- **Citat** — dodaje motivacioni citat kao karticu
- **Snimi PDF** — eksportuje cijelu ploču kao PDF (`html2pdf.js`)
- **Pošalji mailom** — otvara popup sa email input poljem; šalje putem `mailto`
- **Očisti** — briše cijeli sadržaj ploče

**Popup prozori:** popup za dodavanje slike (`#imageOverlay`) i popup za email (`#emailOverlay`)  
**Vanjske biblioteke:** `html2pdf.js` (CDN)


### Mini Kanban Ploča (`kanban/kanban.html`)

Alat za organizaciju studentskih zadataka s podrškom za drag & drop.

**Tri kolone:**
- **To Do** — zadaci koji čekaju izvršavanje
- **In Progress** — zadaci u toku
- **Done** — završeni zadaci

**Dugmad:**
- **Dodaj zadatak** — dodaje novi zadatak u kolonu "To Do"
- **PNG** — preuzima screenshot ploče (`html2canvas`)
- **PDF** — eksportuje ploču kao PDF (`html2pdf.js`)
- **Pošalji** — otvara popup s email input poljem; šalje putem `mailto`
- **Očisti** — uklanja sve zadatke s ploče

**Popup prozor:** `#emailOverlay` sa input poljem, dugmadima "Poništi" i "Pošalji →"  
**Vanjske biblioteke:** `html2pdf.js`, `html2canvas` (CDN)


### IT Bingo Kviz (`Bingo/bingo.html`)

Kombinacija kviz pitanja i bingo ploče 5×5.

**Kako igrati:**
1. Kliknuti **Započni igru**
2. Odgovoriti na prikazano IT pitanje
3. Tačan odgovor označava odgovarajuće polje na ploči
4. Cilj je spojiti 5 polja u redu, koloni ili dijagonali — **BINGO!**

**Prikaz:** trenutno pitanje, broj tačnih odgovora, broj preostalih pitanja  
**Win overlay:** prikazuje se čestitka s opcijom ponovnog igranja


### IT Kviz (`Kviz/kviz.html`)

Interaktivni multiple-choice kviz iz web programiranja i IT tehnologija.

**Funkcionalnosti:**
- 5 pitanja s po 4 ponuđene opcije odgovora
- Progress bar koji prati napredak kroz kviz
- Live prikaz bodova
- Rezultat na kraju (postotak tačnih odgovora)
- Dugme za restart kviza


## Zajedničke karakteristike dizajna

- Konzistentna navigacija na svim stranicama (tamno plava traka, zlatni akcent)
- Tamnija pozadina unutar Student Fun Zone alata (moderan izgled)
- Google Fonts: **Cormorant Garamond** + **Syne**
- Responzivni layout prilagođen različitim veličinama ekrana
- Footer s copyright napomenom na svakoj stranici


## Korištene tehnologije i biblioteke

| Tehnologija | Svrha |
|---|---|
| HTML5 | Struktura i semantika svih stranica |
| CSS3 | Stilizovanje, layout, animacije, responzivnost |
| JavaScript (vanilla) | Sva interaktivnost, logika alata, DOM manipulacija |
| [html2pdf.js](https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js) | PDF export (Kanban, Whiteboard, Vision Board) |
| [html2canvas](https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js) | PNG screenshot (Kanban) |
| Google Fonts | Cormorant Garamond, Syne |
| `mailto:` | Slanje emaila s kontakt forme i iz svih interaktivnih alata |

Autor:Amir Avdić

Broj indeksa: I-0116/23

Predmet: Web programiranje

Treca godina studija

*© Internacionalna poslovno-informaciona akademija Tuzla — Web programiranje 2025/2026*
