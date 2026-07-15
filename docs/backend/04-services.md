# Services

Service vrstva představuje jádro obchodní logiky (Business Logic).

## Typické domény:
- Práce s účty (zjišťování zůstatku)
- Historie transakcí a stránkování
- Odesílání a validace plateb
- Správa karet
- Uživatelské nastavení

## Pravidla
- Service nikdy neřeší HTTP (nezná objekty request/response).
- Service nikdy neřeší uživatelské rozhraní.
- Service pracuje pouze s daty, která validuje a předává dál (do Repository nebo zpět do Controlleru).
