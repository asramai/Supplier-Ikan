const ROLES = {
  ADMIN: 'Admin',
  OWNER: 'Owner',
  OPERATOR: 'Operator',
  INVESTOR: 'Investor',
}

const PERMISSIONS = {
  [ROLES.ADMIN]: {
    dashboard: true,
    beli: true,
    jual: true,
    data: true,
    inventory: true,
    mitra: true,
    users: true,
    laporan: true,
    invest: true,
    identitas: true,
    profile: true,
    manageUsers: true,
    manageMitra: true,
    manageIdentity: true,
  },
  [ROLES.OWNER]: {
    dashboard: true,
    beli: true,
    jual: true,
    data: true,
    inventory: true,
    mitra: true,
    users: true,
    laporan: true,
    invest: true,
    identitas: true,
    profile: true,
    manageUsers: true,
    manageMitra: true,
    manageIdentity: true,
  },
  [ROLES.OPERATOR]: {
    dashboard: true,
    beli: true,
    jual: true,
    data: true,
    inventory: true,
    mitra: true,
    users: true,
    laporan: true,
    invest: false,
    identitas: false,
    profile: true,
    manageUsers: false,
    manageMitra: false,
    manageIdentity: false,
  },
  [ROLES.INVESTOR]: {
    dashboard: true,
    beli: false,
    jual: false,
    data: true,
    inventory: true,
    mitra: false,
    users: false,
    laporan: true,
    invest: true,
    identitas: false,
    profile: true,
    manageUsers: false,
    manageMitra: false,
    manageIdentity: false,
  },
}

const MENU_ITEMS = [
  { path: '/', label: 'Home', icon: 'dashboard', permission: 'dashboard', weight: 'fill' },
  { path: '/data', label: 'Data', icon: 'database', permission: 'data', weight: undefined },
  { path: '/beli', label: 'Beli', icon: 'shopping_cart', permission: 'beli', weight: 'fill' },
  { path: '/jual', label: 'Jual', icon: 'payments', permission: 'jual', weight: undefined },
  { path: '/laporan', label: 'Laporan', icon: 'assessment', permission: 'laporan', weight: undefined },
  { path: '/mitra', label: 'Mitra', icon: 'groups', permission: 'mitra', weight: 'fill' },
  { path: '/users', label: 'Master', icon: 'group', permission: 'users', weight: 'fill' },
  { path: '/inventory', label: 'Inventaris', icon: 'inventory_2', permission: 'inventory', weight: 'fill' },
  { path: '/invest', label: 'Investasi', icon: 'monitoring', permission: 'invest', weight: 'fill' },
  { path: '/identitas', label: 'Identitas', icon: 'badge', permission: 'identitas', weight: undefined },
]

export function getPermissions(role) {
  return PERMISSIONS[role] || PERMISSIONS[ROLES.INVESTOR]
}

export function hasRolePermission(role, permission) {
  const permissions = getPermissions(role)
  return permissions[permission] === true
}

export function getMenuItems(role) {
  return MENU_ITEMS.filter((item) => hasRolePermission(role, item.permission))
}

export function getAccessibleRoutes(role) {
  return MENU_ITEMS.filter((item) => hasRolePermission(role, item.permission)).map((item) => item.path)
}

export { ROLES, PERMISSIONS, MENU_ITEMS }