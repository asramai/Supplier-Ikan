import React from 'react'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import NetProfitCard from './components/NetProfitCard'
import StatCards from './components/StatCards'
import PurchasesTable from './components/PurchasesTable'
import StatusChips from './components/StatusChips'
import FAB from './components/FAB'

function App() {
  return (
    <div className="bg-surface text-on-surface min-h-screen pb-32">
      <Header />
      <main className="px-margin-mobile pt-lg flex flex-col gap-lg">
        <NetProfitCard />
        <StatCards />
        <PurchasesTable />
        <StatusChips />
      </main>
      <FAB />
      <BottomNav />
    </div>
  )
}

export default App