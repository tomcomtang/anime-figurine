import fs from "fs"
import path from "path"

// 这个脚本用于从API获取动漫商品数据并生成JSON文件
// 您可以在构建前手动运行此脚本

async function fetchAnimeData() {
  console.log("开始获取动漫商品数据...")

  try {
    // 这里我们使用Jikan API (MyAnimeList的非官方API)作为示例
    // 在实际使用中，您可能需要替换为其他API或添加API密钥
    const animeResponse = await fetch("https://api.jikan.moe/v4/top/anime?limit=20")
    const animeData = await animeResponse.json()

    // 处理获取的数据，转换为我们需要的格式
    const categories = [
      { id: "figures", name: "手办模型" },
      { id: "clothing", name: "服饰周边" },
      { id: "accessories", name: "配饰饰品" },
      { id: "stationery", name: "文具用品" },
      { id: "homeware", name: "家居用品" },
    ]

    // 将分类数据写入JSON文件
    fs.writeFileSync(path.join(process.cwd(), "data", "categories.json"), JSON.stringify(categories, null, 2))

    // 生成商品数据
    const products = []

    // 为每个动漫生成多个商品
    animeData.data.forEach((anime, index) => {
      const animeTitle = anime.title
      const animeImage = anime.images.jpg.large_image_url
      const animePopularity = anime.popularity
      const animeRating = anime.score || 0

      // 为每个分类生成一些商品
      categories.forEach((category, catIndex) => {
        // 每个动漫在每个分类下生成1-3个商品
        const numProducts = Math.floor(Math.random() * 3) + 1

        for (let i = 0; i < numProducts; i++) {
          const productId = `${index}-${catIndex}-${i}`
          const price = Math.floor(Math.random() * 10000) + 500 // 500-10500日元
          const popularity = (Math.random() * 2 + 8).toFixed(1) // 8.0-10.0
          const stock = Math.floor(Math.random() * 100) + 1

          const reviewCount = Math.floor(Math.random() * 1000)

          // 生成商品详情
          const details = {}
          if (category.id === "figures") {
            details["材质"] = "优质PVC"
            details["尺寸"] = `${Math.floor(Math.random() * 15) + 10}cm`
            details["制造商"] = ["Good Smile Company", "Max Factory", "Kotobukiya"][Math.floor(Math.random() * 3)]
          } else if (category.id === "clothing") {
            details["材质"] = "100%棉"
            details["尺寸"] = ["S", "M", "L", "XL"][Math.floor(Math.random() * 4)]
            details["颜色"] = ["黑色", "白色", "蓝色", "红色"][Math.floor(Math.random() * 4)]
          }

          // 注意：这里我们使用动漫图片作为商品图片，因为我们没有实际的商品图片
          // 在实际项目中，您应该使用真实的商品图片
          const product = {
            id: productId,
            categoryId: category.id,
            name: `${animeTitle} ${["限定版", "珍藏版", "经典款"][Math.floor(Math.random() * 3)]} ${category.name}`,
            description: `来自动漫《${animeTitle}》的精美${category.name}，粉丝收藏必备。高品质制作，细节精致，完美还原动漫中的角色形象。`,
            price: price,
            image: animeImage,
            images: Array(4).fill(animeImage), // 注意：这里我们使用相同的图片，因为没有多张图片
            rating: animeRating / 2 || Math.random() * 2 + 3,
            popularity: popularity,
            stock: stock,
            reviewCount: reviewCount,
            details: details,
          }

          products.push(product)
        }
      })
    })

    // 将商品数据写入JSON文件
    fs.writeFileSync(path.join(process.cwd(), "data", "products.json"), JSON.stringify(products, null, 2))

    // 生成翻译数据
    const translations = {
      zh: {
        siteName: "二次元商品展示",
        viewAll: "查看全部",
        viewDetails: "查看详情",
        popularity: "热度",
        categories: {
          figures: "手办模型",
          clothing: "服饰周边",
          accessories: "配饰饰品",
          stationery: "文具用品",
          homeware: "家居用品",
        },
        heroSlides: [
          {
            title: "最新动漫周边",
            description: "探索来自您喜爱的动漫的最新周边商品",
            price: "¥199起",
            popularity: "热度 9.8/10",
          },
          {
            title: "限量版手办",
            description: "收藏价值极高的限量版动漫人物手办",
            price: "¥899起",
            popularity: "热度 9.5/10",
          },
          {
            title: "动漫服饰",
            description: "穿上您喜爱的动漫角色同款服饰",
            price: "¥129起",
            popularity: "热度 8.9/10",
          },
        ],
      },
      en: {
        siteName: "Anime Merchandise",
        viewAll: "View All",
        viewDetails: "View Details",
        popularity: "Popularity",
        categories: {
          figures: "Figures & Models",
          clothing: "Clothing",
          accessories: "Accessories",
          stationery: "Stationery",
          homeware: "Home Goods",
        },
        heroSlides: [
          {
            title: "Latest Anime Merchandise",
            description: "Explore the latest merchandise from your favorite anime",
            price: "From ¥199",
            popularity: "Popularity 9.8/10",
          },
          {
            title: "Limited Edition Figures",
            description: "Highly collectible limited edition anime character figures",
            price: "From ¥899",
            popularity: "Popularity 9.5/10",
          },
          {
            title: "Anime Apparel",
            description: "Wear clothing inspired by your favorite anime characters",
            price: "From ¥129",
            popularity: "Popularity 8.9/10",
          },
        ],
      },
      ja: {
        siteName: "アニメグッズショップ",
        viewAll: "すべて見る",
        viewDetails: "詳細を見る",
        popularity: "人気度",
        categories: {
          figures: "フィギュア・模型",
          clothing: "衣類",
          accessories: "アクセサリー",
          stationery: "文房具",
          homeware: "生活用品",
        },
        heroSlides: [
          {
            title: "最新アニメグッズ",
            description: "お気に入りのアニメから最新グッズを探索",
            price: "¥199から",
            popularity: "人気度 9.8/10",
          },
          {
            title: "限定フィギュア",
            description: "収集価値の高い限定アニメキャラクターフィギュア",
            price: "¥899から",
            popularity: "人気度 9.5/10",
          },
          {
            title: "アニメアパレル",
            description: "お気に入りのアニメキャラクターにインスパイアされた服",
            price: "¥129から",
            popularity: "人気度 8.9/10",
          },
        ],
      },
    }

    // 将翻译数据写入JSON文件
    fs.writeFileSync(path.join(process.cwd(), "data", "translations.json"), JSON.stringify(translations, null, 2))

    console.log("数据获取完成，JSON文件已生成！")
  } catch (error) {
    console.error("获取数据时出错:", error)
  }
}

// 执行函数
fetchAnimeData()
