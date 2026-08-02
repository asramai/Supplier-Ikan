import React, { useState, useEffect } from 'react'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { getIdentity } from '../utils/companyIdentity'

function MitraManagement() {
  const identity = getIdentity()
  const [activeTab, setActiveTab] = useState('nelayan')
  const [statusFilter, setStatusFilter] = useState('Semua')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showTransaksiModal, setShowTransaksiModal] = useState(false)
  const [selectedMitra, setSelectedMitra] = useState(null)
  const [newMitra, setNewMitra] = useState({ name: '', phone: '', type: 'nelayan' })
  const [editMitra, setEditMitra] = useState({ name: '', phone: '' })

  useEffect(() => {
    const handleOpenAdd = () => setShowAddModal(true)
    window.addEventListener('openAddMitra', handleOpenAdd)
    return () => window.removeEventListener('openAddMitra', handleOpenAdd)
  }, [])

  const [nelayanData, setNelayanData] = useState([
    {
      name: 'Haji Sulaiman',
      phone: '+62 812 3456 7890',
      icon: 'anchor',
      status: 'Aktif',
      statusBg: 'bg-[#E8F5E9]',
      statusText: 'text-[#28A745]',
      statusBorder: 'border-[#28A745]/20',
    },
    {
      name: 'UD Maritim Jaya',
      phone: '+62 811 9988 7766',
      icon: 'directions_boat',
      status: 'Tidak Aktif',
      statusBg: 'bg-[#F0F0F0]',
      statusText: 'text-[#6C757D]',
      statusBorder: 'border-[#6C757D]/20',
    },
    {
      name: 'Koperasi Nelayan Panua',
      phone: '+62 813 1122 3344',
      icon: 'account_balance_wallet',
      status: 'Aktif',
      statusBg: 'bg-[#E8F5E9]',
      statusText: 'text-[#28A745]',
      statusBorder: 'border-[#28A745]/20',
    },
  ])

  const [vendorData, setVendorData] = useState([
    {
      name: 'FreshFish Jakarta',
      phone: '+62 21 788 9900',
      icon: 'storefront',
      status: 'Aktif',
      statusBg: 'bg-[#E8F5E9]',
      statusText: 'text-[#28A745]',
      statusBorder: 'border-[#28A745]/20',
    },
  ])

  const currentData = activeTab === 'nelayan' ? nelayanData : vendorData
  const statusOptions = ['Semua', 'Aktif', 'Tidak Aktif']
  const filteredData = statusFilter === 'Semua' ? currentData : currentData.filter((item) => item.status === statusFilter)

  const transaksiData = {
    'Haji Sulaiman': [
      { id: 'TRX-N001', fish: 'Tuna Yellowfin', weight: '45.5 kg', price: 'Rp 3.87M', date: '24 Oct 2025', status: 'Lunas' },
      { id: 'TRX-N002', fish: 'Cakalang', weight: '80.0 kg', price: 'Rp 2.24M', date: '20 Oct 2025', status: 'Lunas' },
    ],
    'UD Maritim Jaya': [
      { id: 'TRX-N003', fish: 'Layang', weight: '60.0 kg', price: 'Rp 2.70M', date: '18 Oct 2025', status: 'Hutang' },
    ],
    'Koperasi Nelayan Panua': [
      { id: 'TRX-N004', fish: 'Tongkol', weight: '55.0 kg', price: 'Rp 1.82M', date: '22 Oct 2025', status: 'Lunas' },
      { id: 'TRX-N005', fish: 'Kerapu', weight: '30.0 kg', price: 'Rp 1.65M', date: '15 Oct 2025', status: 'Lunas' },
    ],
    'FreshFish Jakarta': [
      { id: 'TRX-V001', fish: 'Tuna Yellowfin', weight: '50.0 kg', price: 'Rp 4.25M', date: '24 Oct 2025', status: 'Lunas' },
      { id: 'TRX-V002', fish: 'Cakalang', weight: '100.0 kg', price: 'Rp 2.80M', date: '23 Oct 2025', status: 'Hutang' },
    ],
  }

  const toggleMitraStatus = (mitraName) => {
    if (activeTab === 'nelayan') {
      setNelayanData((prev) =>
        prev.map((m) => {
          if (m.name === mitraName) {
            const newStatus = m.status === 'Aktif' ? 'Tidak Aktif' : 'Aktif'
            return {
              ...m,
              status: newStatus,
              statusBg: newStatus === 'Aktif' ? 'bg-[#E8F5E9]' : 'bg-[#F0F0F0]',
              statusText: newStatus === 'Aktif' ? 'text-[#28A745]' : 'text-[#6C757D]',
              statusBorder: newStatus === 'Aktif' ? 'border-[#28A745]/20' : 'border-[#6C757D]/20',
            }
          }
          return m
        })
      )
    } else {
      setVendorData((prev) =>
        prev.map((m) => {
          if (m.name === mitraName) {
            const newStatus = m.status === 'Aktif' ? 'Tidak Aktif' : 'Aktif'
            return {
              ...m,
              status: newStatus,
              statusBg: newStatus === 'Aktif' ? 'bg-[#E8F5E9]' : 'bg-[#F0F0F0]',
              statusText: newStatus === 'Aktif' ? 'text-[#28A745]' : 'text-[#6C757D]',
              statusBorder: newStatus === 'Aktif' ? 'border-[#28A745]/20' : 'border-[#6C757D]/20',
            }
          }
          return m
        })
      )
    }
  }

  const handleAddMitra = () => {
    const newEntry = {
      name: newMitra.name,
      phone: newMitra.phone,
      icon: newMitra.type === 'nelayan' ? 'anchor' : 'storefront',
      status: 'Aktif',
      statusBg: 'bg-[#E8F5E9]',
      statusText: 'text-[#28A745]',
      statusBorder: 'border-[#28A745]/20',
    }
    if (newMitra.type === 'nelayan') {
      setNelayanData((prev) => [...prev, newEntry])
    } else {
      setVendorData((prev) => [...prev, newEntry])
    }
    setShowAddModal(false)
    setNewMitra({ name: '', phone: '', type: 'nelayan' })
  }

  const handleEditMitra = () => {
    if (!editMitra.name.trim() || !editMitra.phone.trim()) return
    if (selectedMitra) {
      if (activeTab === 'nelayan') {
        setNelayanData((prev) =>
          prev.map((m) => (m.name === selectedMitra.name ? { ...m, name: editMitra.name, phone: editMitra.phone } : m))
        )
      } else {
        setVendorData((prev) =>
          prev.map((m) => (m.name === selectedMitra.name ? { ...m, name: editMitra.name, phone: editMitra.phone } : m))
        )
      }
    }
    setShowEditModal(false)
    setEditMitra({ name: '', phone: '' })
    setSelectedMitra(null)
  }

  const openEditModal = (mitra) => {
    setSelectedMitra(mitra)
    setEditMitra({ name: mitra.name, phone: mitra.phone })
    setShowEditModal(true)
  }

  const openTransaksiModal = (mitra) => {
    setSelectedMitra(mitra)
    setShowTransaksiModal(true)
  }

  const currentTransaksi = selectedMitra ? (transaksiData[selectedMitra.name] || []) : []

  const generateMitraPDF = (mitra) => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 15
    let yPos = 20

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.setTextColor(0, 110, 47)
    doc.text(identity.companyName || 'PT Asy-Syifa Panua', pageWidth / 2, yPos, { align: 'center' })

    yPos += 6
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(60, 60, 60)
    doc.text(identity.address || 'Jl. Pelabuhan Panua, Sulawesi Tenggara', pageWidth / 2, yPos, { align: 'center' })

    yPos += 5
    doc.text(`Telp: ${identity.phone || '-'} | Email: ${identity.email || '-'}`, pageWidth / 2, yPos, { align: 'center' })

    if (identity.npwp) {
      yPos += 5
      doc.text(`NPWP: ${identity.npwp}`, pageWidth / 2, yPos, { align: 'center' })
    }

    yPos += 10
    doc.setDrawColor(0, 110, 47)
    doc.setLineWidth(0.5)
    doc.line(margin, yPos, pageWidth - margin, yPos)

    yPos += 10
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text('DATA MITRA', pageWidth / 2, yPos, { align: 'center' })

    yPos += 10
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(`Nama: ${mitra.name}`, margin, yPos)
    yPos += 5
    doc.text(`Telepon: ${mitra.phone}`, margin, yPos)
    yPos += 5
    doc.text(`Tipe: ${activeTab === 'nelayan' ? 'Nelayan (Pemasok)' : 'Vendor (Pembeli)'}`, margin, yPos)
    yPos += 5
    doc.text(`Status: ${mitra.status}`, margin, yPos)

    yPos += 15
    doc.setDrawColor(0, 110, 47)
    doc.setLineWidth(0.3)
    doc.line(margin, yPos, pageWidth - margin, yPos)

    yPos += 8
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(100, 100, 100)
    doc.text('Dokumen ini dicetak secara otomatis oleh sistem.', pageWidth / 2, yPos, { align: 'center' })
    doc.text(`Dicetak: ${new Date().toLocaleString('id-ID')}`, pageWidth / 2, yPos + 5, { align: 'center' })

    doc.save(`Data-Mitra-${mitra.name}-${Date.now()}.pdf`)
  }

  const generateTransaksiPDF = (tx, mitra) => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 15
    let yPos = 20

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.setTextColor(0, 110, 47)
    doc.text(identity.companyName || 'PT Asy-Syifa Panua', pageWidth / 2, yPos, { align: 'center' })

    yPos += 6
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(60, 60, 60)
    doc.text(identity.address || 'Jl. Pelabuhan Panua, Sulawesi Tenggara', pageWidth / 2, yPos, { align: 'center' })

    yPos += 5
    doc.text(`Telp: ${identity.phone || '-'} | Email: ${identity.email || '-'}`, pageWidth / 2, yPos, { align: 'center' })

    if (identity.npwp) {
      yPos += 5
      doc.text(`NPWP: ${identity.npwp}`, pageWidth / 2, yPos, { align: 'center' })
    }

    yPos += 10
    doc.setDrawColor(0, 110, 47)
    doc.setLineWidth(0.5)
    doc.line(margin, yPos, pageWidth - margin, yPos)

    yPos += 10
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text('STRUK TRANSAKSI MITRA', pageWidth / 2, yPos, { align: 'center' })

    yPos += 8
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(`No. Transaksi: ${tx.id}`, margin, yPos)
    yPos += 5
    doc.text(`Mitra: ${mitra?.name || '-'}`, margin, yPos)
    yPos += 5
    doc.text(`Tanggal: ${tx.date}`, margin, yPos)
    yPos += 5
    doc.text(`Jenis Ikan: ${tx.fish}`, margin, yPos)
    yPos += 5
    doc.text(`Berat: ${tx.weight}`, margin, yPos)

    yPos += 10
    autoTable(doc, {
      startY: yPos,
      head: [['Harga/kg', 'Total', 'Status']],
      body: [[`Rp ${parseFloat(tx.price.replace(/[^\d]/g, '')).toLocaleString('id-ID')}`, tx.price, tx.status]],
      theme: 'grid',
      headStyles: { fillColor: [0, 110, 47], textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 10 },
      margin: { left: margin, right: margin },
    })

    yPos = doc.lastAutoTable.finalY + 15
    doc.setDrawColor(0, 110, 47)
    doc.setLineWidth(0.3)
    doc.line(margin, yPos, pageWidth - margin, yPos)

    yPos += 8
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(100, 100, 100)
    doc.text('Dokumen ini dicetak secara otomatis oleh sistem.', pageWidth / 2, yPos, { align: 'center' })
    doc.text(`Dicetak: ${new Date().toLocaleString('id-ID')}`, pageWidth / 2, yPos + 5, { align: 'center' })

    doc.save(`Struk-Mitra-${mitra?.name || 'transaksi'}-${Date.now()}.pdf`)
  }

  return (
    <div className="px-margin-mobile pt-md animate-fade-in">
      <div className="mb-lg">
        <div className="flex flex-col gap-sm">
          <h2 className="font-headline-md text-headline-md text-on-surface">Manajemen Mitra</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Kelola jaringan nelayan dan vendor Anda.</p>
        </div>
      </div>

      <div className="sticky top-[72px] bg-background pt-xs pb-md z-30 space-y-md">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
          <input
            className="w-full pl-[48px] pr-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary font-body-md transition-all outline-none"
            placeholder="Cari berdasarkan nama atau kontak..."
            type="text"
          />
        </div>
        <div className="flex p-1 bg-surface-container-low rounded-xl border border-outline-variant">
          <button
            className={`flex-1 py-sm px-md rounded-lg font-label-md transition-all ${activeTab === 'nelayan' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            onClick={() => { setActiveTab('nelayan'); setStatusFilter('Semua') }}
          >
            Nelayan (Pemasok)
          </button>
          <button
            className={`flex-1 py-sm px-md rounded-lg font-label-md transition-all ${activeTab === 'vendor' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            onClick={() => { setActiveTab('vendor'); setStatusFilter('Semua') }}
          >
            Vendor (Pembeli)
          </button>
        </div>
        <div className="flex gap-sm overflow-x-auto no-scrollbar pb-sm">
          {statusOptions.map((opt) => (
            <button
              key={opt}
              className={`px-md py-sm rounded-full font-label-md text-label-md whitespace-nowrap transition-colors ${statusFilter === opt ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container'}`}
              onClick={() => setStatusFilter(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-md">
        {filteredData.map((mitra, index) => (
          <div key={mitra.name} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-md card-hover animate-slide-up" style={{ animationFillMode: 'backwards', animationDelay: `${index * 0.05}s` }}>
            <div className="flex justify-between items-start">
              <div className="flex gap-md items-center">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary card-hover">
                  <span className="material-symbols-outlined text-[28px]">{mitra.icon}</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">{mitra.name}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    {mitra.phone}
                  </p>
                </div>
              </div>
              <span className={`px-sm py-xs ${mitra.statusBg} ${mitra.statusText} rounded-lg font-label-md border ${mitra.statusBorder}`}>
                {mitra.status}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-sm border-t border-outline-variant pt-md">
              <button
                className="flex items-center justify-center gap-xs py-sm border border-primary text-primary rounded-lg font-label-md hover:bg-primary-container/10 transition-colors active:scale-95"
                onClick={() => openEditModal(mitra)}
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
                Ubah
              </button>
              <button
                className={`flex items-center justify-center gap-xs py-sm rounded-lg font-label-md transition-colors active:scale-95 ${mitra.status === 'Aktif' ? 'bg-surface-container-high text-outline hover:text-error hover:bg-error-container/10' : 'bg-surface-container-high text-outline hover:text-primary hover:bg-primary-container/10'}`}
                title={mitra.status === 'Aktif' ? 'Non-aktifkan Mitra' : 'Aktifkan Mitra'}
                onClick={() => toggleMitraStatus(mitra.name)}
              >
                <span className="material-symbols-outlined text-[18px]">{mitra.status === 'Aktif' ? 'lock' : 'lock_open'}</span>
              </button>
              <button
                className="flex items-center justify-center gap-xs py-sm bg-primary text-on-primary rounded-lg font-label-md hover:opacity-90 transition-opacity active:scale-95 shadow-sm"
                onClick={() => openTransaksiModal(mitra)}
              >
                <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                Transaksi
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-md" onClick={() => setShowAddModal(false)}>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface">Tambah Mitra Baru</h3>
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" onClick={() => setShowAddModal(false)}>close</button>
            </div>
            <div className="space-y-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Nama Mitra</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="Nama lengkap atau nama perusahaan"
                  type="text"
                  value={newMitra.name}
                  onChange={(e) => setNewMitra({ ...newMitra, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Telepon / Kontak</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="+62 8xx xxxx xxxx"
                  type="text"
                  value={newMitra.phone}
                  onChange={(e) => setNewMitra({ ...newMitra, phone: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Tipe Mitra</label>
                <select
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  value={newMitra.type}
                  onChange={(e) => setNewMitra({ ...newMitra, type: e.target.value })}
                >
                  <option value="nelayan">Nelayan (Pemasok)</option>
                  <option value="vendor">Vendor (Pembeli)</option>
                </select>
              </div>
              <button
                className="w-full bg-primary-container text-on-primary-container py-md rounded-xl font-headline-md text-headline-md font-bold active:scale-[0.98] transition-transform"
                onClick={handleAddMitra}
              >
                Tambah Mitra
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-md" onClick={() => setShowEditModal(false)}>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface">Ubah Data Mitra</h3>
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" onClick={() => setShowEditModal(false)}>close</button>
            </div>
            <div className="space-y-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Nama Mitra</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="Nama lengkap atau nama perusahaan"
                  type="text"
                  value={editMitra.name}
                  onChange={(e) => setEditMitra({ ...editMitra, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Telepon / Kontak</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="+62 8xx xxxx xxxx"
                  type="text"
                  value={editMitra.phone}
                  onChange={(e) => setEditMitra({ ...editMitra, phone: e.target.value })}
                />
              </div>
              <button
                className="w-full bg-primary-container text-on-primary-container py-md rounded-xl font-headline-md text-headline-md font-bold active:scale-[0.98] transition-transform"
                onClick={handleEditMitra}
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {showTransaksiModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-md" onClick={() => setShowTransaksiModal(false)}>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg w-full max-w-sm max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface">Riwayat Transaksi</h3>
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" onClick={() => setShowTransaksiModal(false)}>close</button>
            </div>
            <p className="font-label-md text-label-md text-on-surface-variant mb-md">Mitra: {selectedMitra?.name}</p>
            <div className="space-y-sm">
              {currentTransaksi.length === 0 ? (
                <p className="font-body-md text-body-md text-on-surface-variant text-center py-lg">Tidak ada transaksi untuk mitra ini</p>
              ) : (
                currentTransaksi.map((tx) => (
                  <div key={tx.id} className="flex justify-between items-center p-md bg-surface border border-outline-variant rounded-lg">
                    <div>
                      <p className="font-body-md text-body-md font-bold text-on-surface">{tx.fish}</p>
                      <p className="font-label-md text-label-md text-on-surface-variant">{tx.id} — {tx.date}</p>
                    </div>
                    <div className="flex items-center gap-sm">
                      <div className="text-right">
                        <p className="font-body-md text-body-md font-bold text-primary">{tx.price}</p>
                        <span className={`inline-block px-sm py-[2px] ${tx.status === 'Lunas' ? 'bg-[#E8F5E9] text-[#28A745]' : 'bg-[#FDEDEC] text-[#DC3545]'} font-label-md text-label-md rounded-full uppercase`}>{tx.status}</span>
                      </div>
                      <button
                        className="p-sm rounded-lg bg-surface-container-high text-on-surface-variant hover:bg-primary-container/20 hover:text-primary transition-colors active:scale-95"
                        onClick={() => generateTransaksiPDF(tx, selectedMitra)}
                        title="Cetak Struk"
                      >
                        <span className="material-symbols-outlined text-[20px]">print</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MitraManagement