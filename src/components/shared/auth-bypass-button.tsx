"use client"

import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { canBypassAuth, getBypassUser } from "@/lib/auth-bypass"
import { toast } from "sonner"

export function AuthBypassButton() {
  const { data: session } = useSession()
  const [isBypassing, setIsBypassing] = useState(false)

  if (!canBypassAuth()) {
    return null
  }

  const handleBypass = async () => {
    setIsBypassing(true)
    try {
      // Create a mock session by signing in with a dev account
      await signIn("credentials", {
        email: "dev@gedarent.com",
        password: "dev123",
        redirect: false,
      })
      toast.success("Auth bypassed - Dev mode active")
    } catch (error) {
      // If dev account doesn't exist, just show a message
      toast.info("Dev mode: Some features may work without full auth")
    } finally {
      setIsBypassing(false)
    }
  }

  if (session) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-3 shadow-lg">
          <p className="text-xs text-yellow-800 mb-2">DEV MODE: Authenticated</p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => signOut()}
            className="w-full"
          >
            Sign Out
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-3 shadow-lg">
        <p className="text-xs text-yellow-800 mb-2">DEV MODE: Skip Auth</p>
        <Button
          size="sm"
          variant="outline"
          onClick={handleBypass}
          disabled={isBypassing}
          className="w-full"
        >
          {isBypassing ? "Bypassing..." : "Skip Authentication"}
        </Button>
      </div>
    </div>
  )
}
