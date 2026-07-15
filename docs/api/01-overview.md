# REST API Overview

Backend RBank vystavuje standardní RESTful API pro komunikaci s frontendovými klienty.

## Základní informace
- **Host:** Cloudový server na AWS
- **IP/Doména:** `http://13.49.77.58:3000` (pro produkci se plánuje HTTPS/doména)
- **Formát dat:** Veškerý datový přenos (Request i Response) probíhá ve formátu `application/json`.

## Zabezpečení a CORS
- API musí povolovat požadavky z Capacitor klienta (`capacitor://localhost` nebo `http://localhost`).
- Všechny endpointy pracující s klientskými daty vyžadují platnou autentizaci.
