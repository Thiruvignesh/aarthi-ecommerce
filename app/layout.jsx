"use client"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "../src/components/ui/Navbar"
import { use } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
