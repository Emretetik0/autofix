export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        services: {
          include: {
            service: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(appointments)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const newAppointment = await prisma.appointment.create({
      data: {
        customerName: body.customerName,
        customerPhone: body.customerPhone,
        carModel: body.carModel,
        date: body.date,
        timeSlot: body.timeSlot,
        status: 'Pending',
        totalCost: Number(body.totalCost),
        services: {
          create: (body.serviceIds || []).map((serviceId: number) => ({
            service: {
              connect: { id: Number(serviceId) }
            }
          }))
        }
      },
      include: {
        services: {
          include: {
            service: true
          }
        }
      }
    })
    
    return NextResponse.json(newAppointment, { status: 201 })
  } catch (error) {
    console.error('Appointment Error:', error)
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
  }
}
