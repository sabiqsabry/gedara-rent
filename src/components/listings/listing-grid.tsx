"use client"

import { ListingCard } from "./listing-card"
import { EmptyState } from "@/components/shared/empty-state"
import { Home } from "lucide-react"

interface ListingGridProps {
  listings: Array<any>
}

export function ListingGrid({ listings }: ListingGridProps) {
  if (!listings || listings.length === 0) {
    return (
      <EmptyState
        icon={Home}
        title="No listings found"
        description="Try adjusting your search filters"
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  )
}
