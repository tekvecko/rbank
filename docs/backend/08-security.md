# Backend Security

Bezpečnost backendu je jednou z hlavních priorit.

## Základní pravidla:
- Striktní validace všech HTTP vstupů (Query parametry, Body)
- Sanitizace dat před odesláním do databáze (prevence SQL Injection)
- Uzavřený přímý přístup k databázi (pouze localhost nebo whitelisted IP)
- Ochrana citlivých údajů v logovacích systémech

## Bezpečnostní roadmapa:
- Nasazení HTTPS certifikátu přes Nginx (Reverzní proxy na AWS)
- Autentizace pomocí JWT (JSON Web Tokens) a Refresh tokenů
- Logování auditní stopy
- Rate limiting (prevence zahlcení API)
- Ochrana proti brute force útokům na endpointy
