# Frontend Client Overview (React + Capacitor)

## Účel
Tato část systému představuje klientskou aplikaci RBank. 

Je implementována jako **hybridní aplikace** pomocí React.js a zabalena do nativní slupky pomocí technologie Capacitor. 
Jejím úkolem je poskytovat moderní uživatelské rozhraní (UI) a komunikovat s backendem na AWS prostřednictvím REST API.

Aplikace je tzv. "thin client" (tenký klient) – neobsahuje žádnou složitou obchodní logiku, veškerá data a výpočty pocházejí z backendu.

## Hlavní odpovědnosti
- Prezentace dat (Dashboard, Historie, Karty)
- Navigace a routování (React Router)
- Komunikace s REST API (Fetch API)
- Bezpečné ukládání tokenů (Capacitor Preferences)
- Přístup k nativním funkcím (Schránka, Toast notifikace, HW tlačítko Zpět)

## Architektura
React / Vite Frontend 
↓
Capacitor Bridge (Nativní vrstva)
↓
HTTP / REST API
↓
Node.js Backend (AWS)
↓
Databáze
