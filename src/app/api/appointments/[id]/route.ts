import { NextResponse } from 'next/server'
import { getDb, saveDb } from '@/lib/db'

export async function PUT(request: Request, context: any) {
  const { params } = context
  // Next.js 15+ beklentileri; params asenkron da olabilir
  const p = await params
  const idStr = p.id
  
  if (!idStr) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  const id = Number(idStr)

  const db = getDb()
  const body = await request.json()
  
  const index = db.appointments.findIndex(a => a.id === id)
  if (index !== -1) {
    db.appointments[index] = {
      ...db.appointments[index],
      ...body
    }
    saveDb(db)
    return NextResponse.json(db.appointments[index])
  }
  
  return NextResponse.json({ error: 'Appointment not found' }, { status: 404 })
}

export async function DELETE(request: Request, context: any) {
  const { params } = context
  const p = await params
  const idStr = p.id
  
  if (!idStr) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  const id = Number(idStr)

  const db = getDb()
  db.appointments = db.appointments.filter(a => a.id !== id)
  saveDb(db)
  
  return NextResponse.json({ success: true })
}
