import { getPermissions } from './roles'
import { getProfile, upsertProfile, getProfiles, signInWithPassword } from '../services/supabaseService'

const SUPABASE_STORAGE_KEY = 'asy_syifa_auth'
const LEGACY_STORAGE_KEY = 'asy_syifa_auth'

const defaultMockUsersDB = {
  admin: {
    username: 'admin',
    passwordHash: 'a80cb5d9efbeedafc85c83b2d231d865f71404058ee2a0b4f7cd6fa5cb27abb7',
    role: 'Admin',
    name: 'Ahmad Al-Fatih',
    email: 'ahmad.fatih@panua.com',
    phone: '+62 812 3456 7890',
    address: 'Jl. Panua No. 1, Jakarta',
    isActive: true,
    avatar: '',
  },
  operator: {
    username: 'operator',
    passwordHash: '3b5be3236702d3fa03b4732e862a0d8977c90fa3b0f5bb5d751b8d7a116d69cc',
    role: 'Operator',
    name: 'Rahmat Panua',
    email: 'rahmat.p@ops.id',
    phone: '+62 813 1122 3344',
    address: 'Jl. Nelayan No. 5, Surabaya',
    isActive: true,
    avatar: '',
  },
  investor: {
    username: 'investor',
    passwordHash: 'f21462db307cec97575df82bdfb9ccc37d9965649f837bcdc986202bb212c00e',
    role: 'Investor',
    name: 'Siti Yusufina',
    email: 'siti.y@investor.com',
    phone: '+62 811 9988 7766',
    address: 'Jl. Investor No. 10, Bandung',
    isActive: true,
    avatar: '',
  },
  owner: {
    username: 'owner',
    passwordHash: '5f214d6c12ff64a7a835fc8112b84d0da1379da0e39f9121d9f65af46ff78e3b',
    role: 'Owner',
    name: 'Haji Dahlan',
    email: 'haji.dahlan@owner.com',
    phone: '+62 812 3456 7890',
    address: 'Jl. Owner No. 1, Jakarta',
    isActive: true,
    avatar: '',
  },
}

async function hashPassword(password) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'asy-syifa-panua-salt-2024')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

function generateMockToken(user) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(JSON.stringify({
    sub: user.username,
    role: user.role,
    iat: Date.now(),
    exp: Date.now() + 8 * 60 * 60 * 1000,
  }))
  const signature = btoa('mock-signature-' + user.username)
  return `${header}.${payload}.${signature}`
}

function decodeToken(token) {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

function verifyTokenIntegrity(token) {
  const parts = token.split('.')
  if (parts.length !== 3) return false
  try {
    const payload = JSON.parse(atob(parts[1]))
    const expectedSig = btoa('mock-signature-' + payload.sub)
    return parts[2] === expectedSig
  } catch {
    return false
  }
}

let mockUsersDBCache = null

function loadMockUsersDB() {
  if (mockUsersDBCache) return mockUsersDBCache
  mockUsersDBCache = { ...defaultMockUsersDB }
  return mockUsersDBCache
}

function clearMockUsersDBCache() {
  mockUsersDBCache = null
}

async function trySupabaseLogin(username, password) {
  try {
    const result = await signInWithPassword({ email: username, password })
    if (result?.data?.user) {
      const profile = await getProfile(username)
      if (profile) {
        const permissions = getPermissions(profile.role || 'Operator')
        return {
          token: result.data.session?.access_token || generateMockToken(profile),
          user: {
            username: profile.username,
            role: profile.role,
            name: profile.name,
            email: profile.email,
            phone: profile.phone || '',
            address: profile.address || '',
            isActive: profile.is_active !== false,
            avatar: profile.avatar || '',
            permissions,
          },
          expiresAt: result.data.session?.expires_at ? result.data.session.expires_at * 1000 : Date.now() + 8 * 60 * 60 * 1000,
        }
      }
    }
  } catch {
    return null
  }
  return null
}

export async function login(username, password) {
  return new Promise(async (resolve, reject) => {
    if (!username || !password) {
      reject(new Error('Username dan password wajib diisi'))
      return
    }

    const supabaseSession = await trySupabaseLogin(username, password)
    if (supabaseSession) {
      localStorage.setItem(SUPABASE_STORAGE_KEY, JSON.stringify(supabaseSession))
      resolve(supabaseSession)
      return
    }

    setTimeout(async () => {
      const db = loadMockUsersDB()
      const userKey = Object.keys(db).find((k) => k === username) || Object.values(db).find((u) => u.email === username)

      const user = db[userKey] || db[username]

      if (!user) {
        reject(new Error('Username atau password salah'))
        return
      }

      const inputHash = await hashPassword(password)

      if (user.passwordHash !== inputHash) {
        reject(new Error('Username atau password salah'))
        return
      }

      if (!user.isActive) {
        reject(new Error('Akun Anda telah dinonaktifkan. Hubungi administrator.'))
        return
      }

      const token = generateMockToken(user)
      const permissions = getPermissions(user.role)
      const session = {
        token,
        user: {
          username: user.username,
          role: user.role,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          isActive: user.isActive,
          avatar: user.avatar || '',
          permissions,
        },
        expiresAt: Date.now() + 8 * 60 * 60 * 1000,
        tokenHash: await hashPassword(token),
      }

      localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(session))
      resolve(session)
    }, 300)
  })
}

export function logout() {
  localStorage.removeItem(SUPABASE_STORAGE_KEY)
  localStorage.removeItem(LEGACY_STORAGE_KEY)
  clearMockUsersDBCache()
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SUPABASE_STORAGE_KEY)
    if (raw) {
      const session = JSON.parse(raw)
      if (session.expiresAt && Date.now() > session.expiresAt) {
        localStorage.removeItem(SUPABASE_STORAGE_KEY)
        return null
      }
      return session
    }
    const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY)
    if (legacyRaw) {
      const session = JSON.parse(legacyRaw)
      if (Date.now() > session.expiresAt) {
        localStorage.removeItem(LEGACY_STORAGE_KEY)
        localStorage.removeItem(LEGACY_STORAGE_KEY)
        return null
      }
      if (!verifyTokenIntegrity(session.token)) {
        localStorage.removeItem(SUPABASE_STORAGE_KEY)
        localStorage.removeItem(LEGACY_STORAGE_KEY)
        return null
      }
      return session
    }
    return null
  } catch {
    return null
  }
}

export function isAuthenticated() {
  const session = getSession()
  return session !== null && session.token !== null
}

export function getCurrentUser() {
  const session = getSession()
  return session ? session.user : null
}

export function getToken() {
  const session = getSession()
  return session ? session.token : null
}

export function isTokenExpired() {
  const session = getSession()
  if (!session) return true
  return Date.now() > session.expiresAt
}

export function hasPermission(permission) {
  const user = getCurrentUser()
  if (!user || !user.permissions) return false
  return user.permissions[permission] === true
}

export async function updateProfile(updatedData) {
  const session = getSession()
  if (!session) return false

  const username = session.user.username

  try {
    await upsertProfile({ username, ...updatedData })
  } catch {
    const db = getMockUsersDB()
    const user = db[username]
    if (user) {
      Object.assign(user, updatedData)
    }
  }

  const db = loadMockUsersDB()
  const user = db[username]
  if (!user) return false

  const permissions = getPermissions(user.role)
  session.user = {
    username: user.username,
    role: user.role,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    isActive: user.isActive,
    avatar: user.avatar || '',
    permissions,
  }

  localStorage.setItem(SUPABASE_STORAGE_KEY, JSON.stringify(session))
  localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(session))
  window.dispatchEvent(new CustomEvent('usersUpdated'))
  clearMockUsersDBCache()
  return true
}

export async function toggleUserStatus(username) {
  try {
    const profiles = await getProfiles()
    const profile = profiles.find((p) => p.username === username)
    if (profile) {
      const newStatus = !profile.is_active
      await upsertProfile({ ...profile, is_active: newStatus })
      return newStatus
    }
  } catch {
    const db = loadMockUsersDB()
    const user = db[username]
    if (!user) return false
    user.isActive = !user.isActive
    return user.isActive
  }

  const db = loadMockUsersDB()
  const user = db[username]
  if (!user) return false
  user.isActive = !user.isActive
  return user.isActive
}

export function getMockUsersDB() {
  return loadMockUsersDB()
}

export function forgotPassword(email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || !email.trim()) {
        reject(new Error('Email wajib diisi'))
        return
      }

      const foundUser = Object.values(loadMockUsersDB()).find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      )

      if (!foundUser) {
        reject(new Error('Email tidak terdaftar dalam sistem'))
        return
      }

      if (!foundUser.isActive) {
        reject(new Error('Akun Anda telah dinonaktifkan. Hubungi administrator.'))
        return
      }

      resolve({
        message: 'Link reset kata sandi telah dikirim ke email Anda.',
        email: foundUser.email,
        username: foundUser.username,
      })
    }, 1500)
  })
}
