import { Product } from '../../types';

export const menProducts: Product[] = [
  // Men's Ethnic Wear
  {
    id: 'm1',
    name: 'Traditional Silk Kurta Set',
    price: 4999,
    description: 'Handcrafted silk kurta with churidar and nehru jacket. Perfect for weddings and festivals.',
    category: 'men',
    subCategory: 'ethnic',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Maroon', hex: '#800000' },
      { name: 'Royal Blue', hex: '#4169E1' },
      { name: 'Gold', hex: '#FFD700' }
    ],
    images: [
      'https://plus.unsplash.com/premium_photo-1682090786689-741d60a11384'
    ],
    reviews: [],
    inventory: {
      'Maroon': { S: 10, M: 15, L: 20, XL: 15, XXL: 10 },
      'Royal Blue': { S: 8, M: 12, L: 15, XL: 12, XXL: 8 },
      'Gold': { S: 6, M: 10, L: 12, XL: 10, XXL: 6 }
    },
    featured: true
  },
  {
    id: 'm2',
    name: 'Cotton Kurta Pajama',
    price: 1999,
    description: 'Comfortable cotton kurta with matching pajama. Ideal for daily wear and casual occasions.',
    category: 'men',
    subCategory: 'ethnic',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Beige', hex: '#F5F5DC' },
      { name: 'Light Blue', hex: '#ADD8E6' }
    ],
    images: [
      'https://images.unsplash.com/photo-1578932750294-f5075e85f44a'
    ],
    reviews: [],
    inventory: {
      'White': { S: 15, M: 20, L: 20, XL: 15 },
      'Beige': { S: 12, M: 18, L: 18, XL: 12 },
      'Light Blue': { S: 10, M: 15, L: 15, XL: 10 }
    },
    featured: false
  },

  // Men's Shirts & T-Shirts
  {
    id: 'm3',
    name: 'Premium Cotton Formal Shirt',
    price: 1499,
    description: 'Classic formal shirt in premium cotton. Perfect for office wear.',
    category: 'men',
    subCategory: 'shirts',
    sizes: ['38', '40', '42', '44'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Light Blue', hex: '#ADD8E6' },
      { name: 'Pink', hex: '#FFC0CB' }
    ],
    images: [
      'https://images.unsplash.com/photo-1563630423918-b58f07336ac9'
    ],
    reviews: [],
    inventory: {
      'White': { '38': 10, '40': 15, '42': 15, '44': 10 },
      'Light Blue': { '38': 8, '40': 12, '42': 12, '44': 8 },
      'Pink': { '38': 6, '40': 10, '42': 10, '44': 6 }
    },
    featured: true
  },
  {
    id: 'm4',
    name: 'Casual Linen Shirt',
    price: 1299,
    description: 'Breathable linen shirt perfect for summer.',
    category: 'men',
    subCategory: 'shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Beige', hex: '#F5F5DC' },
      { name: 'Olive', hex: '#808000' },
      { name: 'Sky Blue', hex: '#87CEEB' }
    ],
    images: [
      'https://images.unsplash.com/photo-1604695573533-3e95daa9034a'
    ],
    reviews: [],
    inventory: {
      'Beige': { S: 12, M: 15, L: 15, XL: 12 },
      'Olive': { S: 10, M: 12, L: 12, XL: 10 },
      'Sky Blue': { S: 8, M: 10, L: 10, XL: 8 }
    },
    featured: false
  },

  // Men's Pants & Jeans
  {
    id: 'm5',
    name: 'Formal Trousers',
    price: 1799,
    description: 'Classic formal trousers in premium polyester blend.',
    category: 'men',
    subCategory: 'pants',
    sizes: ['30', '32', '34', '36', '38'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Grey', hex: '#808080' }
    ],
    images: [
      'https://images.unsplash.com/photo-1584865288642-42078afe6942'
    ],
    reviews: [],
    inventory: {
      'Black': { '30': 8, '32': 12, '34': 12, '36': 8, '38': 6 },
      'Navy': { '30': 7, '32': 10, '34': 10, '36': 7, '38': 5 },
      'Grey': { '30': 6, '32': 9, '34': 9, '36': 6, '38': 4 }
    },
    featured: false
  },
  {
    id: 'm6',
    name: 'Slim Fit Jeans',
    price: 2499,
    description: 'Premium denim jeans with perfect fit and comfort.',
    category: 'men',
    subCategory: 'pants',
    sizes: ['30', '32', '34', '36', '38'],
    colors: [
      { name: 'Dark Blue', hex: '#00008B' },
      { name: 'Black', hex: '#000000' },
      { name: 'Light Blue', hex: '#ADD8E6' }
    ],
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246'
    ],
    reviews: [],
    inventory: {
      'Dark Blue': { '30': 10, '32': 15, '34': 15, '36': 10, '38': 8 },
      'Black': { '30': 8, '32': 12, '34': 12, '36': 8, '38': 6 },
      'Light Blue': { '30': 6, '32': 10, '34': 10, '36': 6, '38': 4 }
    },
    featured: true
  },

  // Men's Activewear
  {
    id: 'm7',
    name: 'Performance Sports T-Shirt',
    price: 999,
    description: 'Quick-dry fabric perfect for workouts and sports.',
    category: 'men',
    subCategory: 'activewear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Grey', hex: '#808080' },
      { name: 'Navy', hex: '#000080' }
    ],
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820'
    ],
    reviews: [],
    inventory: {
      'Black': { S: 15, M: 20, L: 20, XL: 15 },
      'Grey': { S: 12, M: 18, L: 18, XL: 12 },
      'Navy': { S: 10, M: 15, L: 15, XL: 10 }
    },
    featured: false
  }
];