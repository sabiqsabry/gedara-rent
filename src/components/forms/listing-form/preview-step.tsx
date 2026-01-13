"use client"

import { useState } from "react"
import { useListingStore } from "@/stores/listing-store"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { formatPrice } from "@/lib/utils"

interface PreviewStepProps {
  onNext: () => void
  onBack: () => void
}

export function PreviewStep({ onBack }: PreviewStepProps) {
  const { formData, reset } = useListingStore()
  const router = useRouter()
  const [isPublishing, setIsPublishing] = useState(false)

  const handlePublish = async () => {
    setIsPublishing(true)
    try {
      const response = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          category: formData.category,
          propertyType: formData.propertyDetails?.propertyType,
          guestCount: formData.propertyDetails?.guestCount,
          bedroomCount: formData.propertyDetails?.bedroomCount,
          bedCount: formData.propertyDetails?.bedCount,
          bathroomCount: formData.propertyDetails?.bathroomCount,
          amenities: formData.amenities,
          images: formData.images,
          title: formData.description?.title,
          description: formData.description?.description,
          price: formData.pricing?.price,
          cleaningFee: formData.pricing?.cleaningFee,
          address: formData.location?.address,
          city: formData.location?.city,
          district: formData.location?.district,
          country: formData.location?.country,
          latitude: formData.location?.latitude,
          longitude: formData.location?.longitude,
          houseRules: formData.houseRules,
          isPublished: true,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to publish listing")
      }

      const listing = await response.json()
      toast.success("Listing published successfully!")
      reset()
      router.push(`/listings/${listing.slug}`)
    } catch (error: any) {
      toast.error(error.message || "Failed to publish listing")
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Review your listing</h2>
      <p className="text-gray-600 mb-8">Make sure everything looks good</p>

      <div className="space-y-6 mb-8">
        <div>
          <h3 className="font-semibold mb-2">Title</h3>
          <p>{formData.description?.title || "N/A"}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Location</h3>
          <p>
            {formData.location?.address}, {formData.location?.city},{" "}
            {formData.location?.district}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Property Details</h3>
          <p>
            {formData.propertyDetails?.propertyType} ·{" "}
            {formData.propertyDetails?.guestCount} guests ·{" "}
            {formData.propertyDetails?.bedroomCount} bedrooms
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Price</h3>
          <p>
            {formData.pricing?.price
              ? formatPrice(formData.pricing.price)
              : "N/A"}{" "}
            per night
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Photos</h3>
          <p>{formData.images?.length || 0} photos</p>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handlePublish} disabled={isPublishing}>
          {isPublishing ? "Publishing..." : "Publish Listing"}
        </Button>
      </div>
    </div>
  )
}
