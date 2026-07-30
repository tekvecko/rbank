import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';
import { Preferences } from '@capacitor/preferences';
import PinScreen from './components/PinScreen';
import UpdateScreen from './components/UpdateScreen';
import { Toast } from '@capacitor/toast';

import Dashboard from './pages/Dashboard';
import History from './pages/History';
import BulkStatements from './pages/BulkStatements';
import Card from './pages/Card';
import { Payment, SavingsGoals, BuildingSavings } from './pages/BankingModules';
import {
  Offers, OfferDetail, InfoZone, Menu, Profile,
  TravelInsurance, MinuteLoan, SystemOutage,
  ExchangeRates, BranchesATMs, Settings, Support
} from './pages/UserModules';

function BackButtonHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = useRef(location.pathname);
  const lastBackPress = useRef(0);

  useEffect(() => {
    currentPath.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    const handleBackButton = async () => {
      if (currentPath.current === '/') {
        const now = new Date().getTime();
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
        navigate(-1);
      }
    };

    const listenerPromise = CapacitorApp.addListener('backButton', handleBackButton);

    return () => {
      listenerPromise.then(listener => listener.remove());
    };
  }, [navigate]);

  return null;
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [updateChecked, setUpdateChecked] = useState(false);
  const [needsUpdate, setNeedsUpdate] = useState(false);

  // --- KONTROLA SIMULOVANÉ AKTUALIZACE PŘI STARTU ---
  useEffect(() => {
    const checkSimulatedUpdate = async () => {
      try {
        const { value } = await Preferences.get({ key: 'simulated_update_done' });
        if (!value) {
          setNeedsUpdate(true);
        }
      } catch (e) {
        console.warn('Preferences plugin not available', e);
      } finally {
        setUpdateChecked(true);
      }
    };
    checkSimulatedUpdate();
  }, []);

  useEffect(() => {
    const listenerPromise = CapacitorApp.addListener('appStateChange', ({ isActive }) => {
      if (!isActive) {
        setAuthenticated(false);
      }
    });

    return () => {
      listenerPromise.then(listener => listener.remove());
    };
  }, []);

  // Blokace obrazovky, dokud se nezjistí stav (zamezuje probliknutí PINu)
  if (!updateChecked) {
    return <div className="min-h-screen bg-[#22252e]"></div>;
  }

  // Zobrazení simulační obrazovky
  if (needsUpdate) {
    return <UpdateScreen onComplete={() => setNeedsUpdate(false)} />;
  }

  // Standardní tok aplikace
  if (!authenticated) {
    return <PinScreen onAuthenticated={() => setAuthenticated(true)} />;
  }

  return (
    <BrowserRouter>
      <BackButtonHandler />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/offer-detail" element={<OfferDetail />} />
        <Route path="/info" element={<InfoZone />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bulk-statements" element={<BulkStatements />} />
        <Route path="/savings-goals" element={<SavingsGoals />} />
        <Route path="/building-savings" element={<BuildingSavings />} />
        <Route path="/card" element={<Card />} />
        <Route path="/travel-insurance" element={<TravelInsurance />} />
        <Route path="/minute-loan" element={<MinuteLoan />} />
        <Route path="/system-outage" element={<SystemOutage />} />
        <Route path="/exchange-rates" element={<ExchangeRates />} />
        <Route path="/branches" element={<BranchesATMs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </BrowserRouter>
  );
}
