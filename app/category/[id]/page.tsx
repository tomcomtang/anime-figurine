import { categories } from "@/data/categories"
import { products } from "@/data/products"
import ProductCard from "@/components/product-card"
import { notFound } from "next/navigation"
import AnimeBackground from "@/components/anime-background"

export const dynamic = "force-static"

export function generateStaticParams() {
  return categories.map((category) => ({
    id: category.id,
  }))
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const category = categories.find((c) => c.id === params.id)

  if (!category) {
    notFound()
  }

  const categoryProducts = products.filter((product) => product.categoryId === params.id)

  // 使用该分类的第一个商品图片作为背景
  const backgroundImage = categoryProducts[0]?.image || "/placeholder.svg"

  return (
    <AnimeBackground imageUrl={backgroundImage} opacity={0.4}>
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-4xl font-bold">{category.name}</h1>
          <p className="mt-2 text-gray-600">共 {categoryProducts.length} 件商品</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </AnimeBackground>
  )
}
