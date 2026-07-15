# Architecture Decisions (ADR)

Záznam klíčových architektonických rozhodnutí, která formovala vývoj projektu RBank.

## ADR-001: Přechod z Native Java na React + Capacitor
**Kontext:** Původní prototyp aplikace se psal v Javě pomocí Fragmentů a RecyclerView.
**Rozhodnutí:** Projekt byl kompletně přepsán do Reactu a zabalen přes Capacitor.
**Důvod:** Zrychlení vývoje (Hot-Reload přes Vite), možnost sdílet kód pro případný webový portál (PWA) a iOS verzi, využití Tailwind CSS pro moderní UI design. Opuštění složité správy paměti (Adaptery/ViewHoldery).

## ADR-002: Backend-driven UI data
**Kontext:** Klient potřebuje zobrazovat ikony, barvy (příjem/výdaj) a avatary u transakcí.
**Rozhodnutí:** Databáze a API odesílají pouze surová finanční data (název, částka). Frontend si vizuální vlastnosti dopočítává sám v prezentační vrstvě.
**Důvod:** Snížení zátěže databáze, menší payload přenášený po síti a čisté oddělení dat od UI (Single Responsibility).
