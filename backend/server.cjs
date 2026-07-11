const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const PDFParser = require('pdf2json');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const upload = multer({ storage: multer.memoryStorage() });
const dbPath = path.resolve(__dirname, 'database.json');

if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, JSON.stringify([]));
const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

app.get('/api/transactions', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const txs = readDB().reverse();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    res.json(txs.slice(startIndex, endIndex));
});

app.get('/api/balance', (req, res) => {
    const txs = readDB();
    let sum = 0;
    txs.forEach(tx => {
        if(tx.amount) {
            let clean = tx.amount.replace(/\s+/g, '').replace('+', '').replace('CZK', '').replace(',', '.').trim();
            sum += parseFloat(clean) || 0;
        }
    });
    res.json({ balance: sum });
});

app.get('/api/transactions/search', (req, res) => {
    const query = (req.query.q || '').toLowerCase();
    const txs = readDB();
    if (!query) return res.json([]);
    const results = txs.filter(tx => 
        (tx.type && tx.type.toLowerCase().includes(query)) ||
        (tx.amount && tx.amount.toLowerCase().includes(query)) ||
        (tx.name && tx.name.toLowerCase().includes(query))
    ).reverse().slice(0, 10);
    res.json(results);
});

app.get('/api/transactions/search-bulk', (req, res) => {
    const query = (req.query.q || '').toLowerCase();
    const txs = readDB();
    if (!query) return res.json([]);
    const results = txs.filter(tx => 
        (tx.type && tx.type.toLowerCase().includes(query)) ||
        (tx.amount && tx.amount.toLowerCase().includes(query)) ||
        (tx.name && tx.name.toLowerCase().includes(query))
    ).reverse();
    res.json(results);
});

app.post('/api/transactions/bulk', (req, res) => {
    const rows = readDB();
    const newTxs = req.body.transactions.map((tx, i) => ({ 
        ...tx, 
        id: (rows.length + i + 1).toString(), 
        created_at: new Date().toISOString() 
    }));
    writeDB([...rows, ...newTxs]);
    res.status(201).json({ message: 'Dávka uložena' });
});

app.put('/api/transactions/bulk-update', (req, res) => {
    const txs = readDB();
    const updates = req.body.transactions || [];
    let updatedCount = 0;
    
    updates.forEach(update => {
        const index = txs.findIndex(t => t.id === update.id);
        if (index !== -1) {
            txs[index] = { ...txs[index], ...update };
            updatedCount++;
        }
    });
    
    writeDB(txs);
    res.json({ message: `Hromadně upraveno ${updatedCount} transakcí.` });
});

app.put('/api/transactions/:id', (req, res) => {
    const txs = readDB();
    const index = txs.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Transakce nenalezena' });
    txs[index] = { ...txs[index], ...req.body };
    writeDB(txs);
    res.json({ message: 'Změny uloženy', transaction: txs[index] });
});

app.delete('/api/transactions/:id', (req, res) => {
    const txs = readDB();
    const initialLength = txs.length;
    const filteredTxs = txs.filter(t => t.id !== req.params.id);
    
    if (filteredTxs.length === initialLength) {
        return res.status(404).json({ error: 'Transakce nenalezena' });
    }
    
    writeDB(filteredTxs);
    res.json({ message: 'Transakce smazána.' });
});

app.delete('/api/transactions', (req, res) => {
    writeDB([]);
    res.json({ message: 'Databáze byla úspěšně vymazána.' });
});

const forceClean = (text) => {
    try { return decodeURIComponent(text); } 
    catch (e) { return text.replace(/%[0-9A-F]{2}/g, '').replace(/[^\x20-\x7E\u00C0-\u017F]/g, ''); }
};

app.post('/api/parse-pdf', upload.single('statement'), async (req, res) => {
    try {
        const pdfParser = new PDFParser();
        const data = await new Promise((resolve, reject) => {
            pdfParser.on("pdfParser_dataError", err => reject(err));
            pdfParser.on("pdfParser_dataReady", data => resolve(data));
            pdfParser.parseBuffer(req.file.buffer);
        });

        const transactions = [];

        (data.Pages || []).forEach(page => {
            let elements = [];
            (page.Texts || []).forEach(t => {
                let text = forceClean(t.R[0].T).trim();
                if (/^Strana/i.test(text) || text === '.' || text === '-' || text === '') return;
                elements.push({ x: Math.round(t.x * 100), y: Math.round(t.y * 100), text: text });
            });

            let boundaries = elements.filter(e => e.x > 2500 && /[-–—−]?[\d\s]+\.\d{2}/.test(e.text)).map(e => e.y).sort((a, b) => a - b);

            for (let i = 0; i < boundaries.length; i++) {
                let startY = boundaries[i];
                let endY = (i + 1 < boundaries.length) ? boundaries[i+1] : startY + 500; 
                let blockEls = elements.filter(e => e.y >= startY - 10 && e.y < endY - 10);
                let col1 = blockEls.filter(e => e.x < 500).sort((a,b) => a.y - b.y).map(e => e.text);
                let col2Raw = blockEls.filter(e => e.x >= 500 && e.x < 1200).sort((a,b) => a.y - b.y).map(e => e.text);
                let col2 = col2Raw.filter(t => !/^[\d\s\-\/]+$/.test(t) && !/ZBYNĚK|KOCIÁN/i.test(t));
                let col3Raw = blockEls.filter(e => e.x >= 1200 && e.x < 2200).sort((a,b) => a.y - b.y).map(e => e.text);
                let col3 = col3Raw.filter(t => !/^[\d\s\-\/]+$/.test(t) && !/^(VS|KS|SS):/i.test(t) && !/(PK|PC)[:\s]*[\wX]+/i.test(t) && !/Místo:|Částka:/i.test(t));

                if (col2.length > 0 && col3.length > 0 && col3[0].includes(col2[0])) col2.shift(); 
                let col4 = blockEls.filter(e => e.x >= 2200 && e.x < 2600).sort((a,b) => a.y - b.y).map(e => e.text);
                let amountEls = blockEls.filter(e => e.x >= 2500 && /[-–—−]?[\d\s]+\.\d{2}/.test(e.text)).sort((a,b) => a.y - b.y);
                
                if (amountEls.length === 0) continue;
                let val = parseFloat(amountEls[0].text.replace(/[\s\xA0a-zA-Z]/g, '').replace(/[-–—−]/, '-'));
                if (isNaN(val)) continue;

                transactions.push({
                    col1, col2, col3, col4,
                    amount: (val > 0 ? "+" : "") + val.toLocaleString('cs-CZ', {minimumFractionDigits: 2}),
                    val: val
                });
            }
        });
        res.json({ transactions });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, '0.0.0.0', () => console.log('Backend aktivní: Databázi a jednotlivé transakce lze nyní mazat.'));
