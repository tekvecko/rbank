import React, { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';

export default function PinScreen({ onAuthenticated }) {
  const [pin, setPin] = useState('');
  const [isFirstSetup, setIsFirstSetup] = useState(false);
  const [askBiometrics, setAskBiometrics] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);

  // Inicializace stavu při načtení
  useEffect(() => {
    const init = async () => {
      const pinRes = await Preferences.get({ key: 'user_pin' });
      const bioRes = await Preferences.get({ key: 'biometric_enabled' });
      
      if (!pinRes.value) {
        setIsFirstSetup(true);
      } else {
        const bioEnabled = bioRes.value === 'true';
        setIsBiometricEnabled(bioEnabled);
        
        // Pokud má uživatel biometrii povolenou, zkusíme ji vyvolat
        if (bioEnabled) {
          triggerBiometricAuth();
        }
      }
    };
    init();
  }, []);

  const triggerBiometricAuth = async () => {
    try {
      const { registerPlugin } = await import('@capacitor/core');
      const BiometricNative = registerPlugin('BiometricNative');
      const result = await BiometricNative.authenticate();
      if (result.success) onAuthenticated();
    } catch (e) {
      console.log('Biometrie zrušena nebo selhala:', e);
    }
  };

  const handleDigit = (digit) => {
    if (pin.length < 4) setPin(prev => prev + digit);
  };

  const handleBackspace = () => setPin(prev => prev.slice(0, -1));

  const processPin = async () => {
    if (isFirstSetup) {
      // Uložení nového PINu a přechod na žádost o biometrii
      await Preferences.set({ key: 'user_pin', value: pin });
      setAskBiometrics(true);
    } else {
      // Standardní ověření
      const { value } = await Preferences.get({ key: 'user_pin' });
      if (pin === value) {
        onAuthenticated();
      } else { 
        setPin(''); 
        alert('Neplatný S-PIN'); 
      }
    }
  };

  const handleBiometricChoice = async (choice) => {
    // Uložení souhlasu/nesouhlasu
    await Preferences.set({ key: 'biometric_enabled', value: choice ? 'true' : 'false' });
    
    // Provázání s nastavením v sekci "Můj profil" (aby byl přepínač synchronizovaný)
    const settingsRes = await Preferences.get({ key: 'user_settings' });
    let settings = settingsRes.value ? JSON.parse(settingsRes.value) : { push: true, biometric: choice, darkMode: true };
    settings.biometric = choice;
    await Preferences.set({ key: 'user_settings', value: JSON.stringify(settings) });

    onAuthenticated();
  };

  // Vykreslení: Zobrazení žádosti o souhlas s biometrií
  if (askBiometrics) {
    return (
      <div className="fixed inset-0 bg-[#22252e] flex flex-col items-center justify-center text-white z-50 px-6">
        <div className="w-[72px] h-[72px] bg-[#3e424c] rounded-full flex items-center justify-center mb-8 text-[#fcd535] shadow-lg">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 2.99m-2.118 3.424A13.91 13.91 0 0112 21a13.91 13.91 0 01-5.59-1.536"/></svg>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Přihlášení otiskem</h2>
        <p className="text-gray-400 text-center text-[15px] mb-12 leading-relaxed max-w-sm">
          Chcete si usnadnit přístup k financím a pro příští přihlášení používat otisk prstu místo S-PINu?
        </p>
        <button onClick={() => handleBiometricChoice(true)} className="w-full max-w-sm bg-[#fcd535] text-black font-bold py-4 rounded-[16px] mb-4 active:bg-[#e5c02a] transition-colors">
          Ano, povolit otisk
        </button>
        <button onClick={() => handleBiometricChoice(false)} className="w-full max-w-sm bg-[#2c2f38] text-white font-bold py-4 rounded-[16px] active:bg-[#3e424c] transition-colors">
          Ne, děkuji
        </button>
      </div>
    );
  }

  // Vykreslení: Číselník
  return (
    <div className="fixed inset-0 bg-[#22252e] flex flex-col items-center justify-center text-white z-50">
      <h2 className="text-xl font-semibold mb-8">{isFirstSetup ? 'Vytvořte si nový S-PIN' : 'Zadejte S-PIN'}</h2>
      
      <div className="flex gap-4 mb-12">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`w-4 h-4 rounded-full transition-colors ${pin.length > i ? 'bg-[#fcd535]' : 'bg-[#3e424c]'}`} />
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        {[1,2,3,4,5,6,7,8,9].map(d => (
          <button key={d} onClick={() => handleDigit(d)} className="w-[68px] h-[68px] rounded-full bg-[#2c2f38] text-2xl font-semibold active:bg-[#3e424c] transition-colors">{d}</button>
        ))}
        
        {/* Pokud je biometrie zakázaná v nastavení, ikonu senzoru vůbec neukazujeme */}
        <div className="flex items-center justify-center">
          {isBiometricEnabled && !isFirstSetup ? (
            <button onClick={triggerBiometricAuth} className="w-[68px] h-[68px] flex items-center justify-center text-gray-400 active:text-[#fcd535] transition-colors">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 2.99m-2.118 3.424A13.91 13.91 0 0112 21a13.91 13.91 0 01-5.59-1.536"/></svg>
            </button>
          ) : <div className="w-[68px] h-[68px]"></div>}
        </div>
        
        <button onClick={() => handleDigit(0)} className="w-[68px] h-[68px] rounded-full bg-[#2c2f38] text-2xl font-semibold active:bg-[#3e424c] transition-colors">0</button>
        
        <button onClick={handleBackspace} className="w-[68px] h-[68px] flex items-center justify-center text-gray-400 active:text-white transition-colors">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"/></svg>
        </button>
      </div>

      <button 
        onClick={processPin} 
        disabled={pin.length !== 4}
        className={`w-56 font-bold py-[14px] rounded-[16px] transition-all duration-300 ${pin.length === 4 ? 'bg-[#fcd535] text-black shadow-[0_0_15px_rgba(252,213,53,0.3)]' : 'bg-[#2c2f38] text-gray-500'}`}
      >
        {isFirstSetup ? 'Potvrdit S-PIN' : 'Přihlásit se'}
      </button>
    </div>
  );
}
