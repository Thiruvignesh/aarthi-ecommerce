import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingBag, User, ChevronDown } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { categories } from '../data/categories';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const cartItems = useCartStore((state) => state.items);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">STYLISH [by Aarthika]</span>
            </Link>
            
            <div className="hidden lg:flex lg:ml-8 lg:space-x-8">
              {Object.entries(categories).map(([key, category]) => (
                <div
                  key={key}
                  className="relative group"
                  onMouseEnter={() => setActiveCategory(key)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <Link
                    to={`/category/${key}`}
                    className="inline-flex items-center px-3 pt-1 text-sm font-medium text-gray-900 hover:text-gray-500"
                  >
                    {category.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Link>
                  
                  {/* Subcategories dropdown */}
                  <div className={`absolute left-0 mt-1 w-56 bg-white rounded-md shadow-lg z-50 transition-all duration-200 ${activeCategory === key ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    <div className="py-2">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          to={`/category/${key}/${subcategory.id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/cart" className="p-2 rounded-md text-gray-400 hover:text-gray-500 relative">
              <ShoppingBag className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500">
              <User className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {Object.entries(categories).map(([key, category]) => (
              <div key={key} className="space-y-1">
                <Link
                  to={`/category/${key}`}
                  className="block px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    to={`/category/${key}/${subcategory.id}`}
                    className="block px-8 py-2 text-sm text-gray-600 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {subcategory.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;