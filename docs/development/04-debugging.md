# Debugging

Nejčastější problémy během hybridního vývoje:

- **Bílá obrazovka po startu:** Vite build neproběhl správně, nebo Capacitor nenachází složku `dist`.
- **Chyba sítě (Network Error):** Frontend se snaží připojit na `localhost` místo na AWS server (`13.49.77.58`), nebo naopak.
- **CORS chyby:** AWS backend odmítá požadavky z Capacitor WebView (vyžaduje úpravu hlaviček na backendu).
- **Gradle cache / OOM chyby:** Termux nemá dostatek paměti pro kompilaci. Řešením je přidání `--no-daemon` k příkazu gradlew.
- **Zastaralé UI v aplikaci:** Zapomněl jsi spustit `npx cap sync android` po provedení `npm run build`.

## Doporučený postup řešení:
1. Ověřit, že běží backend (např. přes curl na `http://13.49.77.58:3000/api/balance`).
2. Provést čistý build (`npm run build`).
3. Sledovat nativní logy pomocí ADB: `adb logcat | grep -i "capacitor"`
