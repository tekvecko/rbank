import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clipboard } from '@capacitor/clipboard';
import { Toast } from '@capacitor/toast';
import visaImg from '../assets/rbpic/visa.png';

export default function Card() {
  const navigate = useNavigate();
  
  // Stavy pro navigaci v rámci komponenty
  const [activeScreen, setActiveScreen] = useState('main'); // main, details, pin, limits, dcc
  
  // Stavy pro data a nastavení karty
  const [isLocked, setIsLocked] = useState(false);
  const [internetPayments, setInternetPayments] = useState(true);
  const [pinTimeLeft, setPinTimeLeft] = useState(10);
  const [dccEnabled, setDccEnabled] = useState(true);
  const [limits, setLimits] = useState({ merchant: '75 000', atm: '75 000' });

  // Odpočet pro zobrazení PINu
  useEffect(() => {
    let timer;
    if (activeScreen === 'pin' && pinTimeLeft > 0) {
      timer = setInterval(() => setPinTimeLeft(prev => prev - 1), 1000);
    } else if (activeScreen === 'pin' && pinTimeLeft === 0) {
      setActiveScreen('main');
    }
    return () => clearInterval(timer);
  }, [activeScreen, pinTimeLeft]);

  const handleCopy = async (text) => {
    try {
      await Clipboard.write({ string: text });
      await Toast.show({ text: 'Zkopírováno', duration: 'short' });
    } catch (err) {
      console.error('Kopírování selhalo', err);
    }
  };

  const handleShowPin = () => {
    setPinTimeLeft(10);
    setActiveScreen('pin');
  };

  // --------------------------------------------------------
  // KOMPONENTY POD-OBRAZOVEK
  // --------------------------------------------------------

  const renderDetailsScreen = () => (
    <div className="animate-fade-in">
      <div className="bg-[#2c2f38] rounded-[20px] p-5 mb-6 shadow-lg relative overflow-hidden">
        <h3 className="text-white font-semibold mb-2">ZBYNĚK KOCIÁN</h3>
        <p className="text-gray-300 font-mono text-sm tracking-widest mb-1">4083 5900 0020 2194</p>
        <p className="text-gray-400 text-xs mb-3">VISA CLASSIC Chip</p>
        <div className="flex justify-between items-center">
          <span className="bg-emerald-500/20 text-emerald-400 text-[11px] px-2 py-1 rounded-full font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span> Aktivní
          </span>
          <div className="text-right">
            <p className="text-white font-mono text-sm tracking-wider">12/29</p>
            <p className="text-white font-bold italic text-sm">VISA</p>
          </div>
        </div>
      </div>

      <div className="bg-[#2c2f38] rounded-[20px] p-1 shadow-lg">
        <h2 className="text-[17px] font-semibold p-4 pb-2">Údaje karty</h2>
        <div className="px-4 py-3 flex justify-between border-b border-[#3e424c]">
          <span className="text-gray-400 text-sm">Číslo karty</span>
          <span className="text-white font-mono text-sm">4083 5900 0020 2194</span>
        </div>
        <div className="px-4 py-3 flex justify-between border-b border-[#3e424c]">
          <span className="text-gray-400 text-sm">Platnost</span>
          <span className="text-white font-mono text-sm">12/29</span>
        </div>
        <div className="px-4 py-3 flex justify-between border-b border-[#3e424c]">
          <span className="text-gray-400 text-sm">CVV2/CVC2</span>
          <span className="text-white font-mono text-sm">295</span>
        </div>
        <div className="px-4 py-3 flex justify-between">
          <span className="text-gray-400 text-sm">Držitel</span>
          <span className="text-white text-sm">ZBYNĚK KOCIÁN</span>
        </div>
      </div>

      <div className="mt-6">
        <button onClick={() => handleCopy('4083590000202194')} className="w-full bg-[#ffe600] text-black font-semibold py-4 rounded-[16px] active:bg-[#e6cf00] transition-colors">
          Kopírovat číslo karty
        </button>
      </div>
    </div>
  );

  const renderPinScreen = () => {
    const circleDasharray = 125.6; // 2 * PI * r (r=20)
    const circleOffset = circleDasharray - (circleDasharray * (pinTimeLeft / 10));

    return (
      <div className="animate-fade-in flex flex-col h-full">
        <div className="relative rounded-[20px] overflow-hidden mb-6 aspect-[1.58/1]">
          <img src={visaImg} alt="Karta" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="bg-[#2c2f38] rounded-[20px] p-6 shadow-lg flex-1 flex flex-col items-center justify-center">
          <p className="text-gray-400 text-sm font-medium tracking-wide mb-4 uppercase">PIN k vaší kartě je:</p>
          <p className="text-[42px] font-bold tracking-[0.2em] mb-12">0689</p>

          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90 absolute inset-0" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="20" fill="none" stroke="#3e424c" strokeWidth="4" />
              <circle cx="22" cy="22" r="20" fill="none" stroke="#10b981" strokeWidth="4" 
                strokeDasharray={circleDasharray} strokeDashoffset={circleOffset} 
                className="transition-all duration-1000 ease-linear" />
            </svg>
            <div className="text-center">
              <p className="text-[11px] text-gray-400">Zbývá</p>
              <p className="font-mono text-sm font-bold">00:{pinTimeLeft.toString().padStart(2, '0')}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button onClick={() => setActiveScreen('main')} className="w-full bg-transparent border border-[#4a4f5a] text-white font-semibold py-4 rounded-[16px] active:bg-[#3e424c] transition-colors">
            Zavřít
          </button>
        </div>
      </div>
    );
  };

  const renderLimitsScreen = () => (
    <div className="animate-fade-in">
      <div className="bg-[#0f3d4f] text-[#a5dff8] p-4 rounded-[16px] flex items-start gap-3 mb-6">
        <svg className="w-5 h-5 shrink-0 mt-0.5 text-[#2ec6ff]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
        <p className="text-sm leading-tight">Nastavte si pouze takový limit, který skutečně budete používat.</p>
      </div>

      <div className="bg-[#2c2f38] rounded-[20px] p-5 shadow-lg mb-6">
        <h2 className="text-[17px] font-semibold mb-6">Týdenní limit karty</h2>
        
        <div className="mb-8">
          <label className="block text-xs text-gray-400 mb-2">Platby u obchodníků v CZK</label>
          <input type="text" value={limits.merchant} onChange={(e) => setLimits({...limits, merchant: e.target.value})} className="w-full bg-[#22252e] border border-[#4a4f5a] rounded-[12px] p-3 text-white focus:border-[#ffe600] outline-none mb-3 font-mono" />
          <div className="flex gap-2">
            {['10 000 CZK', '20 000 CZK', '30 000 CZK'].map(v => (
              <button key={v} onClick={() => setLimits({...limits, merchant: v.replace(' CZK', '')})} className="px-3 py-1.5 bg-[#3e424c] rounded-full text-xs text-gray-300 active:bg-gray-600 transition-colors">{v}</button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-2">Výběry z bankomatů v CZK</label>
          <input type="text" value={limits.atm} onChange={(e) => setLimits({...limits, atm: e.target.value})} className="w-full bg-[#22252e] border border-[#4a4f5a] rounded-[12px] p-3 text-white focus:border-[#ffe600] outline-none mb-3 font-mono" />
          <div className="flex gap-2">
            {['5 000 CZK', '10 000 CZK', '20 000 CZK'].map(v => (
              <button key={v} onClick={() => setLimits({...limits, atm: v.replace(' CZK', '')})} className="px-3 py-1.5 bg-[#3e424c] rounded-full text-xs text-gray-300 active:bg-gray-600 transition-colors">{v}</button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={() => setActiveScreen('main')} className="w-full bg-[#3e424c] text-gray-400 font-semibold py-4 rounded-[16px]">
        Potvrdit nastavení
      </button>
    </div>
  );

  const renderDccScreen = () => (
    <div className="animate-fade-in">
      <div className="bg-[#2c2f38] rounded-[20px] p-5 shadow-lg mb-6">
        <h2 className="text-[17px] font-semibold mb-4">Výběry s převodem měny</h2>
        
        <div onClick={() => setDccEnabled(false)} className={`p-4 rounded-[12px] border mb-4 cursor-pointer transition-colors ${!dccEnabled ? 'border-[#ffe600] bg-[#ffe600]/10' : 'border-[#4a4f5a]'}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${!dccEnabled ? 'border-[#ffe600]' : 'border-gray-500'}`}>
              {!dccEnabled && <div className="w-2.5 h-2.5 bg-[#ffe600] rounded-full"></div>}
            </div>
            <div>
              <p className="font-semibold text-sm">Vypnuto</p>
              <p className="text-[11px] text-emerald-400">Doporučená varianta</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 pl-8 leading-relaxed">Pokud při výběru hotovosti v cizí měně vyberete zúčtování v CZK, blokuje bankomat transakci, aby neproběhla pro vás nevýhodným kurzem.</p>
        </div>

        <div onClick={() => setDccEnabled(true)} className={`p-4 rounded-[12px] border cursor-pointer transition-colors ${dccEnabled ? 'border-[#ffe600] bg-[#ffe600]/10' : 'border-[#4a4f5a]'}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${dccEnabled ? 'border-[#ffe600]' : 'border-gray-500'}`}>
              {dccEnabled && <div className="w-2.5 h-2.5 bg-[#ffe600] rounded-full"></div>}
            </div>
            <p className="font-semibold text-sm">Zapnuto</p>
          </div>
          <p className="text-xs text-gray-400 pl-8 leading-relaxed">Pokud při výběru hotovosti v cizí měně vyberete přepočet na CZK, dojde ke konverzi dle pravidel provozovatele bankomatu.</p>
        </div>
      </div>

      <div className="bg-[#2c2f38] rounded-[20px] p-5 shadow-lg">
        <h3 className="font-semibold text-sm mb-4">Co je důležité vědět</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3 border-b border-[#3e424c] pb-4">
            <span className="w-5 h-5 shrink-0 rounded-full border border-gray-400 text-gray-400 flex items-center justify-center text-[10px] mt-0.5">i</span>
            <p className="text-sm text-gray-200 flex-1">Co je Dynamic Currency Conversion (DCC)?</p>
            <span className="text-gray-500">›</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 shrink-0 rounded-full border border-gray-400 text-gray-400 flex items-center justify-center text-[10px] mt-0.5">i</span>
            <p className="text-sm text-gray-200 flex-1">Jak bude výběr probíhat, pokud si výběry s převodem měny (DCC) zablokuji?</p>
            <span className="text-gray-500">›</span>
          </div>
        </div>
      </div>
    </div>
  );

  // --------------------------------------------------------
  // HLAVNÍ OBRAZOVKA KARTY (Výchozí)
  // --------------------------------------------------------
  
  const renderMainScreen = () => (
    <div className="animate-fade-in">
      {/* Karta obrázek */}
      <div className="relative rounded-[20px] overflow-hidden mb-6 aspect-[1.58/1] shadow-2xl">
        <img src={visaImg} alt="Visa Karta" className="w-full h-full object-cover" />
      </div>

      {/* Rychlé akce (3 tlačítka) */}
      <div className="flex justify-between px-2 mb-8 gap-4">
        <div className="flex flex-col items-center gap-2 flex-1 cursor-pointer active:opacity-70" onClick={() => setIsLocked(!isLocked)}>
          <div className={`w-[52px] h-[52px] rounded-xl flex items-center justify-center shadow-lg transition-colors ${isLocked ? 'bg-red-500' : 'bg-[#ffe600]'}`}>
            <svg className={`w-6 h-6 ${isLocked ? 'text-white' : 'text-black'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {isLocked 
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                : <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
              }
            </svg>
          </div>
          <span className="text-xs text-center leading-tight font-medium text-gray-300">
            {isLocked ? 'Odemknout kartu' : 'Dočasně uzamknout'}
          </span>
        </div>
        
        <div className="flex flex-col items-center gap-2 flex-1 cursor-pointer active:opacity-70" onClick={() => setActiveScreen('details')}>
          <div className="w-[52px] h-[52px] bg-[#3e424c] rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
          </div>
          <span className="text-xs text-center leading-tight font-medium text-gray-300">Údaje<br/>karty</span>
        </div>
        
        <div className="flex flex-col items-center gap-2 flex-1 cursor-pointer active:opacity-70" onClick={handleShowPin}>
          <div className="w-[52px] h-[52px] bg-[#ffe600] rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
          </div>
          <span className="text-xs text-center leading-tight font-medium text-gray-300">PIN<br/>karty</span>
        </div>
      </div>

      {/* Menu Placení */}
      <div className="bg-[#2c2f38] rounded-[24px] p-2 shadow-lg mb-8">
        <h3 className="text-lg font-bold px-4 pt-4 mb-4">Placení</h3>
        
        <div className="flex justify-between items-center px-4 py-4 border-b border-[#3e424c]">
          <span className="text-[15px]">Platby na internetu</span>
          <div onClick={() => setInternetPayments(!internetPayments)} className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${internetPayments ? 'bg-[#ffe600]' : 'bg-[#4a4f5a]'}`}>
            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${internetPayments ? 'translate-x-6 bg-black' : ''}`}></div>
          </div>
        </div>

        <div className="flex justify-between items-center px-4 py-4 border-b border-[#3e424c] active:bg-[#3e424c] transition-colors cursor-pointer">
          <span className="text-[15px]">Digitálně uložená karta</span>
          <span className="text-[#ffe600] font-bold text-xl">›</span>
        </div>

        <div onClick={() => setActiveScreen('limits')} className="flex justify-between items-center px-4 py-4 border-b border-[#3e424c] active:bg-[#3e424c] transition-colors cursor-pointer">
          <span className="text-[15px]">Limity karty</span>
          <span className="text-[#ffe600] font-bold text-xl">›</span>
        </div>

        <div onClick={() => setActiveScreen('dcc')} className="flex justify-between items-center px-4 py-4 active:bg-[#3e424c] transition-colors cursor-pointer">
          <span className="text-[15px]">Výběry s převodem měny<br/><span className="text-xs text-gray-400">(DCC)</span></span>
          <div className="flex items-center gap-3">
            {dccEnabled ? (
              <span className="bg-[#c2410c]/20 text-[#f97316] text-[11px] px-2 py-1 rounded-full font-bold">! Povoleno</span>
            ) : (
              <span className="bg-emerald-500/20 text-emerald-400 text-[11px] px-2 py-1 rounded-full font-bold">Zakázáno</span>
            )}
            <span className="text-[#ffe600] font-bold text-xl">›</span>
          </div>
        </div>
      </div>
    </div>
  );

  // --------------------------------------------------------
  // HLAVNÍ RENDER
  // --------------------------------------------------------

  const getScreenTitle = () => {
    switch(activeScreen) {
      case 'details': return 'Údaje karty';
      case 'pin': return 'Zobrazení PINu';
      case 'limits': return 'Změna limitů';
      case 'dcc': return 'Výběry v zahraničí';
      default: return 'Debetní karta';
    }
  };

  return (
    <div className="min-h-screen bg-[#22252e] text-white font-sans flex flex-col pb-8">
      
      {/* Hlavička s dynamickým názvem a tlačítkem zpět */}
      <header className="flex items-center p-4 pt-8 relative mb-2">
        <button 
          onClick={() => activeScreen === 'main' ? navigate(-1) : setActiveScreen('main')} 
          className="text-[#ffe600] p-2 -ml-2 active:bg-[#2c2f38] rounded-full absolute left-4 z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold w-full text-center tracking-wide">{getScreenTitle()}</h1>
      </header>

      <main className="flex-1 px-4 overflow-y-auto">
        {activeScreen === 'main' && renderMainScreen()}
        {activeScreen === 'details' && renderDetailsScreen()}
        {activeScreen === 'pin' && renderPinScreen()}
        {activeScreen === 'limits' && renderLimitsScreen()}
        {activeScreen === 'dcc' && renderDccScreen()}
      </main>

    </div>
  );
}
