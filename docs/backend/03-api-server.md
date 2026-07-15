# API Server

Hlavní proces API serveru běží jako Node.js aplikace. 

## Nastavení sítě
- **Prostředí:** AWS cloud instance.
- **Port:** Výchozí naslouchací port je `3000`.
- **CORS:** Server musí mít explicitně povoleno přijímat požadavky z `capacitor://localhost` (pro iOS/Android WebView) a standardních `http://localhost` portů pro lokální vývoj.

## Procesní management
V produkčním prostředí na AWS se doporučuje udržovat běh API serveru pomocí procesních manažerů (např. PM2), aby bylo zajištěno automatické restartování při případném pádu.
