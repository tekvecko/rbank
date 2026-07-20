import React, { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';

import logoLoadImg from '../assets/rbpic/logo-load.jpg';
import bioImg from '../assets/rbpic/bio.jpg';

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
          {/* Aplikace mix-blend-screen pro odstranění černého pozadí i na nastavovací obrazovce */}
          <img src={bioImg} alt="Biometrie" className="w-full h-full object-cover mix-blend-screen" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Přihlášení otiskem</h2>
        <p className="text-gray-400 text-center text-[15px] mb-12 leading-relaxed max-w-sm">
          Chcete si usnadnit přístup k financím a pro příští přihlášení používat otisk prstu místo S-PINu?
        </p>
        <button onClick={() => handleBiometricChoice(true)} className="w-full max-w-sm bg-[#ffe600] text-black font-bold py-4 rounded-[16px] mb-4 active:bg-[#e6cf00] transition-colors">
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
      
      <div className="absolute top-0 left-0 w-full h-[120px] bg-[#2c2f38] z-0 rounded-br-[80px]"></div>

      <div className="w-[60px] h-[60px] mt-[5px] z-10 relative flex items-center justify-center overflow-hidden">
        <img src={logoLoadImg} alt="Logo" className="w-full h-full object-contain" />
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center z-10 relative -mt-4">
        
        <h2 className="text-[20px] font-bold mb-10 text-white tracking-wide">
          {isFirstSetup ? 'Vytvořte si nový S-PIN' : 'Zadejte S-PIN'}
        </h2>
        
        <div className="flex gap-[18px] mb-12 h-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`w-[14px] h-[14px] rounded-full transition-colors duration-200 ${pin.length > i ? 'bg-[#ffe600]' : 'bg-[#3e424c]'}`} />
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-x-[26px] gap-y-[22px]">
          {[1,2,3,4,5,6,7,8,9].map(d => (
            <button key={d} onClick={() => handleDigit(d)} className="w-[74px] h-[74px] rounded-full bg-transparent border border-[#4a4f5a] text-[26px] font-normal active:bg-[#3e424c] transition-colors">{d}</button>
          ))}
          
          <div className="flex items-center justify-center">
            {isBiometricEnabled && !isFirstSetup ? (
              <button onClick={triggerBiometricAuth} className="w-[74px] h-[74px] rounded-full bg-transparent border border-[#4a4f5a] flex items-center justify-center active:bg-[#3e424c] transition-colors overflow-hidden">
                 {/* ZDE JE OPRAVA: Třída mix-blend-screen vymaže černé pozadí a zachová jen samotný otisk */}
                 <img src={bioImg} alt="Otisk prstu" className="w-[44px] h-[44px] object-contain mix-blend-screen opacity-90" />
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

      <div className="w-full px-6 pb-8 z-10 relative">
        <button 
          onClick={processPin} 
          disabled={pin.length !== 4}
          className={`w-full font-medium py-[15px] rounded-[16px] transition-all duration-300 ${pin.length === 4 ? 'bg-[#ffe600] text-black shadow-lg' : 'bg-[#3e424c] text-[#a0a5b0]'}`}
        >
          {isFirstSetup ? 'Potvrdit S-PIN' : 'Přihlásit'}
        </button>
      </div>
    </div>
  );
}
