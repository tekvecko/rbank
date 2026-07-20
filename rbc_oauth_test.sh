#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "================================="
echo " RBCZ PSD2 AISP OAuth TEST"
echo "================================="

# ===== KONFIGURACE =====

CLIENT_ID="43ZCP89Lkf08XV9A85NqFdihpRWdmxzg"

# DOPLŇ SECRET Z DEVELOPER PORTÁLU
CLIENT_SECRET="DOPLN_CLIENT_SECRET"

CERT="rb-client.pem"
KEY="rb-client.key"

REDIRECT_URI="https://api.rbinternational.com/swagger-ui-oauth2-redirect"

STATE=$(cat /proc/sys/kernel/random/uuid)

BASE="https://api1.bridge.developer.rb.cz/rbcz/prod02/psd2-rbcz-bridge-api"

AUTH_URL="$BASE/bridge/authorize"


echo
echo "[1] OAuth authorize URL"
echo

ENC_REDIRECT=$(python - <<PY
import urllib.parse
print(urllib.parse.quote("$REDIRECT_URI"))
PY
)

URL="$AUTH_URL?response_type=code&scope=AISP&redirect_uri=$ENC_REDIRECT&client_id=$CLIENT_ID&state=$STATE"


echo "$URL"

echo
echo "================================="
echo "Otevři URL v prohlížeči"
echo "Přihlas sandbox účet 7054050036"
echo "Potvrď AISP souhlas"
echo "================================="
echo

read -p "Vlož CODE z redirect URL: " CODE


echo
echo "[2] Token exchange"
echo


curl -vk \
--cert "$CERT" \
--key "$KEY" \
-X POST \
"https://api1.developer.rb.cz/rbcz/prod02/aisp/oauth2/token" \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "grant_type=authorization_code" \
-d "client_id=$CLIENT_ID" \
-d "client_secret=$CLIENT_SECRET" \
-d "code=$CODE" \
-d "redirect_uri=$REDIRECT_URI"


echo
echo
echo "================================="
echo " HOTOVO"
echo "================================="
