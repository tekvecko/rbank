# RBank Developer Documentation

> Kompletní technická dokumentace projektu RBank.

---

# Úvod

Vítejte v dokumentaci projektu **RBank**.

Tato dokumentace slouží jako centrální zdroj informací pro vývojáře, testery a AI asistenty.

Projekt je navržen jako moderní full-stack bankovní platforma složená z hybridního klienta (React / Vite / Capacitor), Node.js backendu a databáze.

---

# Cíle dokumentace

Dokumentace popisuje:

- architekturu systému,
- strukturu projektu,
- build proces (Vite + Capacitor),
- backend,
- databázi,
- REST API,
- bezpečnost,
- deployment (včetně AWS),
- pravidla vývoje,
- roadmapu projektu.

---

# Struktura dokumentace

## Development

- Vývojové prostředí
- Build
- Debugging
- Release

Adresář:

docs/development/

---

## Android (Capacitor / React)

Dokumentace hybridního klienta.

Obsahuje:

- architekturu (Capacitor)
- UI (Tailwind CSS)
- navigaci (React Router)
- Komponenty a Stránky (Pages)
- síťovou komunikaci (REST)
- build (Vite -> nativní Android)

Adresář:

docs/android/

---

## Backend

Dokumentace serverové části.

Obsahuje:

- architekturu
- REST API
- business logiku
- konfiguraci
- logování
- zabezpečení

Adresář:

docs/backend/

---

## API

Kompletní dokumentace REST API.

Obsahuje:

- endpointy
- autentizaci
- příklady requestů
- příklady response
- chybové stavy

Adresář:

docs/api/

---

## Database

Dokumentace databáze.

Obsahuje:

- schéma
- migrace
- zálohování
- obnovu

Adresář:

docs/database/

---

## Architecture

Celková architektura systému.

Obsahuje:

- komponenty
- datové toky
- architektonická rozhodnutí

Adresář:

docs/architecture/

---

## Security

Bezpečnostní dokumentace.

Obsahuje:

- autentizaci
- autorizaci
- bezpečnostní model
- doporučené postupy

Adresář:

docs/security/

---

## Deployment

Popis nasazení systému.

Obsahuje:

- lokální vývoj
- produkční prostředí (AWS)
- monitoring
- údržbu

Adresář:

docs/deployment/

---

## Testing

Strategie testování.

Obsahuje:

- unit testy
- integrační testy
- manuální testování

Adresář:

docs/testing/

---

## Reference

Referenční dokumentace.

Obsahuje:

- coding style
- git workflow
- roadmapu
- slovník pojmů
- Project Constitution

Adresář:

docs/reference/

---

## Knowledge Base

Dlouhodobá znalostní báze projektu.

Obsahuje:

- historii projektu
- architektonická rozhodnutí
- doporučení pro další vývoj
- zkušenosti získané během vývoje

Adresář:

docs/knowledge-base/

---

# Základní architektura

React / Vite Frontend (Capacitor)

↓

REST API

↓

Node.js Backend (AWS / Lokální)

↓

Databáze

---

# Vývojové principy

Projekt dodržuje následující zásady:

- Backend First
- API First
- Documentation First
- Build First
- Clean Architecture
- Single Source of Truth

---

# Stav projektu

Projekt je ve fázi aktivního vývoje.

Backend běží v cloudovém prostředí na AWS (s možností lokálního běhu pro vývoj).

Hybridní klient (React) běží na platformě Capacitor a komunikuje přes REST API.

Data jsou načítána z připojené databáze.

Architektura je připravena pro budoucí produkční nasazení.

---

# Licence

Licence bude určena v pozdější fázi vývoje.

---

# Poslední aktualizace

Červenec 2026
