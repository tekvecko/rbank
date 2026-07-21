import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { Clipboard } from '@capacitor/clipboard';
import { Toast } from '@capacitor/toast';
import visaImg from '../assets/rbpic/visa.png';

export default function Dashboard() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://opravyslavkov.shop/api/balance', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa('rbank:TajneHeslo2026'),
        'Accept': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP chyba: ${res.status}`);
        return res.json();
      })
      .then(data => setBalance(data.balance))
      .catch(err => console.error("Chyba načítání zůstatku:", err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleCopy = async (text) => {
    try {
      await Clipboard.write({ string: text });
      await Toast.show({ text: `Zkopírováno: ${text}`, duration: 'short', position: 'bottom' });
    } catch (err) {
      console.error('Kopírování selhalo', err);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#ffe600] flex items-center justify-center z-[9999]">
        <div className="w-10 h-10 border-[3px] border-black/10 border-t-[#f3f4f6] rounded-full animate-spin drop-shadow-sm"></div>
      </div>
    );
  }

  const formattedBalance = balance !== null
    ? new Intl.NumberFormat('cs-CZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(balance)
    : '...';

  return (
    <div className="min-h-screen bg-[#22252e] text-white pb-24 font-sans">
      <header className="flex items-center justify-between p-4 pt-8 mb-6">
        <div className="flex items-center gap-4">
          <img src="/logo.webp" alt="rBank Logo" className="w-12 h-12 rounded-full object-cover shadow-lg" />
          <div>
            <h1 className="text-[17px] font-semibold leading-tight">Zbyněk Kocián</h1>
            <p className="text-[13px] text-gray-400 mt-0.5">Osobní bankovnictví</p>
          </div>
        </div>
        <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full border-2 border-[#3e424c] flex items-center justify-center text-[#3b82f6] active:bg-[#2c2f38] transition-colors">
          <span className="text-xl">👤</span>
        </button>
      </header>

      <main className="px-4 space-y-4">
        {/* Běžný účet */}
        <div className="bg-[#2c2f38] rounded-[24px] p-5 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-[17px]">Běžný účet</h2>
            <button onClick={() => handleCopy('1036437823/5500')} className="bg-[#3e424c] text-[11px] px-3 py-1.5 rounded-full text-gray-300 tracking-wider active:bg-gray-600 transition-colors">
              1036437823/5500
            </button>
          </div>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-[32px] font-bold tracking-tight">{formattedBalance}</span>
            <span className="text-[17px] text-gray-100">CZK</span>
            <span className="text-[13px] ml-1">🇨🇿 ˅</span>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/payment')} className="bg-[#ffe600] text-black text-[15px] font-semibold py-3 px-4 rounded-xl flex items-center gap-2 flex-1 justify-center active:bg-yellow-500 transition-colors">
              <span>→</span> Platba
            </button>
            <button onClick={() => navigate('/history')} className="bg-transparent text-gray-300 text-[15px] font-medium py-3 px-5 rounded-xl flex items-center gap-2 border border-gray-600 flex-1 justify-center active:bg-[#3e424c] transition-colors">
              <span>⇆</span> Historie
            </button>
          </div>
        </div>

        {/* Spořicí účet HIT */}
        <div className="bg-[#2c2f38] rounded-[24px] p-5 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-[17px]">Spořicí účet HIT</h2>
            <button onClick={() => handleCopy('1036437874/5500')} className="bg-[#3e424c] text-[11px] px-3 py-1.5 rounded-full text-gray-300 tracking-wider active:bg-gray-600 transition-colors">
              1036437874/5500
            </button>
          </div>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-[32px] font-bold tracking-tight">0,04</span>
            <span className="text-[17px] text-gray-100">CZK</span>
          </div>
          <div className="flex gap-3 mb-5">
            <button onClick={() => navigate('/savings-goals')} className="bg-[#ffe600] text-black text-[15px] font-semibold py-3 px-4 rounded-xl flex items-center gap-2 flex-1 justify-center active:bg-yellow-500 transition-colors">
              <span>⌖</span> Spořicí cíle
            </button>
            <button onClick={() => navigate('/history')} className="bg-transparent text-gray-300 text-[15px] font-medium py-3 px-5 rounded-xl flex items-center gap-2 border border-gray-600 flex-1 justify-center active:bg-[#3e424c] transition-colors">
              <span>⇆</span> Historie
            </button>
          </div>
          <button onClick={() => navigate('/building-savings')} className="w-full border-t border-gray-700 pt-5 flex justify-between items-center active:opacity-70 transition-opacity">
            <span className="text-[13px] text-gray-300">Stavebko s úrokem 3,3 % na šest let</span>
            <span className="text-[#ffe600] font-bold text-xl leading-none">›</span>
          </button>
        </div>

        {/* Debetní karta s vizuálem (S absolutním pozicováním a ořezem) */}
        <div onClick={() => navigate('/card')} className="w-full bg-[#2c2f38] rounded-[24px] p-5 shadow-lg active:bg-[#3e424c] transition-colors cursor-pointer relative overflow-hidden min-h-[170px] flex flex-col justify-between">
          <div className="flex justify-between items-center w-full relative z-10">
            <h2 className="font-semibold text-[17px]">Debetní karta</h2>
            <span className="bg-[#3e424c] text-[11px] px-3 py-1.5 rounded-full text-gray-300 tracking-wider uppercase">ZBYNĚK KOCIÁN</span>
          </div>
          
          <div className="flex flex-col gap-3 relative z-10 pb-1 mt-6">
            <span className="text-[15px] text-gray-200">Platby na internetu</span>
            <div className="w-[48px] h-7 rounded-full bg-[#ffe600]/20 border-2 border-[#ffe600] flex items-center px-0.5 justify-end shadow-inner">
              <div className="w-5 h-5 bg-[#ffe600] rounded-full"></div>
            </div>
          </div>
            
          {/* Oříznutý obrázek posunutý zcela doprava */}
          <div className="absolute right-0 bottom-5 w-[165px] h-[95px] rounded-l-[12px] overflow-hidden">
            <img src={visaImg} alt="Visa Karta" className="w-full h-full object-cover object-left" />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
