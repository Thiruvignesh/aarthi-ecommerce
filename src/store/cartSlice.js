import { create } from "zustand"
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../services/localStorage"

export const useCartStore = create((set, get) => ({
  items: [],
  total: 0,
  itemCount: 0,
  loading: false,

  // Initialize cart from localStorage
  initialize: () => {
    const items = loadFromStorage(STORAGE_KEYS.CART, [])
    set({ items })
    get().calculateTotals()
  },

  // Add item to cart
  addToCart: (product, quantity = 1) => {
    const { items } = get()
    const existingItem = items.find((item) => item.id === product.id)

    let updatedItems
    if (existingItem) {
      // Update quantity if item already exists
      updatedItems = items.map((item) =>
        item.id === product.id ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) } : item,
      )
    } else {
      // Add new item
      updatedItems = [
        ...items,
        {
          ...product,
          quantity: Math.min(quantity, product.stock),
        },
      ]
    }

    saveToStorage(STORAGE_KEYS.CART, updatedItems)
    set({ items: updatedItems })
    get().calculateTotals()
  },

  // Remove item from cart
  removeFromCart: (productId) => {
    const { items } = get()
    const updatedItems = items.filter((item) => item.id !== productId)

    saveToStorage(STORAGE_KEYS.CART, updatedItems)
    set({ items: updatedItems })
    get().calculateTotals()
  },

  // Update item quantity
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId)
      return
    }

    const { items } = get()
    const updatedItems = items.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: Math.min(quantity, item.stock) }
      }
      return item
    })

    saveToStorage(STORAGE_KEYS.CART, updatedItems)
    set({ items: updatedItems })
    get().calculateTotals()
  },

  // Calculate totals
  calculateTotals: () => {
    const { items } = get()
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    set({ total, itemCount })
  },

  // Clear cart
  clearCart: () => {
    saveToStorage(STORAGE_KEYS.CART, [])
    set({ items: [], total: 0, itemCount: 0 })
  },

  // Get cart summary
  getCartSummary: () => {
    const { items, total, itemCount } = get()
    const tax = total * 0.08 // 8% tax
    const grandTotal = total + tax

    return {
      subtotal: total,
      tax,
      total: grandTotal,
      itemCount,
      items,
    }
  },

  // Validate cart against current stock
  validateCart: (products) => {
    const { items } = get()
    const validationErrors = []

    const updatedItems = items
      .map((item) => {
        const currentProduct = products.find((p) => p.id === item.id)

        if (!currentProduct) {
          validationErrors.push(`${item.name} is no longer available`)
          return null
        }

        if (currentProduct.stock === 0) {
          validationErrors.push(`${item.name} is out of stock`)
          return null
        }

        if (item.quantity > currentProduct.stock) {
          validationErrors.push(`Only ${currentProduct.stock} ${item.name} available`)
          return { ...item, quantity: currentProduct.stock }
        }

        return item
      })
      .filter(Boolean)

    if (validationErrors.length > 0 || updatedItems.length !== items.length) {
      saveToStorage(STORAGE_KEYS.CART, updatedItems)
      set({ items: updatedItems })
      get().calculateTotals()
    }

    return validationErrors
  },
}))
