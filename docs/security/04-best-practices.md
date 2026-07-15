# Security Best Practices
- **No API Keys in Repo:** Žádné `.env` proměnné nesmí být pushnuté v Gitu.
- **HTTPS:** Komunikace s AWS musí být do budoucna šifrována (SSL/TLS certifikát).
- **ProGuard:** Release build Android aplikace využívá ProGuard pro obfuskaci kódu a snížení velikosti APK.
