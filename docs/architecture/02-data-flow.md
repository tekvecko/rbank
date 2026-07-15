# Data Flow

Tento dokument popisuje životní cyklus dat od uživatelského kliknutí v UI až po zápis do databáze.

## Cesta požadavku (Příklad: Načtení historie)
1. **Frontend (React):** Uživatel otevírá obrazovku Historie nebo scrolluje dolů.
2. **React Hook:** Spustí se `useEffect` nebo událost `onScroll`.
3. **Network Layer:** Prohlížeč (WebView v Capacitoru) zformuluje HTTP GET požadavek.
4. **Internet:** Požadavek opouští telefon a putuje na IP `13.49.77.58` (AWS).
5. **Backend (Node.js):** Router zachytí endpoint `/api/transactions`, Controller přečte query parametry `page` a `limit`.
6. **Databáze:** Service vrstva sestaví SQL dotaz a dotáže se databáze (přes Repository).
7. **Návrat (Response):** Databáze vrací surová data, Node.js je zabalí do JSON a odešle zpět klientovi.
8. **Render:** React přijme JSON, upraví state (`setTransactions`) a Tailwind překreslí UI (vygeneruje ikony, barvy, částky).
