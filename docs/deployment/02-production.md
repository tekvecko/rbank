# Production Deployment

Proces nasazení do cloudu (AWS):
1. **Backend:** Kód se stáhne na EC2 instanci, proběhne `npm install` a `npm start` (ideálně pod PM2).
2. **Frontend:** Vygeneruje se Release APK, podepíše se lokálním Keystore a distribuuje koncovým uživatelům.
