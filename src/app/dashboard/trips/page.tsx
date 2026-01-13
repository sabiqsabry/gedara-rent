"use client"

import { useEffect, useState } from "react"
import { Loader } from "@/components/shared/loader"
import { EmptyState } from "@/components/shared/empty-state"
import { Calendar } from "lucide-react"
import { ListingCard } from "@/components/listings/listing-card"
import { format } from "date-fns"

export default function TripsPage() {
  const [reservations, setReservations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReservations()
  }, [])

  const fetchReservations = async () => {
    try {
      const response = await fetch("/api/reservations")
      const data = await response.json()
      setReservations(data)
    } catch (error) {
      console.error("Error fetching reservations:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loader className="min-h-[400px]" />
  }

  if (reservations.length === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title="No trips yet"
        description="When you book a stay, it will appear here"
      />
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Your Trips</h1>
      <div className="space-y-6">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {reservation.listing.title}
                </h3>
                <p className="text-gray-600">
                  {reservation.startDate && reservation.endDate
                    ? `${format(new Date(reservation.startDate), "MMM dd")} - ${format(new Date(reservation.endDate), "MMM dd, yyyy")}`
                    : "Dates not available"}
                </p>
              </div>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {reservation.status}
              </span>
            </div>
            {reservation.listing.images[0] && (
              <img
                src={reservation.listing.images[0].url}
                alt={reservation.listing.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
