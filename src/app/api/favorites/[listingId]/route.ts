import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"


export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ listingId: string }> }
) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { listingId } = await params

    const favorite = await prisma.favorite.create({
      data: {
        userId: session.user.id,
        listingId,
      },
    })

    return NextResponse.json(favorite, { status: 201 })
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Already favorited" },
        { status: 400 }
      )
    }
    console.error("Error creating favorite:", error)
    return NextResponse.json(
      { error: "Failed to create favorite" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ listingId: string }> }
) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { listingId } = await params

    await prisma.favorite.deleteMany({
      where: {
        userId: session.user.id,
        listingId,
      },
    })

    return NextResponse.json({ message: "Favorite removed" })
  } catch (error) {
    console.error("Error deleting favorite:", error)
    return NextResponse.json(
      { error: "Failed to delete favorite" },
      { status: 500 }
    )
  }
}
