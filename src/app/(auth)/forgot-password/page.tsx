import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ForgotPasswordPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <Link href="/" className="text-2xl font-bold text-primary">
          GedaraRent
        </Link>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Reset your password
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            type="email"
            className="mt-1"
            placeholder="you@example.com"
          />
        </div>
        <Button type="submit" className="w-full">
          Send reset link
        </Button>
        <p className="text-center text-sm text-gray-600">
          <Link href="/auth/login" className="text-primary hover:underline">
            Back to sign in
          </Link>
        </p>
      </form>
    </div>
  )
}
