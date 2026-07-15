# Components & Pages

Ve starší verzi dokumentace se počítalo s Android Fragmenty. Nyní je veškeré UI tvořeno **React Komponentami**.

## Rozdělení
1. **Pages (Stránky):**
   - Reprezentují celou obrazovku, na kterou vede konkrétní URL (např. `Dashboard.jsx`).
   - Obsahují stav (`useState`) a starají se o načítání dat z backendu (`useEffect`).
2. **Components (Komponenty):**
   - Znovupoužitelné stavební bloky (např. `BottomNav.jsx`, tlačítka, avatary).
   - Přijímají data převážně přes `props` a nevážou se na konkrétní URL rutu.

Komponenty nikdy nekomunikují přímo s databází, vždy využívají HTTP spojení na backend.
