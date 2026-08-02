import { getPermissions } from './roles'

const STORAGE_KEY = 'asy_syifa_auth'

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

const mockUsersDB = {
  admin: {
    username: 'admin',
    password: 'admin123',
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
    password: 'oper123',
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
    password: 'invest123',
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
    password: 'owner123',
    role: 'Owner',
    name: 'Haji Dahlan',
    email: 'haji.dahlan@owner.com',
    phone: '+62 812 3456 7890',
    address: 'Jl. Owner No. 1, Jakarta',
    isActive: true,
    avatar: '',
  },
}

export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!username || !password) {
        reject(new Error('Username dan password wajib diisi'))
        return
      }

      const user = mockUsersDB[username]

      if (!user || user.password !== password) {
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
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
      resolve(session)
    }, 800)
  })
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY)
}

export function getSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const session = JSON.parse(raw)

    if (Date.now() > session.expiresAt) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }

    return session
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

export function updateProfile(updatedData) {
  const session = getSession()
  if (!session) return false

  const user = mockUsersDB[session.user.username]
  if (!user) return false

  Object.assign(user, updatedData)

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

  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  window.dispatchEvent(new CustomEvent('usersUpdated'))
  return true
}

export function toggleUserStatus(username) {
  const user = mockUsersDB[username]
  if (!user) return false
  user.isActive = !user.isActive
  return user.isActive
}

export function getMockUsersDB() {
  return mockUsersDB
}