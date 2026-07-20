import React, { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';

// Podle původního zadání: bio = logo, logo-load = otisk
import topLogoImg from '../assets/rbpic/bio.jpg';
import fingerprintImg from '../assets/rbpic/logo-load.jpg';

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
          <img src={fingerprintImg} alt="Biometrie" className="w-full h-full object-cover" />
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
    <div className="fixed inset-0 bg-[#22252e] flex flex-col items-center justify-start pt-[60px] text-white z-50 overflow-hidden font-sans">
      
      {/* Vylepšený tvar panelu s přesnými proporcemi řezu */}
      <div className="absolute top-0 left-0 w-full h-[185px] bg-[#2c2f38] overflow-hidden z-0">
        <div className="absolute -bottom-[80px] -right-[50px] w-[180px] h-[180px] bg-[#22252e] rotate-[26deg] rounded-tl-[35px]"></div>
      </div>

      {/* Žluté logo v hlavičce */}
      <div className="w-[60px] h-[60px] mt-[10px] z-10 flex items-center justify-center">
        <img src={topLogoImg} alt="Logo" className="w-full h-full object-contain" />
      </div>

      {/* Vzdušnější odsazení podle předlohy */}
      <h2 className="text-[20px] font-bold mt-[75px] mb-[45px] z-10 text-white tracking-wide">
        {isFirstSetup ? 'Vytvořte si nový S-PIN' : 'Zadejte S-PIN'}
      </h2>
      
      {/* Indikátory pinu */}
      <div className="flex gap-[18px] mb-14 z-10 h-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`w-[14px] h-[14px] rounded-full transition-colors duration-200 ${pin.length > i ? 'bg-[#fcd535]' : 'bg-[#3e424c]'}`} />
        ))}
      </div>
      
      {/* Číselník */}
      <div className="grid grid-cols-3 gap-x-[26px] gap-y-[22px] mb-12 z-10">
        {[1,2,3,4,5,6,7,8,9].map(d => (
          <button key={d} onClick={() => handleDigit(d)} className="w-[74px] h-[74px] rounded-full bg-[#2c2f38] text-[26px] font-normal active:bg-[#3e424c] transition-colors">{d}</button>
        ))}
        
        {/* Tlačítko otisku prstu přesně v tmavém kruhu */}
        <div className="flex items-center justify-center">
          {isBiometricEnabled && !isFirstSetup ? (
            <button onClick={triggerBiometricAuth} className="w-[74px] h-[74px] rounded-full bg-[#2c2f38] flex items-center justify-center active:bg-[#3e424c] transition-colors shadow-sm">
               <img src={fingerprintImg} alt="Otisk prstu" className="w-[42px] h-[42px] object-contain" />
            </button>
          ) : <div className="w-[74px] h-[74px]"></div>}
        </div>
        
        <button onClick={() => handleDigit(0)} className="w-[74px] h-[74px] rounded-full bg-[#2c2f38] text-[26px] font-normal active:bg-[#3e424c] transition-colors">0</button>
        
        <button onClick={handleBackspace} className="w-[74px] h-[74px] flex items-center justify-center text-gray-300 active:text-white transition-colors bg-transparent">
          <svg className="w-[34px] h-[34px]" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"/>
          </svg>
        </button>
      </div>

      {/* Tlačítko s opraveným nápisem a barvou */}
      <button 
        onClick={processPin} 
        disabled={pin.length !== 4}
        className={`w-full max-w-[280px] font-medium py-[15px] rounded-[16px] transition-all duration-300 z-10 ${pin.length === 4 ? 'bg-[#fcd535] text-black shadow-lg' : 'bg-[#3e424c] text-[#a0a5b0]'}`}
      >
        {isFirstSetup ? 'Potvrdit S-PIN' : 'Přihlásit'}
      </button>
    </div>
  );
}
