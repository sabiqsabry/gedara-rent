"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useListingStore } from "@/stores/listing-store"
import { CategoryStep } from "@/components/forms/listing-form/category-step"
import { LocationStep } from "@/components/forms/listing-form/location-step"
import { DetailsStep } from "@/components/forms/listing-form/details-step"
import { AmenitiesStep } from "@/components/forms/listing-form/amenities-step"
import { PhotosStep } from "@/components/forms/listing-form/photos-step"
import { DescriptionStep } from "@/components/forms/listing-form/description-step"
import { PricingStep } from "@/components/forms/listing-form/pricing-step"
import { RulesStep } from "@/components/forms/listing-form/rules-step"
import { PreviewStep } from "@/components/forms/listing-form/preview-step"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const steps = [
  { component: CategoryStep, title: "Category" },
  { component: LocationStep, title: "Location" },
  { component: DetailsStep, title: "Property Details" },
  { component: AmenitiesStep, title: "Amenities" },
  { component: PhotosStep, title: "Photos" },
  { component: DescriptionStep, title: "Description" },
  { component: PricingStep, title: "Pricing" },
  { component: RulesStep, title: "House Rules" },
  { component: PreviewStep, title: "Preview" },
]

export default function BecomeAHostPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const stepParam = searchParams.get("step")
  const currentStepIndex = stepParam ? parseInt(stepParam) - 1 : 0
  const { currentStep, setCurrentStep, formData, reset } = useListingStore()

  const activeStep = Math.max(0, Math.min(currentStepIndex, steps.length - 1))
  const StepComponent = steps[activeStep].component

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      const nextStep = activeStep + 1
      setCurrentStep(nextStep + 1)
      router.push(`/become-a-host?step=${nextStep + 1}`)
    }
  }

  const handleBack = () => {
    if (activeStep > 0) {
      const prevStep = activeStep - 1
      setCurrentStep(prevStep + 1)
      router.push(`/become-a-host?step=${prevStep + 1}`)
    } else {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {activeStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">{steps[activeStep].title}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <StepComponent onNext={handleNext} onBack={handleBack} />
        </div>
      </div>
    </div>
  )
}
