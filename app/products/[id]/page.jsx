"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Heart, ShoppingCart, Star, Minus, Plus, ArrowLeft } from "lucide-react"
import { useProductStore } from "../../../src/store/productSlice"
import { useCartStore } from "../../../src/store/cartSlice"
import { useWishlistStore } from "../../../src/store/wishlistSlice"
import { useUserStore } from "../../../src/store/userSlice"
import { formatPrice, calculateDiscount } from "../../../src/utils/formatters"
import Button from "../../../src/components/ui/Button"
import { Card, CardContent } from "../../../src/components/ui/Card"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const { getProductById } = useProductStore()
  const { addToCart } = useCartStore()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()
  const { isAuthenticated } = useUserStore()

  const product = getProductById(params.id)

  useEffect(() => {
    if (!product) {
      router.push("/products")
    }
  }, [product, router])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  const discount = calculateDiscount(product.originalPrice, product.price)
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart(product, quantity)
      // You could show a toast notification here
    }
  }

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  // Mock additional images for demonstration
  const productImages = [product.image, product.image, product.image]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Products</span>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />

              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  {discount}% OFF
                </div>
              )}

              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <span className="text-white text-xl font-medium">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-primary-500" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                {discount > 0 && (
                  <span className="text-xl text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  product.stock > 10 ? "bg-green-500" : product.stock > 0 ? "bg-yellow-500" : "bg-red-500"
                }`}
              />
              <span className="text-sm text-gray-600">
                {product.stock > 10 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}
              </span>
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center space-x-2"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
              </Button>

              <Button
                onClick={handleWishlistToggle}
                variant="outline"
                className="flex items-center justify-center space-x-2 bg-transparent"
                size="lg"
              >
                <Heart className={`h-5 w-5 ${inWishlist ? "fill-current text-red-500" : ""}`} />
                <span>{inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}</span>
              </Button>
            </div>

            {/* Product Tags */}
            {product.tags && product.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Product Information */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card>
            <CardContent>
              <h3 className="font-semibold text-gray-900 mb-4">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">SKU:</span>
                  <span>PRD-{product.id.toString().padStart(6, "0")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span>{product.categoryId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stock:</span>
                  <span>{product.stock} units</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="font-semibold text-gray-900 mb-4">Shipping Info</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Free shipping on orders over $50</p>
                <p>• Standard delivery: 5-7 business days</p>
                <p>• Express delivery: 2-3 business days</p>
                <p>• Overnight delivery available</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="font-semibold text-gray-900 mb-4">Return Policy</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• 30-day return policy</p>
                <p>• Items must be in original condition</p>
                <p>• Free returns on defective items</p>
                <p>• Return shipping may apply</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
