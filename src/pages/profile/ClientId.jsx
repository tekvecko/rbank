import React from 'react';

export default function ClientId({ onBack }) {
  return (
    <div className="min-h-screen bg-[#22252e] text-white font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 pb-4 relative">
        <button onClick={onBack} className="text-[#fcd535] p-2 active:bg-[#2c2f38] rounded-full absolute left-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold w-full text-center">Moje klientské číslo</h1>
      </header>
      <main className="flex-1 px-4 mt-2 flex flex-col items-center pt-8">
        <div className="w-full bg-[#2c2f38] rounded-[24px] p-8 text-center mb-6 shadow-lg border border-[#3e424c]/50">
          <div className="text-[14px] text-gray-400 mb-2">Klientské číslo (přihlašovací jméno)</div>
          <div className="text-[34px] font-bold tracking-wider text-[#fcd535] mb-6">735 873 367</div>
          <p className="text-[14px] text-gray-400 leading-relaxed">Toto číslo slouží pro zabezpečenou komunikaci s bankou.</p>
        </div>
      </main>
    </div>
  );
}
