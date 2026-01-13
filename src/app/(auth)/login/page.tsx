import { LoginForm } from "@/components/forms/login-form"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default function LoginPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <Link href="/" className="text-2xl font-bold text-primary">
          GedaraRent
        </Link>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Or{" "}
          <Link href="/auth/register" className="font-medium text-primary hover:underline">
            create a new account
          </Link>
        </p>
      </div>
      <LoginForm />
    </div>
  )
}
