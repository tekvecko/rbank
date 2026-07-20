#!/data/data/com.termux/files/usr/bin/bash

set -e

read -p "Client ID: " CLIENT_ID
read -s -p "Client Secret: " CLIENT_SECRET
echo

read -p "Code: " CODE

CERT="rb-client.pem"
KEY="rb-client.key"

curl -vk \
--cert "$CERT" \
--key "$KEY" \
-X POST \
"https://api1.developer.rb.cz/rbcz/prod02/aisp/oauth2/token" \
-u "$CLIENT_ID:$CLIENT_SECRET" \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "grant_type=authorization_code" \
-d "code=$CODE" \
-d "redirect_uri=https://api.rbinternational.com/swagger-ui-oauth2-redirect"

