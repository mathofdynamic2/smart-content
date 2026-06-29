import "./globals.css"
import type { Metadata } from "next"
import { Vazirmatn } from "next/font/google"

const vazir = Vazirmatn({ 
  subsets: ["arabic"],
  variable: "--font-vazir"
})

export const metadata: Metadata = {
  title: "محتوای هوشمند",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
