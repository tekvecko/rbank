#!/bin/bash
# Finální skript pro vygenerování čistého snapshotu projektu pro AI analýzu
# Striktní whitelist přístup + ochrana proti binárkám

OUTPUT_FILE="ai_project_snapshot_final.txt"
MAX_FILE_SIZE=100000 # 100 KB limit na soubor

echo "Generuji finální snapshot..."
echo "========================================" > "$OUTPUT_FILE"
echo " FINAL PROJECT SNAPSHOT" >> "$OUTPUT_FILE"
echo " Date: $(date)" >> "$OUTPUT_FILE"
echo "========================================" >> "$OUTPUT_FILE"

# 1. Získání souborů přes whitelist přípon
if [ -d ".git" ] || git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo "[Info] Nalezen Git. Aplikuji whitelist..."
    FILES=$(git ls-files | grep -iE "\.(py|js|jsx|ts|tsx|vue|html|css|scss|json|md|sh|yml|yaml|xml|gradle|properties)$")
else
    echo "[Info] Git nenalezen. Používám find..."
    FILES=$(find . -type f | grep -iE "\.(py|js|jsx|ts|tsx|vue|html|css|scss|json|md|sh|yml|yaml|xml|gradle|properties)$")
fi

# 2. Odstranění cest k buildu a závislostem (pro redukci šumu)
FILES=$(echo "$FILES" | grep -vE "(node_modules/|venv/|\.venv/|env/|__pycache__/|build/|dist/|android/\.gradle/|android/app/build/|tests/|test_.*\.py|migrations/|alembic/|public/|assets/)")

# 3. Zpracování a zápis
for file in $FILES; do
    if [ ! -f "$file" ]; then continue; fi

    # Pojistka 1: Velikost souboru
    size=$(stat -c%s "$file" 2>/dev/null || stat -f%z "$file" 2>/dev/null)
    if [ -n "$size" ] && [ "$size" -gt "$MAX_FILE_SIZE" ]; then
        continue
    fi

    # Pojistka 2: Striktní detekce binárních dat
    if file --mime-encoding "$file" | grep -q binary; then
         continue
    fi

    echo -e "\n========================================" >> "$OUTPUT_FILE"
    echo " FILE: $file" >> "$OUTPUT_FILE"
    echo "========================================" >> "$OUTPUT_FILE"
    cat "$file" >> "$OUTPUT_FILE"
done

LINES=$(wc -l < "$OUTPUT_FILE")
echo "Hotovo. Finální snapshot má $LINES řádků a je v souboru $OUTPUT_FILE"
