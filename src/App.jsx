import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#22252e] text-white pb-20 font-sans">
      {/* Hlavička */}
      <header className="flex items-center justify-between p-4 pt-8 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#fcd535] rounded-full flex items-center justify-center text-black font-extrabold text-2xl">
            X
          </div>
          <div>
            <h1 className="text-[17px] font-semibold leading-tight">Zbyněk Kocián</h1>
            <p className="text-[13px] text-gray-400 mt-0.5">Osobní bankovnictví</p>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center text-gray-300">
          <span className="text-xl">👤</span>
        </div>
      </header>

      {/* Hlavní obsah - Karty účtů */}
      <main className="px-4 space-y-4">
        
        {/* Běžný účet */}
        <div className="bg-[#2c2f38] rounded-[24px] p-5 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-[17px]">Běžný účet</h2>
            <span className="bg-[#3e424c] text-[11px] px-3 py-1.5 rounded-full text-gray-300 tracking-wider">
              1036437823/5500
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-[32px] font-bold tracking-tight">35 687,74</span>
            <span className="text-[17px] text-gray-100">CZK</span>
            <span className="text-[13px] ml-1">🇨🇿 ˅</span>
          </div>

          <div className="flex gap-3">
            <button className="bg-[#fcd535] text-black text-[15px] font-semibold py-3 px-4 rounded-xl flex items-center gap-2">
              <span>→</span> Platba
            </button>
            <button className="bg-transparent text-gray-300 text-[15px] font-medium py-3 px-5 rounded-xl flex items-center gap-2 border border-gray-600">
              <span>⇆</span> Historie
            </button>
          </div>
        </div>

        {/* Spořicí účet HIT */}
        <div className="bg-[#2c2f38] rounded-[24px] p-5 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-[17px]">Spořicí účet HIT</h2>
            <span className="bg-[#3e424c] text-[11px] px-3 py-1.5 rounded-full text-gray-300 tracking-wider">
              1036437874/5500
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-[32px] font-bold tracking-tight">0,04</span>
            <span className="text-[17px] text-gray-100">CZK</span>
          </div>

          <div className="flex gap-3 mb-5">
            <button className="bg-[#fcd535] text-black text-[15px] font-semibold py-3 px-4 rounded-xl flex items-center gap-2">
              <span>⌖</span> Spořicí cíle
            </button>
            <button className="bg-transparent text-gray-300 text-[15px] font-medium py-3 px-5 rounded-xl flex items-center gap-2 border border-gray-600">
              <span>⇆</span> Historie
            </button>
          </div>
          <div className="border-t border-gray-700 pt-5 flex justify-between items-center">
            <span className="text-[13px] text-gray-300">Stavebko s úrokem 3,3 % na šest let</span>
            <span className="text-[#fcd535] font-bold text-xl leading-none">›</span>
          </div>
        </div>

        {/* Debetní karta */}
        <div className="bg-[#2c2f38] rounded-[24px] p-5 shadow-lg min-h-[220px]">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-[17px]">Debetní karta</h2>
            <span className="bg-[#3e424c] text-[11px] px-3 py-1.5 rounded-full text-gray-300 tracking-wider uppercase">
              ZBYNĚK KOCIÁN
            </span>
          </div>
          {/* Prázdný prostor pod hlavičkou dle předlohy */}
        </div>
      </main>

      {/* Spodní navigace */}
      <nav className="fixed bottom-0 w-full bg-[#22252e] flex justify-between px-2 pb-2 pt-3">
        <button className="flex flex-col items-center gap-1 text-white w-16">
          <div className="bg-[#3e424c] w-14 h-8 rounded-full flex items-center justify-center mb-0.5">
            <span className="text-xl">🏠</span>
          </div>
          <span className="text-[10px] font-medium">Přehled</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400 w-16 mt-1">
          <span className="text-xl mb-1">⇆</span>
          <span className="text-[10px]">Platba</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400 w-16 mt-1">
          <span className="text-xl mb-1">🛒</span>
          <span className="text-[10px]">Nabídky</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400 w-16 mt-1">
          <span className="text-xl mb-1">💬</span>
          <span className="text-[10px]">InfoZóna</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400 w-16 mt-1">
          <span className="text-xl mb-1">•••</span>
          <span className="text-[10px]">Menu</span>
        </button>
      </nav>
    </div>
  );
}
