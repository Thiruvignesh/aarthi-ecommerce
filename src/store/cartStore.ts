import { create } from 'zustand';
import { CartItem } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, color: string, size: string) => void;
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find(
        (i) => i.productId === item.productId && i.color === item.color && i.size === item.size
      );
      
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.productId === item.productId && i.color === item.color && i.size === item.size
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      
      return { items: [...state.items, item] };
    }),
  removeItem: (productId, color, size) =>
    set((state) => ({
      items: state.items.filter(
        (i) => !(i.productId === productId && i.color === color && i.size === size)
      ),
    })),
  updateQuantity: (productId, color, size, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.productId === productId && i.color === color && i.size === size
          ? { ...i, quantity }
          : i
      ),
    })),
  clearCart: () => set({ items: [] }),
}));