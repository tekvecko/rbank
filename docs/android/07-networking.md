# Networking

Aplikace komunikuje s backendem přes HTTP REST API pomocí standardní webové funkce `fetch()`.

## Aktuální stav
- Backend je nasazen v produkčním cloudovém prostředí na AWS.
- URL endpointů: `http://13.49.77.58:3000/api/...`
- Veškeré požadavky vracejí a přijímají data ve formátu **JSON**.

## Architektura a Bezpečnost
- Aplikace **nikdy** nekomunikuje přímo s databází, vždy prochází přes Node.js API vrstvu.
- Pro rozsáhlé seznamy (např. historie transakcí) je implementováno bezpečné stránkování (parametry `?page=` a `?limit=`).
