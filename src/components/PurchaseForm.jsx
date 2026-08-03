import React, { useState, useEffect } from 'react'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { getNelayanList } from '../utils/mitraData'
import { getIdentity } from '../utils/companyIdentity'
import { generateInvoiceNumber, getCurrentYear } from '../utils/invoiceCounter'

function PurchaseForm() {
  const identity = getIdentity()
  const [activeTab, setActiveTab] = useState('tambah')
  const [monthFilter, setMonthFilter] = useState('Semua')
  const [items, setItems] = useState([{ fishType: '', weight: '', price: '' }])
  const [formData, setFormData] = useState({ fisherman: '', date: '', boat: '', invoiceNumber: '' })
  const [paymentStatus, setPaymentStatus] = useState('paid')
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  useEffect(() => {
    if (activeTab === 'tambah') {
      setFormData((prev) => ({ ...prev, invoiceNumber: generateInvoiceNumber('beli') }))
    }
  }, [activeTab])

  const nelayanList = getNelayanList()
  const fishOptions = ['Cakalang', 'Tongkol', 'Tuna Yellowfin', 'Layang', 'Kerapu']

  const totalWeight = items.reduce((sum, item) => sum + (parseFloat(item.weight) || 0), 0)
  const totalPrice = items.reduce((sum, item) => sum + ((parseFloat(item.weight) || 0) * (parseFloat(item.price) || 0)), 0)

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number)
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.fisherman) newErrors.fisherman = 'Nelayan wajib dipilih'
    if (!formData.date) newErrors.date = 'Tanggal wajib diisi'
    items.forEach((item, index) => {
      if (!item.fishType) newErrors[`fishType_${index}`] = `Jenis ikan wajib diisi item ${index + 1}`
      if (!item.weight || parseFloat(item.weight) <= 0) newErrors[`weight_${index}`] = `Berat harus lebih dari 0 item ${index + 1}`
      if (!item.price || parseFloat(item.price) <= 0) newErrors[`price_${index}`] = `Harga harus lebih dari 0 item ${index + 1}`
    })
    return newErrors
  }

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors(validate())
  }

  const addItem = () => {
    setItems([...items, { fishType: '', weight: '', price: '' }])
  }

  const removeItem = (index) => {
    if (items.length <= 1) return
    const newItems = [...items]
    newItems.splice(index, 1)
    setItems(newItems)
  }

  const updateItem = (index, field, value) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const generatePDF = (tx = null) => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 15
    let yPos = 20

    if (identity.logo) {
      try {
        doc.addImage(identity.logo, 'PNG', (pageWidth - 25) / 2, yPos, 25, 25)
        yPos += 30
      } catch (e) { /* ignore */ }
    }

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
    if (identity.npwp) { yPos += 5; doc.text(`NPWP: ${identity.npwp}`, pageWidth / 2, yPos, { align: 'center' }) }
    yPos += 10
    doc.setDrawColor(0, 110, 47)
    doc.setLineWidth(0.5)
    doc.line(margin, yPos, pageWidth - margin, yPos)
    yPos += 10
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text('STRUK PEMBELIAN IKAN', pageWidth / 2, yPos, { align: 'center' })
    yPos += 8
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(`No. Transaksi: ${tx?.id || formData.invoiceNumber || `TRX/${getCurrentYear()}/B.0000`}`, margin, yPos)
    yPos += 5
    doc.text(`Tanggal: ${tx?.date || formData.date || new Date().toISOString().split('T')[0]}`, margin, yPos)
    yPos += 5
    doc.text(`Nelayan: ${tx?.fisherman || formData.fisherman || '-'}`, margin, yPos)
    yPos += 5
    doc.text(`Kapal: ${formData.boat || '-'}`, margin, yPos)
    yPos += 10

    const tableBody = tx
      ? [[tx.fish || '-', tx.weight || '0', `Rp ${(tx.price || 0).toLocaleString('id-ID')}`, tx.total || formatRupiah(0)]]
      : items.map(item => [
          item.fishType || '-',
          (parseFloat(item.weight) || 0).toLocaleString('id-ID'),
          `Rp ${(parseFloat(item.price) || 0).toLocaleString('id-ID')}`,
          formatRupiah((parseFloat(item.weight) || 0) * (parseFloat(item.price) || 0))
        ])

    autoTable(doc, {
      startY: yPos,
      head: [['Jenis Ikan', 'Berat (kg)', 'Harga/kg', 'Total']],
      body: tableBody,
      theme: 'grid',
      headStyles: { fillColor: [0, 110, 47], textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 10 },
      margin: { left: margin, right: margin },
    })

    yPos = doc.lastAutoTable.finalY + 10
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text(`Total Pembayaran: ${formatRupiah(totalPrice)}`, pageWidth / 2, yPos, { align: 'center' })
    yPos += 8
    doc.setFontSize(10)
    const status = tx?.status || (paymentStatus === 'paid' ? 'LUNAS' : 'HUTANG')
    doc.setTextColor(status === 'LUNAS' ? 0 : 200, status === 'LUNAS' ? 110 : 0, status === 'LUNAS' ? 47 : 0)
    doc.text(`Status: ${status}`, pageWidth / 2, yPos, { align: 'center' })
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
    doc.save(`Struk-Pembelian-${tx?.fisherman || formData.fisherman || 'ikan'}-${Date.now()}.pdf`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      generatePDF()
    }
  }

  const historyData = [
    { id: 'TRX/2025/B.0001', fisherman: 'Budi Santoso', items: [{ fishType: 'Tuna Yellowfin', weight: '25.5', price: '76000' }, { fishType: 'Kerapu', weight: '10.0', price: '132000' }], totalWeight: 35.5, totalPrice: 3217500, date: '24 Oct 2025', status: 'Lunas', statusBg: 'bg-[#E8F5E9]', statusText: 'text-[#28A745]' },
    { id: 'TRX/2025/B.0002', fisherman: 'Andi Wijaya', items: [{ fishType: 'Skipjack', weight: '50.0', price: '85000' }, { fishType: 'Tongkol', weight: '30.0', price: '58000' }], totalWeight: 80.0, totalPrice: 6190000, date: '23 Oct 2025', status: 'Lunas', statusBg: 'bg-[#E8F5E9]', statusText: 'text-[#28A745]' },
  ]

  const months = ['Semua', 'Oktober 2025', 'September 2025', 'Agustus 2025', 'Juli 2025']
  const filteredHistory = monthFilter === 'Semua' ? historyData : historyData.filter((row) => row.date.includes(monthFilter.split(' ').slice(1).join(' ')))

  return (
    <div className="pt-24 px-margin-mobile max-w-2xl mx-auto animate-fade-in">
      <div className="mb-lg">
        <h2 className="font-headline-lg text-headline-lg text-on-background">Pembelian Ikan</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">Catat transaksi masuk hasil tangkapan nelayan.</p>
      </div>

      <div className="flex p-1 bg-surface-container-low rounded-xl border border-outline-variant mb-lg">
        <button className={`flex-1 py-sm px-md rounded-lg font-label-md text-label-md transition-all ${activeTab === 'tambah' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`} onClick={() => setActiveTab('tambah')}>Tambah Transaksi Pembelian</button>
        <button className={`flex-1 py-sm px-md rounded-lg font-label-md text-label-md transition-all ${activeTab === 'riwayat' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`} onClick={() => setActiveTab('riwayat')}>Riwayat Transaksi Pembelian</button>
      </div>

      {activeTab === 'tambah' ? (
        <form className="space-y-lg" onSubmit={handleSubmit} noValidate>
          <div className="bg-white border border-outline-variant rounded-xl p-md space-y-md card-hover">
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase">Nama Nelayan</label>
              <div className="relative">
                <select className={`w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary appearance-none ${touched.fisherman && errors.fisherman ? 'border-error focus:border-error' : ''}`} value={formData.fisherman} onChange={(e) => setFormData({ ...formData, fisherman: e.target.value })} onBlur={() => handleBlur('fisherman')}>
                  <option value="">Pilih Nelayan...</option>
                  {nelayanList.map((nelayan) => (
                    <option key={nelayan.name} value={nelayan.name}>{nelayan.name}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
              </div>
              {touched.fisherman && errors.fisherman && <p className="text-error font-label-md text-label-md mt-xs">{errors.fisherman}</p>}
            </div>
<div className="grid grid-cols-2 gap-md">
               <div className="flex flex-col gap-xs">
                 <label className="font-label-md text-label-md text-on-surface-variant uppercase">Tanggal</label>
                 <input className={`w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary ${touched.date && errors.date ? 'border-error focus:border-error' : ''}`} type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} onBlur={() => handleBlur('date')} />
                 {touched.date && errors.date && <p className="text-error font-label-md text-label-md mt-xs">{errors.date}</p>}
               </div>
               <div className="flex flex-col gap-xs">
                 <label className="font-label-md text-label-md text-on-surface-variant uppercase">No. Invoice</label>
                 <input className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg text-on-surface-variant" type="text" value={formData.invoiceNumber} readOnly />
               </div>
             </div>
             <div className="flex flex-col gap-xs mt-md">
               <label className="font-label-md text-label-md text-on-surface-variant uppercase">Kapal / Boat</label>
               <input className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Nama Kapal" type="text" value={formData.boat} onChange={(e) => setFormData({ ...formData, boat: e.target.value })} />
             </div>
          </div>

          <div className="bg-white border border-outline-variant rounded-xl p-md space-y-md card-hover">
            <div className="flex justify-between items-center mb-md">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase">Daftar Ikan</label>
              <button type="button" onClick={addItem} className="px-3 py-1 bg-primary-container text-on-primary-container rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity">
                <span className="material-symbols-outlined text-[16px]">add</span> Tambah Item
              </button>
            </div>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="bg-surface border border-outline-variant rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-label-md text-label-md text-on-surface-variant">Item {index + 1}</span>
                    <button type="button" onClick={() => removeItem(index)} className="p-1 text-error hover:text-error/70 rounded-lg" disabled={items.length === 1}>
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-md">
                    <div className="flex flex-col gap-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant uppercase">Jenis Ikan</label>
                      <div className="relative">
                        <input className={`w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary ${touched[`fishType_${index}`] && errors[`fishType_${index}`] ? 'border-error focus:border-error' : ''}`} list="fish-list" placeholder="Cari Jenis Ikan..." type="text" value={item.fishType} onChange={(e) => updateItem(index, 'fishType', e.target.value)} onBlur={() => handleBlur(`fishType_${index}`)} />
                        <datalist id="fish-list">{fishOptions.map((opt) => (
                          <option key={opt} value={opt} />
                        ))}</datalist>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                      </div>
                      {touched[`fishType_${index}`] && errors[`fishType_${index}`] && <p className="text-error font-label-md text-label-md mt-xs">{errors[`fishType_${index}`]}</p>}
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant uppercase">Berat (kg)</label>
                      <input className={`w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary ${touched[`weight_${index}`] && errors[`weight_${index}`] ? 'border-error focus:border-error' : ''}`} placeholder="0.0" type="number" step="0.1" min="0" value={item.weight} onChange={(e) => updateItem(index, 'weight', e.target.value)} onBlur={() => handleBlur(`weight_${index}`)} />
                      {touched[`weight_${index}`] && errors[`weight_${index}`] && <p className="text-error font-label-md text-label-md mt-xs">{errors[`weight_${index}`]}</p>}
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant uppercase">Harga per kg (Rp)</label>
                      <input className={`w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary ${touched[`price_${index}`] && errors[`price_${index}`] ? 'border-error focus:border-error' : ''}`} placeholder="0" type="number" min="0" value={item.price} onChange={(e) => updateItem(index, 'price', e.target.value)} onBlur={() => handleBlur(`price_${index}`)} />
                      {touched[`price_${index}`] && errors[`price_${index}`] && <p className="text-error font-label-md text-label-md mt-xs">{errors[`price_${index}`]}</p>}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 text-sm">
                    <span className="font-label-md text-label-md text-on-surface-variant">Subtotal:</span>
                    <span className="font-label-md text-label-md font-mono">{formatRupiah((parseFloat(item.weight) || 0) * (parseFloat(item.price) || 0))}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary-container/10 border border-primary-container rounded-xl p-lg card-hover">
            <div className="flex justify-between items-center mb-sm">
              <span className="font-label-md text-label-md text-on-primary-container uppercase">Estimasi Total</span>
              <span className="bg-primary-container text-on-primary-container px-2 py-0.5 rounded text-[10px] font-bold uppercase">Live</span>
            </div>
            <div className="flex flex-col gap-xs">
              <div className="flex justify-between">
                <span className="font-body-md text-body-md text-on-primary-container">Total Berat</span>
                <span className="font-body-lg text-body-lg font-bold text-on-primary-container">{totalWeight.toLocaleString('id-ID')} kg</span>
              </div>
              <div className="h-[1px] bg-primary-container/30 my-xs"></div>
              <div className="flex justify-between items-end">
                <span className="font-body-md text-body-md text-on-primary-container pb-1">Total Pembayaran</span>
                <span className={`font-display-financial text-display-financial ${paymentStatus === 'debt' ? 'text-error' : 'text-primary'}`}>{formatRupiah(totalPrice)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-outline-variant rounded-xl p-md card-hover">
            <label className="font-label-md text-label-md text-on-surface-variant uppercase block mb-md">Status Pembayaran</label>
            <div className="grid grid-cols-2 gap-sm p-1 bg-surface-container rounded-lg">
              <button type="button" className={`flex items-center justify-center gap-xs py-md rounded-lg font-bold transition-all duration-200 ${paymentStatus === 'paid' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant'}`} onClick={() => setPaymentStatus('paid')}>
                <span className="material-symbols-outlined text-[20px]">check_circle</span> Lunas
              </button>
              <button type="button" className={`flex items-center justify-center gap-xs py-md rounded-lg font-bold transition-all duration-200 ${paymentStatus === 'debt' ? 'bg-white shadow-sm text-error' : 'text-on-surface-variant'}`} onClick={() => setPaymentStatus('debt')}>
                <span className="material-symbols-outlined text-[20px]">schedule</span> Tempo / Utang
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-primary-container text-white py-lg rounded-xl font-headline-md text-headline-md font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-sm active:scale-[0.98] transition-transform">
            <span className="material-symbols-outlined">print</span> Simpan & Cetak Struk
          </button>
        </form>
      ) : (
        <div className="space-y-md animate-fade-in">
          <div className="flex flex-col sm:flex-row gap-md">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="w-full pl-10 pr-md py-md bg-surface-container-lowest border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md transition-all" placeholder="Cari nelayan atau jenis ikan..." type="text" />
            </div>
            <select className="bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-md font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none" value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)}>
              {months.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low border-b-2 border-primary">
                  <tr>
                    <th className="px-md py-sm font-financial-table text-secondary whitespace-nowrap">ID</th>
                    <th className="px-md py-sm font-financial-table text-secondary whitespace-nowrap">Nelayan</th>
                    <th className="px-md py-sm font-financial-table text-secondary whitespace-nowrap">Ikan</th>
                    <th className="px-md py-sm font-financial-table text-secondary text-right">Berat</th>
                    <th className="px-md py-sm font-financial-table text-secondary text-right">Total</th>
                    <th className="px-md py-sm font-financial-table text-secondary text-center">Status</th>
                    <th className="px-md py-sm font-financial-table text-secondary text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {filteredHistory.length === 0 ? (
                    <tr><td colSpan={7} className="px-md py-8 text-center font-body-md text-body-md text-on-surface-variant">Tidak ada riwayat ditemukan</td></tr>
                  ) : (
                    filteredHistory.map((row) => (
                      <tr key={row.id} className="active:bg-surface-container-high transition-colors">
                        <td className="px-md py-3 font-label-md text-label-md text-on-surface-variant">{row.id}</td>
                        <td className="px-md py-3 font-body-md text-body-md font-bold text-on-surface">{row.fisherman}</td>
                        <td className="px-md py-3 font-body-md text-body-md">
                          {Array.isArray(row.items) && row.items.length > 0
                            ? `${row.items[0].fishType}${row.items.length > 1 ? ` +${row.items.length - 1} jenis` : ''}`
                            : '-'}
                        </td>
                        <td className="px-md py-3 font-body-md text-body-md text-right">
                          {Array.isArray(row.items)
                            ? `${row.items.reduce((s, i) => s + (parseFloat(i.weight) || 0), 0).toLocaleString('id-ID')} kg`
                            : '0 kg'}
                        </td>
                        <td className="px-md py-3 font-body-md text-body-md text-right font-bold text-primary">
                          {Array.isArray(row.items)
                            ? `Rp ${row.items.reduce((s, i) => s + ((parseFloat(i.weight) || 0) * (parseFloat(i.price) || 0)), 0).toLocaleString('id-ID')}`
                            : 'Rp 0'}
                        </td>
                        <td className="px-md py-3 text-center">
                          <span className={`px-sm py-xs ${row.statusBg} ${row.statusText} font-label-md text-label-md rounded-full uppercase`}>{row.status}</span>
                        </td>
                        <td className="px-md py-3 text-center">
                          <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container/10 rounded-lg transition-all" title="Cetak Ulang Struk">
                            <span className="material-symbols-outlined text-[20px]">print</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PurchaseForm