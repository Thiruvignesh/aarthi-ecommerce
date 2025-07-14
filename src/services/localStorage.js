export const STORAGE_KEYS = {
  USERS: "ecommerce_users",
  PRODUCTS: "ecommerce_products",
  CART: "ecommerce_cart",
  WISHLIST: "ecommerce_wishlist",
  ORDERS: "ecommerce_orders",
  CURRENT_USER: "ecommerce_current_user",
  AUTH_TOKEN: "ecommerce_auth_token",
}

export const loadFromStorage = (key, defaultValue = null) => {
  if (typeof window === "undefined") return defaultValue

  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error)
    return defaultValue
  }
}

export const saveToStorage = (key, value) => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error)
  }
}

export const removeFromStorage = (key) => {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error)
  }
}

export const clearAllStorage = () => {
  if (typeof window === "undefined") return

  Object.values(STORAGE_KEYS).forEach((key) => {
    removeFromStorage(key)
  })
}

// Initialize storage with mock data if empty
export const initializeStorage = (mockData) => {
  const { products, users, categories, subcategories } = mockData

  if (!loadFromStorage(STORAGE_KEYS.PRODUCTS)) {
    saveToStorage(STORAGE_KEYS.PRODUCTS, products)
  }

  if (!loadFromStorage(STORAGE_KEYS.USERS)) {
    saveToStorage(STORAGE_KEYS.USERS, users)
  }

  if (!loadFromStorage(STORAGE_KEYS.CART)) {
    saveToStorage(STORAGE_KEYS.CART, [])
  }

  if (!loadFromStorage(STORAGE_KEYS.WISHLIST)) {
    saveToStorage(STORAGE_KEYS.WISHLIST, [])
  }

  if (!loadFromStorage(STORAGE_KEYS.ORDERS)) {
    saveToStorage(STORAGE_KEYS.ORDERS, [])
  }
}
