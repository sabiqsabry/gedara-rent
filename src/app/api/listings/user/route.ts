import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"


export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const listings = await prisma.listing.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        images: {
          orderBy: { order: "asc" },
          take: 1,
        },
        _count: {
          select: {
            reservations: true,
            favorites: true,
            reviews: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(listings)
  } catch (error) {
    console.error("Error fetching user listings:", error)
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    )
  }
}
