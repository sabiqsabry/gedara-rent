"use client"

import { categories } from "@/constants/categories"
import { CategoryBox } from "@/components/shared/category-box"

export function CategoriesGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <CategoryBox
          key={category.value}
          icon={category.icon}
          label={category.label}
        />
      ))}
    </div>
  )
}
