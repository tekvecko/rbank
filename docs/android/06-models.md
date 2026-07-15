# Data Models

Vzhledem k využití JavaScriptu (React) nemáme striktně typované třídy jako v Javě. Modely představují čisté JSON objekty přijaté z backendu.

## Příklady entit
- **User:** Informace o uživateli (jméno, nastavení)
- **Transaction:** `id`, `name`, `amount`, `created_at`, `type`
- **Balance:** Zůstatek na účtech

## Transformace dat
Surová data z API (např. transakce) jsou často přímo v UI vrstvě (např. `History.jsx`) doplňována o prezentační logiku – např. vygenerování iniciál z názvu (`tx.name.charAt(0)`) nebo přiřazení barvy podle toho, zda je hodnota kladná nebo záporná.
