import fs from 'fs';

const settingsPath = 'android/settings.gradle';
const buildPath = 'android/app/build.gradle';

try {
    // 1. Vyčištění settings.gradle
    if (fs.existsSync(settingsPath)) {
        let settings = fs.readFileSync(settingsPath, 'utf8');
        settings = settings.split('\n')
            .filter(line => !line.includes('capacitor-cordova-android-plugins'))
            .join('\n');
        fs.writeFileSync(settingsPath, settings);
        console.log('✅ settings.gradle úspěšně zbaven Cordova závislostí.');
    }

    // 2. Vyčištění app/build.gradle
    if (fs.existsSync(buildPath)) {
        let build = fs.readFileSync(buildPath, 'utf8');
        build = build.split('\n')
            .filter(line => !line.includes('capacitor-cordova-android-plugins'))
            .join('\n');
        fs.writeFileSync(buildPath, build);
        console.log('✅ app/build.gradle úspěšně zbaven Cordova závislostí.');
    }
} catch (error) {
    console.error('❌ Chyba při čištění Gradle souborů:', error);
    process.exit(1);
}
