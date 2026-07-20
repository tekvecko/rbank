#!/data/data/com.termux/files/usr/bin/bash

CLIENT_ID="43ZCP89Lkf08XV9A85NqFdihpRWdmxzg"

echo "=== RBCZ TOKEN EXCHANGE ==="

read -p "CLIENT SECRET: " CLIENT_SECRET

read -p "AUTH CODE: " CODE

echo
echo "[+] Exchange..."

curl -vk \
--cert rb-client.pem \
--key rb-client-nopass.key \
-X POST \
"https://api1.developer.rb.cz/rbcz/prod02/aisp/oauth2/token" \
-u "${CLIENT_ID}:${CLIENT_SECRET}" \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "grant_type=authorization_code" \
-d "client_id=${CLIENT_ID}" \
-d "code=${CODE}" \
-d "redirect_uri=https://api.rbinternational.com/en/swagger-ui-oauth2-redirect"

echo
