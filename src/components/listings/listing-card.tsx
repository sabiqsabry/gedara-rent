"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, MapPin, Star } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { SafeListing } from "@/types"
import { useState } from "react"

interface ListingCardProps {
  listing: SafeListing & {
    images: Array<{ url: string }>
    _count?: {
      reviews: number
      favorites: number
    }
  }
}

export function ListingCard({ listing }: ListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const imageUrl = listing.images[0]?.url || "/placeholder.jpg"
  const rating = 4.5 // TODO: Calculate from reviews
  const reviewCount = listing._count?.reviews || 0

  return (
    <Link href={`/listings/${listing.slug}`}>
      <div className="group cursor-pointer">
        <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-200">
          <Image
            src={imageUrl}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            unoptimized
          />
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsFavorite(!isFavorite)
              // TODO: Handle favorite toggle
            }}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? "fill-primary text-primary" : ""}`}
            />
          </button>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-lg truncate">{listing.title}</h3>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-600 text-sm mb-1">
            <MapPin className="h-4 w-4" />
            <span className="truncate">
              {listing.city}, {listing.district}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">
              {formatPrice(listing.price)} <span className="font-normal text-gray-600">night</span>
            </span>
            {reviewCount > 0 && (
              <span className="text-sm text-gray-600">
                {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
