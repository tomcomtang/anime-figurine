import Image from "next/image"
import Link from "next/link"
import { StarIcon } from "lucide-react"

export default function ProductCard({ product }: { product: any }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group block rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm"
    >
      <div className="relative aspect-square">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-sm line-clamp-2 group-hover:text-pink-600 transition-colors">{product.name}</h3>
        <div className="mt-2 flex items-center">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-pink-600 font-bold">¥{product.price.toLocaleString()}</div>
          <div className="text-xs text-gray-500">热度: {product.popularity}</div>
        </div>
      </div>
    </Link>
  )
}
