import { create } from "zustand"
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../services/localStorage"

export const useProductStore = create((set, get) => ({
  products: [],
  categories: [],
  subcategories: [],
  filteredProducts: [],
  searchQuery: "",
  selectedCategory: null,
  selectedSubcategory: null,
  sortBy: "name",
  sortOrder: "asc",
  currentPage: 1,
  itemsPerPage: 12,
  loading: false,

  // Initialize store
  initialize: (mockData) => {
    const products = loadFromStorage(STORAGE_KEYS.PRODUCTS, mockData.products)

    set({
      products,
      categories: mockData.categories,
      subcategories: mockData.subcategories,
      filteredProducts: products,
    })
  },

  // Search products
  searchProducts: (query) => {
    set({ searchQuery: query, currentPage: 1 })
    get().applyFilters()
  },

  // Filter by category
  filterByCategory: (categoryId) => {
    set({
      selectedCategory: categoryId,
      selectedSubcategory: null,
      currentPage: 1,
    })
    get().applyFilters()
  },

  // Filter by subcategory
  filterBySubcategory: (subcategoryId) => {
    set({ selectedSubcategory: subcategoryId, currentPage: 1 })
    get().applyFilters()
  },

  // Sort products
  sortProducts: (sortBy, sortOrder = "asc") => {
    set({ sortBy, sortOrder })
    get().applyFilters()
  },

  // Apply all filters
  applyFilters: () => {
    const { products, searchQuery, selectedCategory, selectedSubcategory, sortBy, sortOrder } = get()

    let filtered = [...products]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.categoryId === selectedCategory)
    }

    // Apply subcategory filter
    if (selectedSubcategory) {
      filtered = filtered.filter((product) => product.subcategoryId === selectedSubcategory)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case "price":
          aValue = a.price
          bValue = b.price
          break
        case "rating":
          aValue = a.rating
          bValue = b.rating
          break
        case "name":
        default:
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
      }

      if (sortOrder === "desc") {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
      } else {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
      }
    })

    set({ filteredProducts: filtered })
  },

  // Get product by ID
  getProductById: (id) => {
    const { products } = get()
    return products.find((product) => product.id === Number.parseInt(id))
  },

  // Update product stock
  updateProductStock: (productId, newStock) => {
    const { products } = get()
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, stock: newStock } : product,
    )

    saveToStorage(STORAGE_KEYS.PRODUCTS, updatedProducts)
    set({ products: updatedProducts })
    get().applyFilters()
  },

  // Pagination
  setCurrentPage: (page) => set({ currentPage: page }),

  // Get paginated products
  getPaginatedProducts: () => {
    const { filteredProducts, currentPage, itemsPerPage } = get()
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    return {
      products: filteredProducts.slice(startIndex, endIndex),
      totalPages: Math.ceil(filteredProducts.length / itemsPerPage),
      totalItems: filteredProducts.length,
      currentPage,
      hasNextPage: endIndex < filteredProducts.length,
      hasPrevPage: currentPage > 1,
    }
  },

  // Clear filters
  clearFilters: () => {
    set({
      searchQuery: "",
      selectedCategory: null,
      selectedSubcategory: null,
      currentPage: 1,
    })
    get().applyFilters()
  },
}))
