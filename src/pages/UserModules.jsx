import React from 'react';

export default function UserModules() {
  // Definice kategorií podle nového designu
  const categories = [
    { id: 1, title: 'Úvěry a hypotéky', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
    { id: 2, title: 'Karty', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
    { id: 3, title: 'Účty a spoření', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 4, title: 'Investice', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { id: 5, title: 'Pojištění', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { id: 6, title: 'Tipy pro Vás', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
    { id: 7, title: 'Dětský účet', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', badge: 'Novinka' },
    { id: 8, title: 'Doporučte nás', icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8' }
  ];

  return (
    <div className="min-h-screen bg-[#22252e] text-white pb-24">
      <header className="flex items-center justify-center p-4">
        <h1 className="text-lg font-semibold">Nabídky</h1>
      </header>
      
      <main className="px-4 mt-2">
        <h2 className="text-xl font-bold mb-6">Vyberte kategorii</h2>
        
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="bg-[#2c2f38] rounded-2xl p-4 flex flex-col items-center justify-center aspect-[5/4] relative active:bg-[#3e424c] transition-colors"
            >
              {cat.badge && (
                <span className="absolute top-2 right-2 bg-green-700/80 border border-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                  {cat.badge}
                </span>
              )}
              <div className="w-14 h-14 mb-3 flex items-center justify-center">
                {/* Zástupná ikona SVG, barvu volíme neutrální se žlutým akcentem */}
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d={cat.icon} />
                </svg>
              </div>
              <span className="text-sm text-center font-medium text-gray-200">{cat.title}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
