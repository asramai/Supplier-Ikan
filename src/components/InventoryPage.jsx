import React, { useState, useEffect } from 'react'
import { getInventory, upsertInventory, deleteInventory } from '../services/supabaseService'

const defaultInventoryData = [
  { id: 'INV-001', name: 'Kerapu Sunu', category: 'Ikan Hias', stock: '450 kg', price: 'Rp 125.000/kg', status: 'Tersedia', statusBg: 'bg-[#E8F5E9]', statusText: 'text-[#28A745]' },
  { id: 'INV-002', name: 'Tongkol Abu-abu', category: 'Ikan Kering', stock: '1.200 kg', price: 'Rp 32.500/kg', status: 'Tersedia', statusBg: 'bg-[#E8F5E9]', statusText: 'text-[#28A745]' },
  { id: 'INV-003', name: 'Tuna Yellowfin', category: 'Ikan Segar', stock: '12 kg', price: 'Rp 85.000/kg', status: 'Stok Rendah', statusBg: 'bg-[#FDEDEC]', statusText: 'text-[#DC3545]' },
  { id: 'INV-004', name: 'Kakap Merah', category: 'Ikan Hias', stock: '340 kg', price: 'Rp 55.000/kg', status: 'Tersedia', statusBg: 'bg-[#E8F5E9]', statusText: 'text-[#28A745]' },
  { id: 'INV-005', name: 'Cakalang', category: 'Ikan Kering', stock: '2.150 kg', price: 'Rp 28.000/kg', status: 'Tersedia', statusBg: 'bg-[#E8F5E9]', statusText: 'text-[#28A745]' },
  { id: 'INV-006', name: 'Layang', category: 'Ikan Segar', stock: '0 kg', price: 'Rp 45.000/kg', status: 'Habis', statusBg: 'bg-error-container', statusText: 'text-error' },
]

function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('Semua')
  const [inventoryData, setInventoryData] = useState(defaultInventoryData)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({ name: '', category: 'Ikan Segar', stock: '', price: '', status: 'Tersedia' })

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const data = await getInventory()
        if (data && data.length > 0) {
          const mapped = data.map((item) => {
            const stockNum = parseInt(item.stock?.replace(/[^\d]/g, '') || '0', 10)
            let status = 'Tersedia'
            let statusBg = 'bg-[#E8F5E9]'
            let statusText = 'text-[#28A745]'
            if (stockNum === 0) {
              status = 'Habis'
              statusBg = 'bg-error-container'
              statusText = 'text-error'
            } else if (stockNum <= 100) {
              status = 'Stok Rendah'
              statusBg = 'bg-[#FDEDEC]'
              statusText = 'text-[#DC3545]'
            }
            return {
              id: item.id || `INV-${Date.now()}`,
              name: item.name,
              category: item.category || 'Umum',
              stock: item.stock || '0 kg',
              price: item.price || 'Rp 0/kg',
              status,
              statusBg,
              statusText,
            }
          })
          setInventoryData(mapped)
        }
      } catch {}
      setLoading(false)
    }
    loadInventory()
  }, [])

  useEffect(() => {
    const handleOpenAdd = () => openAdd()
    window.addEventListener('openAddInventory', handleOpenAdd)
    return () => window.removeEventListener('openAddInventory', handleOpenAdd)
  }, [])

  const categories = ['Semua', 'Ikan Segar', 'Ikan Kering', 'Ikan Hias']

  const filtered = inventoryData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'Semua' || item.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const openAdd = () => {
    setEditingItem(null)
    setFormData({ name: '', category: 'Ikan Segar', stock: '', price: '', status: 'Tersedia' })
    setShowForm(true)
  }

  const openEdit = (item) => {
    setEditingItem(item)
    const stockNum = parseInt(item.stock?.replace(/[^\d]/g, '') || '0', 10)
    let status = 'Tersedia'
    if (stockNum === 0) status = 'Habis'
    else if (stockNum <= 100) status = 'Stok Rendah'
    setFormData({
      name: item.name,
      category: item.category || 'Umum',
      stock: item.stock?.replace(/[^\d]/g, '') || '',
      price: item.price?.replace(/[^\d]/g, '') || '',
      status,
    })
    setShowForm(true)
  }

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.stock || !formData.price) {
      alert('Nama, stok, dan harga wajib diisi')
      return
    }
    const stockNum = parseInt(formData.stock) || 0
    let status = 'Tersedia'
    let statusBg = 'bg-[#E8F5E9]'
    let statusText = 'text-[#28A745]'
    if (stockNum === 0) {
      status = 'Habis'
      statusBg = 'bg-error-container'
      statusText = 'text-error'
    } else if (stockNum <= 100) {
      status = 'Stok Rendah'
      statusBg = 'bg-[#FDEDEC]'
      statusText = 'text-[#DC3545]'
    }
    const payload = {
      id: editingItem ? editingItem.id : `INV-${Date.now()}`,
      name: formData.name.trim(),
      category: formData.category,
      stock: `${stockNum} kg`,
      price: `Rp ${parseInt(formData.price).toLocaleString('id-ID')}/kg`,
      status,
      statusBg,
      statusText,
    }
    try {
      await upsertInventory(payload)
      if (editingItem) {
        setInventoryData((prev) => prev.map((item) => (item.id === editingItem.id ? payload : item)))
      } else {
        setInventoryData((prev) => [...prev, payload])
      }
      setShowForm(false)
      setFormData({ name: '', category: 'Ikan Segar', stock: '', price: '', status: 'Tersedia' })
      setEditingItem(null)
    } catch (err) {
      console.error('Failed to save inventory:', err)
      alert('Gagal menyimpan data inventaris: ' + (err.message || 'Unknown error'))
    }
  }

  const handleDelete = async (item) => {
    if (!window.confirm(`Hapus item "${item.name}"?`)) return
    await deleteInventory(item.id)
    setInventoryData((prev) => prev.filter((i) => i.id !== item.id))
  }

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
                <th className="px-md py-sm font-financial-table text-secondary text-center">Aksi</th>
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
                  <td className="px-md py-md text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        className="p-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:bg-primary-container/20 hover:text-primary transition-colors active:scale-95"
                        onClick={() => openEdit(item)}
                        title="Edit"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button
                        className="p-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:bg-error-container/20 hover:text-error transition-colors active:scale-95"
                        onClick={() => handleDelete(item)}
                        title="Hapus"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
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

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-md" onClick={() => setShowForm(false)}>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface">{editingItem ? 'Edit Inventaris' : 'Tambah Inventaris'}</h3>
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" onClick={() => setShowForm(false)}>close</button>
            </div>
            <div className="space-y-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Nama Barang</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="Nama barang"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Kategori</label>
                <select
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Ikan Segar">Ikan Segar</option>
                  <option value="Ikan Kering">Ikan Kering</option>
                  <option value="Ikan Hias">Ikan Hias</option>
                  <option value="Umum">Umum</option>
                </select>
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Stok (kg)</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="0"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Harga/kg (Rp)</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="0"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <button
                type="button"
                className="w-full bg-primary-container text-on-primary-container py-md rounded-xl font-headline-md text-headline-md font-bold active:scale-[0.98] transition-transform"
                onClick={handleSubmit}
              >
                {editingItem ? 'Simpan Perubahan' : 'Tambah Inventaris'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InventoryPage
