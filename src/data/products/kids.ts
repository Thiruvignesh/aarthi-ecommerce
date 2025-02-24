import { Product } from '../../types';

export const kidsProducts: Product[] = [
  {
    id: 'k1',
    name: 'Kids Festive Kurta Set',
    price: 1999,
    description: 'Traditional kurta set for kids with elegant embroidery.',
    category: 'kids',
    subCategory: 'ethnic',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: [
      { name: 'Royal Blue', hex: '#4169E1' },
      { name: 'Maroon', hex: '#800000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1555009393-f20bdb245c4d'
    ],
    reviews: [],
    inventory: {
      'Royal Blue': { '2-3Y': 10, '4-5Y': 12, '6-7Y': 12, '8-9Y': 10 },
      'Maroon': { '2-3Y': 8, '4-5Y': 10, '6-7Y': 10, '8-9Y': 8 }
    },
    featured: true
  },
  {
    id: 'k2',
    name: 'Kids Summer Dress',
    price: 999,
    description: 'Comfortable cotton dress for girls with cute prints.',
    category: 'kids',
    subCategory: 'dresses',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: [
      { name: 'Pink Flowers', hex: '#FFB6C1' },
      { name: 'Yellow Stars', hex: '#FFD700' }
    ],
    images: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1'
    ],
    reviews: [],
    inventory: {
      'Pink Flowers': { '2-3Y': 12, '4-5Y': 15, '6-7Y': 15, '8-9Y': 12 },
      'Yellow Stars': { '2-3Y': 10, '4-5Y': 12, '6-7Y': 12, '8-9Y': 10 }
    },
    featured: false
  },
  {
    id: 'k3',
    name: 'Kids Sports T-Shirt',
    price: 599,
    description: 'Comfortable and breathable sports t-shirt for active kids.',
    category: 'kids',
    subCategory: 'activewear',
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: [
      { name: 'Red', hex: '#FF0000' },
      { name: 'Blue', hex: '#0000FF' },
      { name: 'Green', hex: '#008000' }
    ],
    images: [
      'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4'
    ],
    reviews: [],
    inventory: {
      'Red': { '4-5Y': 15, '6-7Y': 15, '8-9Y': 15, '10-11Y': 10 },
      'Blue': { '4-5Y': 12, '6-7Y': 12, '8-9Y': 12, '10-11Y': 8 },
      'Green': { '4-5Y': 10, '6-7Y': 10, '8-9Y': 10, '10-11Y': 6 }
    },
    featured: false
  },
  {
    id: 'k4',
    name: 'Kids School Uniform Shirt',
    price: 499,
    description: 'Classic school uniform shirt in comfortable cotton.',
    category: 'kids',
    subCategory: 'shirts',
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Light Blue', hex: '#ADD8E6' }
    ],
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2'
    ],
    reviews: [],
    inventory: {
      'White': { '4-5Y': 20, '6-7Y': 20, '8-9Y': 20, '10-11Y': 15 },
      'Light Blue': { '4-5Y': 15, '6-7Y': 15, '8-9Y': 15, '10-11Y': 10 }
    },
    featured: true
  }
];