# Navigation (React Router)

Navigace v aplikaci je čistě webová (Single Page Application) a řídí ji knihovna **React Router DOM**.

## Architektura navigace
- `<BrowserRouter>` v souboru `App.jsx` definuje cesty (Routes) k jednotlivým stránkám (`/`, `/history`, `/payment`).
- `<BottomNav>` komponenta slouží jako hlavní ovládací prvek pro přepínání základních sekcí na spodní hraně displeje.
- Funkce `useNavigate()` slouží k programatickému přechodu mezi obrazovkami.

## Nativní integrace
Součástí navigace je vlastní komponenta `<BackButtonHandler>`, která komunikuje přes Capacitor API (`@capacitor/app`). Zajišťuje, že hardwarové tlačítko "Zpět" na Android zařízeních vrací uživatele v historii React Routeru, nebo bezpečně ukončí aplikaci dvojitým stisknutím na hlavní obrazovce.
