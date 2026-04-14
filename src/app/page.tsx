'use client'

import { useState, useEffect } from 'react'

interface Service {
  id: number
  name: string
  description: string
  price: number
  duration: number
}

import { initialServices } from '@/lib/mockData'

export default function Home() {
  const [services] = useState<Service[]>(initialServices)
  const [selectedServices, setSelectedServices] = useState<number[]>([])
  const [totalCost, setTotalCost] = useState(0)
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    carModel: '',
    date: '',
    timeSlot: '10:00'
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const total = selectedServices.reduce((sum, id) => {
      const service = services.find(s => s.id === id)
      return sum + (service ? service.price : 0)
    }, 0)
    setTotalCost(total)
  }, [selectedServices, services])

  const toggleService = (id: number) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedServices.length === 0) {
      alert('Lütfen en az bir hizmet seçin.')
      return
    }
    
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    setSuccess(true)
    setSelectedServices([])
    setFormData({
      customerName: '',
      customerPhone: '',
      carModel: '',
      date: '',
      timeSlot: '10:00'
    })
    setLoading(false)
  }

  return (
    <main className="main-content container">
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '80px', paddingTop: '40px' }}>
        <h1 className="title" style={{ fontSize: '4rem', marginBottom: '16px' }}>
          Aracınız İçin<br/>
          <span style={{ color: 'var(--primary)', WebkitTextFillColor: 'initial' }}>Premium Bakım</span>
        </h1>
        <p className="subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Uzman kadromuzla aracınızın tüm ihtiyaçlarını karşılıyor, sürüş güvenliğinizi ve performansını en üst düzeye çıkarıyoruz.
        </p>
      </section>

      {/* Features / Neden Biz */}
      <section style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '24px', marginBottom: '80px' 
      }}>
        <div className="card" style={{ textAlign: 'center', padding: '32px 24px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⚡️</div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Hızlı Teslimat</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Aracınızı söz verdiğimiz saatte, eksiksiz olarak teslim ediyoruz.</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '32px 24px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🛡️</div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Orijinal Yedek Parça</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Sadece garantili ve aracınıza tam uyumlu orijinal parçalar kullanıyoruz.</p>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '32px 24px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>👨‍🔧</div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Uzman Kadro</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Yılların tecrübesine sahip sertifikalı ustalarımızla güvendesiniz.</p>
        </div>
      </section>

      {success ? (
        <div style={{ textAlign: 'center', padding: '60px', backgroundColor: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--success)' }}>
          <h2 style={{ color: 'var(--success)', fontSize: '2rem', marginBottom: '16px' }}>Randevunuz Başarıyla Alındı!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>En kısa sürede sizinle iletişime geçeceğiz. Bizi tercih ettiğiniz için teşekkür ederiz.</p>
          <button className="btn btn-primary" onClick={() => setSuccess(false)}>Yeni Randevu Al</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '48px', alignItems: 'start' }}>
          
          {/* Sol: Hizmetler Listesi */}
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Hizmet Seçiniz</h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              {services.map(service => {
                const isSelected = selectedServices.includes(service.id)
                return (
                  <div 
                    key={service.id} 
                    className="card"
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      cursor: 'pointer',
                      borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                      backgroundColor: isSelected ? 'var(--surface-hover)' : 'var(--surface)'
                    }}
                    onClick={() => toggleService(service.id)}
                  >
                    <div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{service.name}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '400px' }}>{service.description}</p>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                        ⏱ {service.duration} dk
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
                        {service.price} ₺
                      </div>
                      <div style={{ 
                        marginTop: '12px', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%', 
                        border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--text-muted)'}`,
                        backgroundColor: isSelected ? 'var(--primary)' : 'transparent',
                        color: '#000',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}>
                        {isSelected && '✓'}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Sağ: Randevu Formu */}
          <div className="card" style={{ position: 'sticky', top: '100px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Randevu Bilgileri</h2>
            
            <div style={{ backgroundColor: '#000', padding: '16px', borderRadius: '8px', marginBottom: '24px', textAlign: 'center' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Tahmini Sepet Tutarı</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>{totalCost} ₺</div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Ad Soyad</label>
                <input required type="text" className="input-field" placeholder="Örn: Ahmet Yılmaz" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Telefon Numarası</label>
                <input required type="tel" className="input-field" placeholder="5xx xxx xx xx" value={formData.customerPhone} onChange={e => setFormData({...formData, customerPhone: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Araç Marka / Model</label>
                <input required type="text" className="input-field" placeholder="Örn: BMW 3.20i 2020" value={formData.carModel} onChange={e => setFormData({...formData, carModel: e.target.value})} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="input-group">
                  <label className="input-label">Tarih</label>
                  <input required type="date" className="input-field" min={new Date().toISOString().split('T')[0]} value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                </div>
                <div className="input-group">
                  <label className="input-label">Saat</label>
                  <select className="input-field" value={formData.timeSlot} onChange={e => setFormData({...formData, timeSlot: e.target.value})}>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:30">11:30</option>
                    <option value="13:00">13:00</option>
                    <option value="15:00">15:00</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} disabled={loading}>
                {loading ? 'İşleniyor...' : 'Randevuyu Onayla'}
              </button>
            </form>
          </div>
          
        </div>
      )}
    </main>
  )
}
