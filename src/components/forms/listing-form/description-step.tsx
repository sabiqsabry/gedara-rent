"use client"

import { useState } from "react"
import { useListingStore } from "@/stores/listing-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface DescriptionStepProps {
  onNext: () => void
  onBack: () => void
}

export function DescriptionStep({ onNext, onBack }: DescriptionStepProps) {
  const { formData, setFormData } = useListingStore()
  const [title, setTitle] = useState(formData.description?.title || "")
  const [description, setDescription] = useState(formData.description?.description || "")

  const handleNext = () => {
    if (title && description) {
      setFormData({
        description: {
          title,
          description,
        },
      })
      onNext()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Create your listing</h2>
      <p className="text-gray-600 mb-8">Share details about your place</p>

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Catchy title for your listing"
            maxLength={50}
          />
          <p className="text-xs text-gray-500 mt-1">{title.length}/50</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your place..."
            rows={8}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!title || !description}>
          Next
        </Button>
      </div>
    </div>
  )
}
