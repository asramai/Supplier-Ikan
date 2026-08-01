import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import NetProfitCard from './components/NetProfitCard'
import StatCards from './components/StatCards'
import PurchasesTable from './components/PurchasesTable'
import StatusChips from './components/StatusChips'
import FAB from './components/FAB'
import PurchaseForm from './components/PurchaseForm'

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
  return (
    <div className="bg-surface text-on-surface min-h-screen pb-32">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/beli" element={<PurchaseForm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <FAB />
      <BottomNav />
    </div>
  )
}

export default App