import fs from "fs"
import path from "path"

// 这个脚本使用MyAnimeList的Jikan API获取动漫数据，然后基于这些数据生成商品信息
async function fetchMALData() {
  console.log("开始从MyAnimeList获取动漫数据并生成商品信息...")

  try {
    // 定义分类
    const categories = [
      { id: "figures", name: "手办模型" },
      { id: "clothing", name: "服饰周边" },
      { id: "accessories", name: "配饰饰品" },
      { id: "stationery", name: "文具用品" },
      { id: "homeware", name: "家居用品" },
    ]

    // 将分类数据写入JSON文件
    fs.writeFileSync(path.join(process.cwd(), "data", "categories.json"), JSON.stringify(categories, null, 2))

    // 使用Jikan API获取热门动漫
    console.log("获取热门动漫数据...")
    const animeResponse = await fetch("https://api.jikan.moe/v4/top/anime?limit=25")
    const animeData = await animeResponse.json()

    if (!animeData.data || animeData.data.length === 0) {
      throw new Error("无法从Jikan API获取动漫数据")
    }

    console.log(`成功获取 ${animeData.data.length} 个动漫信息`)

    // 获取一些热门角色数据，用于丰富商品信息
    console.log("获取热门角色数据...")
    const charactersPromises = animeData.data.slice(0, 10).map((anime) =>
      fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}/characters`)
        .then((res) => res.json())
        .then((data) => {
          // 添加1秒延迟，避免API限流
          return new Promise((resolve) => setTimeout(() => resolve(data), 1000))
        })
        .catch((err) => {
          console.error(`获取动漫ID ${anime.mal_id} 的角色数据失败:`, err)
          return { data: [] }
        }),
    )

    const charactersResults = await Promise.all(charactersPromises)
    const charactersData = charactersResults.flatMap((result) => result.data || [])
    console.log(`成功获取 ${charactersData.length} 个角色信息`)

    // 生成商品数据
    const products = []
    let productId = 1

    // 为每个动漫生成多个商品
    for (const anime of animeData.data) {
      // 获取该动漫的角色
      const animeCharacters =
        charactersResults.find(
          (result) => result.data && result.data.some((char) => char.anime && char.anime.mal_id === anime.mal_id),
        )?.data || []

      // 为每个分类生成商品
      for (const category of categories) {
        // 每个动漫在每个分类下生成1-3个商品
        const numProducts = Math.floor(Math.random() * 3) + 1

        for (let i = 0; i < numProducts; i++) {
          // 选择一个角色（如果有）
          const character =
            animeCharacters.length > 0 ? animeCharacters[Math.floor(Math.random() * animeCharacters.length)] : null

          // 生成价格（根据分类不同，价格范围不同）
          let price
          switch (category.id) {
            case "figures":
              price = Math.floor(Math.random() * 15000) + 5000 // 5000-20000日元
              break
            case "clothing":
              price = Math.floor(Math.random() * 3000) + 2000 // 2000-5000日元
              break
            case "accessories":
              price = Math.floor(Math.random() * 1500) + 1000 // 1000-2500日元
              break
            case "stationery":
              price = Math.floor(Math.random() * 800) + 500 // 500-1300日元
              break
            case "homeware":
              price = Math.floor(Math.random() * 2000) + 1500 // 1500-3500日元
              break
            default:
              price = Math.floor(Math.random() * 5000) + 1000 // 1000-6000日元
          }

          // 生成评分（基于动漫评分，略有浮动）
          const animeScore = anime.score || 7.5
          const rating = Math.min(5, Math.max(1, animeScore / 2 + (Math.random() * 0.6 - 0.3)))

          // 生成热度（基于动漫人气）
          const popularity = Math.min(10, Math.max(7, 7 + anime.popularity / 100000)).toFixed(1)

          // 生成库存
          const stock = Math.floor(Math.random() * 95) + 5

          // 生成评论数
          const reviewCount = Math.floor(Math.random() * 500) + 50

          // 生成商品名称
          let productName
          const characterName = character ? character.character.name : ""
          const characterSuffix = characterName ? ` - ${characterName}` : ""

          switch (category.id) {
            case "figures":
              productName = `${anime.title} ${["限定版", "珍藏版", "手办", "模型", "雕像"][Math.floor(Math.random() * 5)]}${characterSuffix}`
              break
            case "clothing":
              productName = `${anime.title} ${["T恤", "卫衣", "帽子", "外套", "睡衣"][Math.floor(Math.random() * 5)]}${characterSuffix}`
              break
            case "accessories":
              productName = `${anime.title} ${["项链", "手链", "钥匙扣", "徽章", "挂饰"][Math.floor(Math.random() * 5)]}${characterSuffix}`
              break
            case "stationery":
              productName = `${anime.title} ${["笔记本", "文具盒", "贴纸", "书签", "钢笔"][Math.floor(Math.random() * 5)]} 收藏版`
              break
            case "homeware":
              productName = `${anime.title} ${["杯子", "抱枕", "毯子", "海报", "灯饰"][Math.floor(Math.random() * 5)]} 家居装饰`
              break
            default:
              productName = `${anime.title} 周边商品`
          }

          // 生成商品描述
          const animeDescription = anime.synopsis
            ? anime.synopsis.substring(0, 150).replace(/<[^>]*>/g, "") + "..."
            : "这是一款精美的动漫周边商品。"

          const productDescription = `来自动漫《${anime.title}》的精美${category.name}${characterName ? `，以角色${characterName}为原型` : ""}。${animeDescription} 粉丝收藏必备，高品质制作，细节精致，完美还原动漫中的角色形象。`

          // 生成商品详情
          const details = {}
          const animeYear = anime.aired?.from ? new Date(anime.aired.from).getFullYear() : 2020
          const animeStudio = anime.studios && anime.studios.length > 0 ? anime.studios[0].name : "未知工作室"

          if (category.id === "figures") {
            details["材质"] = "优质PVC"
            details["尺寸"] = `${Math.floor(Math.random() * 15) + 10}cm`
            details["制造商"] = animeStudio
            details["发行年份"] = animeYear.toString()
            details["系列"] = anime.title
          } else if (category.id === "clothing") {
            details["材质"] = ["100%棉", "聚酯纤维", "混纺面料"][Math.floor(Math.random() * 3)]
            details["尺寸"] = ["S", "M", "L", "XL"][Math.floor(Math.random() * 4)]
            details["颜色"] = ["黑色", "白色", "蓝色", "红色", "灰色"][Math.floor(Math.random() * 5)]
            details["风格"] = anime.genres && anime.genres.length > 0 ? anime.genres[0].name : "休闲"
          } else if (category.id === "accessories") {
            details["材质"] = ["合金", "树脂", "水晶", "皮革", "布艺"][Math.floor(Math.random() * 5)]
            details["尺寸"] = `${Math.floor(Math.random() * 10) + 3}cm`
            details["风格"] = anime.genres && anime.genres.length > 0 ? anime.genres[0].name : "时尚"
            details["适用场合"] = ["日常", "派对", "cosplay", "收藏"][Math.floor(Math.random() * 4)]
          } else if (category.id === "stationery") {
            details["材质"] = ["优质纸张", "环保材料", "再生纸", "塑料", "金属"][Math.floor(Math.random() * 5)]
            details["尺寸"] = ["A4", "A5", "B5", "便携"][Math.floor(Math.random() * 4)]
            details["页数"] = Math.floor(Math.random() * 50 + 50) + "页"
            details["特点"] = ["防水", "耐用", "轻便", "精美设计"][Math.floor(Math.random() * 4)]
          } else if (category.id === "homeware") {
            details["材质"] = ["陶瓷", "玻璃", "木质", "布艺", "金属"][Math.floor(Math.random() * 5)]
            details["尺寸"] = `${Math.floor(Math.random() * 20) + 10}cm`
            details["风格"] = anime.genres && anime.genres.length > 0 ? anime.genres[0].name : "现代"
            details["适用"] = ["家居装饰", "日常使用", "收藏展示", "礼品"][Math.floor(Math.random() * 4)]
          }

          // 生成图片数组
          const images = []
          // 主图片
          if (anime.images?.jpg?.large_image_url) {
            images.push(anime.images.jpg.large_image_url)
          }
          // 横幅图片
          if (anime.images?.jpg?.image_url && anime.images.jpg.image_url !== anime.images.jpg.large_image_url) {
            images.push(anime.images.jpg.image_url)
          }
          // 角色图片
          if (character && character.character.images?.jpg?.image_url) {
            images.push(character.character.images.jpg.image_url)
          }

          // 如果图片不足4张，重复使用已有图片
          while (images.length < 4) {
            images.push(images[0] || "https://via.placeholder.com/400x400.png?text=No+Image")
          }

          // 创建商品对象
          const product = {
            id: productId.toString(),
            categoryId: category.id,
            name: productName,
            description: productDescription,
            price: price,
            image: images[0],
            images: images,
            rating: Number.parseFloat(rating.toFixed(1)),
            popularity: popularity,
            stock: stock,
            reviewCount: reviewCount,
            details: details,
            animeId: anime.mal_id,
            animeTitle: anime.title,
            animeYear: animeYear,
            animeStudio: animeStudio,
            animeGenres: anime.genres ? anime.genres.map((g) => g.name) : [],
            character: characterName || null,
          }

          products.push(product)
          productId++
        }
      }

      // 添加1秒延迟，避免API限流
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    console.log(`成功生成 ${products.length} 个商品数据`)

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
fetchMALData()
