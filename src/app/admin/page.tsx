'use client'

import { useState } from 'react'

interface Service {
  id: number
  name: string
  description: string
  price: number
  duration: number
}

interface Appointment {
  id: number
  customerName: string
  customerPhone: string
  carModel: string
  date: string
  timeSlot: string
  status: 'Pending' | 'Approved' | 'Rejected'
  totalCost: number
  createdAt: string
}

import { initialServices, initialAppointments } from '@/lib/mockData'

export default function AdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [services, setServices] = useState<Service[]>(initialServices)
  
  const [activeTab, setActiveTab] = useState<'appointments' | 'services'>('appointments')

  // Form states for services
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    price: '',
    duration: ''
  })

  const handleUpdateStatus = (id: number, status: 'Pending' | 'Approved' | 'Rejected') => {
    setAppointments(prev => prev.map(ap => ap.id === id ? { ...ap, status } : ap))
  }

  const handleDeleteAppointment = (id: number) => {
    if (confirm('Bu randevuyu silmek istediğinize emin misiniz?')) {
      setAppointments(prev => prev.filter(ap => ap.id !== id))
    }
  }

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingService) {
      setServices(prev => prev.map(srv => srv.id === editingService.id ? {
        ...srv,
        name: serviceForm.name,
        description: serviceForm.description,
        price: Number(serviceForm.price),
        duration: Number(serviceForm.duration)
      } : srv))
    } else {
      const newService: Service = {
        id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1,
        name: serviceForm.name,
        description: serviceForm.description,
        price: Number(serviceForm.price),
        duration: Number(serviceForm.duration)
      }
      setServices(prev => [...prev, newService])
    }
    setEditingService(null)
    setServiceForm({ name: '', description: '', price: '', duration: '' })
  }

  const handleEditService = (srv: Service) => {
    setEditingService(srv)
    setServiceForm({
      name: srv.name,
      description: srv.description,
      price: srv.price.toString(),
      duration: srv.duration.toString()
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDeleteService = (id: number) => {
    if (confirm('Hizmeti silmek istediğinize emin misiniz?')) {
      setServices(prev => prev.filter(srv => srv.id !== id))
    }
  }

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 className="title" style={{ marginBottom: 0, fontSize: '2rem' }}>Yönetici Paneli</h1>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button 
            className={`btn ${activeTab === 'appointments' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('appointments')}
          >
            Randevular
          </button>
          <button 
            className={`btn ${activeTab === 'services' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('services')}
          >
            Hizmet & Fiyat Yönetimi
          </button>
        </div>
      </div>

      {activeTab === 'appointments' && (
        <>
          {/* Dashboard Summary Widgets */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            <div className="card" style={{ padding: '24px', textAlign: 'center', backgroundColor: 'rgba(245, 166, 35, 0.1)', borderColor: 'rgba(245, 166, 35, 0.3)' }}>
              <div style={{ color: 'var(--primary)', fontSize: '2rem', fontWeight: 800 }}>
                {appointments.filter(a => a.status === 'Pending').length}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Bekleyen Randevu</div>
            </div>
            <div className="card" style={{ padding: '24px', textAlign: 'center', backgroundColor: 'rgba(46, 213, 115, 0.1)', borderColor: 'rgba(46, 213, 115, 0.3)' }}>
              <div style={{ color: 'var(--success)', fontSize: '2rem', fontWeight: 800 }}>
                {appointments.filter(a => a.status === 'Approved').length}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Onaylanmış Randevu</div>
            </div>
            <div className="card" style={{ padding: '24px', textAlign: 'center', backgroundColor: 'rgba(13, 15, 18, 0.5)' }}>
              <div style={{ color: 'var(--text-main)', fontSize: '2rem', fontWeight: 800 }}>
                {appointments.filter(a => a.status === 'Approved').reduce((acc, curr) => acc + curr.totalCost, 0)} ₺
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Beklenen Kasa (Onaylanmış)</div>
            </div>
          </div>

          <div className="card">
            <h2 style={{ marginBottom: '24px' }}>Tüm Randevular</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px' }}>Müşteri</th>
                  <th style={{ padding: '12px' }}>İletişim</th>
                  <th style={{ padding: '12px' }}>Araç</th>
                  <th style={{ padding: '12px' }}>Tarih / Saat</th>
                  <th style={{ padding: '12px' }}>Tutar</th>
                  <th style={{ padding: '12px' }}>Durum</th>
                  <th style={{ padding: '12px' }}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 && (
                  <tr><td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>Randevu bulunmuyor.</td></tr>
                )}
                {appointments.map(ap => (
                  <tr key={ap.id} style={{ borderBottom: '1px solid var(--surface-hover)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{ap.customerName}</td>
                    <td style={{ padding: '12px' }}>{ap.customerPhone}</td>
                    <td style={{ padding: '12px' }}>{ap.carModel}</td>
                    <td style={{ padding: '12px' }}>{ap.date} <br/><span style={{ color: 'var(--primary)' }}>{ap.timeSlot}</span></td>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{ap.totalCost} ₺</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ 
                        padding: '4px 8px', borderRadius: '4px', fontSize: '12px', 
                        backgroundColor: ap.status === 'Approved' ? 'rgba(46,213,115,0.2)' : ap.status === 'Rejected' ? 'rgba(255,71,87,0.2)' : 'rgba(245,166,35,0.2)',
                        color: ap.status === 'Approved' ? 'var(--success)' : ap.status === 'Rejected' ? 'var(--danger)' : 'var(--primary)'
                      }}>
                        {ap.status === 'Pending' ? 'Bekliyor' : ap.status === 'Approved' ? 'Onaylandı' : 'Reddedildi'}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      {ap.status === 'Pending' && (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => handleUpdateStatus(ap.id, 'Approved')} style={{ background: 'var(--success)', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', color: '#000', fontWeight: 'bold', fontSize: '12px' }}>Onayla</button>
                          <button onClick={() => handleUpdateStatus(ap.id, 'Rejected')} style={{ background: 'var(--danger)', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', color: '#fff', fontWeight: 'bold', fontSize: '12px' }}>Reddet</button>
                        </div>
                      )}
                      <button onClick={() => handleDeleteAppointment(ap.id)} style={{ background: 'transparent', color: 'var(--danger)', border: 'none', cursor: 'pointer', fontSize: '12px', marginTop: '8px' }}>Sil</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </>
      )}

      {activeTab === 'services' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '32px' }}>
          <div className="card" style={{ alignSelf: 'start' }}>
            <h2 style={{ marginBottom: '24px' }}>{editingService ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle'}</h2>
            <form onSubmit={handleServiceSubmit}>
              <div className="input-group">
                <label className="input-label">Hizmet Adı</label>
                <input required type="text" className="input-field" value={serviceForm.name} onChange={e => setServiceForm({...serviceForm, name: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Açıklama</label>
                <textarea required className="input-field" rows={3} value={serviceForm.description} onChange={e => setServiceForm({...serviceForm, description: e.target.value})}></textarea>
              </div>
              <div className="input-group">
                <label className="input-label">Fiyat (₺)</label>
                <input required type="number" className="input-field" value={serviceForm.price} onChange={e => setServiceForm({...serviceForm, price: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Süre (Dakika)</label>
                <input required type="number" className="input-field" value={serviceForm.duration} onChange={e => setServiceForm({...serviceForm, duration: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{editingService ? 'Güncelle' : 'Ekle'}</button>
                {editingService && (
                  <button type="button" className="btn btn-outline" onClick={() => {setEditingService(null); setServiceForm({name: '', description: '', price: '', duration: ''})}}>İptal</button>
                )}
              </div>
            </form>
          </div>

          <div className="card">
            <h2 style={{ marginBottom: '24px' }}>Mevcut Hizmetler</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {services.map(srv => (
                <div key={srv.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: 'var(--surface-hover)' }}>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', marginBottom: '4px' }}>{srv.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{srv.price} ₺ • {srv.duration} dk</p>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleEditService(srv)}>Düzenle</button>
                    <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleDeleteService(srv.id)}>Sil</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
