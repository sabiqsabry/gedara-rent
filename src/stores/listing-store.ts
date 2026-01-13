import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface ListingFormData {
  category?: string
  location?: {
    address: string
    city: string
    district: string
    country: string
    latitude: number
    longitude: number
  }
  propertyDetails?: {
    propertyType: string
    guestCount: number
    bedroomCount: number
    bedCount: number
    bathroomCount: number
  }
  amenities?: string[]
  images?: Array<{ url: string; publicId?: string; caption?: string }>
  description?: {
    title: string
    description: string
  }
  pricing?: {
    price: number
    cleaningFee?: number
    serviceFee?: number
  }
  houseRules?: string[]
}

interface ListingStore {
  formData: ListingFormData
  currentStep: number
  setFormData: (data: Partial<ListingFormData>) => void
  setCurrentStep: (step: number) => void
  reset: () => void
}

const initialState: ListingFormData = {
  category: undefined,
  location: undefined,
  propertyDetails: undefined,
  amenities: [],
  images: [],
  description: undefined,
  pricing: undefined,
  houseRules: [],
}

export const useListingStore = create<ListingStore>()(
  persist(
    (set) => ({
      formData: initialState,
      currentStep: 1,
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
      reset: () => set({ formData: initialState, currentStep: 1 }),
    }),
    {
      name: "listing-form-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
