"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Calendar,
  Heart,
  Building2,
  DollarSign,
  MessageSquare,
  Star,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/trips", label: "Trips", icon: Calendar },
  { href: "/dashboard/wishlists", label: "Wishlists", icon: Heart },
  { href: "/dashboard/listings", label: "Listings", icon: Building2, hostOnly: true },
  { href: "/dashboard/reservations", label: "Reservations", icon: Calendar, hostOnly: true },
  { href: "/dashboard/earnings", label: "Earnings", icon: DollarSign, hostOnly: true },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/reviews", label: "Reviews", icon: Star },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const isHost = session?.user?.role === "HOST" || session?.user?.role === "ADMIN"

  const filteredNavItems = navItems.filter(
    (item) => !item.hostOnly || isHost
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen sticky top-0">
          <div className="p-6">
            <h2 className="text-xl font-bold text-primary">Dashboard</h2>
          </div>
          <nav className="px-4 space-y-2">
            {filteredNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
