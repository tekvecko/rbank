import React from 'react';

export default function Documents({ onBack }) {
  return (
    <div className="min-h-screen bg-[#22252e] text-white font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 pb-4 relative">
        <button onClick={onBack} className="text-[#fcd535] p-2 active:bg-[#2c2f38] rounded-full absolute left-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold w-full text-center">Dokumenty</h1>
      </header>
      <main className="flex-1 px-4 mt-2 flex flex-col">
        <div className="w-full bg-[#2c2f38] rounded-[24px] mb-6 overflow-hidden">
          <button className="w-full p-5 border-b border-[#3e424c] flex items-center justify-between">
            <div className="text-left"><div className="font-medium text-[15px] mb-1">Smlouva o vedení účtu</div><div className="text-[12px] text-gray-400">PDF • 12. 5. 2020</div></div>
          </button>
          <button className="w-full p-5 border-b border-[#3e424c] flex items-center justify-between">
            <div className="text-left"><div className="font-medium text-[15px] mb-1">Všeobecné obchodní podmínky</div><div className="text-[12px] text-gray-400">PDF • Platné od 1. 1. 2026</div></div>
          </button>
        </div>
      </main>
    </div>
  );
}
