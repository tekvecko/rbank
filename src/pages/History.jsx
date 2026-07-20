import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
// Import reálné funkce z tvé databázové vrstvy
import { fetchMockTransactions } from '../data/mockDb';

export default function History() {
  const navigate = useNavigate();
  
  // Datové stavy pro propojení s mockDb
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Stavy filtru
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState({ direction: null, amount: null, period: null });
  const [tempFilter, setTempFilter] = useState({ direction: null, amount: null, period: null });

  const loaderRef = useRef(null);

  // Získávání dat z tvé databáze s podporou infinite scrollu
  useEffect(() => {
    let isMounted = true;
    
    const loadTransactions = async () => {
      setIsLoading(true);
      try {
        const newData = await fetchMockTransactions(page);
        if (isMounted) {
          // Omezíme max počet stránek na 5, abychom simulovali konec historie
          if (newData.length === 0 || page >= 5) {
            setHasMore(false);
          }
          setTransactions(prev => [...prev, ...newData]);
        }
      } catch (error) {
        console.error("Chyba při načítání historie:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadTransactions();
    
    return () => { isMounted = false; };
  }, [page]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        setPage(prev => prev + 1);
      }
    }, { root: null, rootMargin: '20px', threshold: 0.1 });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => { if (loaderRef.current) observer.unobserve(loaderRef.current); };
  }, [hasMore, isLoading]);

  // Akce modálního okna filtrů
  const handleOpenFilter = () => {
    setTempFilter(activeFilter);
    setIsFilterOpen(true);
  };

  const handleApplyFilter = () => {
    setActiveFilter(tempFilter);
    setIsFilterOpen(false);
  };

  const handleClearFilter = () => {
    const empty = { direction: null, amount: null, period: null };
    setTempFilter(empty);
    setActiveFilter(empty);
    setIsFilterOpen(false);
  };

  // Helper pro čištění částky (např. "-544,20" na číslo 544.20)
  const getNumericAmount = (amountStr) => {
    if (!amountStr) return 0;
    return Math.abs(parseFloat(amountStr.replace(/\s/g, '').replace(',', '.').replace('+', '').replace('CZK', '')));
  };

  // Logika pro vyhledávání a aplikaci filtrů
  const filteredTransactions = useMemo(() => {
    let result = transactions;

    // 1. Textové vyhledávání (např. 'Spotify', 'Platba')
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(tx => 
        (tx.name && tx.name.toLowerCase().includes(query)) || 
        (tx.type && tx.type.toLowerCase().includes(query)) ||
        (tx.amount && tx.amount.includes(query))
      );
    }

    // 2. Filtr směru platby
    if (activeFilter.direction === 'incoming') {
      result = result.filter(tx => !tx.amount.startsWith('-'));
    } else if (activeFilter.direction === 'outgoing') {
      result = result.filter(tx => tx.amount.startsWith('-'));
    }

    // 3. Filtr rozmezí částek
    if (activeFilter.amount === 'do2000') {
      result = result.filter(tx => getNumericAmount(tx.amount) <= 2000);
    } else if (activeFilter.amount === '2000-5000') {
      result = result.filter(tx => getNumericAmount(tx.amount) > 2000 && getNumericAmount(tx.amount) <= 5000);
    } else if (activeFilter.amount === 'nad5000') {
      result = result.filter(tx => getNumericAmount(tx.amount) > 5000);
    }

    return result;
  }, [transactions, searchQuery, activeFilter]);

  // Umělé přiřazení dat pro vizuální oddělovače podle pořadí, 
  // jelikož mockDb nemá vlastní datové pole.
  const groupedTransactions = useMemo(() => {
    return filteredTransactions.reduce((acc, tx, index) => {
      let dateLabel = 'STARŠÍ';
      if (index < 2) dateLabel = 'VČERA';
      else if (index < 6) dateLabel = '17. ČERVENCE, PÁTEK';
      else if (index < 12) dateLabel = 'MINULÝ TÝDEN';
      else dateLabel = 'ČERVEN';

      if (!acc[dateLabel]) acc[dateLabel] = [];
      acc[dateLabel].push(tx);
      return acc;
    }, {});
  }, [filteredTransactions]);

  const FilterPill = ({ label, isActive, onClick }) => (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-[14px] font-medium transition-colors border ${
        isActive 
          ? 'bg-[#ffe600] text-black border-[#ffe600]' 
          : 'bg-[#424651] text-gray-200 border-transparent active:bg-[#4f5462]'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#22252e] text-white font-sans flex flex-col pb-24 relative overflow-x-hidden">
      
      {/* Hlavička */}
      <header className="flex items-center p-4 pt-8 relative">
        <button onClick={() => navigate(-1)} className="text-[#ffe600] p-2 -ml-2 active:bg-[#2c2f38] rounded-full absolute left-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
        </button>
        <h1 className="text-[17px] font-semibold w-full text-center">Běžný účet</h1>
      </header>

      <main className="flex-1 px-4 mt-2">
        {/* Karta účtu */}
        <div className="bg-[#2c2f38] rounded-[20px] p-5 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[15px] font-medium text-gray-200">Běžný účet</span>
            <span className="bg-[#424651] text-gray-300 text-[12px] px-3 py-1 rounded-full font-mono">1036437823/5500</span>
          </div>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-[28px] font-bold tracking-tight">-32 256,04</span>
            <span className="text-[16px] text-gray-300 font-medium">CZK <span className="text-[14px]">🇨🇿</span></span>
          </div>
          <button className="bg-[#ffe600] text-black font-semibold text-[14px] py-2 px-5 rounded-[12px] flex items-center gap-2 active:bg-[#e6cf00] transition-colors w-fit">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            Platba
          </button>
        </div>

        {/* Vyhledávání a filtry */}
        <div className="flex justify-between items-end mb-4 px-1">
          <h2 className="text-[18px] font-bold">Poslední pohyby</h2>
          <button onClick={handleOpenFilter} className="text-[#ffe600] text-[15px] font-medium active:opacity-70 flex items-center gap-1">
            Filtrovat
            {(activeFilter.direction || activeFilter.amount || activeFilter.period) && (
              <span className="w-2 h-2 bg-red-500 rounded-full inline-block"></span>
            )}
          </button>
        </div>

        {/* Search bar */}
        <div className="bg-[#22252e] border border-[#4a4f5a] rounded-[12px] flex items-center px-4 py-3 mb-6 focus-within:border-[#ffe600] transition-colors">
          <svg className="w-5 h-5 text-gray-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input 
            type="text" 
            placeholder="Číslo účtu, příjemce, nebo částka" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-[15px] text-white w-full placeholder-gray-400 font-sans"
          />
        </div>

        {/* Výpis plateb přímo propojený na mockDb strukturu */}
        <div className="space-y-6">
          {Object.entries(groupedTransactions).map(([date, txs]) => (
            <div key={date}>
              <h3 className="text-[13px] font-bold text-gray-300 uppercase tracking-wider mb-3 px-1">{date}</h3>
              <div className="bg-[#2c2f38] rounded-[20px] overflow-hidden shadow-sm">
                {txs.map((tx, index) => {
                  const isNegative = tx.amount.startsWith('-');
                  return (
                    <div key={tx.id} className={`flex items-center justify-between p-4 ${index !== txs.length - 1 ? 'border-b border-[#3e424c]' : ''} active:bg-[#3e424c]/50 transition-colors`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 relative ${tx.iconBg}`}>
                          <span className="text-[16px]">{tx.icon}</span>
                          {tx.badge && tx.badge !== '🚫' && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#ffe600] rounded-full border border-[#2c2f38] flex items-center justify-center text-[8px]">
                              {tx.badge}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-[15px] font-medium leading-tight mb-1">{tx.name}</div>
                          <div className="text-[12px] text-gray-400 font-mono">{tx.type}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-[15px] font-medium ${!isNegative ? 'text-[#4ade80]' : 'text-white'}`}>
                          {tx.amount} CZK
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          
          {Object.keys(groupedTransactions).length === 0 && !isLoading && (
            <div className="text-center text-gray-400 py-8 text-[15px]">Žádné platby nenalezeny.</div>
          )}

          {/* Načítání z DB */}
          {hasMore && (
            <div ref={loaderRef} className="py-6 flex justify-center items-center gap-3">
              {isLoading && (
                <>
                  <svg className="animate-spin h-5 w-5 text-[#ffe600]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-[14px] text-gray-400 font-medium">Načítám transakce...</span>
                </>
              )}
            </div>
          )}
        </div>
      </main>

      {/* FILTER PANEL */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)}></div>
          
          <div className="bg-[#353841] w-full rounded-t-[24px] flex flex-col max-h-[90vh] relative z-10 shadow-2xl">
            <div className="shrink-0 pt-4 pb-4 px-4 border-b border-[#424651]">
              <div className="w-10 h-1 bg-gray-500 rounded-full mx-auto mb-4"></div>
              <div className="flex items-center justify-center relative">
                <button onClick={() => setIsFilterOpen(false)} className="absolute left-0 text-[#ffe600] p-2 -ml-2 active:opacity-70">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
                <h2 className="text-[17px] font-semibold">Filtr</h2>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div>
                <h3 className="text-[15px] font-semibold mb-3">Směr platby</h3>
                <div className="flex flex-wrap gap-2">
                  <FilterPill label="Příchozí" isActive={tempFilter.direction === 'incoming'} onClick={() => setTempFilter({...tempFilter, direction: tempFilter.direction === 'incoming' ? null : 'incoming'})} />
                  <FilterPill label="Odchozí" isActive={tempFilter.direction === 'outgoing'} onClick={() => setTempFilter({...tempFilter, direction: tempFilter.direction === 'outgoing' ? null : 'outgoing'})} />
                </div>
              </div>

              <div>
                <h3 className="text-[15px] font-semibold mb-3">Období</h3>
                <div className="flex flex-wrap gap-2">
                  <FilterPill label="Datum od-do" isActive={tempFilter.period === 'custom'} onClick={() => setTempFilter({...tempFilter, period: tempFilter.period === 'custom' ? null : 'custom'})} />
                  <FilterPill label="Posledních 7 dní" isActive={tempFilter.period === '7d'} onClick={() => setTempFilter({...tempFilter, period: tempFilter.period === '7d' ? null : '7d'})} />
                  <FilterPill label="Posledních 30 dní" isActive={tempFilter.period === '30d'} onClick={() => setTempFilter({...tempFilter, period: tempFilter.period === '30d' ? null : '30d'})} />
                  <FilterPill label="Tento týden" isActive={tempFilter.period === 'week'} onClick={() => setTempFilter({...tempFilter, period: tempFilter.period === 'week' ? null : 'week'})} />
                  <FilterPill label="Tento měsíc" isActive={tempFilter.period === 'month'} onClick={() => setTempFilter({...tempFilter, period: tempFilter.period === 'month' ? null : 'month'})} />
                  <FilterPill label="Tento rok" isActive={tempFilter.period === 'year'} onClick={() => setTempFilter({...tempFilter, period: tempFilter.period === 'year' ? null : 'year'})} />
                </div>
              </div>

              <div>
                <h3 className="text-[15px] font-semibold mb-3">Rozmezí částek</h3>
                <div className="flex flex-wrap gap-2">
                  <FilterPill label="do 2000" isActive={tempFilter.amount === 'do2000'} onClick={() => setTempFilter({...tempFilter, amount: tempFilter.amount === 'do2000' ? null : 'do2000'})} />
                  <FilterPill label="2000 - 5000" isActive={tempFilter.amount === '2000-5000'} onClick={() => setTempFilter({...tempFilter, amount: tempFilter.amount === '2000-5000' ? null : '2000-5000'})} />
                  <FilterPill label="nad 5000" isActive={tempFilter.amount === 'nad5000'} onClick={() => setTempFilter({...tempFilter, amount: tempFilter.amount === 'nad5000' ? null : 'nad5000'})} />
                </div>
              </div>
            </div>

            <div className="shrink-0 flex gap-4 px-4 pt-4 pb-8 bg-[#353841] border-t border-[#424651]">
              <button onClick={handleClearFilter} className="flex-1 bg-[#2c2f38] text-white font-semibold py-3.5 rounded-[16px] active:bg-[#3e424c] transition-colors border border-[#4a4f5a]">
                Vyčistit filtr
              </button>
              <button onClick={handleApplyFilter} className="flex-1 bg-[#ffe600] text-black font-semibold py-3.5 rounded-[16px] active:bg-[#e6cf00] transition-colors shadow-md">
                Filtrovat
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
