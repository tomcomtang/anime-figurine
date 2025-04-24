import HeroCarousel from "@/components/hero-carousel"
import CategoryPreview from "@/components/category-preview"
import { categories } from "@/data/categories"
import AnimeBackground from "@/components/anime-background"
import { products } from "@/data/products"

export default function Home() {
  // 获取第一个商品的图片作为背景
  const backgroundImage = products[0]?.image || "/placeholder.svg"

  return (
    <div className="min-h-screen">
      <HeroCarousel />

      <AnimeBackground imageUrl={backgroundImage}>
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center bg-white/70 backdrop-blur-sm py-4 rounded-lg">
            热门商品分类
          </h2>
          <div className="space-y-16">
            {categories.map((category) => (
              <CategoryPreview key={category.id} category={category} />
            ))}
          </div>
        </div>
      </AnimeBackground>
    </div>
  )
}
