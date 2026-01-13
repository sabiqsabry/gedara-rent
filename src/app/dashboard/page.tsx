"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Loader } from "@/components/shared/loader"

export default function DashboardPage() {
  const { data: session } = useSession()
  const [stats, setStats] = useState({
    trips: 0,
    wishlists: 0,
    listings: 0,
    earnings: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // Fetch user stats
      const [tripsRes, wishlistsRes, listingsRes] = await Promise.all([
        fetch("/api/reservations"),
        fetch("/api/favorites"),
        session?.user?.role === "HOST" || session?.user?.role === "ADMIN"
          ? fetch("/api/listings/user")
          : Promise.resolve(null),
      ])

      const trips = await tripsRes.json()
      const wishlists = await wishlistsRes.json()
      const listings = listingsRes ? await listingsRes.json() : []

      setStats({
        trips: trips.length || 0,
        wishlists: wishlists.length || 0,
        listings: listings.length || 0,
        earnings: 0, // TODO: Calculate from reservations
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loader className="min-h-[400px]" />
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Welcome back, {session?.user?.name}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Upcoming Trips</h3>
          <p className="text-3xl font-bold">{stats.trips}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Wishlists</h3>
          <p className="text-3xl font-bold">{stats.wishlists}</p>
        </Card>

        {(session?.user?.role === "HOST" || session?.user?.role === "ADMIN") && (
          <>
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Listings</h3>
              <p className="text-3xl font-bold">{stats.listings}</p>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Earnings</h3>
              <p className="text-3xl font-bold">LKR {stats.earnings.toLocaleString()}</p>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
