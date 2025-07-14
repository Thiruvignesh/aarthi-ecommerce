"use client"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Download, Package, MapPin, CreditCard, Truck } from "lucide-react"
import { useOrderStore } from "../../../src/store/orderSlice"
import { formatPrice, formatDate } from "../../../src/utils/formatters"
import Button from "../../../src/components/ui/Button"
import { Card, CardContent, CardHeader } from "../../../src/components/ui/Card"
import PrivateRoute from "../../../src/components/PrivateRoute"

function OrderDetailPageContent() {
  const params = useParams()
  const router = useRouter()
  const { getOrderById } = useOrderStore()

  const order = getOrderById(params.id)

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order not found</h2>
            <p className="text-gray-600 mb-8">The order you're looking for doesn't exist</p>
            <Button onClick={() => router.push("/orders")}>Back to Orders</Button>
          </div>
        </div>
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => router.push("/orders")} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Orders</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order #{order.id}</h1>
              <p className="text-gray-600">Placed on {formatDate(order.createdAt)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
            <Button variant="outline" onClick={handlePrint} className="flex items-center space-x-2 bg-transparent">
              <Download className="h-4 w-4" />
              <span>Print Invoice</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Order Items</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-600">Price: {formatPrice(item.price)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary-600" />
                  <h2 className="text-lg font-semibold">Shipping Address</h2>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-900">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-primary-600" />
                  <h2 className="text-lg font-semibold">Billing Address</h2>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-900">
                    {order.billingAddress.firstName} {order.billingAddress.lastName}
                  </p>
                  <p>{order.billingAddress.email}</p>
                  <p>{order.billingAddress.phone}</p>
                  <p>{order.billingAddress.address}</p>
                  <p>
                    {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zip}
                  </p>
                  <p>{order.billingAddress.country}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <h2 className="text-lg font-semibold">Order Summary</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{formatPrice(order.shippingCost)}</span>
                </div>

                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(order.discountAmount)}</span>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-gray-400" />
                    <div className="text-sm">
                      <p className="font-medium">{order.shippingMethod.name}</p>
                      <p className="text-gray-600">
                        Estimated delivery: {order.estimatedDelivery ? formatDate(order.estimatedDelivery) : "TBD"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    <div className="text-sm">
                      <p className="font-medium">Payment Method</p>
                      <p className="text-gray-600">
                        {order.paymentMethod.type === "credit_card" ? "Credit Card" : order.paymentMethod.type}
                        {order.paymentMethod.last4 && ` ending in ${order.paymentMethod.last4}`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="text-xs text-gray-500 text-center">
                    <p>Order ID: {order.id}</p>
                    <p>Need help? Contact our support team</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OrderDetailPage() {
  return (
    <PrivateRoute>
      <OrderDetailPageContent />
    </PrivateRoute>
  )
}
