import React from 'react';
import {  useNavigate , useLocation } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

// ==========================================
// PŮVODNÍ KOMPONENTY (UPRAVENÉ IKONY A ODKAZY)
// ==========================================

export function Offers() {
  const navigate = useNavigate();
  const categories = [
    { id: 1, title: 'Úvěry a hypotéky', img: '/offers/01_oD_Úvěry_a_hypotéky.png' },
    { id: 2, title: 'Karty', img: '/offers/02_Karty.png' },
    { id: 3, title: 'Účty a spoření', img: '/offers/03_Účty_a_spoření.png' },
    { id: 4, title: 'Investice', img: '/offers/04_Investice.png' },
    { id: 5, title: 'Pojištění', img: '/offers/05_Pojištění.png' },
    { id: 6, title: 'Tipy pro Vás', img: '/offers/06_Tipy_pro_Vás.png' },
    { id: 7, title: 'Dětský účet', img: '/offers/07_Novinka_o_Dětský_účet.png', badge: 'Novinka' },
    { id: 8, title: 'Doporučte nás', img: '/offers/08_Doporučte_nás.png' }
  ];

  return (
    <div className="min-h-screen bg-[#22252e] text-white pb-24 font-sans flex flex-col">
      <header className="flex items-center justify-center p-4 pt-8 border-b border-[#2c2f38] pb-4">
        <h1 className="text-[17px] font-semibold">Nabídky</h1>
      </header>

      <main className="px-4 mt-6">
        <h2 className="text-xl font-bold mb-6 text-white">Vyberte kategorii</h2>

        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate('/offer-detail', { state: { title: cat.title } })}
              className="bg-[#2c2f38] rounded-[24px] p-4 flex flex-col items-center justify-center aspect-[5/4] relative active:bg-[#3e424c] transition-colors w-full border-none outline-none"
            >
              {cat.badge && (
                <span className="absolute top-3 right-3 bg-[#16a34a] text-white text-[10px] px-2 py-[2px] rounded-full font-medium shadow-md z-10">
                  {cat.badge}
                </span>
              )}
              <div className="w-[60px] h-[60px] mb-3 flex items-center justify-center">
                <img src={cat.img} alt={cat.title} className="w-full h-full object-contain drop-shadow-md" />
              </div>
              <span className="text-[13px] text-center font-medium text-gray-300">{cat.title}</span>
            </button>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

export function OfferDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  // Dynamický nadpis podle toho, na jakou kartu uživatel kliknul
  const title = location.state?.title || 'Tipy pro Vás';

  return (
    <div className="min-h-screen bg-[#22252e] text-white flex flex-col font-sans">
      <header className="flex items-center p-4 pt-8">
        <button onClick={() => navigate(-1)} className="text-[#fcd535] p-2 -ml-2 active:opacity-70">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="flex-1 text-center text-[17px] font-semibold pr-8">{title}</h1>
      </header>

      <main className="flex-1 flex items-center justify-center -mt-20">
        <p className="text-[15px] text-gray-200">Nemáte žádné nabídky.</p>
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
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] mr-4 p-2 active:bg-[#2c2f38] rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold">InfoZóna</h1>
      </header>
      <main className="flex-1 px-4 mt-6 space-y-3">
        <button onClick={() => navigate('/system-outage')} className="w-full bg-[#2c2f38] rounded-[20px] p-4 flex gap-4 items-start relative text-left active:bg-[#3e424c] transition-colors">
          <div className="w-2 h-2 bg-[#3b82f6] rounded-full mt-1.5 absolute right-4"></div>
          <div className="w-10 h-10 bg-[#3e424c] rounded-full flex items-center justify-center shrink-0 text-[#fcd535]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <div>
            <h3 className="text-[15px] font-semibold mb-1 pr-4">Odstávka systémů</h3>
            <p className="text-[13px] text-gray-400">Tento víkend proběhne plánovaná údržba. Platby kartou nebudou omezeny.</p>
          </div>
        </button>
        <div className="bg-[#2c2f38] rounded-[20px] p-4 flex gap-4 items-start opacity-70">
          <div className="w-10 h-10 bg-[#3e424c] rounded-full flex items-center justify-center shrink-0 text-gray-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          </div>
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
        <button onClick={() => navigate('/exchange-rates')} className="w-full bg-[#2c2f38] rounded-[20px] p-5 flex items-center gap-4 active:bg-[#3e424c] transition-colors text-left">
          <svg className="w-6 h-6 text-[#4ade80]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
          <span className="text-[15px] font-medium flex-1">Kurzovní lístek</span>
          <span className="text-gray-500">›</span>
        </button>
        <button onClick={() => navigate('/branches')} className="w-full bg-[#2c2f38] rounded-[20px] p-5 flex items-center gap-4 active:bg-[#3e424c] transition-colors text-left">
          <svg className="w-6 h-6 text-[#9ca3af]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          <span className="text-[15px] font-medium flex-1">Pobočky a bankomaty</span>
          <span className="text-gray-500">›</span>
        </button>
        <button onClick={() => navigate('/settings')} className="w-full bg-[#2c2f38] rounded-[20px] p-5 flex items-center gap-4 active:bg-[#3e424c] transition-colors text-left">
          <svg className="w-6 h-6 text-[#60a5fa]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span className="text-[15px] font-medium flex-1">Nastavení aplikace</span>
          <span className="text-gray-500">›</span>
        </button>
        <button onClick={() => navigate('/support')} className="w-full bg-[#2c2f38] rounded-[20px] p-5 flex items-center gap-4 active:bg-[#3e424c] transition-colors text-left">
          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-[15px] font-medium flex-1">Nápověda a podpora</span>
          <span className="text-gray-500">›</span>
        </button>
      </main>
      <BottomNav />
    </div>
  );
}

export function Profile() {
  const navigate = useNavigate();
  const [view, setView] = React.useState('main');

  if (view === 'contact') {
    return (
      <div className="min-h-screen bg-[#22252e] text-white font-sans flex flex-col">
        <header className="flex items-center p-4 pt-8 pb-4 relative">
          <button onClick={() => setView('main')} className="text-[#fcd535] p-2 active:bg-[#2c2f38] rounded-full absolute left-4">
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
              <button className="text-[#fcd535] p-2 active:opacity-70"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
            </div>
            
            <div className="p-5 border-b border-[#3e424c] flex justify-between items-center">
              <div>
                <div className="text-[13px] text-gray-400 mb-1">E-mail</div>
                <div className="font-medium">zbkocian@seznam.cz</div>
              </div>
              <button className="text-[#fcd535] p-2 active:opacity-70"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
            </div>

            <div className="p-5 flex justify-between items-start">
              <div>
                <div className="text-[13px] text-gray-400 mb-1">Adresa</div>
                <div className="font-medium leading-relaxed">
                  Zbyněk Kocián<br/>
                  Slovanská 1071<br/>
                  Slavkov u Brna 68401<br/>
                  Česká republika
                </div>
              </div>
              <button className="text-[#fcd535] p-2 active:opacity-70"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#22252e] text-white font-sans flex flex-col pb-6">
      <header className="flex items-center p-4 pt-8 pb-4 relative">
        <button onClick={() => navigate(-1)} className="text-[#fcd535] p-2 active:bg-[#2c2f38] rounded-full absolute left-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold w-full text-center">Profil</h1>
      </header>
      
      <main className="flex-1 px-4 mt-2 flex flex-col">
        {/* Avatar & Jméno */}
        <div className="flex items-center gap-4 mb-8 px-2">
          <div className="relative">
            <div className="w-[68px] h-[68px] bg-[#3e424c] rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </div>
            <div className="absolute -bottom-1 -right-1 w-[26px] h-[26px] bg-[#fcd535] rounded-full flex items-center justify-center border-4 border-[#22252e] text-black">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
            </div>
          </div>
          <h2 className="text-[22px] font-bold">Zbyněk Kocián</h2>
        </div>

        {/* Hlavní navigace */}
        <div className="w-full bg-[#2c2f38] rounded-[24px] mb-6 overflow-hidden">
          <button onClick={() => setView('contact')} className="w-full p-4 border-b border-[#3e424c] flex items-center gap-4 active:bg-[#3e424c]/50 transition-colors">
            <svg className="w-[22px] h-[22px] text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            <span className="flex-1 text-left text-[15px] font-medium text-gray-200">Mé kontaktní údaje</span>
            <span className="text-[#fcd535] font-bold">›</span>
          </button>
          
          <button className="w-full p-4 border-b border-[#3e424c] flex items-center gap-4 active:bg-[#3e424c]/50 transition-colors">
            <svg className="w-[22px] h-[22px] text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span className="flex-1 text-left text-[15px] font-medium text-gray-200">Osobní a zákonné údaje</span>
            <span className="text-[#fcd535] font-bold">›</span>
          </button>
          
          <button className="w-full p-4 border-b border-[#3e424c] flex items-center gap-4 active:bg-[#3e424c]/50 transition-colors">
            <svg className="w-[22px] h-[22px] text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/></svg>
            <span className="flex-1 text-left text-[15px] font-medium text-gray-200">Moje klientské číslo</span>
            <span className="text-[#fcd535] font-bold">›</span>
          </button>

          <button className="w-full p-4 border-b border-[#3e424c] flex items-center gap-4 active:bg-[#3e424c]/50 transition-colors">
            <svg className="w-[22px] h-[22px] text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/></svg>
            <span className="flex-1 text-left text-[15px] font-medium text-gray-200">Dokumenty</span>
            <span className="text-[#fcd535] font-bold">›</span>
          </button>

          <button className="w-full p-4 flex items-center gap-4 active:bg-[#3e424c]/50 transition-colors">
            <svg className="w-[22px] h-[22px] text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            <span className="flex-1 text-left text-[15px] font-medium text-gray-200">Bankovní identita RB</span>
            <span className="text-[#fcd535] font-bold">›</span>
          </button>
        </div>

        {/* Sekce Kontakty na banku */}
        <div className="w-full bg-[#2c2f38] rounded-[24px] p-5 mb-6">
          <h3 className="text-[17px] font-bold mb-5">Kontakty na banku</h3>
          
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="flex flex-col items-center">
              <button className="w-[52px] h-[52px] bg-[#fcd535] rounded-[18px] flex items-center justify-center text-black mb-2 active:opacity-80">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
              </button>
              <span className="text-[12px] font-medium text-gray-200">Chat</span>
            </div>
            <div className="flex flex-col items-center">
              <button className="w-[52px] h-[52px] bg-[#fcd535] rounded-[18px] flex items-center justify-center text-black mb-2 active:opacity-80">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </button>
              <span className="text-[12px] font-medium text-gray-200">Zavolat</span>
            </div>
            <div className="flex flex-col items-center">
              <button className="w-[52px] h-[52px] bg-[#fcd535] rounded-[18px] flex items-center justify-center text-black mb-2 active:opacity-80">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/></svg>
              </button>
              <span className="text-[12px] font-medium text-gray-200 text-center leading-tight">Nová<br/>schůzka</span>
            </div>
          </div>

          <button className="w-full flex items-center gap-4 mb-6 active:opacity-70 transition-opacity">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            <span className="flex-1 text-left text-[14px] font-medium text-gray-200">Schůzky a výběry na pobočce</span>
            <span className="text-[#fcd535] font-bold">›</span>
          </button>

          <div className="flex justify-center gap-4">
            <button className="w-10 h-10 rounded-full bg-[#3e424c] flex items-center justify-center text-gray-300 font-bold font-serif active:opacity-70">f</button>
            <button className="w-10 h-10 rounded-full bg-[#3e424c] flex items-center justify-center text-gray-300 font-bold active:opacity-70">X</button>
            <button className="w-10 h-10 rounded-full bg-[#3e424c] flex items-center justify-center text-gray-300 active:opacity-70">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="16" height="16" x="4" y="4" rx="4"/><circle cx="12" cy="12" r="3"/><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 7.5v.001"/></svg>
            </button>
            <button className="w-10 h-10 rounded-full bg-[#3e424c] flex items-center justify-center text-gray-300 active:opacity-70">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            </button>
          </div>
        </div>

        {/* Odhlásit se */}
        <button className="w-full flex items-center justify-center gap-2 border border-[#3e424c] text-gray-300 font-semibold py-[14px] rounded-[14px] active:bg-[#3e424c]/50 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Odhlásit se
        </button>
      </main>
    </div>
  );
}

// ==========================================
// NOVÉ MOCK KOMPONENTY PRO PROTOTYP
// ==========================================

export function TravelInsurance() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#22252e] text-white pb-24 font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 border-b border-[#2c2f38] pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] mr-4 p-2 active:bg-[#2c2f38] rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold">Cestovní pojištění</h1>
      </header>
      <main className="flex-1 px-4 mt-6">
        <div className="bg-[#2c2f38] rounded-[24px] p-5 shadow-lg border border-[#3e424c] mb-4">
          <h2 className="text-lg font-bold mb-2">Aktivní krytí</h2>
          <p className="text-gray-400 text-sm mb-4">Evropa a okolní státy, platnost do 31. 12. 2026.</p>
          <div className="bg-[#22252e] rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-400 mb-1">Pojištěné osoby:</p>
            <p className="font-medium">Zbyněk, Marcela</p>
          </div>
          <button className="w-full bg-[#fcd535] text-black font-semibold py-3 rounded-xl active:bg-yellow-500 transition-colors">Zobrazit asistenční kartu</button>
        </div>
      </main>
    </div>
  );
}

export function MinuteLoan() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#22252e] text-white pb-24 font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 border-b border-[#2c2f38] pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] mr-4 p-2 active:bg-[#2c2f38] rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold">Minutová půjčka</h1>
      </header>
      <main className="flex-1 px-4 mt-6">
        <div className="bg-gradient-to-b from-[#2c2f38] to-[#22252e] rounded-[24px] p-6 shadow-lg border border-[#3b82f6]/30 text-center">
          <h2 className="text-gray-400 text-sm font-medium mb-2">Předschválený limit</h2>
          <div className="text-[40px] font-bold text-white mb-6 tracking-tight">150 000 <span className="text-xl">CZK</span></div>
          <ul className="text-left space-y-3 mb-8">
            <li className="flex items-center gap-3 text-sm"><svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Peníze na účtu do 3 minut</li>
            <li className="flex items-center gap-3 text-sm"><svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Bez poplatků za sjednání</li>
            <li className="flex items-center gap-3 text-sm"><svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Úrok pouze 4,9 % p.a.</li>
          </ul>
          <button className="w-full bg-[#3b82f6] text-white font-semibold py-4 rounded-xl active:bg-blue-600 transition-colors">Pokračovat k žádosti</button>
        </div>
      </main>
    </div>
  );
}

export function SystemOutage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#22252e] text-white pb-24 font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 border-b border-[#2c2f38] pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] mr-4 p-2 active:bg-[#2c2f38] rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold">Detail odstávky</h1>
      </header>
      <main className="flex-1 px-4 mt-6">
        <div className="bg-[#2c2f38] rounded-[24px] p-5 shadow-lg border-l-4 border-[#fcd535]">
          <h2 className="text-lg font-bold mb-3">Plánovaná údržba systémů</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Vážený kliente, z důvodu vylepšování našich bankovních služeb proběhne o víkendu plánovaná technická odstávka.
          </p>
          <div className="bg-[#22252e] p-3 rounded-xl text-sm space-y-2">
            <div className="flex justify-between"><span className="text-gray-400">Začátek:</span><span>So 18. 7. 2026, 23:00</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Konec:</span><span>Ne 19. 7. 2026, 04:00</span></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export function ExchangeRates() {
  const navigate = useNavigate();
  const rates = [
    { curr: 'EUR', flag: '🇪🇺', buy: '24.95', sell: '25.65' },
    { curr: 'USD', flag: '🇺🇸', buy: '22.80', sell: '23.50' },
    { curr: 'GBP', flag: '🇬🇧', buy: '29.10', sell: '29.90' },
  ];
  return (
    <div className="min-h-screen bg-[#22252e] text-white pb-24 font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 border-b border-[#2c2f38] pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] mr-4 p-2 active:bg-[#2c2f38] rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold">Kurzovní lístek</h1>
      </header>
      <main className="flex-1 px-4 mt-6">
        <div className="bg-[#2c2f38] rounded-[24px] overflow-hidden shadow-lg">
          <div className="grid grid-cols-3 p-4 border-b border-gray-700 text-xs text-gray-400 uppercase tracking-wider font-semibold">
            <div>Měna</div>
            <div className="text-right">Nákup</div>
            <div className="text-right">Prodej</div>
          </div>
          {rates.map(r => (
            <div key={r.curr} className="grid grid-cols-3 p-4 border-b border-gray-700/50 last:border-0 items-center">
              <div className="flex items-center gap-2 font-medium"><span className="text-lg">{r.flag}</span> {r.curr}</div>
              <div className="text-right font-mono">{r.buy}</div>
              <div className="text-right font-mono">{r.sell}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}


export function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = React.useState({
    push: true,
    biometric: true,
    darkMode: true
  });

  React.useEffect(() => {
    async function load() {
      try {
        const { Preferences } = await import('@capacitor/preferences');
        const saved = await Preferences.get({ key: 'user_settings' });
        if (saved.value) setSettings(JSON.parse(saved.value));
      } catch (e) {
        console.warn('Preferences plugin not available');
      }
    }
    load();
  }, []);

  const toggle = async (key) => {
    try {
      const { Preferences } = await import('@capacitor/preferences');
      const newSettings = { ...settings, [key]: !settings[key] };
      setSettings(newSettings);
      await Preferences.set({ key: 'user_settings', value: JSON.stringify(newSettings) });
    } catch (e) {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  return (
    <div className="min-h-screen bg-[#22252e] text-white font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] p-2 mr-2 active:bg-[#2c2f38] rounded-full">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        </button>
        <h1 className="text-[16px] font-semibold">Nastavení</h1>
      </header>
      <main className="p-4 space-y-4 mt-2">
        {[
          { id: 'push', label: 'Push notifikace' },
          { id: 'biometric', label: 'Přihlášení otiskem prstu' },
          { id: 'darkMode', label: 'Tmavý režim (Vynucený)' }
        ].map(s => (
          <div key={s.id} className="bg-[#2c2f38] p-5 rounded-[18px] flex justify-between items-center">
            <span className="font-semibold text-[15px]">{s.label}</span>
            <button onClick={() => toggle(s.id)} className={`w-12 h-[26px] rounded-full transition-colors relative ${settings[s.id] ? 'bg-[#3b82f6]' : 'bg-[#424651]'}`}>
              <div className={`w-5 h-5 ${settings[s.id] ? 'bg-white' : 'bg-gray-400'} rounded-full absolute top-[3px] transition-all ${settings[s.id] ? 'left-[25px]' : 'left-[3px]'}`}></div>
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}

export function BranchesATMs() {
  const navigate = useNavigate();
  const rbUrl = "https://www.rb.cz/o-nas/kontakty/pobocky-a-bankomaty?atm=false&branchSegment=PERSONALFINANCE&openNow=false&openNonStop=false&openEveningsOrWeekend=false&barrierfree=false&cashDesk=false&depositAtm=false&depositRbAtm=false&contactlessAtm=false";
  
  return (
    <div className="min-h-screen bg-[#22252e] text-white font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] p-2 mr-2 active:bg-[#2c2f38] rounded-full">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        </button>
        <h1 className="text-[16px] font-semibold">Nejbližší pobočky</h1>
      </header>
      <main className="p-4 mt-2">
        <div className="bg-[#2c2f38] p-5 rounded-[20px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.03] rounded-full -mr-16 -mt-16 pointer-events-none"></div>
          <div className="flex items-start gap-4 mb-6 relative z-10">
            <svg className="w-5 h-5 text-gray-400 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <div>
              <h2 className="text-[16px] font-bold text-white mb-1">Brno - Olympia</h2>
              <p className="text-[14px] text-gray-400 leading-tight">Olympia U Dálnice 777, 664 42 Brno<br/>Otevřeno do 21:00</p>
            </div>
          </div>
          <div className="flex gap-3 relative z-10">
            <button className="flex-1 bg-[#424651] text-white font-semibold py-[10px] rounded-[10px] active:bg-[#4b505c] transition-colors text-[14px]">Navigovat</button>
            <button onClick={() => window.open(rbUrl, '_system')} className="flex-1 border border-[#424651] text-white font-semibold py-[10px] rounded-[10px] active:bg-[#424651] transition-colors text-[14px]">Detaily</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export function AppSettings() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#22252e] text-white pb-24 font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 border-b border-[#2c2f38] pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] mr-4 p-2 active:bg-[#2c2f38] rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold">Nastavení</h1>
      </header>
      <main className="flex-1 px-4 mt-6 space-y-3">
        <div className="bg-[#2c2f38] rounded-[20px] p-5 flex justify-between items-center">
          <span className="text-[15px] font-medium">Push notifikace</span>
          <div className="w-12 h-6 bg-[#3b82f6] rounded-full relative"><div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div></div>
        </div>
        <div className="bg-[#2c2f38] rounded-[20px] p-5 flex justify-between items-center">
          <span className="text-[15px] font-medium">Přihlášení otiskem prstu</span>
          <div className="w-12 h-6 bg-[#3b82f6] rounded-full relative"><div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div></div>
        </div>
        <div className="bg-[#2c2f38] rounded-[20px] p-5 flex justify-between items-center">
          <span className="text-[15px] font-medium">Tmavý režim (Vynucený)</span>
          <div className="w-12 h-6 bg-[#3b82f6] rounded-full relative opacity-50"><div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div></div>
        </div>
      </main>
    </div>
  );
}

export function Support() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#22252e] text-white font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] p-2 mr-2 active:bg-[#2c2f38] rounded-full">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        </button>
        <h1 className="text-[16px] font-semibold">Podpora</h1>
      </header>
      <main className="p-4 mt-2">
        <div className="bg-[#2c2f38] p-6 rounded-[20px] flex flex-col items-center text-center">
          <div className="w-[60px] h-[60px] bg-[#3e424c] rounded-full flex items-center justify-center mb-5">
            <svg className="w-7 h-7 text-[#3b82f6]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          </div>
          <h2 className="text-[17px] font-bold text-white mb-2">Potřebujete poradit?</h2>
          <p className="text-[14px] text-gray-400 mb-6">Jsme tu pro vás 24 hodin denně, 7 dní v týdnu.</p>
          <button className="w-full bg-[#fcd535] text-black font-bold py-[14px] rounded-xl active:bg-[#e5c02a] transition-colors text-[15px]">Zavolat rBank</button>
        </div>
      </main>
    </div>
  );
}

