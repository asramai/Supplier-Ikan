import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { hasRolePermission } from '../utils/roles'

function ProtectedRoute({ children, permission }) {
  const { isAuthenticated, loading, user } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-primary-container border-t-transparent rounded-full animate-spin-slow"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (permission && user && !hasRolePermission(user.role, permission)) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute