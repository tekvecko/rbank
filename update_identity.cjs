const fs = require('fs');

// --- KONFIGURACE (Tyto hodnoty si můžeš upravit) ---
const NEW_APP_NAME = "Raiffeisenbank";
const NEW_APP_ID = "cz.raiffeisenbank.app"; // Unikátní podpis aplikace (bez mezer a diakritiky)
const NEW_VERSION_NAME = "1.1.0";  // Verze viditelná pro uživatele
const NEW_VERSION_CODE = 2;        // Interní číslo buildu (musí se zvyšovat s každou aktualizací)
const NEW_AUTHOR = "raiffeisenbank"; // Autor / Tým
// ---------------------------------------------------

console.log('Zahajuji bezpečnou úpravu identity aplikace...');

function updateJson(filePath, updater) {
    if (!fs.existsSync(filePath)) {
        return console.log(`[!] Přeskočeno: Soubor ${filePath} nenalezen.`);
    }
    fs.copyFileSync(filePath, filePath + '.bak');
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    updater(data);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
    console.log(`[v] Aktualizován: ${filePath}`);
}

function updateText(filePath, replacements) {
    if (!fs.existsSync(filePath)) {
        return console.log(`[!] Přeskočeno: Soubor ${filePath} nenalezen.`);
    }
    fs.copyFileSync(filePath, filePath + '.bak');
    let data = fs.readFileSync(filePath, 'utf8');
    replacements.forEach(r => {
        data = data.replace(r.regex, r.replace);
    });
    fs.writeFileSync(filePath, data);
    console.log(`[v] Aktualizován: ${filePath}`);
}

// 1. capacitor.config.json
updateJson('capacitor.config.json', (data) => {
    data.appName = NEW_APP_NAME;
    data.appId = NEW_APP_ID;
});

// 2. package.json
updateJson('package.json', (data) => {
    data.name = NEW_APP_NAME.toLowerCase().replace(/\s+/g, '-');
    data.version = NEW_VERSION_NAME;
    data.author = NEW_AUTHOR;
});

// 3. Android strings.xml (Viditelné jméno v OS Android)
updateText('android/app/src/main/res/values/strings.xml', [
    { regex: /<string name="app_name">.*?<\/string>/, replace: `<string name="app_name">${NEW_APP_NAME}</string>` },
    { regex: /<string name="title_activity_main">.*?<\/string>/, replace: `<string name="title_activity_main">${NEW_APP_NAME}</string>` }
]);

// 4. Android build.gradle (Podpis, verze a identifikace)
updateText('android/app/build.gradle', [
    { regex: /applicationId\s+".*?"/, replace: `applicationId "${NEW_APP_ID}"` },
    { regex: /versionCode\s+\d+/, replace: `versionCode ${NEW_VERSION_CODE}` },
    { regex: /versionName\s+".*?"/, replace: `versionName "${NEW_VERSION_NAME}"` }
]);

console.log('\n=== Hotovo ===');
console.log('Nyní můžeš změny odeslat na GitHub (git commit & push), což automaticky spustí sestavení nové verze.');
