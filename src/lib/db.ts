import fs from 'fs'
import path from 'path'

const dbPath = path.join(process.cwd(), 'data.json')

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

interface Database {
  services: Service[]
  appointments: Appointment[]
}

const defaultData: Database = {
  services: [
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
  ],
  appointments: []
}

export const getDb = (): Database => {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2))
    return defaultData
  }
  const data = fs.readFileSync(dbPath, 'utf-8')
  return JSON.parse(data)
}

export const saveDb = (data: Database) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
}
