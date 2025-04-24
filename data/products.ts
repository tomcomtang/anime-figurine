// 这个文件导出商品数据，模拟从JSON文件导入
// 在实际项目中，这些数据会由fetch-anilist-data.js脚本生成

export const products = [
  {
    id: "1",
    categoryId: "figures",
    name: "进击的巨人 限定版 手办 2013版",
    description:
      "来自动漫《进击的巨人》的精美手办模型，2013年WIT STUDIO出品。人类居住在由高墙包围的城市中，被迫面对导致人类几近灭绝的巨人... 粉丝收藏必备，高品质制作，细节精致，完美还原动漫中的角色形象。",
    price: 15999,
    image: "/magicstudio-art.jpg",
    images: [
      "/magicstudio-art.jpg"
    ],
    rating: 4.8,
    popularity: "9.7",
    stock: 42,
    reviewCount: 356,
    details: {
      材质: "优质PVC",
      尺寸: "24cm",
      制造商: "WIT STUDIO",
      发行年份: "2013",
      系列: "Action",
    },
    animeId: 16498,
    animeTitle: "Attack on Titan",
    animeYear: 2013,
    animeStudio: "WIT STUDIO",
    animeGenres: ["Action", "Drama", "Fantasy", "Mystery"],
  },
  {
    id: "2",
    categoryId: "clothing",
    name: "鬼灭之刃 T恤 Action主题",
    description:
      "来自动漫《鬼灭之刃》的精美服饰周边，2019年ufotable出品。自从古时起，传说中有嗜食人类的恶魔潜伏在黑暗之中... 粉丝收藏必备，高品质制作，细节精致，完美还原动漫中的角色形象。",
    price: 2999,
    image: "/guimie-1.jpg",
    images: [
      "/guimie-1.jpg"
    ],
    rating: 4.7,
    popularity: "9.5",
    stock: 78,
    reviewCount: 412,
    details: {
      材质: "100%棉",
      尺寸: "M",
      颜色: "黑色",
      风格: "Action",
    },
    animeId: 101922,
    animeTitle: "Demon Slayer: Kimetsu no Yaiba",
    animeYear: 2019,
    animeStudio: "ufotable",
    animeGenres: ["Action", "Adventure", "Drama", "Fantasy", "Supernatural"],
  },
  {
    id: "3",
    categoryId: "accessories",
    name: "我的英雄学院 项链 BONES出品",
    description:
      "来自动漫《我的英雄学院》的精美配饰饰品，2016年BONES出品。在一个超能力成为常态的世界，没有任何能力的绿谷出久依然梦想着成为一名英雄... 粉丝收藏必备，高品质制作，细节精致，完美还原动漫中的角色形象。",
    price: 1599,
    image: "/magicstudio-art-3.jpg",
    images: [
      "/magicstudio-art-3.jpg"
    ],
    rating: 4.6,
    popularity: "9.3",
    stock: 56,
    reviewCount: 278,
    details: {
      材质: "合金",
      尺寸: "5cm",
      风格: "Action",
      适用场合: "日常",
    },
    animeId: 21459,
    animeTitle: "My Hero Academia",
    animeYear: 2016,
    animeStudio: "BONES",
    animeGenres: ["Action", "Adventure", "Comedy"],
  },
  {
    id: "4",
    categoryId: "stationery",
    name: "间谍过家家 笔记本 收藏版",
    description:
      "来自动漫《间谍过家家》的精美文具用品，2022年WIT STUDIO, CloverWorks出品。每个人都有不可告人的一面。... 粉丝收藏必备，高品质制作，细节精致，完美还原动漫中的角色形象。",
    price: 899,
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx140960-vN39AmOWrVB5.jpg",
    images: [
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx140960-vN39AmOWrVB5.jpg"
    ],
    rating: 4.5,
    popularity: "9.2",
    stock: 120,
    reviewCount: 186,
    details: {
      材质: "优质纸张",
      尺寸: "A5",
      页数: "80页",
      特点: "精美设计",
    },
    animeId: 140960,
    animeTitle: "SPY×FAMILY",
    animeYear: 2022,
    animeStudio: "WIT STUDIO, CloverWorks",
    animeGenres: ["Action", "Comedy", "Slice of Life", "Supernatural"],
  },
  {
    id: "5",
    categoryId: "homeware",
    name: "咒术回战 杯子 家居装饰",
    description:
      "来自动漫《咒术回战》的精美家居用品，2020年MAPPA出品。少年虎杖悠仁是一个身体素质异于常人的高中生。某天，他为了救下被诅咒物“特级咒物”袭击的人... 粉丝收藏必备，高品质制作，细节精致，完美还原动漫中的角色形象。",
    price: 1299,
    image: "/magicstudio-art-4.jpg",
    images: [
      "/magicstudio-art-4.jpg"
    ],
    rating: 4.7,
    popularity: "9.4",
    stock: 65,
    reviewCount: 231,
    details: {
      材质: "陶瓷",
      尺寸: "12cm",
      风格: "Action",
      适用: "日常使用",
    },
    animeId: 113415,
    animeTitle: "Jujutsu Kaisen",
    animeYear: 2020,
    animeStudio: "MAPPA",
    animeGenres: ["Action", "Drama", "Supernatural"],
  },
]
