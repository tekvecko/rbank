import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

export default function History() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollRef = useRef(null);

  const pageRef = useRef(1);
  const loadingRef = useRef(false);

  const loadMore = async () => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const res = await fetch(`http://13.49.77.58:3000/api/transactions?page=${pageRef.current}&limit=15`);
      const newTx = await res.json();

      if (newTx.length === 0) {
        setHasMore(false);
      } else {
        setTransactions(prev => {
          const existingIds = new Set(prev.map(t => t.id));
          const filtered = newTx.filter(t => !existingIds.has(t.id));
          return [...prev, ...filtered];
        });
        pageRef.current += 1;
      }
    } catch (err) {
      console.error("Chyba připojení k DB:", err);
    }
    loadingRef.current = false;
    setLoading(false);
  };

  useEffect(() => {
    loadMore();
  }, []);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      loadMore();
    }
  };

  const groupedTransactions = transactions.reduce((groups, tx) => {
    const dateObj = new Date(tx.created_at);
    const dateKey = dateObj.toLocaleDateString('en-CA');
    if (!groups[dateKey]) {
      groups[dateKey] = { dateObj, items: [] };
    }
    groups[dateKey].items.push(tx);
    return groups;
  }, {});

  const formatDateHeader = (dateObj) => {
    const today = new Date();
    if (dateObj.toDateString() === today.toDateString()) return 'DNES';
    const options = { day: 'numeric', month: 'long', weekday: 'long' };
    return dateObj.toLocaleDateString('cs-CZ', options).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#22252e] text-white font-sans flex flex-col">
      <header className="flex items-center justify-between p-4 pt-8">
        <button onClick={() => navigate(-1)} className="text-[#3b82f6] p-2 active:bg-[#2c2f38] rounded-full transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h1 className="text-[17px] font-semibold">Běžný účet</h1>
        <button className="text-[#3b82f6] p-2 active:bg-[#2c2f38] rounded-full transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z"/></svg>
        </button>
      </header>

      <div className="px-4 mb-4 flex gap-2 overflow-x-auto no-scrollbar">
        <button className="bg-[#fcd535] text-black px-5 py-2 rounded-full text-[14px] font-semibold whitespace-nowrap">Historie</button>
        <button className="bg-transparent text-gray-400 px-5 py-2 rounded-full text-[14px] font-medium whitespace-nowrap">Platby</button>
        <button className="bg-transparent text-gray-400 px-5 py-2 rounded-full text-[14px] font-medium whitespace-nowrap">Produkty</button>
        <button className="bg-transparent text-gray-400 px-5 py-2 rounded-full text-[14px] font-medium whitespace-nowrap">Detail</button>
      </div>

      <div ref={scrollRef} onScroll={handleScroll} className="flex-1 bg-[#2c2f38] rounded-t-[32px] overflow-y-auto px-5 pt-6 pb-24 shadow-inner">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[19px] font-bold">Poslední pohyby</h2>
          <button className="text-[#3b82f6] text-[15px] font-medium active:opacity-70">Filtrovat</button>
        </div>

        <div className="bg-[#22252e] rounded-xl flex items-center px-4 py-3 mb-6 border border-gray-700">
          <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" placeholder="Číslo účtu, příjemce nebo částka" className="bg-transparent flex-1 text-[15px] text-white outline-none placeholder-gray-500" disabled />
        </div>

        {Object.entries(groupedTransactions).map(([dateKey, group]) => (
          <div key={dateKey} className="mb-6">
            <h3 className="text-[13px] font-semibold text-gray-400 tracking-wider mb-4 uppercase">
              {formatDateHeader(group.dateObj)}
            </h3>
            <div className="space-y-5">
              {group.items.map((tx) => (
                <div key={tx.id} className="flex justify-between items-center border-b border-gray-700 pb-5 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className={`w-11 h-11 rounded-full ${tx.iconBg} flex items-center justify-center text-lg font-bold ${tx.iconBg === 'bg-white' || tx.iconBg === 'bg-[#fcd535]' ? 'text-black' : 'text-white'}`}>
                        {tx.icon}
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#fcd535] rounded-full border-2 border-[#2c2f38] flex items-center justify-center text-[8px] text-black">
                        {tx.badge}
                      </div>
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-gray-100">{tx.name}</p>
                      <p className="text-[13px] text-gray-400">{tx.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-[15px] font-bold ${tx.color}`}>{tx.amount} CZK</p>
                    {tx.subAmount && <p className="text-[11px] text-gray-400">{tx.subAmount}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {loading && <div className="text-center text-gray-400 text-sm py-4">Načítám transakce...</div>}
      </div>
      <BottomNav />
    </div>
  );
}
