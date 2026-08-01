import React, { useState } from 'react'

function FishData() {
  const [searchTerm, setSearchTerm] = useState('')

  const fishData = [
    { name: 'Kerapu Sunu', id: 'FR-001', grade: 'A', gradeBg: 'bg-tertiary-container/10', gradeText: 'text-tertiary', price: 'Rp 125.000', stock: '450', stockColor: '' },
    { name: 'Tongkol Abu-abu', id: 'FR-002', grade: 'B', gradeBg: 'bg-outline-variant/30', gradeText: 'text-on-surface-variant', price: 'Rp 32.500', stock: '1.200', stockColor: '' },
    { name: 'Tuna Yellowfin', id: 'FR-003', grade: 'A', gradeBg: 'bg-tertiary-container/10', gradeText: 'text-tertiary', price: 'Rp 85.000', stock: '12', stockColor: 'text-error' },
    { name: 'Kakap Merah', id: 'FR-004', grade: 'C', gradeBg: 'bg-error-container/20', gradeText: 'text-error', price: 'Rp 55.000', stock: '340', stockColor: '' },
    { name: 'Cakalang', id: 'FR-005', grade: 'B', gradeBg: 'bg-outline-variant/30', gradeText: 'text-on-surface-variant', price: 'Rp 28.000', stock: '2.150', stockColor: '' },
  ]

  const filtered = fishData.filter((fish) =>
    fish.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="px-margin-mobile pt-lg">
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
          <p className="font-display-financial text-display-financial text-primary">24</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
          <p className="font-label-md text-on-surface-variant uppercase mb-xs">Stok Kritis</p>
          <p className="font-display-financial text-display-financial text-error">3</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
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

      <div className="mt-lg">
        <p className="font-label-md text-on-surface-variant uppercase mb-sm">Filter Cepat</p>
        <div className="flex gap-sm overflow-x-auto no-scrollbar pb-sm">
          <button className="bg-primary text-on-primary px-md py-sm rounded-full font-label-md whitespace-nowrap">Semua</button>
          <button className="bg-surface-container-high text-on-surface-variant px-md py-sm rounded-full font-label-md whitespace-nowrap">Grade A</button>
          <button className="bg-surface-container-high text-on-surface-variant px-md py-sm rounded-full font-label-md whitespace-nowrap">Stok Melimpah</button>
          <button className="bg-surface-container-high text-on-surface-variant px-md py-sm rounded-full font-label-md whitespace-nowrap">Harga Tertinggi</button>
        </div>
      </div>
    </div>
  )
}

export default FishData