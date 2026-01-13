import { User, Listing, Reservation, Review, Favorite, Message, Conversation } from "@prisma/client"

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string
  user: SafeUser
}

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string
  startDate: string
  endDate: string
  listing: SafeListing
}

export type SafeReview = Omit<Review, "createdAt" | "updatedAt"> & {
  createdAt: string
  updatedAt: string
  author: SafeUser
}

export type ListingWithDetails = SafeListing & {
  images: Array<{ id: string; url: string; caption: string | null }>
  amenities: Array<{ id: string; name: string; icon: string }>
  houseRules: Array<{ id: string; rule: string }>
  reviews: SafeReview[]
  _count: {
    reservations: number
    favorites: number
  }
}

export type ReservationWithListing = SafeReservation & {
  listing: ListingWithDetails
}

export type FavoriteWithListing = Favorite & {
  listing: ListingWithDetails
}

export type ConversationWithParticipants = Conversation & {
  participants: Array<{
    id: string
    user: SafeUser
  }>
  messages: Array<Message & { sender: SafeUser; receiver: SafeUser }>
}
