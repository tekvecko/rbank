#!/bin/bash
# Skript pro vygenerování čistého snapshotu projektu pro AI analýzu

OUTPUT_FILE="ai_project_snapshot.txt"
MAX_FILE_SIZE=100000 # cca 100 KB limit na jeden soubor

echo "Generuji nový snapshot..."
echo "========================================" > "$OUTPUT_FILE"
echo " PROJECT SNAPSHOT V2" >> "$OUTPUT_FILE"
echo " Date: $(date)" >> "$OUTPUT_FILE"
echo "========================================" >> "$OUTPUT_FILE"

# 1. Získání seznamu souborů
# Pokud je projekt pod Gitem, vezmeme jen indexované soubory (respektuje .gitignore)
if [ -d ".git" ] || git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo "[Info] Nalezen Git repozitář. Používám indexované soubory."
    FILES=$(git ls-files)
else
    echo "[Info] Git nenalezen. Používám striktní filtr přípon."
    # Hledá jen konkrétní zdrojové kódy a filtruje běžné složky s knihovnami
    FILES=$(find . -type f \( -name "*.py" -o -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.json" -o -name "*.md" -o -name "*.sh" \) | grep -vE "/(venv|\.venv|env|node_modules|__pycache__|\.git|build|dist|\.mypy_cache)/")
fi

# 2. Zpracování souborů
for file in $FILES; do
    # Pojistka pro případ, že git ls-files vrátí smazaný soubor, který ještě nebyl commitnut
    if [ ! -f "$file" ]; then continue; fi

    # Kontrola velikosti souboru
    size=$(stat -c%s "$file" 2>/dev/null || stat -f%z "$file" 2>/dev/null)
    if [ -n "$size" ] && [ "$size" -gt "$MAX_FILE_SIZE" ]; then
        echo -e "\n========================================" >> "$OUTPUT_FILE"
        echo " FILE: $file [PŘESKOČENO - Příliš velký: $size B]" >> "$OUTPUT_FILE"
        echo "========================================" >> "$OUTPUT_FILE"
        continue
    fi

    # Zápis do souboru
    echo -e "\n========================================" >> "$OUTPUT_FILE"
    echo " FILE: $file" >> "$OUTPUT_FILE"
    echo "========================================" >> "$OUTPUT_FILE"
    cat "$file" >> "$OUTPUT_FILE"
done

LINES=$(wc -l < "$OUTPUT_FILE")
echo "Hotovo. Nový snapshot má $LINES řádků."
