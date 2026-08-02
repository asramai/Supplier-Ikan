export const mitraData = {
  nelayan: [
    { name: 'Haji Sulaiman', phone: '+62 812 3456 7890', status: 'Aktif' },
    { name: 'Syamsul Bahri', phone: '+62 812 3456 7891', status: 'Aktif' },
    { name: 'Udin Sedunia', phone: '+62 812 3456 7892', status: 'Aktif' },
    { name: 'Abdullah Hasan', phone: '+62 812 3456 7893', status: 'Aktif' },
    { name: 'Budi Santoso', phone: '+62 812 3456 7894', status: 'Tidak Aktif' },
  ],
  vendor: [
    { name: 'FreshFish Jakarta', phone: '+62 21 788 9900', status: 'Aktif' },
    { name: 'Kota Ikan Makassar', phone: '+62 411 123 4567', status: 'Aktif' },
    { name: 'Surabaya Seafood', phone: '+62 31 987 6543', status: 'Aktif' },
    { name: 'Pasar Ikan Bandung', phone: '+62 22 456 7890', status: 'Tidak Aktif' },
  ],
}

export function getNelayanList() {
  return mitraData.nelayan.filter((n) => n.status === 'Aktif')
}

export function getVendorList() {
  return mitraData.vendor.filter((v) => v.status === 'Aktif')
}

export function getNelayanByName(name) {
  return mitraData.nelayan.find((n) => n.name === name) || null
}

export function getVendorByName(name) {
  return mitraData.vendor.find((v) => v.name === name) || null
}