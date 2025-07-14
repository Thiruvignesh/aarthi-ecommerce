"use client"

import Link from "next/link"
import { Package, Eye } from "lucide-react"
import { useOrderStore } from "../../src/store/orderSlice"
import { useUserStore } from "../../src/store/userSlice"
import { formatPrice, formatDate } from "../../src/utils/formatters"
import Button from "../../src/components/ui/Button"
import { Card, CardContent, CardHeader } from "../../src/components/ui/Card"
import PrivateRoute from "../../src/components/PrivateRoute"

function OrdersPageContent() {
  const { getOrdersByUserId } = useOrderStore()
  const { currentUser } = useUserStore()

  const orders = currentUser ? getOrdersByUserId(currentUser.id) : []

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

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-8">Start shopping to see your orders here</p>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div>
                    <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600">Placed on {formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <Link href={`/orders/${order.id}`}>
                      <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                        <Eye className="h-4 w-4" />
                        <span>View Details</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-semibold">{formatPrice(order.total)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Items</p>
                    <p className="font-semibold">{order.items.length} items</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Shipping Method</p>
                    <p className="font-semibold">{order.shippingMethod.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estimated Delivery</p>
                    <p className="font-semibold">
                      {order.estimatedDelivery ? formatDate(order.estimatedDelivery) : "TBD"}
                    </p>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Items in this order:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xs font-medium">
                          {item.quantity}x
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                          <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">+{order.items.length - 3} more items</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function OrdersPage() {
  return (
    <PrivateRoute>
      <OrdersPageContent />
    </PrivateRoute>
  )
}
