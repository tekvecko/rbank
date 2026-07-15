# System Overview

RBank je moderní full-stack bankovní aplikace rozdělená na nezávislý frontend a cloudový backend.

## Architektonický vzor
Systém využívá architekturu **Client-Server** s odděleným prezentačním a datovým vrstvením (Decoupled Architecture).

1. **Frontend (Tenký klient):** 
   - Napsaný v React.js, stylovaný přes Tailwind CSS.
   - Běží jako hybridní mobilní aplikace pomocí Capacitoru.
   - Neudržuje žádnou perzistentní obchodní logiku, slouží výhradně k prezentaci dat.
2. **Backend (API Gateway & Business Logic):**
   - Node.js server běžící na AWS infrastruktuře.
   - Zajišťuje autentizaci, validaci a komunikaci s databází.
3. **Databáze:**
   - Relační úložiště pro transakce a uživatelská data.

## Datový tok
Uživatel (Mobil) -> Capacitor WebView -> HTTPS/REST -> AWS Node.js Server -> Databáze
