import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

import { AppProduct } from '@/interface/AppProduct.model'

export interface CartItem {
  type: string
  quantity: number
  product: AppProduct
}

export interface CouponItem {
  id: number
  type: string
  code: string
  amount: number
  minAmount: number
  hasProduct: boolean
}

export interface CartInterface {
  items: CartItem[]
  reset: () => void
  coupon?: CouponItem
  removeItem: (id: number) => void
  increaseItem: (item: CartItem) => void
  decreaseItem: (item: CartItem) => void
  setCoupon: (coupon?: CouponItem) => void
}

export const cartSlice: StateCreator<CartInterface> = (set, get) => ({
  items: [],

  coupon: undefined,
  setCoupon: (coupon?: CouponItem) => set({ coupon }),

  increaseItem: (item: CartItem) => {
    set(state => {
      const index = state.items.findIndex(i => i.product.id === item.product.id)
      if (index > -1) {
        return {
          items: state.items.map(i => {
            if (i.product.id === item.product.id) {
              return {
                ...i,
                quantity: i.quantity + item.quantity,
              }
            }
            return i
          }),
        }
      } else {
        return {
          items: [...state.items, item],
        }
      }
    })
  },
  decreaseItem: (item: CartItem) => {
    set(state => {
      const index = state.items.findIndex(i => i.product.id === item.product.id)
      if (index > -1) {
        return {
          items: state.items
            .map(i => {
              if (i.product.id === item.product.id) {
                return {
                  ...i,
                  quantity: i.quantity - item.quantity,
                }
              }
              return i
            })
            .filter(i => i.quantity > 0),
        }
      } else {
        return {
          items: [...state.items, item],
        }
      }
    })
  },
  removeItem: (id: number) => {
    set(state => ({ items: state.items.filter(item => item.product.id !== id) }))
  },
  reset: () => {
    set({ items: [], coupon: undefined })
  },
})

const useCartStore = create<CartInterface>()(
  persist(
    (...a) => ({
      ...cartSlice(...a),
    }),
    { name: 'cart-storage' },
  ),
)

export default useCartStore
