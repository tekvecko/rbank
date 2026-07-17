import React, { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';
import { BiometricAuth } from '@capacitor-community/biometric-auth';

export default function PinScreen({ onAuthenticated }) {
  const [pin, setPin] = useState('');
  
  const handleAuth = async () => {
    try {
      const result = await BiometricAuth.authenticate({ title: 'Přihlášení k rBank' });
      if (result.success) onAuthenticated();
    } catch (e) {
      console.log('Biometrie nedostupná nebo zrušena, použij PIN.');
    }
  };

  useEffect(() => { handleAuth(); }, []);

  const handleDigit = (digit) => {
    if (pin.length < 4) setPin(prev => prev + digit);
  };

  const handleBackspace = () => setPin(prev => prev.slice(0, -1));

  const checkPin = async () => {
    const { value } = await Preferences.get({ key: 'user_pin' });
    if (pin === value) onAuthenticated();
    else { setPin(''); alert('Špatný PIN'); }
  };

  return (
    <div className="fixed inset-0 bg-[#22252e] flex flex-col items-center justify-center text-white z-50">
      <h2 className="text-xl font-semibold mb-8">Zadejte S-PIN</h2>
      <div className="flex gap-4 mb-12">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`w-4 h-4 rounded-full ${pin.length > i ? 'bg-[#fcd535]' : 'bg-[#3e424c]'}`} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-6 mb-8">
        {[1,2,3,4,5,6,7,8,9].map(d => (
          <button key={d} onClick={() => handleDigit(d)} className="w-16 h-16 rounded-full bg-[#2c2f38] text-xl font-bold active:bg-[#3e424c]">{d}</button>
        ))}
        <button onClick={handleAuth} className="w-16 h-16 flex items-center justify-center text-gray-400">
           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 2.99m-2.118 3.424A13.91 13.91 0 0112 21a13.91 13.91 0 01-5.59-1.536"/></svg>
        </button>
        <button onClick={() => handleDigit(0)} className="w-16 h-16 rounded-full bg-[#2c2f38] text-xl font-bold active:bg-[#3e424c]">0</button>
        <button onClick={handleBackspace} className="w-16 h-16 flex items-center justify-center text-gray-400">⌫</button>
      </div>
      <button onClick={checkPin} className="w-48 bg-[#fcd535] text-black font-bold py-3 rounded-full">Přihlásit</button>
    </div>
  );
}
