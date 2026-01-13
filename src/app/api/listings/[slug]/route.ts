import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const listing = await prisma.listing.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: { order: "asc" },
        },
        amenities: {
          include: {
            amenity: true,
          },
        },
        houseRules: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true,
            createdAt: true,
          },
        },
        reviews: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            reviews: true,
            favorites: true,
          },
        },
      },
    })

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 })
    }

    // Calculate average rating
    const avgRating =
      listing.reviews.length > 0
        ? listing.reviews.reduce((sum, review) => sum + review.rating, 0) /
          listing.reviews.length
        : 0

    return NextResponse.json({
      ...listing,
      avgRating: Math.round(avgRating * 10) / 10,
    })
  } catch (error) {
    console.error("Error fetching listing:", error)
    return NextResponse.json(
      { error: "Failed to fetch listing" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { slug } = await params
    const body = await request.json()

    // Check if user owns the listing
    const listing = await prisma.listing.findUnique({
      where: { slug },
    })

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 })
    }

    if (listing.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const updatedListing = await prisma.listing.update({
      where: { slug },
      data: body,
    })

    return NextResponse.json(updatedListing)
  } catch (error) {
    console.error("Error updating listing:", error)
    return NextResponse.json(
      { error: "Failed to update listing" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { slug } = await params

    const listing = await prisma.listing.findUnique({
      where: { slug },
    })

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 })
    }

    if (listing.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await prisma.listing.delete({
      where: { slug },
    })

    return NextResponse.json({ message: "Listing deleted" })
  } catch (error) {
    console.error("Error deleting listing:", error)
    return NextResponse.json(
      { error: "Failed to delete listing" },
      { status: 500 }
    )
  }
}
