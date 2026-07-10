import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import { Payment, CardDetail, SavingsGoals, BuildingSavings } from './pages/BankingModules';
import { Offers, InfoZone, Menu, Profile } from './pages/UserModules';

export default function App() {
  return (
    <BrowserRouter>
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
