import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navItems = [
    { path: '/', label: 'Přehled', icon: <path d="M12 3L4 9v12h5v-7h6v7h5V9z" />, isFill: true },
    { path: '/payment', label: 'Platba', icon: <path d="M14 7h5v5M19 7l-7 7M10 17H5v-5M5 17l7-7" />, isFill: false },
    { path: '/offers', label: 'Nabídky', icon: <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>, isFill: false },
    { path: '/info', label: 'InfoZóna', icon: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M9 9l6 6M15 9l-6 6" /></>, isFill: false },
    { path: '/menu', label: 'Menu', icon: <><circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /></>, isFill: true }
  ];

  return (
    <nav className="fixed bottom-0 z-50 w-full bg-[#22252e] flex justify-between px-2 pb-2 pt-3 border-t border-[#2c2f38]">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <button key={item.path} onClick={() => navigate(item.path)} className={`flex flex-col items-center gap-1 w-16 ${isActive ? '' : 'mt-1.5'}`}>
            {isActive ? (
              <div className="bg-[#3e424c] px-4 py-1.5 rounded-full flex items-center justify-center mb-0.5 text-white">
                <svg className="w-[20px] h-[20px]" fill={item.isFill ? "currentColor" : "none"} stroke={item.isFill ? "none" : "currentColor"} strokeWidth={item.isFill ? "0" : "2"} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">{item.icon}</svg>
              </div>
            ) : (
              <svg className="w-[22px] h-[22px] mb-1 text-gray-400" fill={item.isFill ? "currentColor" : "none"} stroke={item.isFill ? "none" : "currentColor"} strokeWidth={item.isFill ? "0" : "2"} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">{item.icon}</svg>
            )}
            <span className={`text-[10px] ${isActive ? 'font-medium text-white' : 'text-gray-400'}`}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
