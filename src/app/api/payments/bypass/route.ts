import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authConfig } from "@/lib/auth"
import { canBypassAuth } from "@/lib/auth-bypass"

export async function POST(request: NextRequest) {
  // Only allow in development
  if (!canBypassAuth()) {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 })
  }

  try {
    const session = await getServerSession(authConfig)
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { reservationId, amount, status } = await request.json()

    // Check if payment already exists
    const existingPayment = await prisma.payment.findUnique({
      where: { reservationId },
    })

    if (existingPayment) {
      return NextResponse.json(existingPayment)
    }

    const payment = await prisma.payment.create({
      data: {
        reservationId,
        amount: parseInt(amount) || 0,
        status: status || "SUCCEEDED",
        currency: "LKR",
        stripePaymentId: `bypass_${Date.now()}`,
      },
    })

    return NextResponse.json(payment, { status: 201 })
  } catch (error) {
    console.error("Error creating bypass payment:", error)
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    )
  }
}
