import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

// ==========================================
// PŮVODNÍ KOMPONENTY (UPRAVENÉ IKONY A ODKAZY)
// ==========================================

export function Offers() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#22252e] text-white pb-24 font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 border-b border-[#2c2f38] pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] mr-4 p-2 active:bg-[#2c2f38] rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold">Nabídky pro vás</h1>
      </header>
      <main className="flex-1 px-4 mt-6 space-y-4">
        <div className="bg-[#2c2f38] rounded-[24px] p-5 shadow-lg border border-[#3e424c]">
          <div className="w-10 h-10 bg-[#fcd535] rounded-xl flex items-center justify-center text-black mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h2 className="font-semibold text-[17px] mb-1">Cestovní pojištění</h2>
          <p className="text-[13px] text-gray-400 mb-4">Sjednejte si pojištění do zahraničí na pár kliknutí s 20% slevou.</p>
          <button onClick={() => navigate('/travel-insurance')} className="text-[#fcd535] font-semibold text-[15px] active:opacity-70">Spočítat cenu ›</button>
        </div>
        <div className="bg-[#2c2f38] rounded-[24px] p-5 shadow-lg border border-[#3e424c]">
          <div className="w-10 h-10 bg-[#3b82f6] rounded-xl flex items-center justify-center text-white mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h2 className="font-semibold text-[17px] mb-1">Minutová půjčka</h2>
          <p className="text-[13px] text-gray-400 mb-4">Máme pro vás předschváleno až 150 000 CZK s úrokem od 4,9 % p.a.</p>
          <button onClick={() => navigate('/minute-loan')} className="text-[#3b82f6] font-semibold text-[15px] active:opacity-70">Zobrazit nabídku ›</button>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

export function InfoZone() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#22252e] text-white pb-24 font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 border-b border-[#2c2f38] pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] mr-4 p-2 active:bg-[#2c2f38] rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold">InfoZóna</h1>
      </header>
      <main className="flex-1 px-4 mt-6 space-y-3">
        <button onClick={() => navigate('/system-outage')} className="w-full bg-[#2c2f38] rounded-[20px] p-4 flex gap-4 items-start relative text-left active:bg-[#3e424c] transition-colors">
          <div className="w-2 h-2 bg-[#3b82f6] rounded-full mt-1.5 absolute right-4"></div>
          <div className="w-10 h-10 bg-[#3e424c] rounded-full flex items-center justify-center shrink-0 text-[#fcd535]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <div>
            <h3 className="text-[15px] font-semibold mb-1 pr-4">Odstávka systémů</h3>
            <p className="text-[13px] text-gray-400">Tento víkend proběhne plánovaná údržba. Platby kartou nebudou omezeny.</p>
          </div>
        </button>
        <div className="bg-[#2c2f38] rounded-[20px] p-4 flex gap-4 items-start opacity-70">
          <div className="w-10 h-10 bg-[#3e424c] rounded-full flex items-center justify-center shrink-0 text-gray-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          </div>
          <div>
            <h3 className="text-[15px] font-semibold mb-1">Nová verze aplikace</h3>
            <p className="text-[13px] text-gray-400">Přidali jsme tmavý režim a vylepšili historii plateb.</p>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

export function Menu() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#22252e] text-white pb-24 font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 border-b border-[#2c2f38] pb-4">
        <h1 className="text-[22px] font-bold">Další služby</h1>
      </header>
      <main className="flex-1 px-4 mt-6 space-y-3">
        <button onClick={() => navigate('/exchange-rates')} className="w-full bg-[#2c2f38] rounded-[20px] p-5 flex items-center gap-4 active:bg-[#3e424c] transition-colors text-left">
          <svg className="w-6 h-6 text-[#4ade80]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
          <span className="text-[15px] font-medium flex-1">Kurzovní lístek</span>
          <span className="text-gray-500">›</span>
        </button>
        <button onClick={() => navigate('/branches')} className="w-full bg-[#2c2f38] rounded-[20px] p-5 flex items-center gap-4 active:bg-[#3e424c] transition-colors text-left">
          <svg className="w-6 h-6 text-[#9ca3af]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          <span className="text-[15px] font-medium flex-1">Pobočky a bankomaty</span>
          <span className="text-gray-500">›</span>
        </button>
        <button onClick={() => navigate('/settings')} className="w-full bg-[#2c2f38] rounded-[20px] p-5 flex items-center gap-4 active:bg-[#3e424c] transition-colors text-left">
          <svg className="w-6 h-6 text-[#60a5fa]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span className="text-[15px] font-medium flex-1">Nastavení aplikace</span>
          <span className="text-gray-500">›</span>
        </button>
        <button onClick={() => navigate('/support')} className="w-full bg-[#2c2f38] rounded-[20px] p-5 flex items-center gap-4 active:bg-[#3e424c] transition-colors text-left">
          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-[15px] font-medium flex-1">Nápověda a podpora</span>
          <span className="text-gray-500">›</span>
        </button>
      </main>
      <BottomNav />
    </div>
  );
}

export function Profile() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#22252e] text-white font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 border-b border-[#2c2f38] pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] mr-4 p-2 active:bg-[#2c2f38] rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold">Můj profil</h1>
      </header>
      <main className="flex-1 px-4 mt-8 flex flex-col items-center">
        <img src="/logo.webp" alt="Avatar" className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-[#2c2f38] mb-4" />
        <h2 className="text-2xl font-bold mb-1">Zbyněk Kocián</h2>
        <p className="text-gray-400 text-[15px] mb-8">zbynek.kocian@example.com</p>

        <div className="w-full bg-[#2c2f38] rounded-[24px] p-2 mb-6">
          <div className="p-4 border-b border-gray-700 flex justify-between">
            <span className="text-gray-400">Telefon</span><span className="font-medium">+420 777 000 000</span>
          </div>
          <div className="p-4 flex justify-between">
            <span className="text-gray-400">Trvalé bydliště</span><span className="font-medium">Slavkov u Brna</span>
          </div>
        </div>

        <button className="w-full border border-red-500/50 text-red-400 font-semibold py-4 rounded-xl active:bg-red-500/10 transition-colors">
          Odhlásit se
        </button>
      </main>
    </div>
  );
}

// ==========================================
// NOVÉ MOCK KOMPONENTY PRO PROTOTYP
// ==========================================

export function TravelInsurance() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#22252e] text-white pb-24 font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 border-b border-[#2c2f38] pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] mr-4 p-2 active:bg-[#2c2f38] rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold">Cestovní pojištění</h1>
      </header>
      <main className="flex-1 px-4 mt-6">
        <div className="bg-[#2c2f38] rounded-[24px] p-5 shadow-lg border border-[#3e424c] mb-4">
          <h2 className="text-lg font-bold mb-2">Aktivní krytí</h2>
          <p className="text-gray-400 text-sm mb-4">Evropa a okolní státy, platnost do 31. 12. 2026.</p>
          <div className="bg-[#22252e] rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-400 mb-1">Pojištěné osoby:</p>
            <p className="font-medium">Zbyněk, Marcela</p>
          </div>
          <button className="w-full bg-[#fcd535] text-black font-semibold py-3 rounded-xl active:bg-yellow-500 transition-colors">Zobrazit asistenční kartu</button>
        </div>
      </main>
    </div>
  );
}

export function MinuteLoan() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#22252e] text-white pb-24 font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 border-b border-[#2c2f38] pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] mr-4 p-2 active:bg-[#2c2f38] rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold">Minutová půjčka</h1>
      </header>
      <main className="flex-1 px-4 mt-6">
        <div className="bg-gradient-to-b from-[#2c2f38] to-[#22252e] rounded-[24px] p-6 shadow-lg border border-[#3b82f6]/30 text-center">
          <h2 className="text-gray-400 text-sm font-medium mb-2">Předschválený limit</h2>
          <div className="text-[40px] font-bold text-white mb-6 tracking-tight">150 000 <span className="text-xl">CZK</span></div>
          <ul className="text-left space-y-3 mb-8">
            <li className="flex items-center gap-3 text-sm"><svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Peníze na účtu do 3 minut</li>
            <li className="flex items-center gap-3 text-sm"><svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Bez poplatků za sjednání</li>
            <li className="flex items-center gap-3 text-sm"><svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Úrok pouze 4,9 % p.a.</li>
          </ul>
          <button className="w-full bg-[#3b82f6] text-white font-semibold py-4 rounded-xl active:bg-blue-600 transition-colors">Pokračovat k žádosti</button>
        </div>
      </main>
    </div>
  );
}

export function SystemOutage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#22252e] text-white pb-24 font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 border-b border-[#2c2f38] pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] mr-4 p-2 active:bg-[#2c2f38] rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold">Detail odstávky</h1>
      </header>
      <main className="flex-1 px-4 mt-6">
        <div className="bg-[#2c2f38] rounded-[24px] p-5 shadow-lg border-l-4 border-[#fcd535]">
          <h2 className="text-lg font-bold mb-3">Plánovaná údržba systémů</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Vážený kliente, z důvodu vylepšování našich bankovních služeb proběhne o víkendu plánovaná technická odstávka.
          </p>
          <div className="bg-[#22252e] p-3 rounded-xl text-sm space-y-2">
            <div className="flex justify-between"><span className="text-gray-400">Začátek:</span><span>So 18. 7. 2026, 23:00</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Konec:</span><span>Ne 19. 7. 2026, 04:00</span></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export function ExchangeRates() {
  const navigate = useNavigate();
  const rates = [
    { curr: 'EUR', flag: '🇪🇺', buy: '24.95', sell: '25.65' },
    { curr: 'USD', flag: '🇺🇸', buy: '22.80', sell: '23.50' },
    { curr: 'GBP', flag: '🇬🇧', buy: '29.10', sell: '29.90' },
  ];
  return (
    <div className="min-h-screen bg-[#22252e] text-white pb-24 font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 border-b border-[#2c2f38] pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] mr-4 p-2 active:bg-[#2c2f38] rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold">Kurzovní lístek</h1>
      </header>
      <main className="flex-1 px-4 mt-6">
        <div className="bg-[#2c2f38] rounded-[24px] overflow-hidden shadow-lg">
          <div className="grid grid-cols-3 p-4 border-b border-gray-700 text-xs text-gray-400 uppercase tracking-wider font-semibold">
            <div>Měna</div>
            <div className="text-right">Nákup</div>
            <div className="text-right">Prodej</div>
          </div>
          {rates.map(r => (
            <div key={r.curr} className="grid grid-cols-3 p-4 border-b border-gray-700/50 last:border-0 items-center">
              <div className="flex items-center gap-2 font-medium"><span className="text-lg">{r.flag}</span> {r.curr}</div>
              <div className="text-right font-mono">{r.buy}</div>
              <div className="text-right font-mono">{r.sell}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export function BranchesATMs() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#22252e] text-white pb-24 font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 border-b border-[#2c2f38] pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] mr-4 p-2 active:bg-[#2c2f38] rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold">Nejbližší pobočky</h1>
      </header>
      <main className="flex-1 px-4 mt-6">
        <div className="bg-[#2c2f38] rounded-[24px] p-5 shadow-lg relative overflow-hidden mb-4">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#3e424c] rounded-bl-full opacity-50"></div>
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <h2 className="text-lg font-bold">Slavkov u Brna</h2>
          </div>
          <p className="text-sm text-gray-400 mb-4 ml-8">Palackého náměstí 77<br />Otevřeno do 17:00</p>
          <div className="flex gap-2">
            <button className="flex-1 bg-[#3e424c] text-white text-sm font-semibold py-2 rounded-xl">Navigovat</button>
            <button className="flex-1 border border-gray-600 text-white text-sm font-semibold py-2 rounded-xl">Detaily</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export function AppSettings() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#22252e] text-white pb-24 font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 border-b border-[#2c2f38] pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] mr-4 p-2 active:bg-[#2c2f38] rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold">Nastavení</h1>
      </header>
      <main className="flex-1 px-4 mt-6 space-y-3">
        <div className="bg-[#2c2f38] rounded-[20px] p-5 flex justify-between items-center">
          <span className="text-[15px] font-medium">Push notifikace</span>
          <div className="w-12 h-6 bg-[#3b82f6] rounded-full relative"><div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div></div>
        </div>
        <div className="bg-[#2c2f38] rounded-[20px] p-5 flex justify-between items-center">
          <span className="text-[15px] font-medium">Přihlášení otiskem prstu</span>
          <div className="w-12 h-6 bg-[#3b82f6] rounded-full relative"><div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div></div>
        </div>
        <div className="bg-[#2c2f38] rounded-[20px] p-5 flex justify-between items-center">
          <span className="text-[15px] font-medium">Tmavý režim (Vynucený)</span>
          <div className="w-12 h-6 bg-[#3b82f6] rounded-full relative opacity-50"><div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div></div>
        </div>
      </main>
    </div>
  );
}

export function Support() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#22252e] text-white pb-24 font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 border-b border-[#2c2f38] pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] mr-4 p-2 active:bg-[#2c2f38] rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold">Podpora</h1>
      </header>
      <main className="flex-1 px-4 mt-6">
        <div className="bg-[#2c2f38] rounded-[24px] p-6 text-center shadow-lg border border-[#3e424c] mb-6">
          <div className="w-16 h-16 bg-[#3e424c] rounded-full flex items-center justify-center mx-auto mb-4 text-blue-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Potřebujete poradit?</h2>
          <p className="text-gray-400 text-sm mb-6">Jsme tu pro vás 24 hodin denně, 7 dní v týdnu.</p>
          <button className="w-full bg-[#fcd535] text-black font-semibold py-4 rounded-xl active:bg-yellow-500 transition-colors text-lg">Zavolat rBank</button>
        </div>
      </main>
    </div>
  );
}
