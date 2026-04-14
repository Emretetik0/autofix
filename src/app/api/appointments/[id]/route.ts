import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(request: Request, context: any) {
  try {
    const { params } = context
    const p = await params
    const id = Number(p.id)
    
    const body = await request.json()
    
    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: {
        status: body.status,
        customerName: body.customerName,
        customerPhone: body.customerPhone,
        carModel: body.carModel,
        date: body.date,
        timeSlot: body.timeSlot,
        totalCost: body.totalCost ? Number(body.totalCost) : undefined,
      }
    })
    
    return NextResponse.json(updatedAppointment)
  } catch (error) {
    return NextResponse.json({ error: 'Appointment not found or update failed' }, { status: 404 })
  }
}

export async function DELETE(request: Request, context: any) {
  try {
    const { params } = context
    const p = await params
    const id = Number(p.id)

    // Delete relation first (No cascade in sqlite/postgresql unless specified)
    await prisma.appointmentService.deleteMany({
      where: { appointmentId: id }
    })

    await prisma.appointment.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete appointment' }, { status: 500 })
  }
}
