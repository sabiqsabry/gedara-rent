"use client"

import { useEffect, useState } from "react"
import { Loader } from "@/components/shared/loader"
import { EmptyState } from "@/components/shared/empty-state"
import { Heart } from "lucide-react"
import { ListingGrid } from "@/components/listings/listing-grid"

export default function WishlistsPage() {
  const [favorites, setFavorites] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    try {
      const response = await fetch("/api/favorites")
      const data = await response.json()
      setFavorites(data.map((fav: any) => fav.listing))
    } catch (error) {
      console.error("Error fetching favorites:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loader className="min-h-[400px]" />
  }

  if (favorites.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="No wishlists yet"
        description="Save listings you love to your wishlist"
      />
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Your Wishlists</h1>
      <ListingGrid listings={favorites} />
    </div>
  )
}
