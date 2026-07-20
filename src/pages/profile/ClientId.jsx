import React from 'react';
import bidImg from '../../assets/rbpic/bid.jpg';

export default function ClientId({ onBack }) {
  return (
    <div className="min-h-screen bg-[#22252e] text-white font-sans flex flex-col pb-6">
      <header className="flex items-center p-4 pt-8 pb-4 relative">
        <button onClick={onBack} className="text-[#ffe600] p-2 active:bg-[#2c2f38] rounded-full absolute left-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold w-full text-center">Klientské číslo</h1>
      </header>

      <main className="flex-1 px-6 mt-8 flex flex-col items-center text-center">
        {/* Obrázek s aplikovaným mix-blend-screen pro potlačení černého pozadí z JPG */}
        <div className="w-[180px] h-[180px] mb-8 flex items-center justify-center">
          <img src={bidImg} alt="Ilustrace klientského čísla" className="w-full h-full object-contain mix-blend-screen" />
        </div>

        <p className="text-[15px] text-gray-200 mb-8 leading-relaxed max-w-sm">
          Klientské číslo pro přihlašování do Vašeho internetového bankovnictví je:
        </p>

        <div className="text-[32px] font-bold text-white tracking-wide">
          8806154247
        </div>
      </main>

      {/* Tlačítko Zavřít ukotvené dole */}
      <div className="px-4 mt-auto pt-8">
        <button onClick={onBack} className="w-full border border-[#4a4f5a] text-gray-200 font-semibold py-[14px] rounded-[14px] active:bg-[#3e424c]/50 transition-colors">
          Zavřít
        </button>
      </div>
    </div>
  );
}
