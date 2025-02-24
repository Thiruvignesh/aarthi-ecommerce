import { Product } from '../../types';

export const womenProducts: Product[] = [
  // Women's Ethnic Wear
  {
    id: 'w1',
    name: 'Banarasi Silk Saree',
    price: 8999,
    description: 'Traditional Banarasi silk saree with rich zari work.',
    category: 'women',
    subCategory: 'ethnic',
    sizes: ['Free Size'],
    colors: [
      { name: 'Red', hex: '#FF0000' },
      { name: 'Purple', hex: '#800080' },
      { name: 'Green', hex: '#008000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1583391099159-1399599b09f2'
    ],
    reviews: [],
    inventory: {
      'Red': { 'Free Size': 10 },
      'Purple': { 'Free Size': 8 },
      'Green': { 'Free Size': 8 }
    },
    featured: true
  },
  {
    id: 'w2',
    name: 'Designer Anarkali Suit',
    price: 5999,
    description: 'Elegant anarkali suit with heavy embroidery and stone work.',
    category: 'women',
    subCategory: 'ethnic',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Teal', hex: '#008080' },
      { name: 'Wine', hex: '#722F37' },
      { name: 'Navy', hex: '#000080' }
    ],
    images: [
      'https://images.unsplash.com/photo-1583391099627-8c5bf74448ce'
    ],
    reviews: [],
    inventory: {
      'Teal': { S: 5, M: 8, L: 8, XL: 5 },
      'Wine': { S: 4, M: 7, L: 7, XL: 4 },
      'Navy': { S: 4, M: 6, L: 6, XL: 4 }
    },
    featured: true
  },

  // Women's Western Wear
  {
    id: 'w3',
    name: 'Summer Maxi Dress',
    price: 2499,
    description: 'Flowy maxi dress perfect for summer parties.',
    category: 'women',
    subCategory: 'dresses',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Floral Pink', hex: '#FFB6C1' },
      { name: 'Blue Print', hex: '#00008B' }
    ],
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446'
    ],
    reviews: [],
    inventory: {
      'Floral Pink': { XS: 5, S: 8, M: 10, L: 8, XL: 5 },
      'Blue Print': { XS: 4, S: 7, M: 9, L: 7, XL: 4 }
    },
    featured: false
  },
  {
    id: 'w4',
    name: 'Casual Denim Jacket',
    price: 2999,
    description: 'Stylish denim jacket for a casual look.',
    category: 'women',
    subCategory: 'outerwear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Light Blue', hex: '#ADD8E6' },
      { name: 'Dark Blue', hex: '#00008B' }
    ],
    images: [
      'https://images.unsplash.com/photo-1527016021513-b09758b777bd'
    ],
    reviews: [],
    inventory: {
      'Light Blue': { S: 8, M: 12, L: 12, XL: 8 },
      'Dark Blue': { S: 6, M: 10, L: 10, XL: 6 }
    },
    featured: false
  },
  
  // Women's Tops
  {
    id: 'w5',
    name: 'Floral Print Top',
    price: 1299,
    description: 'Beautiful floral print top in comfortable fabric.',
    category: 'women',
    subCategory: 'tops',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White Floral', hex: '#FFFFFF' },
      { name: 'Black Floral', hex: '#000000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105'
    ],
    reviews: [],
    inventory: {
      'White Floral': { XS: 8, S: 12, M: 15, L: 12, XL: 8 },
      'Black Floral': { XS: 6, M: 10, L: 12, XL: 6 }
    },
    featured: true
  }
];