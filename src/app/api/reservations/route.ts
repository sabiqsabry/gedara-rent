import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authConfig } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig)
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const reservations = await prisma.reservation.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        listing: {
          include: {
            images: {
              take: 1,
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(reservations)
  } catch (error) {
    console.error("Error fetching reservations:", error)
    return NextResponse.json(
      { error: "Failed to fetch reservations" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig)
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { listingId, startDate, endDate, guestCount, totalPrice } = body

    // Check if listing exists and is available
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    })

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 })
    }

    if (!listing.isPublished) {
      return NextResponse.json(
        { error: "Listing is not available" },
        { status: 400 }
      )
    }

    // Check for conflicting reservations
    const conflictingReservation = await prisma.reservation.findFirst({
      where: {
        listingId,
        AND: [
          { startDate: { lte: new Date(endDate) } },
          { endDate: { gte: new Date(startDate) } },
          { status: { not: "CANCELLED" } },
        ],
      },
    })

    if (conflictingReservation) {
      return NextResponse.json(
        { error: "These dates are not available" },
        { status: 400 }
      )
    }

    const reservation = await prisma.reservation.create({
      data: {
        userId: session.user.id,
        listingId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        guestCount: parseInt(guestCount),
        totalPrice: parseInt(totalPrice),
        status: "PENDING",
      },
      include: {
        listing: {
          include: {
            images: {
              take: 1,
            },
          },
        },
      },
    })

    return NextResponse.json(reservation, { status: 201 })
  } catch (error) {
    console.error("Error creating reservation:", error)
    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 }
    )
  }
}
