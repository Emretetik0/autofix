export interface Service {
  id: number
  name: string
  description: string
  price: number
  duration: number
}

export interface Appointment {
  id: number
  customerName: string
  customerPhone: string
  carModel: string
  date: string
  timeSlot: string
  status: 'Pending' | 'Approved' | 'Rejected'
  totalCost: number
  serviceIds: number[]
  createdAt: string
}

export const initialServices: Service[] = [
  {
    id: 1,
    name: 'Genel Bakım (Periyodik)',
    description: 'Motor yağı, yağ filtresi, hava filtresi ve polen filtresi değişimi.',
    price: 1500,
    duration: 60,
  },
  {
    id: 2,
    name: 'Fren Balatası Değişimi',
    description: 'Ön ve arka fren balatalarının kontrolü ve değişimi.',
    price: 800,
    duration: 45,
  },
  {
    id: 3,
    name: 'Akü Değişimi',
    description: 'Eski akünün ölçümü ve yeni start-stop veya normal akü ile değişimi.',
    price: 1200,
    duration: 20,
  },
  {
    id: 4,
    name: 'Detaylı İç ve Dış Temizlik',
    description: 'Araç içi detaylı antibakteriyel temizlik, motor yıkama ve dış cilalama.',
    price: 2500,
    duration: 180,
  }
]

export const initialAppointments: Appointment[] = [
  {
    id: 1,
    customerName: 'Ahmet Yılmaz',
    customerPhone: '555 123 4567',
    carModel: 'Fiat Egea 2021',
    date: '2024-04-20',
    timeSlot: '10:00',
    status: 'Approved',
    totalCost: 1500,
    serviceIds: [1],
    createdAt: new Date().toISOString()
  }
]
