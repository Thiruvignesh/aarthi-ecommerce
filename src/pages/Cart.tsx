import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { products } from '../data/products';
import { formatPrice } from '../utils/currency';

const Cart = () => {
  const { items, removeItem, updateQuantity } = useCartStore();

  const cartItems = items.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId)!,
  }));

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const shipping = 99; // Changed to INR
  const tax = subtotal * 0.18; // Changed to 18% GST
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
          <p className="mt-4 text-gray-500">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/"
            className="mt-8 inline-block bg-indigo-600 text-white py-3 px-8 rounded-md font-medium hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={`${item.productId}-${item.color}-${item.size}`}
                className="flex gap-6 p-6 bg-white rounded-lg shadow-sm"
              >
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover object-center rounded"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.product.name}
                    </h3>
                    <button
                      onClick={() => removeItem(item.productId, item.color, item.size)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Color: {item.color}, Size: {item.size}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.color,
                            item.size,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="p-1 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.color,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        className="p-1 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-lg font-medium text-gray-900">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">{formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%)</span>
                <span className="text-gray-900">{formatPrice(tax)}</span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-lg font-medium text-gray-900">Total</span>
                  <span className="text-lg font-medium text-gray-900">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>
            <Link
              to="/checkout"
              className="mt-6 w-full bg-indigo-600 text-white py-3 px-8 rounded-md font-medium hover:bg-indigo-700 flex items-center justify-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;