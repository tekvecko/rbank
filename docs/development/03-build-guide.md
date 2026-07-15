# Build Guide

Vzhledem k hybridní povaze projektu (Capacitor) se build skládá ze dvou oddělených fází.

## 1. Webový Build (Frontend)
Než je možné vytvořit Android aplikaci, musí se zkompilovat React kód:
`npm run build`
(Tento krok vytvoří optimalizované HTML/JS/CSS soubory ve složce `dist/`).

## 2. Capacitor Synchronizace
Překopírování zkompilovaného webu do Android struktury:
`npx cap sync android`

## 3. Nativní Build (Android)
**Debug Build:**
Slouží pro lokální vývoj a testování (nevyžaduje finální produkční certifikát).
`cd android && ./gradlew assembleDebug`

**Release Build:**
Používá se pro produkční nasazení. Musí být podepsán (Keystore) a optimalizován (ProGuard).
`cd android && ./gradlew assembleRelease`

## Kontrola
Po každém buildu ověřit:
- Aplikace se spustí (White-screen test).
- Připojení k AWS backendu funguje (není zablokováno CORS nebo HTTP cleartext restrikcemi).
- Logcat neobsahuje fatální chyby JS runtime.
