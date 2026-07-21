import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

export function Payment() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name || !amount) return;
    setIsSubmitting(true);

    const formattedAmount = `-${parseFloat(amount).toLocaleString('cs-CZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const payload = {
      name: name,
      type: 'Odchozí úhrada',
      amount: formattedAmount,
      subAmount: message || '',
      color: 'text-white',
      iconBg: 'bg-[#3e424c]',
      icon: '💸',
      badge: '📤'
    };

    try {
      const res = await fetch('https://opravyslavkov.shop/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('rbank:TajneHeslo2026')
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        navigate('/history');
      }
    } catch (err) {
      console.error('Chyba odeslání platby:', err);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#22252e] text-white pb-24 font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 border-b border-[#2c2f38] pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] mr-4 p-2 active:bg-[#2c2f38] rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold">Nová platba</h1>
      </header>
      <main className="flex-1 px-4 mt-6">
        <div className="bg-[#2c2f38] rounded-[24px] p-5 shadow-lg">
          <label className="text-[13px] text-gray-400 font-medium">Příjemce / Číslo účtu</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Předčíslí-Číslo/Kód banky" className="w-full bg-transparent border-b border-gray-600 text-white text-[17px] py-3 focus:outline-none focus:border-[#3b82f6] mb-6" />

          <label className="text-[13px] text-gray-400 font-medium">Částka</label>
          <div className="flex items-end border-b border-gray-600 focus-within:border-[#3b82f6] mb-6 pb-2">
            <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="0" className="w-full bg-transparent text-white text-[32px] font-bold focus:outline-none" />
            <span className="text-[17px] text-gray-300 mb-1 ml-2">CZK</span>
          </div>

          <label className="text-[13px] text-gray-400 font-medium">Zpráva pro příjemce</label>
          <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Volitelné" className="w-full bg-transparent border-b border-gray-600 text-white text-[15px] py-3 focus:outline-none focus:border-[#3b82f6] mb-8" />

          <button onClick={handleSubmit} disabled={isSubmitting || !name || !amount} className="w-full bg-[#ffe600] text-black text-[15px] font-semibold py-4 rounded-xl active:bg-yellow-500 transition-colors disabled:opacity-50">
            {isSubmitting ? 'Odesílám...' : 'Odeslat platbu'}
          </button>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

export function SavingsGoals() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#22252e] text-white font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 border-b border-[#2c2f38] pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] mr-4 p-2 active:bg-[#2c2f38] rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold">Spořicí cíle</h1>
      </header>
      <main className="flex-1 px-4 mt-6">
        <div className="bg-[#2c2f38] rounded-[24px] p-5 shadow-lg mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-[17px]">Rezerva na horší časy</span>
            <span className="bg-[#3e424c] text-[11px] px-3 py-1.5 rounded-full text-gray-300">CÍL: 100 000 CZK</span>
          </div>
          <div className="text-[32px] font-bold mb-4 text-[#ffe600] tracking-tight">45 000 <span className="text-[17px] text-[#ffe600]">CZK</span></div>
          <div className="w-full bg-[#22252e] h-3 rounded-full overflow-hidden border border-gray-700">
            <div className="bg-[#ffe600] h-full w-[45%] rounded-full"></div>
          </div>
          <p className="text-[13px] text-gray-400 mt-3 text-right">45 % splněno</p>
        </div>
        <button className="w-full border-2 border-dashed border-gray-600 text-[#3b82f6] py-5 rounded-[24px] flex items-center justify-center gap-2 font-medium active:bg-[#2c2f38] transition-colors">
          <span className="text-2xl leading-none mb-1">+</span> Založit nový cíl
        </button>
      </main>
    </div>
  );
}

export function BuildingSavings() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#22252e] text-white font-sans flex flex-col">
      <header className="flex items-center p-4 pt-8 border-b border-[#2c2f38] pb-4">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] mr-4 p-2 active:bg-[#2c2f38] rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold">Stavební spoření</h1>
      </header>
      <main className="flex-1 px-4 mt-6">
        <div className="bg-[#2c2f38] rounded-[24px] p-5 shadow-lg text-center py-10">
          <div className="w-16 h-16 bg-[#3e424c] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">📈</div>
          <h2 className="text-xl font-bold mb-2">Stavebko s úrokem 3,3 %</h2>
          <p className="text-gray-400 text-[15px] mb-8 px-4">Garantovaný úrok na šest let. Vaše naspořená částka se úročí každý den.</p>
          <div className="text-[40px] font-bold tracking-tight text-white mb-2">12 450 <span className="text-xl">CZK</span></div>
          <p className="text-[13px] text-[#4ade80]">Letos získáte státní podporu +1 000 CZK</p>
        </div>
      </main>
    </div>
  );
}
