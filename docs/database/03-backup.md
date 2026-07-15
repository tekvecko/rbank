# Backup Strategy

Zálohování dat je kritické.
- **Produkce (AWS):** Využívají se automatizované snapshoty (AWS RDS / EBS snapshoty).
- **Frekvence:** Denní kompletní záloha, uchování po dobu 7-30 dnů.
- Zálohy jsou šifrované a fyzicky oddělené od aplikačního serveru.
