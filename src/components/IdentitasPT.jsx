import React, { useState, useEffect } from 'react'
import { getIdentity, saveIdentity } from '../utils/companyIdentity'
import { resetInvoiceCounters } from '../utils/invoiceCounter'

function IdentitasPT() {
  const [identity, setIdentity] = useState(getIdentity())
  const [saved, setSaved] = useState(false)
  const [previewLogo, setPreviewLogo] = useState(identity.logo || '')
  const [showResetModal, setShowResetModal] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)

  useEffect(() => {
    const id = getIdentity()
    setIdentity(id)
    setPreviewLogo(id.logo || '')
  }, [])

  const handleChange = (field) => (e) => {
    if (field === 'logo' && e.target.files?.[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result
        setPreviewLogo(base64)
        setIdentity((prev) => ({ ...prev, logo: base64 }))
      }
      reader.readAsDataURL(file)
    } else {
      setIdentity((prev) => ({ ...prev, [field]: e.target.value }))
    }
    setSaved(false)
  }

  const handleSave = () => {
    saveIdentity(identity)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleReset = () => {
    const reset = { ...identity, companyName: 'PT Asy-Syifa Panua', address: '', phone: '', email: '', npwp: '', logo: '' }
    setIdentity(reset)
    saveIdentity(reset)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleResetInvoice = () => {
    resetInvoiceCounters()
    setShowResetModal(false)
    setResetSuccess(true)
    setTimeout(() => setResetSuccess(false), 3000)
  }

  return (
    <div className="px-margin-mobile pt-lg max-w-2xl mx-auto animate-fade-in">
      <div className="mb-lg">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Identitas Perusahaan</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">Data ini akan digunakan sebagai header pada semua dokumen cetak (struk, invoice, laporan).</p>
      </div>

      <div className="space-y-lg">
        <div className="bg-white border border-outline-variant rounded-xl p-md space-y-md card-hover">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Informasi PT</h3>
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant uppercase">Nama Perusahaan</label>
            <input
              className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              type="text"
              value={identity.companyName}
              onChange={handleChange('companyName')}
            />
          </div>
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant uppercase">Alamat</label>
            <textarea
              className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
              rows="3"
              value={identity.address}
              onChange={handleChange('address')}
            />
          </div>
          <div className="grid grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase">Telepon</label>
              <input
                className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                type="text"
                value={identity.phone}
                onChange={handleChange('phone')}
              />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase">Email</label>
              <input
                className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                type="email"
                value={identity.email}
                onChange={handleChange('email')}
              />
            </div>
          </div>
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant uppercase">NPWP</label>
            <input
              className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              type="text"
              value={identity.npwp}
              onChange={handleChange('npwp')}
            />
          </div>
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant uppercase">Logo PT</label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface-container border border-outline-variant flex items-center justify-center">
                {previewLogo ? (
                  <img src={previewLogo} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-outline text-[28px]">image</span>
                )}
              </div>
              <label className="flex-1 cursor-pointer">
                <input
                  accept="image/*"
                  className="hidden"
                  type="file"
                  onChange={handleChange('logo')}
                />
                <span className="flex items-center justify-center gap-2 px-4 py-2.5 bg-surface border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:border-primary hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]">upload</span>
                  Pilih Logo
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-md">
          <button
            type="button"
            className="flex-1 bg-primary-container text-on-primary-container py-md rounded-xl font-headline-md text-headline-md font-bold active:scale-[0.98] transition-transform"
            onClick={handleSave}
          >
            Simpan Identitas
          </button>
          <button
            type="button"
            className="flex-1 bg-surface-container-high text-on-surface-variant py-md rounded-xl font-headline-md text-headline-md border border-outline-variant hover:bg-surface-container transition-colors active:scale-[0.98] transition-transform"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        <div className="flex gap-md">
          <button
            type="button"
            className="flex-1 bg-error-container text-on-error-container py-md rounded-xl font-headline-md text-headline-md font-bold active:scale-[0.98] transition-transform"
            onClick={() => setShowResetModal(true)}
          >
            Reset Nomor Invoice
          </button>
        </div>

        {saved && (
          <div className="bg-[#E8F5E9] text-[#28A745] px-4 py-2 rounded-lg font-body-md text-body-md text-center">
            Identitas berhasil disimpan
          </div>
        )}

        {resetSuccess && (
          <div className="bg-[#E8F5E9] text-[#28A745] px-4 py-2 rounded-lg font-body-md text-body-md text-center">
            Nomor invoice berhasil direset
          </div>
        )}

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Preview Struk</h3>
          <div className="bg-white border border-outline-variant rounded-lg p-lg">
            <div className="text-center mb-md">
              {previewLogo && (
                <img src={previewLogo} alt="Logo" className="w-20 h-20 mx-auto mb-2 rounded-lg object-contain" />
              )}
              <h4 className="font-headline-md text-headline-md text-on-surface">{identity.companyName || 'Nama Perusahaan'}</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">{identity.address || 'Alamat perusahaan'}</p>
              <p className="font-body-md text-body-md text-on-surface-variant">Telp: {identity.phone || '-'} | Email: {identity.email || '-'}</p>
              {identity.npwp && <p className="font-body-md text-body-md text-on-surface-variant">NPWP: {identity.npwp}</p>}
            </div>
            <div className="border-t border-outline-variant pt-md">
              <p className="font-label-md text-label-md text-on-surface-variant text-center">--- PREVIEW STRUK ---</p>
            </div>
          </div>
</div>
       </div>

       {showResetModal && (
         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-md" onClick={() => setShowResetModal(false)}>
           <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
             <div className="flex justify-between items-center mb-lg">
               <h3 className="font-headline-md text-headline-md text-on-surface">Reset Nomor Invoice</h3>
               <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" onClick={() => setShowResetModal(false)}>close</button>
             </div>
             <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
               Apakah Anda yakin ingin mereset nomor invoice? Nomor invoice akan dimulai dari <strong>TRX/2026/B.0001</strong> dan <strong>TRX/2026/J.0001</strong> untuk transaksi Beli dan Jual.
             </p>
             <div className="flex gap-sm">
               <button
                 className="flex-1 py-md rounded-xl font-label-md border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors"
                 onClick={() => setShowResetModal(false)}
               >
                 Batal
               </button>
               <button
                 className="flex-1 py-md rounded-xl font-label-md bg-error text-on-error hover:opacity-90 transition-opacity"
                 onClick={handleResetInvoice}
               >
                 Reset
               </button>
             </div>
           </div>
         </div>
       )}
     </div>
   )
 }

 export default IdentitasPT
