export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { getDb, saveDb, Service } from '@/lib/db'

export async function GET() {
  const db = getDb()
  return NextResponse.json(db.services)
}

export async function POST(request: Request) {
  const db = getDb()
  const body = await request.json()
  
  const newService: Service = {
    id: db.services.length > 0 ? Math.max(...db.services.map(s => s.id)) + 1 : 1,
    name: body.name,
    description: body.description,
    price: Number(body.price),
    duration: Number(body.duration)
  }
  
  db.services.push(newService)
  saveDb(db)
  
  return NextResponse.json(newService, { status: 201 })
}

export async function PUT(request: Request) {
  const db = getDb()
  const body = await request.json()
  
  const index = db.services.findIndex(s => s.id === body.id)
  if (index !== -1) {
    db.services[index] = {
      ...db.services[index],
      name: body.name,
      description: body.description,
      price: Number(body.price),
      duration: Number(body.duration)
    }
    saveDb(db)
    return NextResponse.json(db.services[index])
  }
  
  return NextResponse.json({ error: 'Service not found' }, { status: 404 })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  if (id) {
    const db = getDb()
    db.services = db.services.filter(s => s.id !== Number(id))
    saveDb(db)
    return NextResponse.json({ success: true })
  }
  
  return NextResponse.json({ error: 'ID required' }, { status: 400 })
}
