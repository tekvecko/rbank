# Build Process (Vite + Capacitor)

Projekt využívá dvoufázový build proces: webový a nativní.

## 1. Webový Build (Vite)
Kód v Reactu je zkompilován a zminifikován do složky `dist` pomocí příkazu:
`npm run build`

## 2. Nativní Synchronizace (Capacitor)
Zkompilované webové soubory jsou překopírovány do Android projektu příkazem:
`npx cap sync android`

## 3. Sestavení APK (Gradle)
Finální balíček je vytvořen pomocí standardního Android Gradle wrapperu (nebo automatizovaně přes GitHub Actions):
`./gradlew assembleDebug` (pro testování)
nebo `assembleRelease` s příslušným keystore certifikátem pro produkci.
