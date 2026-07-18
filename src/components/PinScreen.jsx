import React, { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';

export default function PinScreen({ onAuthenticated }) {
  const [pin, setPin] = useState('');
  const [isFirstSetup, setIsFirstSetup] = useState(false);
  const [askBiometrics, setAskBiometrics] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);

  useEffect(() => {
    const init = async () => {
      const pinRes = await Preferences.get({ key: 'user_pin' });
      const bioRes = await Preferences.get({ key: 'biometric_enabled' });
      
      if (!pinRes.value) {
        setIsFirstSetup(true);
      } else {
        const bioEnabled = bioRes.value === 'true';
        setIsBiometricEnabled(bioEnabled);
        
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
      await Preferences.set({ key: 'user_pin', value: pin });
      setAskBiometrics(true);
    } else {
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
    await Preferences.set({ key: 'biometric_enabled', value: choice ? 'true' : 'false' });
    
    const settingsRes = await Preferences.get({ key: 'user_settings' });
    let settings = settingsRes.value ? JSON.parse(settingsRes.value) : { push: true, biometric: choice, darkMode: true };
    settings.biometric = choice;
    await Preferences.set({ key: 'user_settings', value: JSON.stringify(settings) });

    onAuthenticated();
  };

  if (askBiometrics) {
    return (
      <div className="fixed inset-0 bg-[#22252e] flex flex-col items-center justify-center text-white z-50 px-6">
        <div className="w-[72px] h-[72px] bg-[#3e424c] rounded-full flex items-center justify-center mb-8 text-[#fcd535] shadow-lg">
          {/* Ikonka pro biometrii (otisk prstu) na obrazovce souhlasu */}
          <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 2.75a9.75 9.75 0 016.748 16.591m-13.496 0A9.75 9.75 0 0110.5 2.75zm0 0v.001m0 3.749a6 6 0 014.15 10.207m-8.3 0A6 6 0 0110.5 6.5zm0 0v.001m0 3.749a2.25 2.25 0 011.556 3.827m-3.112 0A2.25 2.25 0 0110.5 10.25zm0 0v.001" />
          </svg>
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

  return (
    <div className="fixed inset-0 bg-[#22252e] flex flex-col items-center justify-center text-white z-50 overflow-hidden font-sans">
      
      {/* 3. Detail pozadí - jemný šedý přesah v rohu podle předlohy */}
      <div className="absolute top-[-70px] right-[-40px] w-[200px] h-[200px] bg-[#2c2f38] opacity-50 rotate-[35deg] rounded-3xl pointer-events-none"></div>

      {/* 2. Žluté logo Raiffeisenbank nahoře */}
      <div className="relative w-16 h-16 flex items-center justify-center mb-10 z-10">
        <svg className="absolute w-[50px] h-[50px] text-[#fcd535]" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="butt" strokeLinejoin="miter" viewBox="0 0 40 40">
          <path d="M 12 6 L 26 20 L 12 34" />
        </svg>
        <svg className="absolute w-[50px] h-[50px] text-[#fcd535]" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="butt" strokeLinejoin="miter" viewBox="0 0 40 40">
          <path d="M 28 6 L 14 20 L 28 34" />
        </svg>
      </div>

      <h2 className="text-xl font-bold mb-10 z-10 text-white tracking-wide">{isFirstSetup ? 'Vytvořte si nový S-PIN' : 'Zadejte S-PIN'}</h2>
      
      {/* Ukazatele pinu (skryté pokud je pin prázdný, nebo čistší styl) */}
      <div className="flex gap-4 mb-10 z-10 h-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`w-3.5 h-3.5 rounded-full transition-colors duration-200 ${pin.length > i ? 'bg-[#fcd535]' : 'bg-transparent border border-gray-500'}`} />
        ))}
      </div>
      
      {/* 4. Tvar a rozestupy tlačítek - číselník */}
      <div className="grid grid-cols-3 gap-x-8 gap-y-6 mb-10 z-10">
        {[1,2,3,4,5,6,7,8,9].map(d => (
          <button key={d} onClick={() => handleDigit(d)} className="w-[70px] h-[70px] rounded-full bg-[#2c2f38] text-2xl font-medium active:bg-[#3e424c] transition-colors shadow-sm">{d}</button>
        ))}
        
        <div className="flex items-center justify-center">
          {isBiometricEnabled && !isFirstSetup ? (
            <button onClick={triggerBiometricAuth} className="w-[70px] h-[70px] flex items-center justify-center text-gray-400 active:text-[#fcd535] transition-colors bg-transparent">
               {/* 1. Opravená ikona otisku prstu */}
               <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 2.75a9.75 9.75 0 016.748 16.591m-13.496 0A9.75 9.75 0 0110.5 2.75zm0 0v.001m0 3.749a6 6 0 014.15 10.207m-8.3 0A6 6 0 0110.5 6.5zm0 0v.001m0 3.749a2.25 2.25 0 011.556 3.827m-3.112 0A2.25 2.25 0 0110.5 10.25zm0 0v.001" />
               </svg>
            </button>
          ) : <div className="w-[70px] h-[70px]"></div>}
        </div>
        
        <button onClick={() => handleDigit(0)} className="w-[70px] h-[70px] rounded-full bg-[#2c2f38] text-2xl font-medium active:bg-[#3e424c] transition-colors shadow-sm">0</button>
        
        <button onClick={handleBackspace} className="w-[70px] h-[70px] flex items-center justify-center text-gray-400 active:text-white transition-colors bg-transparent">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"/></svg>
        </button>
      </div>

      <button 
        onClick={processPin} 
        disabled={pin.length !== 4}
        className={`w-full max-w-[280px] font-bold py-[14px] rounded-[14px] transition-all duration-300 z-10 ${pin.length === 4 ? 'bg-[#fcd535] text-black shadow-lg' : 'bg-[#2c2f38] text-gray-500'}`}
      >
        {isFirstSetup ? 'Potvrdit S-PIN' : 'Přihlásit se'}
      </button>
    </div>
  );
}
