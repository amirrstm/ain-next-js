import { create, type StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

import type { User } from '@/modules/auth/interface/auth.model'

export interface UserInterface {
  user?: User
  reset: () => void
  setUser: (user: User) => void
}

export const userSlice: StateCreator<UserInterface> = (set, _get) => ({
  reset: () => set({ user: undefined }),
  setUser: (user: User) => set({ user }),
  user: undefined
})

const useUserStore = create<UserInterface>()(
  persist(
    (...a) => ({
      ...userSlice(...a)
    }),
    { name: 'user-storage' }
  )
)

export default useUserStore
