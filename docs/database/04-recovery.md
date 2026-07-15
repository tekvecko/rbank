# Disaster Recovery

Postup obnovy databáze v případě fatálního selhání:
1. Odpojit API server (nastavit maintenance mode).
2. Lokalizovat poslední funkční zálohu na AWS.
3. Obnovit snapshot do nové databázové instance.
4. Přesměrovat Node.js API (úprava `.env`) na novou instanci.
5. Obnovit provoz API.
