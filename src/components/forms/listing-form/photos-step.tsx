"use client"

import { useState } from "react"
import { useListingStore } from "@/stores/listing-store"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"

interface PhotosStepProps {
  onNext: () => void
  onBack: () => void
}

export function PhotosStep({ onNext, onBack }: PhotosStepProps) {
  const { formData, setFormData } = useListingStore()
  const [images, setImages] = useState<Array<{ url: string; publicId?: string }>>(
    formData.images || []
  )
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setUploading(true)
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error("Failed to upload image")
        }

        return await response.json()
      })

      const results = await Promise.all(uploadPromises)
      setImages((prev) => [...prev, ...results])
    } catch (error) {
      console.error("Error uploading images:", error)
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleNext = () => {
    setFormData({ images })
    onNext()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Add some photos of your place</h2>
      <p className="text-gray-600 mb-8">You'll need at least 5 photos to get started</p>

      <div className="space-y-4 mb-8">
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="photo-upload"
            disabled={uploading}
          />
          <label htmlFor="photo-upload">
            <Button variant="outline" asChild disabled={uploading}>
              <span>{uploading ? "Uploading..." : "Upload Photos"}</span>
            </Button>
          </label>
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img.url}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={images.length < 5}>
          Next
        </Button>
      </div>
    </div>
  )
}
