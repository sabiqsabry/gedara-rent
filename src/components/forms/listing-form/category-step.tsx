"use client"

import { categories } from "@/constants/categories"
import { useListingStore } from "@/stores/listing-store"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface CategoryStepProps {
  onNext: () => void
  onBack: () => void
}

export function CategoryStep({ onNext, onBack }: CategoryStepProps) {
  const { formData, setFormData } = useListingStore()

  const handleSelect = (category: string) => {
    setFormData({ category })
  }

  const handleNext = () => {
    if (formData.category) {
      onNext()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Which of these best describes your place?</h2>
      <p className="text-gray-600 mb-8">Select a category</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {categories.map((category) => {
          const Icon = category.icon
          const isSelected = formData.category === category.value

          return (
            <Card
              key={category.value}
              className={`p-6 cursor-pointer transition-all hover:border-primary ${
                isSelected ? "border-primary border-2" : ""
              }`}
              onClick={() => handleSelect(category.value)}
            >
              <Icon className="h-8 w-8 mb-2" />
              <p className="font-medium">{category.label}</p>
            </Card>
          )
        })}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!formData.category}>
          Next
        </Button>
      </div>
    </div>
  )
}
