# API Endpoints

## Zůstatek účtu
- **URL:** `/api/balance`
- **Method:** `GET`
- **Response:** `{ "balance": 125000.00 }`

## Historie transakcí
- **URL:** `/api/transactions`
- **Method:** `GET`
- **Query Parametry:** `?page=1&limit=15`
- **Response (Array):** Vrací pole transakcí (id, name, amount, type, created_at).
