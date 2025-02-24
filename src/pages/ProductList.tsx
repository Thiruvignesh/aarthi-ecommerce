import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { formatPrice } from '../utils/currency';
import { categories } from '../data/categories';

const ProductList = () => {
  const { category, subcategory } = useParams();
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]); // Updated for INR
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const categoryData = category ? categories[category as keyof typeof categories] : null;

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    // Filter by subcategory if provided
    if (subcategory) {
      filtered = filtered.filter(product => product.subCategory === subcategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by sizes
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) =>
        selectedSizes.some((size) => product.sizes.includes(size))
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-asc':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'newest':
        return [...filtered].reverse();
      default:
        return filtered;
    }
  }, [category, subcategory, sortBy, priceRange, selectedSizes]);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  const pageTitle = useMemo(() => {
    if (!category) return 'All Products';
    if (!subcategory) return categoryData?.name || 'Products';
    const subCat = categoryData?.subcategories.find(s => s.id === subcategory);
    return subCat ? subCat.name : 'Products';
  }, [category, subcategory, categoryData]);

  // Debug information
  console.log('Category:', category);
  console.log('Subcategory:', subcategory);
  console.log('Filtered Products:', filteredProducts);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{pageTitle}</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span className="hidden sm:inline">Filters</span>
          </button>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-4">Price Range</h2>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="100000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>

            <h2 className="font-semibold mt-6 mb-4">Sizes</h2>
            <div className="grid grid-cols-3 gap-2">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-2 text-sm font-medium rounded ${
                    selectedSizes.includes(size)
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Show current category's subcategories */}
            {categoryData && (
              <div className="mt-6">
                <h2 className="font-semibold mb-4">Categories</h2>
                <div className="space-y-2">
                  <Link
                    to={`/category/${category}`}
                    className={`block px-3 py-2 text-sm rounded hover:bg-gray-100 ${
                      !subcategory ? 'bg-gray-100 font-medium' : ''
                    }`}
                  >
                    All {categoryData.name}
                  </Link>
                  {categoryData.subcategories.map((subCat) => (
                    <Link
                      key={subCat.id}
                      to={`/category/${category}/${subCat.id}`}
                      className={`block px-3 py-2 text-sm rounded hover:bg-gray-100 ${
                        subcategory === subCat.id ? 'bg-gray-100 font-medium' : ''
                      }`}
                    >
                      {subCat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group"
                >
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {formatPrice(product.price)}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;