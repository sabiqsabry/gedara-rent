import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authConfig } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location")
    const category = searchParams.get("category")
    const guestCount = searchParams.get("guestCount")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const propertyType = searchParams.get("propertyType")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const skip = (page - 1) * limit

    const where: any = {
      isPublished: true,
    }

    if (location) {
      where.OR = [
        { city: { contains: location, mode: "insensitive" } },
        { district: { contains: location, mode: "insensitive" } },
        { address: { contains: location, mode: "insensitive" } },
      ]
    }

    if (category) {
      where.category = category
    }

    if (guestCount) {
      where.guestCount = { gte: parseInt(guestCount) }
    }

    if (propertyType) {
      where.propertyType = propertyType
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseInt(minPrice)
      if (maxPrice) where.price.lte = parseInt(maxPrice)
    }

    // Date availability check
    if (startDate && endDate) {
      where.NOT = {
        reservations: {
          some: {
            AND: [
              { startDate: { lte: new Date(endDate) } },
              { endDate: { gte: new Date(startDate) } },
              { status: { not: "CANCELLED" } },
            ],
          },
        },
      }
    }

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        include: {
          images: {
            orderBy: { order: "asc" },
            take: 1,
          },
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          _count: {
            select: {
              reviews: true,
              favorites: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.listing.count({ where }),
    ])

    return NextResponse.json({
      listings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching listings:", error)
    return NextResponse.json(
      { error: "Failed to fetch listings" },
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
    const {
      title,
      description,
      address,
      city,
      district,
      country,
      latitude,
      longitude,
      category,
      propertyType,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      price,
      cleaningFee,
      serviceFee,
      amenities,
      houseRules,
      images,
    } = body

    // Generate slug
    const slug = `${title.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        slug,
        address,
        city,
        district,
        country: country || "Sri Lanka",
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        category,
        propertyType,
        guestCount: parseInt(guestCount),
        bedroomCount: parseInt(bedroomCount),
        bedCount: parseInt(bedCount),
        bathroomCount: parseInt(bathroomCount),
        price: parseInt(price),
        cleaningFee: cleaningFee ? parseInt(cleaningFee) : null,
        serviceFee: serviceFee ? parseInt(serviceFee) : null,
        userId: session.user.id,
        images: {
          create: images?.map((img: any, index: number) => ({
            url: img.url,
            publicId: img.publicId,
            caption: img.caption,
            order: index,
          })) || [],
        },
        amenities: {
          create: amenities?.map((amenityId: string) => ({
            amenityId,
          })) || [],
        },
        houseRules: {
          create: houseRules?.map((rule: string) => ({
            rule,
          })) || [],
        },
      },
      include: {
        images: true,
        amenities: {
          include: {
            amenity: true,
          },
        },
      },
    })

    return NextResponse.json(listing, { status: 201 })
  } catch (error) {
    console.error("Error creating listing:", error)
    return NextResponse.json(
      { error: "Failed to create listing" },
      { status: 500 }
    )
  }
}
