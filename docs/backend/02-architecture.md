# Backend Architecture

Backend je postaven na platformě Node.js a je rozdělen do standardních logických vrstev, což usnadňuje testování a údržbu.

## Datový tok
Request -> Router -> Controller -> Service -> Repository -> Database

## Odpovědnosti vrstev
- **Router:** Přijímá HTTP požadavky a definuje endpointy.
- **Controller:** Zpracuje HTTP požadavek (vstupní parametry) a vrací JSON odpověď.
- **Service:** Obsahuje čistou obchodní logiku (nezávislou na HTTP).
- **Repository:** Jediná vrstva, která komunikuje přímo s databází (SQL dotazy/ORM).
- **Database:** Fyzické úložiště dat.

Dodržuje se striktně princip Single Responsibility (jednotné odpovědnosti).
