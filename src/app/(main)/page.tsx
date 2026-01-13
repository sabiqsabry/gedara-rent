import { SearchBar } from "@/components/search/search-bar"
import { categories } from "@/constants/categories"
import { CategoryBox } from "@/components/shared/category-box"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find your perfect stay
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover unique places to stay in Sri Lanka and around the world
          </p>
          <div className="max-w-4xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Explore by category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <CategoryBox
              key={category.value}
              icon={category.icon}
              label={category.label}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Become a Host</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Share your space and earn extra income by hosting travelers
          </p>
          <Link href="/become-a-host">
            <Button size="lg">Get started</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
