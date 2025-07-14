"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Truck, Shield, Headphones, Star, Sparkles, Heart } from "lucide-react"
import { useProductStore } from "../src/store/productSlice"
import { useUserStore } from "../src/store/userSlice"
import { useCartStore } from "../src/store/cartSlice"
import { useWishlistStore } from "../src/store/wishlistSlice"
import { useOrderStore } from "../src/store/orderSlice"
import { initializeStorage } from "../src/services/localStorage"
import * as mockData from "../src/services/mockData"
import ProductCard from "../src/components/ui/ProductCard"
import Button from "../src/components/ui/Button"

export default function HomePage() {
  const { products, initialize: initializeProducts } = useProductStore()
  const { initialize: initializeUser } = useUserStore()
  const { initialize: initializeCart } = useCartStore()
  const { initialize: initializeWishlist } = useWishlistStore()
  const { initialize: initializeOrders } = useOrderStore()

  useEffect(() => {
    // Initialize localStorage with mock data
    initializeStorage(mockData)

    // Initialize all stores
    initializeProducts(mockData)
    initializeUser()
    initializeCart()
    initializeWishlist()
    initializeOrders()
  }, [initializeProducts, initializeUser, initializeCart, initializeWishlist, initializeOrders])

  const featuredProducts = products.filter((product) => product.featured).slice(0, 4)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop&crop=center')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-pink-300 mr-3" />
              <span className="text-pink-200 font-semibold text-lg">Fashion Forward</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
              Welcome to LadyJoy
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-pink-100 max-w-3xl mx-auto leading-relaxed">
              Discover the latest in women's fashion. From elegant dresses to chic accessories, find your perfect style
              with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-white text-pink-700 border-2 border-white hover:bg-pink-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-bold px-8 py-4"
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-pink-700">Shop Now</span>
                    <ArrowRight className="h-5 w-5 text-pink-700" />
                  </span>
                </Button>
              </Link>
              <div className="flex items-center space-x-2 text-pink-100">
                <Heart className="h-5 w-5 text-pink-300 fill-current" />
                <span>Loved by 50,000+ fashion enthusiasts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-pink-100 to-pink-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Truck className="h-10 w-10 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Free Shipping</h3>
              <p className="text-gray-600 leading-relaxed">
                Free shipping on orders over $75. Fast and reliable delivery to your doorstep.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Secure Shopping</h3>
              <p className="text-gray-600 leading-relaxed">
                Your payment and personal information is protected with bank-level security.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Headphones className="h-10 w-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Style Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized styling advice from our fashion experts anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold mb-4">
              <Star className="h-4 w-4 mr-2 fill-current" />
              Featured Collection
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trending Now</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked pieces that are making waves in the fashion world
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/products">
              <Button
                className="shadow-md hover:shadow-lg transition-all duration-300 font-semibold px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
                size="lg"
              >
                Explore All Styles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Stay in Style</h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest fashion trends, exclusive deals, and styling tips
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl border-0 focus:outline-none focus:ring-4 focus:ring-white/20 text-gray-900 placeholder-gray-500 shadow-lg"
              />
              <Button className="bg-white text-pink-700 border-2 border-white hover:bg-pink-50 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Subscribe
              </Button>
            </div>
            <p className="text-pink-200 text-sm mt-4">Join 100,000+ fashion lovers and never miss a trend!</p>
          </div>
        </div>
      </section>
    </div>
  )
}
