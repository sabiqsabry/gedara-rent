"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"

interface SearchBarProps {
  location?: string
  startDate?: Date
  endDate?: Date
  guestCount?: number
}

export function SearchBar({ location, startDate, endDate, guestCount = 1 }: SearchBarProps) {
  const router = useRouter()
  const [searchLocation, setSearchLocation] = useState(location || "")
  const [guests, setGuests] = useState(guestCount)

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchLocation) params.set("location", searchLocation)
    if (startDate) params.set("startDate", format(startDate, "yyyy-MM-dd"))
    if (endDate) params.set("endDate", format(endDate, "yyyy-MM-dd"))
    if (guests > 1) params.set("guests", guests.toString())

    router.push(`/listings?${params.toString()}`)
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 p-2 bg-white rounded-full shadow-lg border border-gray-200">
      <div className="flex-1 w-full md:w-auto">
        <div className="flex items-center gap-2 px-4 py-2">
          <Search className="h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Where are you going?"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 px-4 py-2 border-l border-gray-200">
        <Calendar className="h-5 w-5 text-gray-400" />
        <span className="text-sm text-gray-600">
          {startDate && endDate
            ? `${format(startDate, "MMM dd")} - ${format(endDate, "MMM dd")}`
            : "Check in - Check out"}
        </span>
      </div>
      
      <div className="flex items-center gap-2 px-4 py-2 border-l border-gray-200">
        <Users className="h-5 w-5 text-gray-400" />
        <Input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
          className="w-16 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-center"
        />
        <span className="text-sm text-gray-600">guests</span>
      </div>
      
      <Button onClick={handleSearch} className="rounded-full">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>
  )
}
