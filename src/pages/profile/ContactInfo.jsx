import React from 'react';

export default function ContactInfo({ onBack }) {
  return (
    <div className="min-h-screen bg-[#22252e] text-white font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 pb-4 relative">
        <button onClick={onBack} className="text-[#fcd535] p-2 active:bg-[#2c2f38] rounded-full absolute left-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold w-full text-center">Moje údaje</h1>
      </header>
      <main className="flex-1 px-4 mt-2 flex flex-col">
        <h2 className="text-[19px] font-bold mb-4">Kontaktní údaje</h2>
        <div className="w-full bg-[#2c2f38] rounded-[24px] mb-6">
          <div className="p-5 border-b border-[#3e424c] flex justify-between items-center">
            <div>
              <div className="text-[13px] text-gray-400 mb-1">Mobilní telefon</div>
              <div className="font-medium">+420 735 873 367</div>
            </div>
          </div>
          <div className="p-5 border-b border-[#3e424c] flex justify-between items-center">
            <div>
              <div className="text-[13px] text-gray-400 mb-1">E-mail</div>
              <div className="font-medium">zbkocian@seznam.cz</div>
            </div>
          </div>
          <div className="p-5 flex justify-between items-start">
            <div>
              <div className="text-[13px] text-gray-400 mb-1">Adresa</div>
              <div className="font-medium leading-relaxed">Zbyněk Kocián<br/>Slovanská 1071<br/>Slavkov u Brna 68401<br/>Česká republika</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
