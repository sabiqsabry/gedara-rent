"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/shared/avatar"

export default function SettingsPage() {
  const { data: session } = useSession()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="space-y-8 max-w-2xl">
        <div>
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar src={session?.user?.image} fallback={session?.user?.name || ""} />
              <Button variant="outline">Change Photo</Button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input defaultValue={session?.user?.name || ""} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input defaultValue={session?.user?.email || ""} disabled />
            </div>

            <Button>Save Changes</Button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Password</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Current Password</label>
              <Input type="password" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">New Password</label>
              <Input type="password" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm New Password</label>
              <Input type="password" />
            </div>

            <Button>Update Password</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
