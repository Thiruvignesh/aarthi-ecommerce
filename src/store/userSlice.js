import { create } from "zustand"
import { loadFromStorage, saveToStorage, removeFromStorage, STORAGE_KEYS } from "../services/localStorage"
import { hashPassword, verifyPassword, generateToken, validateToken } from "../utils/auth"

export const useUserStore = create((set, get) => ({
  currentUser: null,
  users: [],
  isAuthenticated: false,
  authToken: null,
  loading: false,
  error: null,

  // Initialize store from localStorage
  initialize: () => {
    const users = loadFromStorage(STORAGE_KEYS.USERS, [])
    const currentUser = loadFromStorage(STORAGE_KEYS.CURRENT_USER)
    const authToken = loadFromStorage(STORAGE_KEYS.AUTH_TOKEN)

    let isAuthenticated = false
    if (authToken && validateToken(authToken) && currentUser) {
      isAuthenticated = true
    } else {
      // Clear invalid auth data
      removeFromStorage(STORAGE_KEYS.CURRENT_USER)
      removeFromStorage(STORAGE_KEYS.AUTH_TOKEN)
    }

    set({ users, currentUser, authToken, isAuthenticated })
  },

  // Register new user
  register: async (userData) => {
    set({ loading: true, error: null })

    try {
      const { users } = get()

      // Check if user already exists
      const existingUser = users.find((user) => user.email === userData.email)
      if (existingUser) {
        throw new Error("User with this email already exists")
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: hashPassword(userData.password),
        createdAt: new Date().toISOString(),
      }

      const updatedUsers = [...users, newUser]
      saveToStorage(STORAGE_KEYS.USERS, updatedUsers)

      // Auto-login after registration
      const token = generateToken(newUser)
      const userForStorage = { ...newUser }
      delete userForStorage.password // Don't store password in current user

      saveToStorage(STORAGE_KEYS.CURRENT_USER, userForStorage)
      saveToStorage(STORAGE_KEYS.AUTH_TOKEN, token)

      set({
        users: updatedUsers,
        currentUser: userForStorage,
        authToken: token,
        isAuthenticated: true,
        loading: false,
      })

      return { success: true }
    } catch (error) {
      set({ loading: false, error: error.message })
      return { success: false, error: error.message }
    }
  },

  // Login user
  login: async (email, password) => {
    set({ loading: true, error: null })

    try {
      const { users } = get()

      const user = users.find((u) => u.email === email)
      if (!user || !verifyPassword(password, user.password)) {
        throw new Error("Invalid email or password")
      }

      const token = generateToken(user)
      const userForStorage = { ...user }
      delete userForStorage.password

      saveToStorage(STORAGE_KEYS.CURRENT_USER, userForStorage)
      saveToStorage(STORAGE_KEYS.AUTH_TOKEN, token)

      set({
        currentUser: userForStorage,
        authToken: token,
        isAuthenticated: true,
        loading: false,
      })

      return { success: true }
    } catch (error) {
      set({ loading: false, error: error.message })
      return { success: false, error: error.message }
    }
  },

  // Logout user
  logout: () => {
    removeFromStorage(STORAGE_KEYS.CURRENT_USER)
    removeFromStorage(STORAGE_KEYS.AUTH_TOKEN)

    set({
      currentUser: null,
      authToken: null,
      isAuthenticated: false,
      error: null,
    })
  },

  // Clear error
  clearError: () => set({ error: null }),
}))
