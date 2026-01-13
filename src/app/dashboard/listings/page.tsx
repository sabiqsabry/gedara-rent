"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader } from "@/components/shared/loader"
import { EmptyState } from "@/components/shared/empty-state"
import { Home, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ListingCard } from "@/components/listings/listing-card"

export default function ListingsPage() {
  const router = useRouter()
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      const response = await fetch("/api/listings/user")
      const data = await response.json()
      setListings(data)
    } catch (error) {
      console.error("Error fetching listings:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loader className="min-h-[400px]" />
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Listings</h1>
        <Button onClick={() => router.push("/become-a-host")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Listing
        </Button>
      </div>

      {listings.length === 0 ? (
        <EmptyState
          icon={Home}
          title="No listings yet"
          description="Create your first listing to start hosting"
          action={
            <Button onClick={() => router.push("/become-a-host")}>
              Create Listing
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}
