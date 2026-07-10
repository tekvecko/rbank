import fs from 'fs';

const settingsPath = 'android/settings.gradle';
const buildPath = 'android/app/build.gradle';

try {
    // 1. Vyčištění settings.gradle (zde je bezpečné mazat celé řádky)
    if (fs.existsSync(settingsPath)) {
        let settings = fs.readFileSync(settingsPath, 'utf8');
        settings = settings.split('\n')
            .filter(line => !line.includes('capacitor-cordova-android-plugins'))
            .join('\n');
        fs.writeFileSync(settingsPath, settings);
        console.log('✅ settings.gradle úspěšně zbaven Cordova závislostí.');
    }

    // 2. Vyčištění app/build.gradle (zde musíme zachovat validní flatDir block)
    if (fs.existsSync(buildPath)) {
        let build = fs.readFileSync(buildPath, 'utf8');
        
        // Citlivá náhrada konfigurace repozitáře (odstraní cordova cestu, zachová 'libs')
        build = build.replace(
            "dirs '../capacitor-cordova-android-plugins/src/main/libs', 'libs'", 
            "dirs 'libs'"
        );
        
        // Odstranění přímé implementace modulu (to smazat můžeme)
        build = build.split('\n')
            .filter(line => !line.match(/implementation project\(['"]:capacitor-cordova-android-plugins['"]\)/))
            .join('\n');
            
        fs.writeFileSync(buildPath, build);
        console.log('✅ app/build.gradle úspěšně zbaven Cordova závislostí a flatDir opraven.');
    }
} catch (error) {
    console.error('❌ Chyba při čištění Gradle souborů:', error);
    process.exit(1);
}
