import React, { useState } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { Preferences } from '@capacitor/preferences';

export default function UpdateScreen({ onComplete }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleCancel = async () => {
        // Nativní ukončení aplikace pro Android
        await CapacitorApp.exitApp();
    };

    const handleUpdate = () => {
        setIsUpdating(true);
        let current = 0;
        
        // Falešný průběh aktualizace (každých 300ms přidá 5-15%)
        const interval = setInterval(async () => {
            current += Math.floor(Math.random() * 15) + 5;
            
            if (current >= 100) {
                current = 100;
                setProgress(current);
                clearInterval(interval);
                
                // Uložíme do paměti telefonu, že aktualizace proběhla
                await Preferences.set({ key: 'simulated_update_done', value: 'true' });
                
                // Krátká prodleva pro lepší pocit před přepnutím
                setTimeout(() => {
                    onComplete();
                }, 800);
            } else {
                setProgress(current);
            }
        }, 300);
    };

    return (
        <div className="min-h-screen bg-[#22252e] text-white font-sans flex flex-col justify-center items-center p-6 relative overflow-hidden">
            {/* Dekorativní pozadí */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3b82f6]/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="w-20 h-20 bg-[#2c2f38] rounded-[24px] flex items-center justify-center mb-8 shadow-lg border border-[#3e424c]">
                <svg className="w-10 h-10 text-[#ffe600]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
            </div>

            <h1 className="text-[24px] font-bold mb-4 text-center">Aktualizace zabezpečení</h1>
            
            {!isUpdating ? (
                <>
                    <p className="text-gray-400 text-[15px] text-center mb-10 leading-relaxed">
                        Je k dispozici nová verze bankovní aplikace rBank. Z důvodu ochrany vašich financí a nových bezpečnostních standardů je nutné před přihlášením provést aktualizaci.
                    </p>

                    <div className="w-full space-y-4 w-full max-w-sm">
                        <button 
                            onClick={handleUpdate} 
                            className="w-full bg-[#ffe600] hover:bg-[#e6cf00] text-black font-bold py-4 rounded-[16px] transition-colors shadow-lg"
                        >
                            Aktualizovat nyní
                        </button>
                        <button 
                            onClick={handleCancel} 
                            className="w-full bg-transparent text-gray-400 font-medium py-4 rounded-[16px] active:bg-[#2c2f38] transition-colors"
                        >
                            Zrušit a ukončit
                        </button>
                    </div>
                </>
            ) : (
                <div className="w-full max-w-sm mt-4">
                    <div className="flex justify-between items-end mb-3">
                        <span className="text-gray-300 font-medium text-[15px]">Stahování balíčku...</span>
                        <span className="font-bold text-[#ffe600] text-[18px]">{progress}%</span>
                    </div>
                    
                    <div className="w-full bg-[#2c2f38] h-3 rounded-full overflow-hidden border border-[#3e424c] shadow-inner">
                        <div 
                            className="bg-[#ffe600] h-full rounded-full transition-all duration-300 ease-out" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="text-gray-500 text-[13px] text-center mt-6">Aplikaci nyní nezavírejte.</p>
                </div>
            )}
        </div>
    );
}
