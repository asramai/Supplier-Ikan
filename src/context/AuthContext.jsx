import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { isAuthenticated, getCurrentUser, getToken, login as apiLogin, logout as apiLogout, isTokenExpired, getSession, hasPermission } from '../utils/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authenticated = isAuthenticated()
    if (authenticated && !isTokenExpired()) {
      const session = getSession()
      if (session && session.user && !session.user.isActive) {
        apiLogout()
        setUser(null)
        setToken(null)
      } else {
        setUser(getCurrentUser())
        setToken(getToken())
      }
    }
    setLoading(false)
  }, [])

  const refreshUser = useCallback(() => {
    const session = getSession()
    if (session && session.user) {
      setUser(session.user)
    }
  }, [])

  const signIn = useCallback(async (username, password) => {
    const session = await apiLogin(username, password)
    setUser(session.user)
    setToken(session.token)
    return session
  }, [])

  const signOut = useCallback(() => {
    apiLogout()
    setUser(null)
    setToken(null)
  }, [])

  const can = useCallback((permission) => {
    return hasPermission(permission)
  }, [])

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user && !!token && user.isActive !== false,
    signIn,
    signOut,
    refreshUser,
    can,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
