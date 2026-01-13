"use client"

import { useState } from "react"
import { useListingStore } from "@/stores/listing-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { sriLankanLocations, districts } from "@/constants/countries"

interface LocationStepProps {
  onNext: () => void
  onBack: () => void
}

export function LocationStep({ onNext, onBack }: LocationStepProps) {
  const { formData, setFormData } = useListingStore()
  const [address, setAddress] = useState(formData.location?.address || "")
  const [city, setCity] = useState(formData.location?.city || "")
  const [district, setDistrict] = useState(formData.location?.district || "")
  const [country, setCountry] = useState(formData.location?.country || "Sri Lanka")

  const handleNext = () => {
    // Find coordinates for the city
    const location = sriLankanLocations.find((loc) => loc.city === city)
    
    if (address && city && district) {
      setFormData({
        location: {
          address,
          city,
          district,
          country,
          latitude: location?.latitude || 6.9271,
          longitude: location?.longitude || 79.8612,
        },
      })
      onNext()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Where's your place located?</h2>
      <p className="text-gray-600 mb-8">Enter your property address</p>

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">City</label>
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            list="cities"
          />
          <datalist id="cities">
            {sriLankanLocations.map((loc) => (
              <option key={loc.city} value={loc.city} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">District</label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select district</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Country</label>
          <Input value={country} disabled />
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!address || !city || !district}>
          Next
        </Button>
      </div>
    </div>
  )
}
