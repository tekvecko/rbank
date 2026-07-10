import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';
import { Toast } from '@capacitor/toast';

import Dashboard from './pages/Dashboard';
import History from './pages/History';
import { Payment, CardDetail, SavingsGoals, BuildingSavings } from './pages/BankingModules';
import { Offers, InfoZone, Menu, Profile } from './pages/UserModules';

// Komponenta pro zpracování hardwarového tlačítka Zpět
function BackButtonHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Držíme si aktuální cestu v referenci, aby se nemusel neustále re-vytvářet event listener
  const currentPath = useRef(location.pathname);
  const lastBackPress = useRef(0);

  useEffect(() => {
    currentPath.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    const handleBackButton = async () => {
      // Jsme na hlavní obrazovce?
      if (currentPath.current === '/') {
        const now = new Date().getTime();
        // Pokud bylo Zpět stisknuto znovu do 2 vteřin, ukončíme aplikaci
        if (now - lastBackPress.current < 2000) {
          await CapacitorApp.exitApp();
        } else {
          lastBackPress.current = now;
          await Toast.show({
            text: 'Stiskněte Zpět ještě jednou pro ukončení',
            duration: 'short',
            position: 'bottom'
          });
        }
      } else {
        // Nejsme na domovské obrazovce, jdeme prostě o krok zpět v historii
        navigate(-1);
      }
    };

    // Zaregistrování listeneru v nativním API Capacitoru
    const listenerPromise = CapacitorApp.addListener('backButton', handleBackButton);

    // Cleanup při odpojení (i když App.jsx se typicky neodpojuje)
    return () => {
      listenerPromise.then(listener => listener.remove());
    };
  }, [navigate]);

  // Tato komponenta nic nevykresluje, je to pouze logický wrapper
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Náš nový neviditelný handler musí být uvnitř BrowserRouteru */}
      <BackButtonHandler />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/info" element={<InfoZone />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/savings-goals" element={<SavingsGoals />} />
        <Route path="/building-savings" element={<BuildingSavings />} />
        <Route path="/card" element={<CardDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
