# GitHub Actions CI/CD

## Přehled
GitHub Actions slouží jako automatizovaná vývojová pipeline. Zajišťuje čistý a nezávislý build mimo lokální Termux prostředí.

## Architektura CI
Developer -> git push -> GitHub -> Ubuntu Runner -> NPM Build -> Capacitor Sync -> Gradle Build -> APK Artifact

## Aktuální technologie
- GitHub Actions (Ubuntu Runner)
- Node.js (pro Vite)
- JDK 21 & Gradle 8.x
- Android SDK & Capacitor

## Doporučené kroky pipeline
**1. Checkout:** Stažení zdrojového kódu (`actions/checkout`).
**2. Setup Node & Java:** Příprava prostředí pro kompilaci.
**3. Instalace závislostí:** `npm install`.
**4. Frontend Build (Kritický krok):** `npm run build`.
**5. Capacitor Sync:** `npx cap sync android`.
**6. Android Build:** `cd android && ./gradlew assembleDebug`.

## Historické milníky CI
- **Gradle & JDK 21 upgrade:** Příprava na moderní standardy.
- **Odstranění Cordova závislostí:** Přidán auditovatelný skript (bývalý commit e668899) pro odstranění nepotřebných pluginů, čímž se odlehčil build.

## Budoucí rozšíření
- Automatické nahrávání APK jako Artifactu pro okamžité stažení z GitHubu.
- Automatický deployment Node.js backendu na AWS při změně ve větvi main.
