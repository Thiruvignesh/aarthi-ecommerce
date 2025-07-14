"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCartStore } from "../../src/store/cartSlice"
import { useProductStore } from "../../src/store/productSlice"
import { formatPrice } from "../../src/utils/formatters"
import Button from "../../src/components/ui/Button"
import { Card, CardContent, CardHeader } from "../../src/components/ui/Card"
import PrivateRoute from "../../src/components/PrivateRoute"

function CartPageContent() {
  const router = useRouter()
  const { items, updateQuantity, removeFromCart, getCartSummary, validateCart } = useCartStore()
  const { products } = useProductStore()

  const [validationErrors, setValidationErrors] = useState([])
  const cartSummary = getCartSummary()

  useEffect(() => {
    if (products.length > 0) {
      const errors = validateCart(products)
      setValidationErrors(errors)
    }
  }, [products, validateCart])

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId) => {
    removeFromCart(productId)
  }

  const handleCheckout = () => {
    if (items.length > 0) {
      router.push("/checkout")
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to get started</p>
            <Link href="/products">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-yellow-800 mb-2">Cart Updates:</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={120}
                        height={120}
                        className="w-24 h-24 sm:w-30 sm:h-30 object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <Link
                          href={`/products/${item.id}`}
                          className="text-lg font-medium text-gray-900 hover:text-primary-600"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                        <div className="flex items-center space-x-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 text-center min-w-[3rem]">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.stock}
                              className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <span className="text-sm text-gray-500">{item.stock} available</span>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end space-x-4">
                          <div className="text-right">
                            <div className="text-lg font-semibold text-gray-900">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                            <div className="text-sm text-gray-500">{formatPrice(item.price)} each</div>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <h2 className="text-lg font-semibold">Order Summary</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cartSummary.itemCount} items)</span>
                  <span>{formatPrice(cartSummary.subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>{formatPrice(cartSummary.tax)}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(cartSummary.total)}</span>
                  </div>
                </div>

                <Button onClick={handleCheckout} className="w-full" size="lg" disabled={items.length === 0}>
                  Proceed to Checkout
                </Button>

                <Link href="/products" className="block">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>

                <div className="text-xs text-gray-500 text-center">
                  <p>Free shipping on orders over $50</p>
                  <p>Secure checkout with SSL encryption</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CartPage() {
  return (
    <PrivateRoute>
      <CartPageContent />
    </PrivateRoute>
  )
}
