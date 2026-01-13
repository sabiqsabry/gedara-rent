"use client"

import { EmptyState } from "@/components/shared/empty-state"
import { MessageSquare } from "lucide-react"

export default function MessagesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Messages</h1>
      <EmptyState
        icon={MessageSquare}
        title="No messages yet"
        description="Your conversations with hosts and guests will appear here"
      />
    </div>
  )
}
