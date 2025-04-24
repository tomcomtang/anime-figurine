import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { LanguageProvider } from "@/components/language-provider"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen anime-decoration`}>
        <LanguageProvider>
          <Header />
          <main className="flex-grow relative">{children}</main>
          <footer className="bg-gray-800/90 text-white p-6 text-center mt-auto backdrop-blur-sm">
            <p>© 2025 二次元商品展示网站</p>
          </footer>
        </LanguageProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
