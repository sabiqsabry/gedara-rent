/**
 * Development-only authentication bypass for testing
 * DO NOT USE IN PRODUCTION
 */

export const DEV_MODE = process.env.NODE_ENV === "development"
export const ENABLE_AUTH_BYPASS = process.env.NEXT_PUBLIC_ENABLE_AUTH_BYPASS === "true"

export function canBypassAuth(): boolean {
  return DEV_MODE && ENABLE_AUTH_BYPASS
}

export function getBypassUser() {
  return {
    id: "dev-bypass-user",
    email: "dev@gedarent.com",
    name: "Dev Test User",
    role: "HOST" as const,
    image: null,
  }
}
