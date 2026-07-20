import React from 'react';

export default function BankId({ onBack }) {
  return (
    <div className="min-h-screen bg-[#22252e] text-white font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 pb-4 relative">
        <button onClick={onBack} className="text-[#ffe600] p-2 active:bg-[#2c2f38] rounded-full absolute left-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold w-full text-center">Bankovní identita RB</h1>
      </header>
      <main className="flex-1 px-4 mt-2 flex flex-col">
        <div className="w-full bg-[#2c2f38] rounded-[24px] p-6 text-center mb-6">
          <h2 className="text-xl font-bold mb-2 text-emerald-400">Aktivní</h2>
          <p className="text-[14px] text-gray-400 mb-8 leading-relaxed">Můžete se bezpečně přihlašovat ke službám státu.</p>
        </div>
      </main>
    </div>
  );
}
