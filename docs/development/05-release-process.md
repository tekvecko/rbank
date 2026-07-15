# Release Process

Postup vydání nové produkční verze.

1. **Aktualizace konfigurace:** Zkontrolovat, že API URL míří striktně na produkční AWS server.
2. **Aktualizovat dokumentaci** a verze v `package.json`.
3. **Web Build:** Spustit `npm run build`.
4. **Capacitor Sync:** Spustit `npx cap sync android`.
5. **Vytvořit Release Build:** `cd android && ./gradlew assembleRelease`.
6. **Podepsat APK:** Podepsat aplikaci pomocí lokálního Keystore.
7. **Commit & Push:** Odeslat změny na GitHub (spustí se CI/CD pro finální ověření).
8. **Git Tag:** Vytvořit tag (např. `v1.0.0`) a sepsat Release Notes.

Každý release musí být stoprocentně dohledatelný podle Git historie a musí mít jasně definovaný state backendu.
