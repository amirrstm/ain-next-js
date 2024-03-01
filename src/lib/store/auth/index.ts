import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

import { User } from '@/modules/auth/interface/auth.model'

export interface UserInterface {
  user?: User
  reset: () => void
  setUser: (user: User) => void
}

export const userSlice: StateCreator<UserInterface> = (set, get) => ({
  user: undefined,
  reset: () => set({ user: undefined }),
  setUser: (user: User) => set({ user }),
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
