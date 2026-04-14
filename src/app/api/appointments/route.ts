export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { getDb, saveDb, Appointment } from '@/lib/db'

export async function GET() {
  const db = getDb()
  // Randevuları tarihe göre yeniler önce gelecek şekilde sıralayalım
  const sortedAppointments = [...db.appointments].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  return NextResponse.json(sortedAppointments)
}

export async function POST(request: Request) {
  const db = getDb()
  const body = await request.json()
  
  const newAppointment: Appointment = {
    id: db.appointments.length > 0 ? Math.max(...db.appointments.map(a => a.id)) + 1 : 1,
    customerName: body.customerName,
    customerPhone: body.customerPhone,
    carModel: body.carModel,
    date: body.date,
    timeSlot: body.timeSlot,
    status: 'Pending',
    totalCost: Number(body.totalCost),
    serviceIds: body.serviceIds || [],
    createdAt: new Date().toISOString()
  }
  
  db.appointments.push(newAppointment)
  saveDb(db)
  
  return NextResponse.json(newAppointment, { status: 201 })
}
