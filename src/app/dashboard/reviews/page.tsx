"use client"

import { EmptyState } from "@/components/shared/empty-state"
import { Star } from "lucide-react"

export default function ReviewsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Reviews</h1>
      <EmptyState
        icon={Star}
        title="No reviews yet"
        description="Reviews you've given and received will appear here"
      />
    </div>
  )
}
