import { products } from "@/data/products"
import Image from "next/image"
import { notFound } from "next/navigation"
import { StarIcon, Heart, Share2 } from "lucide-react"
import AnimeBackground from "@/components/anime-background"

export const dynamic = "force-static"

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  // 检查是否有多个不同的图片
  const uniqueImages = Array.from(new Set(product.images || []))
  const hasMultipleImages = uniqueImages.length > 1

  // 使用产品相关的动漫图片作为背景，但透明度更低
  const backgroundImage = product.image

  return (
    <AnimeBackground imageUrl={backgroundImage} opacity={0.4}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            {hasMultipleImages && product.images && (
              <div className="grid grid-cols-4 gap-2">
                {uniqueImages.map((image, index) => (
                  <div key={index} className="relative aspect-square overflow-hidden rounded-lg shadow-md">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            {product.video && (
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <video src={product.video} controls className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          <div className="space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviewCount} 评价)</span>
            </div>
            <div className="text-2xl font-bold text-red-600">¥{product.price.toLocaleString()}</div>

            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">热度: {product.popularity}</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">库存: {product.stock}</span>
            </div>

            {product.animeTitle && (
              <div className="text-sm text-gray-600">
                动漫作品: {product.animeTitle} ({product.animeYear})
              </div>
            )}

            {product.animeStudio && <div className="text-sm text-gray-600">制作工作室: {product.animeStudio}</div>}

            <div className="flex space-x-4 mt-6">
              <button className="bg-gray-200 hover:bg-gray-300 p-3 rounded-lg transition-colors">
                <Heart className="w-5 h-5 text-pink-600" />
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 p-3 rounded-lg transition-colors">
                <Share2 className="w-5 h-5 text-blue-600" />
              </button>
            </div>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold">商品描述</h3>
              <p>{product.description}</p>
              {product.details && (
                <>
                  <h3 className="text-xl font-semibold">商品详情</h3>
                  <ul>
                    {Object.entries(product.details).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {product.animeGenres && product.animeGenres.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">动漫类型</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.animeGenres.map((genre, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimeBackground>
  )
}
