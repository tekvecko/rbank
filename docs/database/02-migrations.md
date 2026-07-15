# Database Migrations

Struktura databáze nesmí být nikdy upravována manuálně v produkci.

- Používají se migrační skripty (např. přes Knex.js nebo Sequelize).
- Každá migrace má definovanou metodu `up` (aplikace změn) a `down` (rollback).
- Migrace se spouštějí automatizovaně během deploymentu na AWS.
