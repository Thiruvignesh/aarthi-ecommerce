import { Product, Category } from '../types';
import { menProducts } from './products/men';
import { womenProducts } from './products/women';
import { kidsProducts } from './products/kids';

// Combine all products
export const products: Product[] = [
  ...menProducts,
  ...womenProducts,
  ...kidsProducts
];

// Utility functions for product filtering
export const getProductsByCategory = (category: Category): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductsBySubCategory = (category: Category, subCategory: string): Product[] => {
  return products.filter(
    product => product.category === category && product.subCategory === subCategory
  );
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Get unique subcategories for a category
export const getSubCategories = (category: Category): string[] => {
  const categoryProducts = getProductsByCategory(category);
  return [...new Set(categoryProducts.map(product => product.subCategory))];
};

// Get product count for a category
export const getProductCount = (category: Category, subCategory?: string): number => {
  if (subCategory) {
    return getProductsBySubCategory(category, subCategory).length;
  }
  return getProductsByCategory(category).length;
};

// Get price range for a category
export const getPriceRange = (category: Category): { min: number; max: number } => {
  const categoryProducts = getProductsByCategory(category);
  const prices = categoryProducts.map(product => product.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};