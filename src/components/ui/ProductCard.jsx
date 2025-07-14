"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { useCartStore } from "../../store/cartSlice"
import { useWishlistStore } from "../../store/wishlistSlice"
import { useUserStore } from "../../store/userSlice"
import { formatPrice, calculateDiscount } from "../../utils/formatters"
import Button from "./Button"

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()
  const { isAuthenticated } = useUserStore()

  const discount = calculateDiscount(product.originalPrice, product.price)
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    if (product.stock > 0) {
      addToCart(product, 1)
    }
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    if (!isAuthenticated) return

    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <div className="relative overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg?height=300&width=300&text=Product"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              {discount}% OFF
            </div>
          )}

          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg bg-red-600 px-4 py-2 rounded-lg">Out of Stock</span>
            </div>
          )}

          {isAuthenticated && (
            <button
              onClick={handleWishlistToggle}
              className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 shadow-lg ${
                inWishlist
                  ? "bg-secondary-500 text-white scale-110"
                  : "bg-white/90 text-gray-600 hover:text-secondary-500 hover:bg-white"
              }`}
            >
              <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
            </button>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-3 group-hover:text-secondary-700 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) ? "text-warning-500 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500 font-medium">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
              {discount > 0 && (
                <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            <div className="flex items-center">
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  product.stock > 10 ? "bg-success-500" : product.stock > 0 ? "bg-warning-500" : "bg-destructive"
                }`}
              />
              <span className="text-sm text-gray-600 font-medium">{product.stock} left</span>
            </div>
          </div>
        </div>
      </Link>

      <div className="px-6 pb-6">
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full flex items-center justify-center space-x-2 transition-all duration-300 ${
            product.stock === 0
              ? "bg-gray-400 text-white cursor-not-allowed opacity-75"
              : "transform hover:scale-105 shadow-lg hover:shadow-xl bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
          }`}
          size="md"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="font-semibold">{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
        </Button>
      </div>
    </div>
  )
}

export default ProductCard
