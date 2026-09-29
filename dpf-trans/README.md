# DPF Trans – látványterv (weboldal)

Egyoldalas bemutatkozó oldal ajánlatkérő űrlappal a **DPF Trans – Darus platós fuvarozás**
egyéni vállalkozásnak (adószám: 50140163-2-33).

Sima statikus HTML/CSS/JS, nincs build, nincs függőség – bármilyen tárhelyre felmásolható
(GitHub Pages, Netlify, Cloudflare Pages, sima webtárhely).

## Megnézés helyben

```sh
cd dpf-trans
python3 -m http.server 8080   # majd: http://localhost:8080
```

(Az `index.html` dupla kattintással is megnyílik, a betűtípusokhoz net kell.)

## Fájlok

| Fájl | Mi ez |
| --- | --- |
| `index.html` | Az oldal (hero, szolgáltatások, miért mi, munkáink, árajánlat, GYIK, lábléc) |
| `styles.css` | Minden stílus, a színek a `:root` alatt (piros: `#DA030D`, a logóból) |
| `script.js` | Mobilmenü, görgetési animáció, űrlap-ellenőrzés |
| `assets/logo*.svg` | A matrica PDF-ekből kinyert vektoros logók (sötét / fehér, teljes / szlogen nélküli) |
| `assets/truck.webp` | A kamion kivágva, átlátszó háttérrel |
| `assets/photos/*.webp` | Referencia- és gyepszőnyeg-fotók (webre méretezve) |

## Kész adatok

- [x] Telefonszám: +36 30 951 4834 (a kocsikról)
- [x] Jármű: 12 m-es Palfinger daru (autó mellett akár 3 t), plató 620 × 240 cm, 8 t teherbírás
- [x] Referenciafotók: `assets/photos/` (Farkas Bertalan űrkapszulája kiemelve)
- [x] Gyepszőnyeg szekció + „Gyepszőnyeg” opció az ajánlatkérőben (m² mezővel)

## Még hiányzik (TODO)

- [ ] **E-mail** – most `info@dpftrans.hu` helyőrző
- [ ] **Nyitvatartás** – most `H–Szo: 6:00–20:00` helyőrző
- [ ] **Szolgáltatási terület** – „Budapest, Pest megye – egyeztetéssel országosan” (megerősíteni)
- [ ] **Cégadatok a láblécben** – tulajdonos neve, székhely, EV nyilvántartási szám
  (a kocsikon „Varga Sándor” és „AF-13-000787” szerepel – megerősíteni, mi kerüljön ki)
- [ ] **Gyepszőnyeg részletek** – fajta, ár/m², minimum rendelés (ha ki akarjuk írni)
- [ ] **Adatkezelési tájékoztató** és **Impresszum** oldal (most `#` link)

## Élesítés előtt

1. **Űrlap beküldése** – most csak demó (nem küld sehova). Legegyszerűbb egy ingyenes
   form-szolgáltatás, pl. [Web3Forms](https://web3forms.com) vagy [Formspree](https://formspree.io):
   a `form` kapjon `action`-t, és a `script.js`-ben a DEMO rész helyett `fetch` a végpontra.
2. **Domain + tárhely** – pl. `dpftrans.hu` + Netlify / Cloudflare Pages (ingyenes).
3. **Google Cégprofil** – a helyi keresésekhez („darus fuvarozás [város]”) ez hozza a legtöbbet.
