import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { Clipboard } from '@capacitor/clipboard';
import { Toast } from '@capacitor/toast';

export default function Dashboard() {
  const navigate = useNavigate();

  // Nativní funkce pro zkopírování a zobrazení Android bubliny
  const handleCopy = async (text) => {
    try {
      await Clipboard.write({ string: text });
      await Toast.show({
        text: `Zkopírováno: ${text}`,
        duration: 'short',
        position: 'bottom'
      });
    } catch (err) {
      console.error('Kopírování selhalo', err);
    }
  };

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
        {/* Červený prvek: Profil */}
        <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full border-2 border-[#3e424c] flex items-center justify-center text-[#3b82f6] active:bg-[#2c2f38] transition-colors">
          <span className="text-xl">👤</span>
        </button>
      </header>

      <main className="px-4 space-y-4">
        {/* Běžný účet */}
        <div className="bg-[#2c2f38] rounded-[24px] p-5 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-[17px]">Běžný účet</h2>
            {/* Modrý prvek: Kopírování Běžného účtu */}
            <button 
              onClick={() => handleCopy('1036437823/5500')}
              className="bg-[#3e424c] text-[11px] px-3 py-1.5 rounded-full text-gray-300 tracking-wider active:bg-gray-600 transition-colors"
            >
              1036437823/5500
            </button>
          </div>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-[32px] font-bold tracking-tight">35 687,74</span>
            <span className="text-[17px] text-gray-100">CZK</span>
            <span className="text-[13px] ml-1">🇨🇿 ˅</span>
          </div>

          <div className="flex gap-3">
            {/* Červený prvek: Platba */}
            <button onClick={() => navigate('/payment')} className="bg-[#fcd535] text-black text-[15px] font-semibold py-3 px-4 rounded-xl flex items-center gap-2 flex-1 justify-center active:bg-yellow-500 transition-colors">
              <span>→</span> Platba
            </button>
            {/* Zelený prvek: Historie Běžného účtu */}
            <button onClick={() => navigate('/history')} className="bg-transparent text-gray-300 text-[15px] font-medium py-3 px-5 rounded-xl flex items-center gap-2 border border-gray-600 flex-1 justify-center active:bg-[#3e424c] transition-colors">
              <span>⇆</span> Historie
            </button>
          </div>
        </div>

        {/* Spořicí účet HIT */}
        <div className="bg-[#2c2f38] rounded-[24px] p-5 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-[17px]">Spořicí účet HIT</h2>
            {/* Modrý prvek: Kopírování Spořicího účtu */}
            <button 
              onClick={() => handleCopy('1036437874/5500')}
              className="bg-[#3e424c] text-[11px] px-3 py-1.5 rounded-full text-gray-300 tracking-wider active:bg-gray-600 transition-colors"
            >
              1036437874/5500
            </button>
          </div>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-[32px] font-bold tracking-tight">0,04</span>
            <span className="text-[17px] text-gray-100">CZK</span>
          </div>

          <div className="flex gap-3 mb-5">
            {/* Červený prvek: Spořicí cíle */}
            <button onClick={() => navigate('/savings-goals')} className="bg-[#fcd535] text-black text-[15px] font-semibold py-3 px-4 rounded-xl flex items-center gap-2 flex-1 justify-center active:bg-yellow-500 transition-colors">
              <span>⌖</span> Spořicí cíle
            </button>
            {/* Červený prvek: Historie Spořicího účtu (Zatím směřuje na stejnou historii, backend ji později vyfiltruje) */}
            <button onClick={() => navigate('/history')} className="bg-transparent text-gray-300 text-[15px] font-medium py-3 px-5 rounded-xl flex items-center gap-2 border border-gray-600 flex-1 justify-center active:bg-[#3e424c] transition-colors">
              <span>⇆</span> Historie
            </button>
          </div>
          
          {/* Červený prvek: Stavební spoření */}
          <button onClick={() => navigate('/building-savings')} className="w-full border-t border-gray-700 pt-5 flex justify-between items-center active:opacity-70 transition-opacity">
            <span className="text-[13px] text-gray-300">Stavebko s úrokem 3,3 % na šest let</span>
            <span className="text-[#fcd535] font-bold text-xl leading-none">›</span>
          </button>
        </div>

        {/* Sekce Karty */}
        <button onClick={() => navigate('/card')} className="w-full bg-[#2c2f38] rounded-[24px] p-5 shadow-lg min-h-[220px] active:bg-[#3e424c] transition-colors text-left flex flex-col justify-between">
          <div className="flex justify-between items-center w-full">
            <h2 className="font-semibold text-[17px]">Debetní karta</h2>
            <span className="bg-[#3e424c] text-[11px] px-3 py-1.5 rounded-full text-gray-300 tracking-wider uppercase">ZBYNĚK KOCIÁN</span>
          </div>
        </button>
      </main>

      <BottomNav />
    </div>
  );
}
