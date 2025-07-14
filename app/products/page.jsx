"use client"

import { useEffect, useState } from "react"
import { Filter, Grid, List, ChevronDown } from "lucide-react"
import { useProductStore } from "../../src/store/productSlice"
import { useUserStore } from "../../src/store/userSlice"
import { useCartStore } from "../../src/store/cartSlice"
import { useWishlistStore } from "../../src/store/wishlistSlice"
import { useOrderStore } from "../../src/store/orderSlice"
import { initializeStorage } from "../../src/services/localStorage"
import * as mockData from "../../src/services/mockData"
import { categories, subcategories } from "../../src/services/mockData"
import ProductCard from "../../src/components/ui/ProductCard"
import Button from "../../src/components/ui/Button"
import Input from "../../src/components/ui/Input"

export default function ProductsPage() {
  const {
    products,
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    sortBy,
    sortOrder,
    searchProducts,
    filterByCategory,
    filterBySubcategory,
    sortProducts,
    clearFilters,
    getPaginatedProducts,
    setCurrentPage,
    initialize: initializeProducts,
  } = useProductStore()

  const { initialize: initializeUser } = useUserStore()
  const { initialize: initializeCart } = useCartStore()
  const { initialize: initializeWishlist } = useWishlistStore()
  const { initialize: initializeOrders } = useOrderStore()

  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState("grid")
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize all stores when component mounts
  useEffect(() => {
    if (!isInitialized) {
      // Initialize localStorage with mock data
      initializeStorage(mockData)

      // Initialize all stores
      initializeProducts(mockData)
      initializeUser()
      initializeCart()
      initializeWishlist()
      initializeOrders()

      setIsInitialized(true)
    }
  }, [initializeProducts, initializeUser, initializeCart, initializeWishlist, initializeOrders, isInitialized])

  const paginatedData = getPaginatedProducts()
  const { products: paginatedProducts, totalPages, currentPage, hasNextPage, hasPrevPage } = paginatedData

  useEffect(() => {
    setLocalSearchQuery(searchQuery)
  }, [searchQuery])

  const handleSearch = (e) => {
    e.preventDefault()
    searchProducts(localSearchQuery)
  }

  const handleCategoryFilter = (categoryId) => {
    filterByCategory(categoryId === selectedCategory ? null : categoryId)
  }

  const handleSubcategoryFilter = (subcategoryId) => {
    filterBySubcategory(subcategoryId === selectedSubcategory ? null : subcategoryId)
  }

  const handleSort = (newSortBy) => {
    const newSortOrder = sortBy === newSortBy && sortOrder === "asc" ? "desc" : "asc"
    sortProducts(newSortBy, newSortOrder)
  }

  const availableSubcategories = selectedCategory
    ? subcategories.filter((sub) => sub.categoryId === selectedCategory)
    : []

  // Show loading state while initializing
  if (!isInitialized || products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Products</h1>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Search products..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
              />
            </form>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="p-2"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="p-2"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <div className="relative">
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [newSortBy, newSortOrder] = e.target.value.split("-")
                    sortProducts(newSortBy, newSortOrder)
                  }}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                >
                  <option value="name-asc">Name A-Z</option>
                  <option value="name-desc">Name Z-A</option>
                  <option value="price-asc">Price Low-High</option>
                  <option value="price-desc">Price High-Low</option>
                  <option value="rating-desc">Rating High-Low</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white rounded-lg border p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryFilter(category.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.id
                          ? "bg-secondary-100 text-secondary-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {availableSubcategories.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Subcategories</h3>
                  <div className="space-y-2">
                    {availableSubcategories.map((subcategory) => (
                      <button
                        key={subcategory.id}
                        onClick={() => handleSubcategoryFilter(subcategory.id)}
                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedSubcategory === subcategory.id
                            ? "bg-secondary-100 text-secondary-700"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {subcategory.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Button variant="outline" size="sm" onClick={clearFilters} className="w-full bg-transparent">
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found</p>
                <Button variant="outline" onClick={clearFilters} className="mt-4 bg-transparent">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div
                  className={`grid gap-6 ${
                    viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                  }`}
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-4 mt-8">
                    <Button variant="outline" disabled={!hasPrevPage} onClick={() => setCurrentPage(currentPage - 1)}>
                      Previous
                    </Button>

                    <span className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>

                    <Button variant="outline" disabled={!hasNextPage} onClick={() => setCurrentPage(currentPage + 1)}>
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
