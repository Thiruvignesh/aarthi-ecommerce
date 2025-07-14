"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ShoppingCart, Heart, User, Menu, X, Sparkles } from "lucide-react"
import { useUserStore } from "../../store/userSlice"
import { useCartStore } from "../../store/cartSlice"
import { useWishlistStore } from "../../store/wishlistSlice"
import { useProductStore } from "../../store/productSlice"
import Button from "./Button"

const Navbar = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const { isAuthenticated, currentUser, logout } = useUserStore()
  const { itemCount } = useCartStore()
  const { itemCount: wishlistCount } = useWishlistStore()
  const { searchProducts } = useProductStore()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      searchProducts(searchQuery)
      router.push("/products")
      setSearchQuery("")
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              LadyJoy
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search fashion items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-gray-50 hover:bg-white transition-colors shadow-sm"
              />
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/products">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-pink-700 hover:bg-pink-50 font-semibold px-4 py-2"
              >
                Shop
              </Button>
            </Link>

            {isAuthenticated ? (
              <>
                <Link href="/wishlist" className="relative group">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors"
                  >
                    <Heart className="h-6 w-6" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                        {wishlistCount}
                      </span>
                    )}
                  </Button>
                </Link>

                <Link href="/cart" className="relative group">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-3 text-gray-700 hover:text-purple-700 hover:bg-purple-50 transition-colors"
                  >
                    <ShoppingCart className="h-6 w-6" />
                    {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                        {itemCount}
                      </span>
                    )}
                  </Button>
                </Link>

                <div className="relative group">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 text-gray-700 hover:text-pink-700 hover:bg-pink-50 px-4 py-2 rounded-xl font-semibold"
                  >
                    <User className="h-5 w-5" />
                    <span>{currentUser?.name}</span>
                  </Button>

                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="py-2">
                      <Link
                        href="/orders"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors font-medium"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-700 hover:text-pink-700 hover:bg-pink-50 font-semibold px-4 py-2"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="sm"
                    className="font-semibold px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Join Us
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search fashion items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-gray-50"
            />
          </div>
        </form>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/products"
              className="block py-3 text-gray-700 hover:text-pink-600 font-semibold transition-colors"
            >
              Shop
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/wishlist"
                  className="flex items-center justify-between py-3 text-gray-700 hover:text-pink-600 font-semibold transition-colors"
                >
                  <span>Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="bg-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/cart"
                  className="flex items-center justify-between py-3 text-gray-700 hover:text-purple-600 font-semibold transition-colors"
                >
                  <span>Cart</span>
                  {itemCount > 0 && (
                    <span className="bg-purple-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                      {itemCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/orders"
                  className="block py-3 text-gray-700 hover:text-pink-600 font-semibold transition-colors"
                >
                  My Orders
                </Link>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-3 text-gray-700 hover:text-red-600 font-semibold transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-3 pt-2">
                <Link href="/login" className="block">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-gray-700 hover:text-pink-600 hover:bg-pink-50 font-semibold"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register" className="block">
                  <Button
                    size="sm"
                    className="w-full font-semibold bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                  >
                    Join Us
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
