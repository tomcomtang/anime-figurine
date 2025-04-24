import type React from "react"
import Image from "next/image"

interface AnimeBackgroundProps {
  imageUrl: string
  opacity?: number
  children: React.ReactNode
}

export default function AnimeBackground({ imageUrl, opacity = 0.4, children }: AnimeBackgroundProps) {
  return (
    <div className="relative">
      {/* 背景图片层 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-full h-full relative">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt="Anime background"
            fill
            className="object-cover"
            style={{ opacity }}
            priority={false}
          />
          {/* 渐变遮罩层 */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/60" />
        </div>
      </div>

      {/* 内容层 */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
