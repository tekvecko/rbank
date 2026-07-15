# Development Environment

## Primární prostředí
Projekt je navržen pro plnohodnotný vývoj bez nutnosti Android Studia.

Používané nástroje:
- Android telefon (Termux + Ubuntu chroot)
- Git & GitHub
- Node.js & npm (Frontend toolchain)
- Vite (Bundler)
- Capacitor (Native bridge)
- Gradle & Java JDK 21 (Android kompilace)

## Doporučená struktura toku

Vývoj (React / Vite)
↓
Build (dist/)
↓
Capacitor Sync (android/)
↓
APK Sestavení
↓
Nasazení

Vývoj probíhá primárně v kořenovém adresáři (složka `src/`).
Nativní Android složka (`android/`) se upravuje pouze při přidávání specifických oprávnění (Manifest) nebo nativních pluginů.
