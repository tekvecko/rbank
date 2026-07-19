import React, { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';

import topLogoImg from '../assets/rbpic/bio.jpg';

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
        <div className="w-[72px] h-[72px] bg-[#3e424c] rounded-full flex items-center justify-center mb-8 overflow-hidden shadow-lg">
          <svg className="w-[42px] h-[42px] text-gray-300 opacity-90" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 10.96 3.8 12 3.8c1.06 0 2.05.25 3.19.78 1.48.69 2.73 1.66 3.72 2.89.18.22.14.54-.08.72-.22.18-.54.14-.72-.08-.91-1.12-2.06-2.01-3.41-2.64-1.04-.49-1.94-.71-2.9-.71-.96 0-1.85.22-2.92.73-1.37.69-2.52 1.69-3.42 2.97-.16.22-.48.27-.7.12-.06-.03-.11-.06-.15-.1zM19.11 14.15c-.15 0-.3-.08-.38-.22-.24-.45-.45-.88-.63-1.28-.35-.78-.51-1.35-.51-1.9 0-3.09-2.51-5.6-5.6-5.6s-5.6 2.51-5.6 5.6c0 1.05.28 2.08.82 3.06.13.24.04.55-.2.68-.24.13-.55.04-.68-.2C5.64 13.1 5.3 11.93 5.3 10.75c0-3.69 3-6.7 6.7-6.7s6.7 3.01 6.7 6.7c0 .65.18 1.29.56 2.14.18.42.41.87.66 1.35.13.25.04.55-.21.68-.08.04-.16.05-.24.05zM15.42 17.58c-.14 0-.28-.05-.38-.16-.39-.41-.75-.85-1.07-1.3-.87-1.2-1.36-2.69-1.36-4.25 0-2.31 1.88-4.19 4.19-4.19.28 0 .5.22.5.5s-.22.5-.5.5c-1.76 0-3.19 1.43-3.19 3.19 0 1.34.42 2.62 1.18 3.66.29.39.6.78.93 1.13.2.2.2.52 0 .71-.11.12-.26.17-.4.17zM11.99 22c-3.1 0-5.74-1.92-6.8-4.71-.34-.91-.51-1.87-.51-2.86 0-.28.22-.5.5-.5s.5.22.5.5c0 .87.15 1.71.44 2.51.92 2.42 3.2 4.06 5.87 4.06 3.18 0 5.82-2.3 6.36-5.41.05-.27.31-.45.58-.4.27.05.45.31.4.58-.63 3.66-3.74 6.38-7.34 6.38z"/>
            <path d="M12.43 18.06c-.1 0-.2-.03-.29-.09-1.66-1.12-2.65-2.85-2.65-4.66 0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5c0 1.48.82 2.89 2.18 3.82.23.16.29.47.13.7-.09.12-.23.18-.37.18z"/>
            <path d="M15.42 20.89c-.1 0-.19-.03-.28-.08-1.56-1.04-2.51-2.73-2.51-4.5 0-1.93 1.57-3.5 3.5-3.5.28 0 .5.22.5.5s-.22.5-.5.5c-1.38 0-2.5 1.12-2.5 2.5 0 1.46.79 2.87 2.08 3.73.23.15.29.46.14.69-.09.13-.23.19-.38.19zM8.5 17.5c-.13 0-.26-.05-.35-.15-.99-1.01-1.53-2.39-1.53-3.85 0-3.31 2.69-6 6-6s6 2.69 6 6c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.76-2.24-5-5-5s-5 2.24-5 5c0 1.19.44 2.33 1.25 3.16.19.2.19.51-.01.7-.1.09-.23.14-.36.14z"/>
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
    <div className="fixed inset-0 bg-[#22252e] flex flex-col items-center pt-[50px] text-white z-50 overflow-hidden font-sans">
      
      {/* 1. OPRAVA: Inverzní křivka hlavičky (přímka, která se na konci hladce zhoupne nahoru) */}
      <div className="absolute top-0 left-0 w-full h-[120px] bg-[#2c2f38] z-0">
        <div className="absolute bottom-0 right-0 w-[100px] h-[40px] bg-[#22252e] rounded-tl-[40px]"></div>
      </div>

      {/* Horní logo */}
      <div className="w-[60px] h-[60px] mt-[5px] z-10 relative flex items-center justify-center">
        <img src={topLogoImg} alt="Logo" className="w-full h-full object-contain" />
      </div>

      {/* 2. OPRAVA: Flexibilní centrální část pro přesnější vzdušnost */}
      <div className="flex-1 w-full flex flex-col items-center justify-center z-10 relative -mt-4">
        
        <h2 className="text-[20px] font-bold mb-10 text-white tracking-wide">
          {isFirstSetup ? 'Vytvořte si nový S-PIN' : 'Zadejte S-PIN'}
        </h2>
        
        <div className="flex gap-[18px] mb-12 h-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`w-[14px] h-[14px] rounded-full transition-colors duration-200 ${pin.length > i ? 'bg-[#fcd535]' : 'bg-[#3e424c]'}`} />
          ))}
        </div>
        
        {/* 3. OPRAVA: Klávesnice bez plné výplně, pouze s průhledným pozadím a tenkou linkou */}
        <div className="grid grid-cols-3 gap-x-[26px] gap-y-[22px]">
          {[1,2,3,4,5,6,7,8,9].map(d => (
            <button key={d} onClick={() => handleDigit(d)} className="w-[74px] h-[74px] rounded-full bg-transparent border border-[#4a4f5a] text-[26px] font-normal active:bg-[#3e424c] transition-colors">{d}</button>
          ))}
          
          <div className="flex items-center justify-center">
            {isBiometricEnabled && !isFirstSetup ? (
              <button onClick={triggerBiometricAuth} className="w-[74px] h-[74px] rounded-full bg-transparent border border-[#4a4f5a] flex items-center justify-center active:bg-[#3e424c] transition-colors">
                 <svg className="w-[36px] h-[36px] text-gray-300 opacity-90" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 10.96 3.8 12 3.8c1.06 0 2.05.25 3.19.78 1.48.69 2.73 1.66 3.72 2.89.18.22.14.54-.08.72-.22.18-.54.14-.72-.08-.91-1.12-2.06-2.01-3.41-2.64-1.04-.49-1.94-.71-2.9-.71-.96 0-1.85.22-2.92.73-1.37.69-2.52 1.69-3.42 2.97-.16.22-.48.27-.7.12-.06-.03-.11-.06-.15-.1zM19.11 14.15c-.15 0-.3-.08-.38-.22-.24-.45-.45-.88-.63-1.28-.35-.78-.51-1.35-.51-1.9 0-3.09-2.51-5.6-5.6-5.6s-5.6 2.51-5.6 5.6c0 1.05.28 2.08.82 3.06.13.24.04.55-.2.68-.24.13-.55.04-.68-.2C5.64 13.1 5.3 11.93 5.3 10.75c0-3.69 3-6.7 6.7-6.7s6.7 3.01 6.7 6.7c0 .65.18 1.29.56 2.14.18.42.41.87.66 1.35.13.25.04.55-.21.68-.08.04-.16.05-.24.05zM15.42 17.58c-.14 0-.28-.05-.38-.16-.39-.41-.75-.85-1.07-1.3-.87-1.2-1.36-2.69-1.36-4.25 0-2.31 1.88-4.19 4.19-4.19.28 0 .5.22.5.5s-.22.5-.5.5c-1.76 0-3.19 1.43-3.19 3.19 0 1.34.42 2.62 1.18 3.66.29.39.6.78.93 1.13.2.2.2.52 0 .71-.11.12-.26.17-.4.17zM11.99 22c-3.1 0-5.74-1.92-6.8-4.71-.34-.91-.51-1.87-.51-2.86 0-.28.22-.5.5-.5s.5.22.5.5c0 .87.15 1.71.44 2.51.92 2.42 3.2 4.06 5.87 4.06 3.18 0 5.82-2.3 6.36-5.41.05-.27.31-.45.58-.4.27.05.45.31.4.58-.63 3.66-3.74 6.38-7.34 6.38z"/>
                   <path d="M12.43 18.06c-.1 0-.2-.03-.29-.09-1.66-1.12-2.65-2.85-2.65-4.66 0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5c0 1.48.82 2.89 2.18 3.82.23.16.29.47.13.7-.09.12-.23.18-.37.18z"/>
                   <path d="M15.42 20.89c-.1 0-.19-.03-.28-.08-1.56-1.04-2.51-2.73-2.51-4.5 0-1.93 1.57-3.5 3.5-3.5.28 0 .5.22.5.5s-.22.5-.5.5c-1.38 0-2.5 1.12-2.5 2.5 0 1.46.79 2.87 2.08 3.73.23.15.29.46.14.69-.09.13-.23.19-.38.19zM8.5 17.5c-.13 0-.26-.05-.35-.15-.99-1.01-1.53-2.39-1.53-3.85 0-3.31 2.69-6 6-6s6 2.69 6 6c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.76-2.24-5-5-5s-5 2.24-5 5c0 1.19.44 2.33 1.25 3.16.19.2.19.51-.01.7-.1.09-.23.14-.36.14z"/>
                 </svg>
              </button>
            ) : <div className="w-[74px] h-[74px]"></div>}
          </div>
          
          <button onClick={() => handleDigit(0)} className="w-[74px] h-[74px] rounded-full bg-transparent border border-[#4a4f5a] text-[26px] font-normal active:bg-[#3e424c] transition-colors">0</button>
          
          <button onClick={handleBackspace} className="w-[74px] h-[74px] flex items-center justify-center text-gray-300 active:text-white transition-colors bg-transparent border border-[#4a4f5a] rounded-full">
            <svg className="w-[30px] h-[30px]" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Spodní tlačítko přes celou šířku s odsazením */}
      <div className="w-full px-6 pb-8 z-10 relative">
        <button 
          onClick={processPin} 
          disabled={pin.length !== 4}
          className={`w-full font-medium py-[15px] rounded-[16px] transition-all duration-300 ${pin.length === 4 ? 'bg-[#fcd535] text-black shadow-lg' : 'bg-[#3e424c] text-[#a0a5b0]'}`}
        >
          {isFirstSetup ? 'Potvrdit S-PIN' : 'Přihlásit'}
        </button>
      </div>
    </div>
  );
}
