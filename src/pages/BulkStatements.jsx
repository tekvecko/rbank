import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BulkStatements() {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Simulovaná data (zde by bylo volání tvého API pro seznam výpisů)
  const statements = [
    { id: '2026-07', date: 'Červenec 2026', size: '124 KB' },
    { id: '2026-06', date: 'Červen 2026', size: '142 KB' },
    { id: '2026-05', date: 'Květen 2026', size: '138 KB' }
  ];

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleDownloadSelected = async () => {
    if (selectedIds.length === 0) return;
    
    // Tady bude volání tvého backendu
    console.log("Stahuji výpisy:", selectedIds);
    alert(`Stahuji ${selectedIds.length} výpisů...`);
  };

  return (
    <div className="min-h-screen bg-[#22252e] text-white p-4 pt-10">
      <h2 className="text-xl font-bold mb-6">Výběr výpisů k exportu</h2>
      <div className="space-y-3">
        {statements.map(s => (
          <div key={s.id} className="bg-[#2c2f38] p-4 rounded-xl flex items-center justify-between">
            <label className="flex items-center gap-4">
              <input 
                type="checkbox" 
                checked={selectedIds.includes(s.id)}
                onChange={() => toggleSelect(s.id)}
                className="w-5 h-5 accent-[#ffe600]"
              />
              <div>
                <p className="font-medium">{s.date}</p>
                <p className="text-xs text-gray-400">{s.size}</p>
              </div>
            </label>
          </div>
        ))}
      </div>
      <button 
        onClick={handleDownloadSelected}
        disabled={selectedIds.length === 0}
        className="w-full mt-8 bg-[#ffe600] text-black py-4 rounded-xl font-bold disabled:opacity-50"
      >
        Stáhnout vybrané ({selectedIds.length})
      </button>
    </div>
  );
}
