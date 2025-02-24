import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { formatPrice } from '../utils/currency';
import { categories } from '../data/categories';

const Home = () => {
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-[600px] object-cover"
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            New Season Arrivals
          </h1>
          <p className="mt-6 text-xl text-white max-w-3xl">
            Discover our latest collection of premium apparel.
          </p>
          <div className="mt-10">
            <Link
              to="/category/men"
              className="inline-block bg-white py-3 px-8 rounded-md font-medium text-gray-900 hover:bg-gray-100"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(categories).map(([key, category]) => (
            <div key={key} className="space-y-4">
              <Link
                to={`/category/${key}`}
                className="relative overflow-hidden rounded-lg group block"
              >
                <div className="aspect-[4/3] w-full">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      key === 'men'
                        ? '1617137968427-85924c800a22'
                        : key === 'women'
                        ? '1483985988355-763728e1935b'
                        : '1514090458221-65bb69cf63e6'
                    }?auto=format&fit=crop&w=800&q=80`}
                    alt={category.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
              <div className="grid grid-cols-2 gap-2">
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    to={`/category/${key}/${subcategory.id}`}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {subcategory.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group block"
            >
              <div className="w-full aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {formatPrice(product.price * 83)} {/* Approximate INR conversion */}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;