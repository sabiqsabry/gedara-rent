"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { ListingGrid } from "@/components/listings/listing-grid"
import { Loader } from "@/components/shared/loader"
import { Button } from "@/components/ui/button"

export default function ListingsPage() {
  const searchParams = useSearchParams()
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetchListings()
  }, [searchParams, page])

  const fetchListings = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams(searchParams.toString())
      params.set("page", page.toString())
      params.set("limit", "12")

      const response = await fetch(`/api/listings?${params.toString()}`)
      const data = await response.json()

      if (page === 1) {
        setListings(data.listings)
      } else {
        setListings((prev) => [...prev, ...data.listings])
      }

      setHasMore(data.pagination.page < data.pagination.totalPages)
    } catch (error) {
      console.error("Error fetching listings:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading && listings.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Loader className="min-h-[400px]" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-gray-600">
          {listings.length} {listings.length === 1 ? "listing" : "listings"} found
        </p>
      </div>

      <ListingGrid listings={listings} />

      {hasMore && (
        <div className="mt-12 text-center">
          <Button
            onClick={() => setPage((p) => p + 1)}
            disabled={loading}
            variant="outline"
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  )
}
