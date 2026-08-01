import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import NetProfitCard from './components/NetProfitCard'
import StatCards from './components/StatCards'
import PurchasesTable from './components/PurchasesTable'
import StatusChips from './components/StatusChips'
import FAB from './components/FAB'
import PurchaseForm from './components/PurchaseForm'
import LaporanLabaRugi from './components/LaporanLabaRugi'
import Login from './components/Login'
import MitraManagement from './components/MitraManagement'
import UserManagement from './components/UserManagement'
import FishData from './components/FishData'

const PAGES_WITHOUT_NAV = ['/login']

function Dashboard() {
  return (
    <main className="px-margin-mobile pt-lg flex flex-col gap-lg">
      <NetProfitCard />
      <StatCards />
      <PurchasesTable />
      <StatusChips />
    </main>
  )
}

function App() {
  const location = useLocation()
  const showNav = !PAGES_WITHOUT_NAV.includes(location.pathname)

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-32">
      {showNav && <Header />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/beli" element={<PurchaseForm />} />
        <Route path="/laporan" element={<LaporanLabaRugi />} />
        <Route path="/mitra" element={<MitraManagement />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/inventory" element={<FishData />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {showNav && <FAB />}
      {showNav && <BottomNav />}
    </div>
  )
}

export default App