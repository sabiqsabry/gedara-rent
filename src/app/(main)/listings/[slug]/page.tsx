import { notFound } from "next/navigation"
import Image from "next/image"
import { MapPin, Users, Bed, Bath, Star } from "lucide-react"
import { formatPrice, calculateTotalPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ListingReservation } from "@/components/listings/listing-reservation"

async function getListing(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/listings/${slug}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    return null
  }

  return res.json()
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const listing = await getListing(slug)

  if (!listing) {
    notFound()
  }

  const mainImage = listing.images[0]?.url || "/placeholder.jpg"
  const avgRating = listing.avgRating || 0
  const reviewCount = listing.reviews.length

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{avgRating}</span>
            {reviewCount > 0 && (
              <span className="text-sm">({reviewCount} reviews)</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>
              {listing.city}, {listing.district}, {listing.country}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="relative w-full h-96 rounded-xl overflow-hidden mb-6">
            <Image
              src={mainImage}
              alt={listing.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Property Details */}
          <div className="border-b pb-8 mb-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-600" />
                <span>{listing.guestCount} guests</span>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-gray-600" />
                <span>{listing.bedroomCount} bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-gray-600" />
                <span>{listing.bathroomCount} bathrooms</span>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4">About this place</h2>
            <p className="text-gray-700 whitespace-pre-line">{listing.description}</p>
          </div>

          {/* Amenities */}
          {listing.amenities.length > 0 && (
            <div className="border-b pb-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">What this place offers</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {listing.amenities.map((item: any) => (
                  <div key={item.amenity.id} className="flex items-center gap-2">
                    <span className="text-lg">{item.amenity.icon}</span>
                    <span>{item.amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {listing.reviews.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Reviews ({reviewCount})
              </h2>
              <div className="space-y-6">
                {listing.reviews.map((review: any) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gray-200" />
                      <div>
                        <p className="font-semibold">{review.author.name}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reservation Widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <ListingReservation listing={listing} />
          </div>
        </div>
      </div>
    </div>
  )
}
