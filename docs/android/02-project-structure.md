# Project Structure (Frontend)

Projekt využívá moderní adresářovou strukturu nástroje Vite. 
Nativní kód pro Android je generován a izolován, vývoj probíhá primárně ve složce `src/`.

## Hlavní adresáře:
- `android/` - Nativní Android projekt (generováno Capacitorem, upravuje se jen minimálně)
- `public/` - Statické assety (např. logo.webp)
- `src/` - Zdrojové kódy React aplikace
  - `components/` - Znovupoužitelné UI prvky (např. BottomNav.js)
  - `pages/` - Hlavní obrazovky (Dashboard, History, atd.)
- `vite.config.js` - Konfigurace bundleru
- `tailwind.config.js` - Konfigurace vzhledu a barev

Cílem je udržovat čisté oddělení komponent (znovupoužitelné UI) od stránek (logika obrazovky).
