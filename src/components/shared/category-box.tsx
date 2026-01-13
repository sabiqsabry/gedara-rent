"use client"

import { IconType } from "react-icons"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { parse, stringify } from "query-string"

interface CategoryBoxProps {
  icon: IconType
  label: string
  selected?: boolean
}

export function CategoryBox({ icon: Icon, label, selected }: CategoryBoxProps) {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    let currentQuery = {}

    if (params) {
      currentQuery = Object.fromEntries(params.entries())
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    }

    if (params?.get("category") === label) {
      delete updatedQuery.category
    }

    const queryString = new URLSearchParams(
      Object.entries(updatedQuery).filter(([_, v]) => v != null) as [string, string][]
    ).toString()
    
    const url = `/listings${queryString ? `?${queryString}` : ""}`

    router.push(url)
  }, [label, params, router])

  return (
    <div
      onClick={handleClick}
      className={`
        flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
        ${selected ? "border-b-neutral-800 text-neutral-800" : "border-transparent text-neutral-500"}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  )
}
