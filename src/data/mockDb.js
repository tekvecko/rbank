const mockTransactions = [
  { id: '1', name: 'Spotify', type: 'Platba', amount: '-544,20', subAmount: '-30,00 CZK', color: 'text-white', iconBg: 'bg-[#1DB954]', icon: '🎵', badge: '🛒' },
  { id: '2', name: 'Raiffeisen', type: 'Platba', amount: '+31 000,00', color: 'text-[#4ade80]', iconBg: 'bg-[#ffe600]', icon: '✖', badge: '🚫' },
  { id: '3', name: 'Antonín Veselý', type: '3667788888/0600', amount: '-1 050,00', color: 'text-white', iconBg: 'bg-[#3e424c]', icon: '👤', badge: '🚫' },
  { id: '4', name: 'Netflix', type: 'Platba', amount: '-444,00', color: 'text-white', iconBg: 'bg-black', icon: 'N', badge: '🛒' },
  { id: '5', name: 'Benzina', type: 'Platba kartou', amount: '-1 455,20', color: 'text-white', iconBg: 'bg-white', icon: '⛽', badge: '🚗' },
  { id: '6', name: 'Dr.Max', type: 'Platba kartou', amount: '-95,00', color: 'text-white', iconBg: 'bg-[#00963f]', icon: '💊', badge: '🛒' },
];

// Generátor dalších náhodných položek pro nekonečný scroll
export const fetchMockTransactions = async (page) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Vytvoříme unikátní ID pro nové položky na základě stránky
      const paginatedData = mockTransactions.map(tx => ({
        ...tx,
        id: `${tx.id}-${page}`
      }));
      resolve(paginatedData);
    }, 800); // Simulace zpoždění databáze 800ms
  });
};
