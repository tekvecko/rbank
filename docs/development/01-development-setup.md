# Development Setup

## Účel
Tento dokument popisuje kompletní zprovoznění vývojového prostředí od čistého zařízení až po první úspěšný build aplikace (React frontend + Capacitor Android).

## Cílová platforma
Primární vývoj probíhá přímo na mobilním zařízení (Motorola / Android).

Používané prostředí:
- Termux
- Ubuntu (proot-distro)
- Git
- Node.js & npm (pro React a Vite)
- Java JDK 21
- Android SDK
- Gradle
- Capacitor

## Doporučený postup
1. Aktualizovat Termux a nainstalovat Ubuntu (proot).
2. Nainstalovat Git, Node.js a JDK 21.
3. Nainstalovat a nastavit Android SDK.
4. Naklonovat repozitář: `git clone ...`
5. Nainstalovat NPM závislosti: `npm install`
6. Nastavit API endpointy (ověřit, že aplikace míří na AWS backend `13.49.77.58` nebo lokální IP).
7. Sestavit webovou část: `npm run build`
8. Synchronizovat Capacitor: `npx cap sync android`
9. Sestavit Android APK: `cd android && ./gradlew assembleDebug`

## Výsledek
Po dokončení musí být možné nainstalovat vygenerované APK, aplikace se bez chyb spustí a načte reálná data z backendu.
