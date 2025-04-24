"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslations } from "./language-provider"
import { products } from "@/data/products"

export default function CategoryPreview({ category }: { category: any }) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const t = useTranslations()

  const categoryProducts = products.filter((product) => product.categoryId === category.id).slice(0, 10)

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = container.clientWidth * 0.8
    const newPosition =
      direction === "left" ? Math.max(0, scrollPosition - scrollAmount) : scrollPosition + scrollAmount

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    })

    setScrollPosition(newPosition)
  }

  return (
    <div className="space-y-4 bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">{t(`categories.${category.id}`, category.name)}</h3>
        <Link href={`/category/${category.id}`} className="text-pink-600 hover:text-pink-700 transition-colors">
          {t("viewAll")}
        </Link>
      </div>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide space-x-4 py-4"
          style={{ scrollbarWidth: "none" }}
        >
          {categoryProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="flex-none w-64 group">
              <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <div className="text-white text-sm">
                    <div className="font-semibold">
                      {t("popularity")}: {product.popularity}
                    </div>
                    <div>¥{product.price.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <h4 className="font-medium text-sm line-clamp-2 group-hover:text-pink-600 transition-colors">
                {product.name}
              </h4>
            </Link>
          ))}
        </div>

        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors z-10"
          style={{ display: scrollPosition <= 0 ? "none" : "block" }}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors z-10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
