import React, { useState } from 'react'

function FishData() {
  const [searchTerm, setSearchTerm] = useState('')
  const [quickFilter, setQuickFilter] = useState('Semua')

  const fishData = [
    { name: 'Kerapu Sunu', id: 'FR-001', grade: 'A', gradeBg: 'bg-tertiary-container/10', gradeText: 'text-tertiary', price: 'Rp 125.000', stock: '450', stockColor: '' },
    { name: 'Tongkol Abu-abu', id: 'FR-002', grade: 'B', gradeBg: 'bg-outline-variant/30', gradeText: 'text-on-surface-variant', price: 'Rp 32.500', stock: '1.200', stockColor: '' },
    { name: 'Tuna Yellowfin', id: 'FR-003', grade: 'A', gradeBg: 'bg-tertiary-container/10', gradeText: 'text-tertiary', price: 'Rp 85.000', stock: '12', stockColor: 'text-error' },
    { name: 'Kakap Merah', id: 'FR-004', grade: 'C', gradeBg: 'bg-error-container/20', gradeText: 'text-error', price: 'Rp 55.000', stock: '340', stockColor: '' },
    { name: 'Cakalang', id: 'FR-005', grade: 'B', gradeBg: 'bg-outline-variant/30', gradeText: 'text-on-surface-variant', price: 'Rp 28.000', stock: '2.150', stockColor: '' },
  ]

  const parsePrice = (priceStr) => {
    const num = parseInt(priceStr.replace(/[^\d]/g, ''), 10)
    return isNaN(num) ? 0 : num
  }

  const getFilteredData = () => {
    let result = fishData.filter((fish) =>
      fish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fish.id.toLowerCase().includes(searchTerm.toLowerCase())
    )

    switch (quickFilter) {
      case 'Grade A':
        result = result.filter((f) => f.grade === 'A')
        break
      case 'Grade B':
        result = result.filter((f) => f.grade === 'B')
        break
      case 'Grade C':
        result = result.filter((f) => f.grade === 'C')
        break
      case 'Stok Melimpah':
        result = result.filter((f) => parseInt(f.stock.replace(/\./g, ''), 10) > 100)
        break
      case 'Stok Rendah':
        result = result.filter((f) => parseInt(f.stock.replace(/\./g, ''), 10) <= 100)
        break
      case 'Harga Tertinggi':
        result = [...result].sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
        break
      case 'Harga Terendah':
        result = [...result].sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
        break
      default:
        break
    }

    return result
  }

  const filtered = getFilteredData()

  const quickFilters = ['Semua', 'Grade A', 'Grade B', 'Grade C', 'Stok Melimpah', 'Stok Rendah', 'Harga Tertinggi', 'Harga Terendah']

  return (
    <div className="px-margin-mobile pt-lg animate-fade-in">
      <div className="mb-lg">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Daftar Jenis Ikan</h2>
        <p className="font-body-md text-on-surface-variant">Kelola master data komoditas perikanan Anda.</p>
      </div>

      <div className="relative mb-lg">
        <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
        <input
          className="w-full pl-xl pr-md py-md bg-surface-container-lowest border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md transition-all"
          placeholder="Cari jenis ikan..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-gutter mb-lg">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
          <p className="font-label-md text-on-surface-variant uppercase mb-xs">Total Jenis</p>
          <p className="font-display-financial text-display-financial text-primary">{fishData.length}</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
          <p className="font-label-md text-on-surface-variant uppercase mb-xs">Stok Kritis</p>
          <p className="font-display-financial text-display-financial text-error">{fishData.filter((f) => parseInt(f.stock.replace(/\./g, ''), 10) <= 100).length}</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden mb-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left zebra-table border-collapse">
            <thead className="bg-surface-container-low border-b-2 border-primary">
              <tr>
                <th className="px-md py-sm font-financial-table text-secondary whitespace-nowrap">Jenis Ikan</th>
                <th className="px-md py-sm font-financial-table text-secondary text-center">Grade</th>
                <th className="px-md py-sm font-financial-table text-secondary text-right">Harga/Kg</th>
                <th className="px-md py-sm font-financial-table text-secondary text-right">Stok</th>
              </tr>
            </thead>
            <tbody className="font-body-md">
              {filtered.map((fish) => (
                <tr key={fish.id} className="active:bg-surface-container-high transition-colors">
                  <td className="px-md py-md">
                    <div className="flex flex-col">
                      <span className="font-bold text-on-surface">{fish.name}</span>
                      <span className="text-xs text-on-surface-variant">ID: {fish.id}</span>
                    </div>
                  </td>
                  <td className="px-md py-md text-center">
                    <span className={`px-sm py-xs ${fish.gradeBg} ${fish.gradeText} font-bold rounded-lg text-xs`}>{fish.grade}</span>
                  </td>
                  <td className="px-md py-md text-right font-financial-table">{fish.price}</td>
                  <td className="px-md py-md text-right">
                    <span className={`font-bold ${fish.stockColor}`}>{fish.stock}</span>{' '}
                    <span className="text-xs text-on-surface-variant">Kg</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-lg">
          <p className="font-body-md text-body-md text-on-surface-variant">Tidak ada data ditemukan</p>
        </div>
      )}

      <div className="mt-lg">
        <p className="font-label-md text-on-surface-variant uppercase mb-sm">Filter Cepat</p>
        <div className="flex gap-sm overflow-x-auto no-scrollbar pb-sm">
          {quickFilters.map((filter) => (
            <button
              key={filter}
              className={`px-md py-sm rounded-full font-label-md text-label-md whitespace-nowrap transition-colors ${quickFilter === filter ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container'}`}
              onClick={() => setQuickFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FishData