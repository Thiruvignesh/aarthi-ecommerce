export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  subCategory: string;
  sizes: string[];
  colors: {
    name: string;
    hex: string;
  }[];
  images: string[];
  reviews: Review[];
  inventory: {
    [key: string]: {
      [key: string]: number; // size -> quantity
    };
  };
  featured?: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  productId: string;
  color: string;
  size: string;
  quantity: number;
}

export type Category = 'men' | 'women' | 'kids' | 'accessories';