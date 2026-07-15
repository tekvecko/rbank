# Local Development

Pro vývoj v prostředí Termux (Android):
1. Zapnout lokální vývojový Node.js backend.
2. Ve složce `src` spustit Vite dev server nebo rovnou zkompilovat přes `npm run build`.
3. Synchronizace do Capacitoru: `npx cap sync android`.
4. Kompilace APK: `cd android && ./gradlew assembleDebug`.
