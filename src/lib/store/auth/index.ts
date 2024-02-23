import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

import { StoreUser } from '@/modules/auth/interface/auth.model'

export interface UserInterface {
  user?: StoreUser
  reset: () => void
  setUser: (user: StoreUser) => void
}

export const userSlice: StateCreator<UserInterface> = (set, get) => ({
  user: undefined,
  reset: () => set({ user: undefined }),
  setUser: (user: StoreUser) => set({ user }),
})

const useUserStore = create<UserInterface>()(
  persist(
    (...a) => ({
      ...userSlice(...a),
    }),
    { name: 'user-storage' },
  ),
)

export default useUserStore
