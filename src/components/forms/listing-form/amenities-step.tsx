"use client"

import { useState } from "react"
import { useListingStore } from "@/stores/listing-store"
import { Button } from "@/components/ui/button"
import { amenities } from "@/constants/amenities"

interface AmenitiesStepProps {
  onNext: () => void
  onBack: () => void
}

export function AmenitiesStep({ onNext, onBack }: AmenitiesStepProps) {
  const { formData, setFormData } = useListingStore()
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    formData.amenities || []
  )

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId]
    )
  }

  const handleNext = () => {
    setFormData({ amenities: selectedAmenities })
    onNext()
  }

  const groupedAmenities = amenities.reduce((acc, amenity) => {
    if (!acc[amenity.category]) {
      acc[amenity.category] = []
    }
    acc[amenity.category].push(amenity)
    return acc
  }, {} as Record<string, typeof amenities>)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Tell guests what your place has to offer</h2>
      <p className="text-gray-600 mb-8">Select all that apply</p>

      <div className="space-y-6 mb-8">
        {Object.entries(groupedAmenities).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-semibold mb-3">{category}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {items.map((amenity) => {
                const Icon = amenity.icon
                const isSelected = selectedAmenities.includes(amenity.id)

                return (
                  <button
                    key={amenity.id}
                    onClick={() => toggleAmenity(amenity.id)}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      isSelected ? "border-primary bg-primary/5" : ""
                    }`}
                  >
                    <Icon className="h-6 w-6 mb-2" />
                    <p className="text-sm font-medium">{amenity.name}</p>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  )
}
