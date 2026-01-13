"use client"

import { useState } from "react"
import { useListingStore } from "@/stores/listing-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PricingStepProps {
  onNext: () => void
  onBack: () => void
}

export function PricingStep({ onNext, onBack }: PricingStepProps) {
  const { formData, setFormData } = useListingStore()
  const [price, setPrice] = useState(formData.pricing?.price?.toString() || "")
  const [cleaningFee, setCleaningFee] = useState(
    formData.pricing?.cleaningFee?.toString() || ""
  )

  const handleNext = () => {
    if (price) {
      setFormData({
        pricing: {
          price: parseInt(price),
          cleaningFee: cleaningFee ? parseInt(cleaningFee) : undefined,
        },
      })
      onNext()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Set your price</h2>
      <p className="text-gray-600 mb-8">You can change this anytime</p>

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2">Price per night (LKR)</label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="5000"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Cleaning fee (LKR) - Optional
          </label>
          <Input
            type="number"
            value={cleaningFee}
            onChange={(e) => setCleaningFee(e.target.value)}
            placeholder="1000"
            min="0"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!price}>
          Next
        </Button>
      </div>
    </div>
  )
}
