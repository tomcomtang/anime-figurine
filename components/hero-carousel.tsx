"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslations } from "./language-provider"
import Link from "next/link"
import { products } from "@/data/products"

// 从真实商品数据中选择前3个作为轮播图
const getHeroSlides = () => {
  // 筛选出手办类商品作为第一个轮播图
  const figureProduct = products.find((p) => p.categoryId === "figures") || products[0]
  // 筛选出服饰类商品作为第二个轮播图
  const clothingProduct = products.find((p) => p.categoryId === "clothing") || products[1]
  // 筛选出配饰类商品作为第三个轮播图
  const accessoryProduct = products.find((p) => p.categoryId === "accessories") || products[2]

  return [
    {
      id: "1",
      image: figureProduct?.image || "/placeholder.svg",
      title: "最新动漫手办",
      description: `来自《${figureProduct?.animeTitle || "热门动漫"}》的精美手办模型`,
      price: `¥${figureProduct?.price?.toLocaleString() || "8999"}起`,
      popularity: `热度 ${figureProduct?.popularity || "9.8"}/10`,
      productId: figureProduct?.id || "1",
    },
    {
      id: "2",
      image: clothingProduct?.image || "/placeholder.svg",
      title: "动漫主题服饰",
      description: `穿上《${clothingProduct?.animeTitle || "热门动漫"}》同款服饰`,
      price: `¥${clothingProduct?.price?.toLocaleString() || "2999"}起`,
      popularity: `热度 ${clothingProduct?.popularity || "9.5"}/10`,
      productId: clothingProduct?.id || "2",
    },
    {
      id: "3",
      image: accessoryProduct?.image || "/placeholder.svg",
      title: "精美动漫配饰",
      description: `《${accessoryProduct?.animeTitle || "热门动漫"}》主题配饰饰品`,
      price: `¥${accessoryProduct?.price?.toLocaleString() || "1599"}起`,
      popularity: `热度 ${accessoryProduct?.popularity || "9.3"}/10`,
      productId: accessoryProduct?.id || "3",
    },
  ]
}

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const t = useTranslations()
  const heroSlides = getHeroSlides()

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center text-white max-w-3xl px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{t(`heroSlides.${index}.title`, slide.title)}</h1>
              <p className="text-xl mb-6">{t(`heroSlides.${index}.description`, slide.description)}</p>
              <div className="flex justify-center space-x-6 mb-8">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-lg font-semibold">{t(`heroSlides.${index}.price`, slide.price)}</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-lg font-semibold">{t(`heroSlides.${index}.popularity`, slide.popularity)}</span>
                </div>
              </div>
              <Link
                href={`/product/${slide.productId}`}
                className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105"
              >
                {t("viewDetails", "查看详情")}
              </Link>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  )
}
