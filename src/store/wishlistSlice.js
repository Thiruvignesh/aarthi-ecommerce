import { create } from "zustand"
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../services/localStorage"

export const useWishlistStore = create((set, get) => ({
  items: [],
  itemCount: 0,

  // Initialize wishlist from localStorage
  initialize: () => {
    const items = loadFromStorage(STORAGE_KEYS.WISHLIST, [])
    set({ items, itemCount: items.length })
  },

  // Add item to wishlist
  addToWishlist: (product) => {
    const { items } = get()

    // Check if item already exists
    if (items.find((item) => item.id === product.id)) {
      return false // Item already in wishlist
    }

    const updatedItems = [...items, product]
    saveToStorage(STORAGE_KEYS.WISHLIST, updatedItems)
    set({ items: updatedItems, itemCount: updatedItems.length })
    return true
  },

  // Remove item from wishlist
  removeFromWishlist: (productId) => {
    const { items } = get()
    const updatedItems = items.filter((item) => item.id !== productId)

    saveToStorage(STORAGE_KEYS.WISHLIST, updatedItems)
    set({ items: updatedItems, itemCount: updatedItems.length })
  },

  // Check if item is in wishlist
  isInWishlist: (productId) => {
    const { items } = get()
    return items.some((item) => item.id === productId)
  },

  // Move item from wishlist to cart
  moveToCart: (productId, addToCartFn) => {
    const { items } = get()
    const item = items.find((item) => item.id === productId)

    if (item) {
      addToCartFn(item, 1)
      get().removeFromWishlist(productId)
    }
  },

  // Clear wishlist
  clearWishlist: () => {
    saveToStorage(STORAGE_KEYS.WISHLIST, [])
    set({ items: [], itemCount: 0 })
  },
}))
