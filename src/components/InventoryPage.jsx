import React, { useState } from 'react'

function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('Semua')

  const inventoryData = [
    { name: 'Kerapu Sunu', id: 'INV-001', category: 'Ikan Hias', stock: '450 kg', price: 'Rp 125.000/kg', status: 'Tersedia', statusBg: 'bg-[#E8F5E9]', statusText: 'text-[#28A745]' },
    { name: 'Tongkol Abu-abu', id: 'INV-002', category: 'Ikan Kering', stock: '1.200 kg', price: 'Rp 32.500/kg', status: 'Tersedia', statusBg: 'bg-[#E8F5E9]', statusText: 'text-[#28A745]' },
    { name: 'Tuna Yellowfin', id: 'INV-003', category: 'Ikan Segar', stock: '12 kg', price: 'Rp 85.000/kg', status: 'Stok Rendah', statusBg: 'bg-[#FDEDEC]', statusText: 'text-[#DC3545]' },
    { name: 'Kakap Merah', id: 'INV-004', category: 'Ikan Hias', stock: '340 kg', price: 'Rp 55.000/kg', status: 'Tersedia', statusBg: 'bg-[#E8F5E9]', statusText: 'text-[#28A745]' },
    { name: 'Cakalang', id: 'INV-005', category: 'Ikan Kering', stock: '2.150 kg', price: 'Rp 28.000/kg', status: 'Tersedia', statusBg: 'bg-[#E8F5E9]', statusText: 'text-[#28A745]' },
    { name: 'Layang', id: 'INV-006', category: 'Ikan Segar', stock: '0 kg', price: 'Rp 45.000/kg', status: 'Habis', statusBg: 'bg-error-container', statusText: 'text-error' },
  ]

  const categories = ['Semua', 'Ikan Segar', 'Ikan Kering', 'Ikan Hias']

  const filtered = inventoryData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'Semua' || item.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="px-margin-mobile pt-lg animate-fade-in">
      <div className="mb-lg">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Inventaris Stok</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">Kelola stok dan persediaan komoditas perikanan.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-md mb-lg">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            className="w-full pl-10 pr-md py-md bg-surface-container-lowest border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md transition-all"
            placeholder="Cari nama atau ID inventaris..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-md font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-gutter mb-lg">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
          <p className="font-label-md text-on-surface-variant uppercase mb-xs">Total Item</p>
          <p className="font-display-financial text-display-financial text-primary">{inventoryData.length}</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
          <p className="font-label-md text-on-surface-variant uppercase mb-xs">Stok Habis</p>
          <p className="font-display-financial text-display-financial text-error">{inventoryData.filter((i) => i.status === 'Habis').length}</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left zebra-table border-collapse">
            <thead className="bg-surface-container-low border-b-2 border-primary">
              <tr>
                <th className="px-md py-sm font-financial-table text-secondary whitespace-nowrap">Nama Barang</th>
                <th className="px-md py-sm font-financial-table text-secondary whitespace-nowrap">Kategori</th>
                <th className="px-md py-sm font-financial-table text-secondary text-right">Stok</th>
                <th className="px-md py-sm font-financial-table text-secondary text-right">Harga/kg</th>
                <th className="px-md py-sm font-financial-table text-secondary text-center">Status</th>
              </tr>
            </thead>
            <tbody className="font-body-md">
              {filtered.map((item) => (
                <tr key={item.id} className="active:bg-surface-container-high transition-colors">
                  <td className="px-md py-md">
                    <div className="flex flex-col">
                      <span className="font-bold text-on-surface">{item.name}</span>
                      <span className="text-xs text-on-surface-variant">ID: {item.id}</span>
                    </div>
                  </td>
                  <td className="px-md py-md font-body-md text-body-md text-on-surface-variant">{item.category}</td>
                  <td className="px-md py-md text-right font-headline-md text-headline-md text-on-surface">{item.stock}</td>
                  <td className="px-md py-md text-right font-financial-table text-financial-table text-on-surface">{item.price}</td>
                  <td className="px-md py-md text-center">
                    <span className={`px-sm py-xs ${item.statusBg} ${item.statusText} font-label-md text-label-md rounded-full uppercase`}>{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-lg">
          <p className="font-body-md text-body-md text-on-surface-variant">Tidak ada data inventaris ditemukan</p>
        </div>
      )}
    </div>
  )
}

export default InventoryPage