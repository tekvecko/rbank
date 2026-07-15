# Authentication

API využívá pro ověřování uživatelů JSON Web Tokens (JWT).

## Princip
1. Klient odešle přihlašovací údaje (login/heslo).
2. Backend (AWS Node.js) je ověří vůči databázi a vrátí podepsaný JWT token.
3. Klient (Capacitor) si token bezpečně uloží (ideálně přes Capacitor Preferences/Secure Storage).
4. Každý další požadavek na chráněný endpoint musí obsahovat hlavičku:
   `Authorization: Bearer <tvuj_token>`
