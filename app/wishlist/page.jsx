"use client"

import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { useWishlistStore } from "../../src/store/wishlistSlice"
import { useCartStore } from "../../src/store/cartSlice"
import ProductCard from "../../src/components/ui/ProductCard"
import Button from "../../src/components/ui/Button"
import PrivateRoute from "../../src/components/PrivateRoute"

function WishlistPageContent() {
  const { items, moveToCart, clearWishlist } = useWishlistStore()
  const { addToCart } = useCartStore()

  const handleMoveToCart = (productId) => {
    moveToCart(productId, addToCart)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Save items you love for later</p>
            <Link href="/products">
              <Button size="lg">Browse Products</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
            <Button variant="outline" size="sm" onClick={clearWishlist} disabled={items.length === 0}>
              Clear All
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              <div className="absolute bottom-4 left-4 right-4">
                <Button
                  onClick={() => handleMoveToCart(product.id)}
                  disabled={product.stock === 0}
                  className="w-full flex items-center justify-center space-x-2"
                  size="sm"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Move to Cart</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function WishlistPage() {
  return (
    <PrivateRoute>
      <WishlistPageContent />
    </PrivateRoute>
  )
}
