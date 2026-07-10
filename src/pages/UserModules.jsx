import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

export function Offers() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#22252e] text-white pb-24 font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 border-b border-[#2c2f38] pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] mr-4 p-2 active:bg-[#2c2f38] rounded-full"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button>
        <h1 className="text-[17px] font-semibold">Nabídky pro vás</h1>
      </header>
      <main className="flex-1 px-4 mt-6 space-y-4">
        <div className="bg-[#2c2f38] rounded-[24px] p-5 shadow-lg border border-[#3e424c]">
          <div className="w-10 h-10 bg-[#fcd535] rounded-xl flex items-center justify-center text-black mb-4">🚗</div>
          <h2 className="font-semibold text-[17px] mb-1">Cestovní pojištění</h2>
          <p className="text-[13px] text-gray-400 mb-4">Sjednejte si pojištění do zahraničí na pár kliknutí s 20% slevou.</p>
          <button className="text-[#fcd535] font-semibold text-[15px]">Spočítat cenu ›</button>
        </div>
        <div className="bg-[#2c2f38] rounded-[24px] p-5 shadow-lg border border-[#3e424c]">
          <div className="w-10 h-10 bg-[#3b82f6] rounded-xl flex items-center justify-center text-white mb-4">💸</div>
          <h2 className="font-semibold text-[17px] mb-1">Minutová půjčka</h2>
          <p className="text-[13px] text-gray-400 mb-4">Máme pro vás předschváleno až 150 000 CZK s úrokem od 4,9 % p.a.</p>
          <button className="text-[#3b82f6] font-semibold text-[15px]">Zobrazit nabídku ›</button>
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
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] mr-4 p-2 active:bg-[#2c2f38] rounded-full"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button>
        <h1 className="text-[17px] font-semibold">InfoZóna</h1>
      </header>
      <main className="flex-1 px-4 mt-6 space-y-3">
        <div className="bg-[#2c2f38] rounded-[20px] p-4 flex gap-4 items-start relative">
          <div className="w-2 h-2 bg-[#3b82f6] rounded-full mt-1.5 absolute right-4"></div>
          <div className="w-10 h-10 bg-[#3e424c] rounded-full flex items-center justify-center shrink-0">⚠️</div>
          <div>
            <h3 className="text-[15px] font-semibold mb-1 pr-4">Odstávka systémů</h3>
            <p className="text-[13px] text-gray-400">Tento víkend proběhne plánovaná údržba. Platby kartou nebudou omezeny.</p>
          </div>
        </div>
        <div className="bg-[#2c2f38] rounded-[20px] p-4 flex gap-4 items-start opacity-70">
          <div className="w-10 h-10 bg-[#3e424c] rounded-full flex items-center justify-center shrink-0">📱</div>
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
        <button className="w-full bg-[#2c2f38] rounded-[20px] p-5 flex items-center gap-4 active:bg-[#3e424c] transition-colors text-left">
          <span className="text-xl">💱</span><span className="text-[15px] font-medium flex-1">Kurzovní lístek</span><span className="text-gray-500">›</span>
        </button>
        <button className="w-full bg-[#2c2f38] rounded-[20px] p-5 flex items-center gap-4 active:bg-[#3e424c] transition-colors text-left">
          <span className="text-xl">🏦</span><span className="text-[15px] font-medium flex-1">Pobočky a bankomaty</span><span className="text-gray-500">›</span>
        </button>
        <button className="w-full bg-[#2c2f38] rounded-[20px] p-5 flex items-center gap-4 active:bg-[#3e424c] transition-colors text-left">
          <span className="text-xl">⚙️</span><span className="text-[15px] font-medium flex-1">Nastavení aplikace</span><span className="text-gray-500">›</span>
        </button>
        <button className="w-full bg-[#2c2f38] rounded-[20px] p-5 flex items-center gap-4 active:bg-[#3e424c] transition-colors text-left">
          <span className="text-xl">❓</span><span className="text-[15px] font-medium flex-1">Nápověda a podpora</span><span className="text-gray-500">›</span>
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
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] mr-4 p-2 active:bg-[#2c2f38] rounded-full"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button>
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
