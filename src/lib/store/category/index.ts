import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

import { AppCategory } from '@/interface/AppCategory.model'

import axios from '@/lib/axios'
import ENDPOINTS from '@/lib/Endpoints'

export async function getAppCategories(): Promise<AppCategory[]> {
  try {
    const res = await axios.get<{ data: AppCategory[] }>(ENDPOINTS.PRODUCT_CATEGORY.GET_TREE, {
      params: { orderBy: { sort: 'DESC' } },
    })

    return res.data.data
  } catch (e) {
    throw e
  }
}

export interface CategoryInterface {
  loading: boolean
  categories: AppCategory[]
  getCategories: () => Promise<void>
}

export const categorySlice: StateCreator<CategoryInterface> = (set, get) => ({
  categories: [],
  loading: false,
  getCategories: async () => {
    try {
      if (get().categories.length === 0) {
        set(() => ({ loading: true }))
        const response = await getAppCategories()

        set(() => ({ loading: false, categories: response }))
      }
    } catch {
      set(() => ({ loading: false }))
    }
  },
})

const useCategoryStore = create<CategoryInterface>()(
  persist(
    (...a) => ({
      ...categorySlice(...a),
    }),
    { name: 'category-storage' },
  ),
)

export default useCategoryStore
