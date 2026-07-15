# Logging

Backend asynchronně zaznamenává důležité události běžícího Node.js procesu.

## Sledované události:
- Spuštění a ukončení serveru
- Fatální chyby a neočekávané výjimky (Unhandled Promise Rejections)
- Důležité HTTP požadavky
- Databázové chyby a pomalé dotazy

Cílem je usnadnit diagnostiku a audit systému přímo na AWS serveru bez nutnosti zasahovat do kódu.
