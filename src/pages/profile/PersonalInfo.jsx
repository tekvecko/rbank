import React from 'react';

export default function PersonalInfo({ onBack }) {
  return (
    <div className="min-h-screen bg-[#22252e] text-white font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 pb-4 relative">
        <button onClick={onBack} className="text-[#ffe600] p-2 active:bg-[#2c2f38] rounded-full absolute left-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold w-full text-center">Osobní a zákonné údaje</h1>
      </header>
      <main className="flex-1 px-4 mt-2 flex flex-col">
        <div className="w-full bg-[#2c2f38] rounded-[24px] mb-6 overflow-hidden">
          <div className="p-5 border-b border-[#3e424c]">
            <div className="text-[13px] text-gray-400 mb-1">Jméno a příjmení</div>
            <div className="font-medium text-[15px]">Zbyněk Kocián</div>
          </div>
          <div className="p-5 border-b border-[#3e424c]">
            <div className="text-[13px] text-gray-400 mb-1">Rodné číslo</div>
            <div className="font-medium text-[15px]">820714/1234</div>
          </div>
          <div className="p-5">
            <div className="text-[13px] text-gray-400 mb-1">Průkaz totožnosti</div>
            <div className="font-medium text-[15px] mb-1">112233445</div>
            <div className="text-[13px] text-emerald-400 font-medium">Platnost do 15. 8. 2030</div>
          </div>
        </div>
      </main>
    </div>
  );
}
