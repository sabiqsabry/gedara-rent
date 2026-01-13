import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"


export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      reservationId,
      listingId,
      rating,
      comment,
      cleanlinessRating,
      accuracyRating,
      communicationRating,
      locationRating,
      checkInRating,
      valueRating,
    } = body

    // Check if reservation exists and belongs to user
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
    })

    if (!reservation) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 })
    }

    if (reservation.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Check if review already exists
    const existingReview = await prisma.review.findUnique({
      where: { reservationId },
    })

    if (existingReview) {
      return NextResponse.json(
        { error: "Review already exists for this reservation" },
        { status: 400 }
      )
    }

    const review = await prisma.review.create({
      data: {
        authorId: session.user.id,
        listingId,
        reservationId,
        rating: parseInt(rating),
        comment,
        cleanlinessRating: cleanlinessRating ? parseInt(cleanlinessRating) : null,
        accuracyRating: accuracyRating ? parseInt(accuracyRating) : null,
        communicationRating: communicationRating ? parseInt(communicationRating) : null,
        locationRating: locationRating ? parseInt(locationRating) : null,
        checkInRating: checkInRating ? parseInt(checkInRating) : null,
        valueRating: valueRating ? parseInt(valueRating) : null,
        subjectId: reservation.listingId ? undefined : undefined, // TODO: Get host ID from listing
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    )
  }
}
