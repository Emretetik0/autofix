export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const services = await prisma.service.findMany()
    return NextResponse.json(services)
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const newService = await prisma.service.create({
      data: {
        name: body.name,
        description: body.description,
        price: Number(body.price),
        duration: Number(body.duration)
      }
    })
    
    return NextResponse.json(newService, { status: 201 })
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    
    const updatedService = await prisma.service.update({
      where: { id: Number(body.id) },
      data: {
        name: body.name,
        description: body.description,
        price: Number(body.price),
        duration: Number(body.duration)
      }
    })
    
    return NextResponse.json(updatedService)
  } catch (_error) {
    return NextResponse.json({ error: 'Service not found or update failed' }, { status: 404 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  if (id) {
    try {
      await prisma.service.delete({
        where: { id: Number(id) }
      })
      return NextResponse.json({ success: true })
    } catch (_error) {
      return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
    }
  }
  
  return NextResponse.json({ error: 'ID required' }, { status: 400 })
}
