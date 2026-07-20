#!/bin/bash
# Agresivně redukovaný snapshot zaměřený pouze na core logiku aplikace

OUTPUT_FILE="ai_project_snapshot_mini.txt"
MAX_FILE_SIZE=50000

echo "Generuji zredukovaný snapshot bez obrázků..."
echo "========================================" > "$OUTPUT_FILE"
echo " CORE LOGIC SNAPSHOT" >> "$OUTPUT_FILE"
echo " Date: $(date)" >> "$OUTPUT_FILE"
echo "========================================" >> "$OUTPUT_FILE"

if [ -d ".git" ] || git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    # Blacklist doplněn o mediální formáty a public složku
    FILES=$(git ls-files | grep -vE "(\.html$|\.css$|\.json$|\.md$|\.txt$|\.csv$|\.webp$|\.png$|\.jpg$|\.jpeg$|\.svg$|\.ico$|\.gif$)")
    FILES=$(echo "$FILES" | grep -vE "(tests/|test_.*\.py|migrations/|alembic/|static/|templates/|docs/|fixtures/|public/)")
else
    echo "[Chyba] Tento skript vyžaduje funkční Git repozitář."
    exit 1
fi

for file in $FILES; do
    if [ ! -f "$file" ]; then continue; fi

    size=$(stat -c%s "$file" 2>/dev/null || stat -f%z "$file" 2>/dev/null)
    if [ -n "$size" ] && [ "$size" -gt "$MAX_FILE_SIZE" ]; then
        continue
    fi

    # Konečná pojistka: Zahození všeho, co se tváří jako binárka
    if file --mime-encoding "$file" | grep -q binary; then
         continue
    fi

    echo -e "\n========================================" >> "$OUTPUT_FILE"
    echo " FILE: $file" >> "$OUTPUT_FILE"
    echo "========================================" >> "$OUTPUT_FILE"
    cat "$file" >> "$OUTPUT_FILE"
done

LINES=$(wc -l < "$OUTPUT_FILE")
echo "Hotovo. Mini-snapshot má $LINES řádků."
