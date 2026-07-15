# Database Schema

Základní relační schéma pro RBank.

## Hlavní entity
1. **Users:** `id`, `email`, `password_hash`, `created_at`
2. **Accounts:** `id`, `user_id`, `account_number`, `balance`, `currency`
3. **Transactions:** `id`, `account_id`, `amount`, `type`, `name`, `created_at`

*Poznámka: Aktuálně probíhá stabilizace backendu na AWS, detailní ERD (Entity Relationship Diagram) bude doplněn.*
