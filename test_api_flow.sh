#!/bin/bash

API_URL="https://opravyslavkov.shop/api"
DOCS_URL="https://opravyslavkov.shop/docs/"
POST_OUT="rbank_post_test.json"
GET_OUT="rbank_get_test.json"

echo "=========================================="
echo "  rBank - Sekvenční test API průchodu"
echo "=========================================="
echo ""

echo "[KROK 1] Ověření dostupnosti serveru a HTTPS certifikátu..."
curl -s -I "$DOCS_URL" | head -n 1
echo ""
read -p "--> Pokud vidíš HTTP/2 401, SSL funguje. Stiskni [Enter] pro pokračování..."

echo ""
echo "[KROK 2] Manuální autentizace (Basic Auth)"
read -p "Uživatelské jméno: " USERNAME
read -s -p "Heslo: " PASSWORD
echo ""

echo ""
read -p "--> Údaje vloženy. Stiskni [Enter] pro odeslání platby (POST /transactions)..."

echo ""
echo "[KROK 3] Odeslání platby..."
PAYLOAD='{
  "name": "Termux Testovací Uživatel",
  "type": "Odchozí úhrada",
  "amount": "-150,00",
  "subAmount": "Odesláno přes sekvenční skript",
  "color": "text-white",
  "iconBg": "bg-[#3e424c]",
  "icon": "💸",
  "badge": "📤"
}'

HTTP_STATUS=$(curl -s -o "$POST_OUT" -w "%{http_code}" -X POST "${API_URL}/transactions" \
  -u "${USERNAME}:${PASSWORD}" \
  -H "Content-Type: application/json" \
  -d "${PAYLOAD}")

echo "HTTP Status kód: $HTTP_STATUS"
echo "Odpověď backendu:"
cat "$POST_OUT"
echo ""

echo ""
read -p "--> Platba odeslána. Stiskni [Enter] pro načtení historie transakcí (GET /transactions)..."

echo ""
echo "[KROK 4] Načtení historie transakcí..."
curl -s -X GET "${API_URL}/transactions" \
  -u "${USERNAME}:${PASSWORD}" \
  -H "Accept: application/json" > "$GET_OUT"

cat "$GET_OUT"
echo ""

echo ""
echo "=========================================="
echo "Testovací průchod byl dokončen."
echo "=========================================="
