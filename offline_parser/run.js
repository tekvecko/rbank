const fs = require('fs');
const path = require('path');
const http = require('http');
const { exec } = require('child_process');
const PDFParser = require('pdf2json');

const INPUT_DIR = path.join(process.env.HOME, 'vypisy');
const BASE_DIR = path.join(process.env.HOME, 'rbank', 'offline_parser');
const OUTPUT_DATA = path.join(BASE_DIR, 'transactions.json');

const forceClean = (text) => {
    try { return decodeURIComponent(text); }
    catch (e) { return text.replace(/%[0-9A-F]{2}/g, '').replace(/[^\x20-\x7E\u00C0-\u017F]/g, ''); }
};

async function parseFile(filePath) {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser();
        pdfParser.on("pdfParser_dataError", err => reject(err));
        pdfParser.on("pdfParser_dataReady", data => resolve(data));
        pdfParser.loadPDF(filePath);
    });
}

async function processPDFs() {
    if (!fs.existsSync(INPUT_DIR)) fs.mkdirSync(INPUT_DIR, { recursive: true });
    const files = fs.readdirSync(INPUT_DIR).filter(f => f.toLowerCase().endsWith('.pdf'));
    let allTransactions = [];

    if (files.length === 0) {
        console.log(`[!] Složka ${INPUT_DIR} neobsahuje žádná PDF.`);
        fs.writeFileSync(OUTPUT_DATA, JSON.stringify([], null, 2));
        return;
    }

    const STOP_KEYWORDS = /Raiffeisenbank|V rámci souhrnné položky|Přehled pohledavek|Zpráva pro klienta|Zaplacené poplatky|Zaplacené úroky|Připsané úroky|Základní úroková sazba|Bezúročná rezerva|EQUA účet|Vedení debetní|Informace o úrocích|Přehled poplatků/i;

    for (const file of files) {
        console.log(`[>] Parsování dokumentu: ${file}...`);
        const data = await parseFile(path.join(INPUT_DIR, file));
        
        (data.Pages || []).forEach(page => {
            let rawElements = [];
            let ignoreAboveY = 0;
            let ignoreBelowY = 999999;
            let isFirstPage = false;

            (page.Texts || []).forEach(t => {
                let text = forceClean(t.R[0].T).trim();
                if (/^Strana\s*1\//i.test(text)) isFirstPage = true;
            });

            (page.Texts || []).forEach(t => {
                let text = forceClean(t.R[0].T).trim();
                if (text === '.' || text === '-' || text === '' || /^Strana/i.test(text)) return;
                
                if (/K0000\d+/i.test(text) || text.includes('•')) return;
                
                let x = Math.round(t.x * 100);
                let y = Math.round(t.y * 100);

                if ((isFirstPage && /Výpis pohybů|Kategorie transakce/i.test(text)) || (!isFirstPage && /Kategorie transakce/i.test(text))) {
                    if (y > ignoreAboveY) ignoreAboveY = y + 20;
                }
                
                if (STOP_KEYWORDS.test(text)) {
                    if (y < ignoreBelowY) ignoreBelowY = y - 20;
                }
                
                rawElements.push({ x, y, text });
            });

            let elements = rawElements.filter(e => e.y > ignoreAboveY && e.y < ignoreBelowY);
            
            let boundaries = elements.filter(e => 
                e.x > 2500 && 
                /[-–—−]?[\d\s]+\.\d{2}/.test(e.text) && 
                !/[a-zA-Z]{3}/.test(e.text.replace(/CZK/i, ''))
            ).map(e => e.y).sort((a, b) => a - b);

            for (let i = 0; i < boundaries.length; i++) {
                let startY = boundaries[i];
                let endY = (i + 1 < boundaries.length) ? boundaries[i+1] : startY + 500;
                let blockEls = elements.filter(e => e.y >= startY - 10 && e.y < endY - 10);
                
                let col1Raw = blockEls.filter(e => e.x < 500).sort((a,b) => a.y - b.y).map(e => e.text);
                let col2Raw = blockEls.filter(e => e.x >= 500 && e.x < 1200).sort((a,b) => a.y - b.y).map(e => e.text);
                let col3Raw = blockEls.filter(e => e.x >= 1200 && e.x < 2200).sort((a,b) => a.y - b.y).map(e => e.text);
                
                let amountEls = blockEls.filter(e => e.x >= 2500 && /[-–—−]?[\d\s]+\.\d{2}/.test(e.text)).sort((a,b) => a.y - b.y);
                if (amountEls.length === 0) continue;
                
                let val = parseFloat(amountEls[0].text.replace(/[\s\xA0a-zA-Z]/g, '').replace(/[-–—−]/, '-'));
                if (isNaN(val)) continue;

                // --- VYLEPŠENÁ LOGIKA EXTRAKCE JMEN A TYPŮ ---
                // 1. Opatrné oddělení kategorie
                let category = col2Raw.length > 0 ? col2Raw[0] : '';
                // Zbavíme se pouze jména uživatele, nezahazujeme už čísla účtů
                let col2Filtered = col2Raw.slice(1).filter(t => !/ZBYNĚK|KOCIÁN/i.test(t));
                
                // 2. Filtrace zbytečných čísel (VS, KS, původní měny) z poznámek
                let col3Filtered = col3Raw.filter(t => 
                    !/^[\d\s\-\/]+$/.test(t) && 
                    !/^(VS|KS|SS):/i.test(t) && 
                    !/(PK|PC)[:\s]*[\wX]+/i.test(t) && 
                    !/Místo:|Částka:/i.test(t)
                );

                // 3. Skládání jména: Číslo účtu / Název protiúčtu
                let finalName = col2Filtered.join(' - '); 
                let extras = col3Filtered.slice(1).join(' | '); // Případná zpráva/poznámka

                // Pokud nemáme protiúčet, použijeme poznámku, jinak připojíme poznámku k protiúčtu
                if (!finalName) {
                    finalName = extras ? extras : 'Neznámý obchodník';
                } else if (extras) {
                    finalName += ` | ${extras}`;
                }

                // 4. Skládání typu: Kombinace transakce a kategorie
                let typeText = col3Filtered.length > 0 ? col3Filtered[0] : category;
                let finalType = typeText || 'Platba';
                // Pokud máme kategorii (např. "Platba") a typ (např. "Příchozí úhrada"), spojíme je
                if (category && category !== typeText && !typeText.includes(category)) {
                    finalType = `${typeText} (${category})`;
                }
                // ---------------------------------------------

                allTransactions.push({ 
                    id: Math.random().toString(36).substr(2, 9),
                    real_date: col1Raw[0] || '',
                    name: finalName,
                    type: finalType,
                    amount: (val > 0 ? "+" : "") + val.toLocaleString('cs-CZ', {minimumFractionDigits: 2}),
                    color: val > 0 ? 'text-emerald-400' : 'text-slate-100'
                });
            }
        });
    }

    fs.writeFileSync(OUTPUT_DATA, JSON.stringify(allTransactions, null, 2));
    console.log(`\n[v] Extrahováno a uloženo ${allTransactions.length} transakcí.`);
}

function startServerAndBrowser() {
    const server = http.createServer((req, res) => {
        let filePath = path.join(BASE_DIR, req.url === '/' ? 'index.html' : req.url);
        let extname = path.extname(filePath);
        let contentType = 'text/html';
        if (extname === '.json') contentType = 'application/json';

        fs.readFile(filePath, (err, content) => {
            if (err) { res.writeHead(404); res.end('Soubor nenalezen'); }
            else { res.writeHead(200, { 'Content-Type': contentType }); res.end(content, 'utf-8'); }
        });
    });

    server.listen(3000, () => {
        console.log('\n=============================================');
        console.log('Lokální server běží na: http://localhost:3000');
        console.log('=============================================');
        exec('termux-open-url http://localhost:3000');
    });
}

async function init() {
    await processPDFs();
    startServerAndBrowser();
}

init();
