import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Minus, Plus } from 'lucide-react';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../utils/currency';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const addToCart = useCartStore((state) => state.addItem);

  const [selectedColor, setSelectedColor] = useState(product?.colors[0].name || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-gray-500">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`aspect-w-1 aspect-h-1 overflow-hidden rounded-lg ${
                  activeImage === index ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="h-full w-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-4 text-2xl text-gray-900">{formatPrice(product.price)}</p>

          {/* Reviews */}
          <div className="mt-4 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < 4 ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">
              {product.reviews.length} reviews
            </span>
          </div>

          <p className="mt-4 text-gray-600">{product.description}</p>

          {/* Color Selection */}
          <div className="mt-8">
            <h2 className="text-sm font-medium text-gray-900">Color</h2>
            <div className="mt-2 flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`relative w-8 h-8 rounded-full ${
                    selectedColor === color.name
                      ? 'ring-2 ring-offset-2 ring-indigo-500'
                      : ''
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  <span className="sr-only">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mt-8">
            <h2 className="text-sm font-medium text-gray-900">Size</h2>
            <div className="mt-2 grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-sm font-medium rounded ${
                    selectedSize === size
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-8">
            <h2 className="text-sm font-medium text-gray-900">Quantity</h2>
            <div className="mt-2 flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-gray-900 font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="mt-8 w-full bg-indigo-600 text-white py-3 px-8 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;