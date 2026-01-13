"use client"

import { Card } from "@/components/ui/card"

export default function EarningsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Earnings</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">This Month</h3>
          <p className="text-3xl font-bold">LKR 0</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Earnings</h3>
          <p className="text-3xl font-bold">LKR 0</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Pending Payout</h3>
          <p className="text-3xl font-bold">LKR 0</p>
        </Card>
      </div>
    </div>
  )
}
