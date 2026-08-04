import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { SidebarProvider, useSidebar } from './context/SidebarContext'
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
import RoleSettings from './components/RoleSettings'
import FishData from './components/FishData'
import InventoryPage from './components/InventoryPage'
import InvestorPortal from './components/InvestorPortal'
import ProfileSettings from './components/ProfileSettings'
import ProfileDetail from './components/ProfileDetail'
import JualForm from './components/JualForm'
import IdentitasPT from './components/IdentitasPT'
import ProtectedRoute from './components/ProtectedRoute'
import { SkeletonLoader, StatCardSkeleton } from './components/SkeletonLoader'

const PAGES_WITHOUT_NAV = ['/login']

function Dashboard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <main className="px-margin-mobile pt-lg flex flex-col gap-lg">
        <div className="grid grid-cols-2 gap-md">
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
        <div className="bg-surface border border-outline-variant rounded-xl p-md">
          <SkeletonLoader variant="text" width="40%" height="18" />
          <div className="mt-md space-y-sm">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-md p-md">
                <SkeletonLoader variant="text" width="25%" height="16" />
                <SkeletonLoader variant="text" width="25%" height="16" />
                <SkeletonLoader variant="text" width="20%" height="16" />
                <SkeletonLoader variant="text" width="20%" height="16" />
              </div>
            ))}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="px-margin-mobile pt-lg flex flex-col gap-lg">
      <NetProfitCard />
      <StatCards />
      <PurchasesTable />
      <StatusChips />
    </main>
  )
}

function AppContent() {
  const location = useLocation()
  const showNav = !PAGES_WITHOUT_NAV.includes(location.pathname)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024
  const { collapsed } = useSidebar()

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-32">
      {showNav && <Header />}
      <div className={`transition-all duration-300 ease-in-out ${isMobile ? 'pl-0' : collapsed ? 'pl-16' : 'pl-48'}`}>
        <div className="animate-fade-in">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute permission="dashboard">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/beli"
              element={
                <ProtectedRoute permission="beli">
                  <PurchaseForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jual"
              element={
                <ProtectedRoute permission="jual">
                  <JualForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/laporan"
              element={
                <ProtectedRoute permission="laporan">
                  <LaporanLabaRugi />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mitra"
              element={
                <ProtectedRoute permission="mitra">
                  <MitraManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute permission="users">
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/roles"
              element={
                <ProtectedRoute permission="manageUsers">
                  <RoleSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inventory"
              element={
                <ProtectedRoute permission="inventory">
                  <InventoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/invest"
              element={
                <ProtectedRoute permission="invest">
                  <InvestorPortal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute permission="profile">
                  <ProfileSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/detail"
              element={
                <ProtectedRoute permission="profile">
                  <ProfileDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/data"
              element={
                <ProtectedRoute permission="data">
                  <FishData />
                </ProtectedRoute>
              }
            />
            <Route
              path="/identitas"
              element={
                <ProtectedRoute permission="identitas">
                  <IdentitasPT />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
      {showNav && <BottomNav />}
      <FAB />
    </div>
  )
}

function App() {
  return (
    <SidebarProvider>
      <AppContent />
    </SidebarProvider>
  )
}

export default App