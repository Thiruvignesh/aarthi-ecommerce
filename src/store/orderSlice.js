import { create } from "zustand"
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../services/localStorage"
import { generateOrderId } from "../utils/formatters"

export const useOrderStore = create((set, get) => ({
  orders: [],
  currentOrder: null,
  loading: false,

  // Initialize orders from localStorage
  initialize: () => {
    const orders = loadFromStorage(STORAGE_KEYS.ORDERS, [])
    set({ orders })
  },

  // Create new order
  createOrder: (orderData) => {
    const { orders } = get()

    const newOrder = {
      id: generateOrderId(),
      ...orderData,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    }

    const updatedOrders = [newOrder, ...orders]
    saveToStorage(STORAGE_KEYS.ORDERS, updatedOrders)

    set({
      orders: updatedOrders,
      currentOrder: newOrder,
    })

    return newOrder
  },

  // Get order by ID
  getOrderById: (orderId) => {
    const { orders } = get()
    return orders.find((order) => order.id === orderId)
  },

  // Get orders by user ID
  getOrdersByUserId: (userId) => {
    const { orders } = get()
    return orders.filter((order) => order.userId === userId)
  },

  // Update order status
  updateOrderStatus: (orderId, status) => {
    const { orders } = get()
    const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status } : order))

    saveToStorage(STORAGE_KEYS.ORDERS, updatedOrders)
    set({ orders: updatedOrders })
  },

  // Set current order for viewing
  setCurrentOrder: (order) => {
    set({ currentOrder: order })
  },

  // Clear current order
  clearCurrentOrder: () => {
    set({ currentOrder: null })
  },
}))
