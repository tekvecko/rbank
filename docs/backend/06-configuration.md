# Configuration

Konfigurace backendu musí být striktně oddělena od zdrojového kódu (podle principů Twelve-Factor App).

## Zásady
- Zdrojový kód nesmí nikdy obsahovat natvrdo zapsaná hesla, API klíče nebo připojovací řetězce k databázi.
- Pro lokální vývoj se využívá soubor `.env` (který je ignorován v Gitu).
- Pro produkční prostředí na AWS se hodnoty nastavují přímo jako systémové proměnné (Environment Variables).

## Typické proměnné
- `PORT` (např. 3000)
- `DATABASE_URL`
- `JWT_SECRET`
