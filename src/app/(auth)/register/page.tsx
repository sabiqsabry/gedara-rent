import { RegisterForm } from "@/components/forms/register-form"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <Link href="/" className="text-2xl font-bold text-primary">
          GedaraRent
        </Link>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Or{" "}
          <Link href="/auth/login" className="font-medium text-primary hover:underline">
            sign in to your existing account
          </Link>
        </p>
      </div>
      <RegisterForm />
    </div>
  )
}
