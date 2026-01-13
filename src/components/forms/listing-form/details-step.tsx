"use client"

import { useState } from "react"
import { useListingStore } from "@/stores/listing-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const propertyTypes = [
  "HOUSE",
  "APARTMENT",
  "GUESTHOUSE",
  "HOTEL",
  "VILLA",
  "COTTAGE",
  "CABIN",
  "BUNGALOW",
  "ROOM",
]

interface DetailsStepProps {
  onNext: () => void
  onBack: () => void
}

export function DetailsStep({ onNext, onBack }: DetailsStepProps) {
  const { formData, setFormData } = useListingStore()
  const [propertyType, setPropertyType] = useState(formData.propertyDetails?.propertyType || "")
  const [guestCount, setGuestCount] = useState(formData.propertyDetails?.guestCount || 1)
  const [bedroomCount, setBedroomCount] = useState(formData.propertyDetails?.bedroomCount || 1)
  const [bedCount, setBedCount] = useState(formData.propertyDetails?.bedCount || 1)
  const [bathroomCount, setBathroomCount] = useState(formData.propertyDetails?.bathroomCount || 1)

  const handleNext = () => {
    setFormData({
      propertyDetails: {
        propertyType,
        guestCount,
        bedroomCount,
        bedCount,
        bathroomCount,
      },
    })
    onNext()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Share some basics about your place</h2>
      <p className="text-gray-600 mb-8">You'll add more details later</p>

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2">Property Type</label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select type</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0) + type.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Guests</label>
          <Input
            type="number"
            min="1"
            value={guestCount}
            onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Bedrooms</label>
          <Input
            type="number"
            min="1"
            value={bedroomCount}
            onChange={(e) => setBedroomCount(parseInt(e.target.value) || 1)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Beds</label>
          <Input
            type="number"
            min="1"
            value={bedCount}
            onChange={(e) => setBedCount(parseInt(e.target.value) || 1)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Bathrooms</label>
          <Input
            type="number"
            min="1"
            value={bathroomCount}
            onChange={(e) => setBathroomCount(parseInt(e.target.value) || 1)}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!propertyType}>
          Next
        </Button>
      </div>
    </div>
  )
}
