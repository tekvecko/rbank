# API Errors (Ošetření chyb)

API využívá standardní HTTP stavové kódy k indikaci úspěchu nebo selhání požadavku.

## Standardní HTTP Kódy
- **200 OK:** Požadavek byl úspěšně zpracován.
- **400 Bad Request:** Chybné parametry (např. chybějící povinná pole v POST requestu).
- **401 Unauthorized:** Chybí nebo je neplatný autentizační token.
- **403 Forbidden:** Token je platný, ale uživatel nemá právo na danou akci.
- **404 Not Found:** Endpoint nebo požadovaný zdroj neexistuje.
- **500 Internal Server Error:** Neočekávaná chyba na straně AWS serveru.

## Formát chybové odpovědi
V případě chyby backend (Node.js) vždy vrací JSON ve sjednoceném formátu, aby na něj frontend mohl snadno reagovat:
```json
{
  "error": true,
  "code": 401,
  "message": "Neplatný autentizační token."
}
