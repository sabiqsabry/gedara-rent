import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

import { uploadImage } from "@/lib/cloudinary"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { slug } = await params
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]

    const listing = await prisma.listing.findUnique({
      where: { slug },
    })

    if (!listing || listing.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const { url, publicId } = await uploadImage(file)
        return { url, publicId }
      })
    )

    const images = await Promise.all(
      uploadedImages.map((img, index) =>
        prisma.listingImage.create({
          data: {
            url: img.url,
            publicId: img.publicId,
            listingId: listing.id,
            order: index,
          },
        })
      )
    )

    return NextResponse.json(images)
  } catch (error) {
    console.error("Error uploading images:", error)
    return NextResponse.json(
      { error: "Failed to upload images" },
      { status: 500 }
    )
  }
}
