import type { MetadataRoute } from "next"
import { categories } from "@/data/categories"
import { products } from "@/data/products"

// 添加静态导出配置
export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://your-domain.com"

  // 首页
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          ja: `${baseUrl}/ja`,
          zh: `${baseUrl}/zh`,
        },
      },
    },
  ]

  // 分类页面
  categories.forEach((category) => {
    routes.push({
      url: `${baseUrl}/category/${category.id}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/category/${category.id}`,
          ja: `${baseUrl}/ja/category/${category.id}`,
          zh: `${baseUrl}/zh/category/${category.id}`,
        },
      },
    })
  })

  // 商品详情页面
  products.forEach((product) => {
    routes.push({
      url: `${baseUrl}/product/${product.id}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en/product/${product.id}`,
          ja: `${baseUrl}/ja/product/${product.id}`,
          zh: `${baseUrl}/zh/product/${product.id}`,
        },
      },
    })
  })

  return routes
}
