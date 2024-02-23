import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

import { ConfigData } from '@/interface/Config.model'

import axios from '@/lib/axios'
import ENDPOINTS from '@/lib/Endpoints'

export async function getAppConfig(): Promise<ConfigData> {
  try {
    const res = await axios.get<{ data: ConfigData }>(ENDPOINTS.GET_CONFIG)

    return res.data.data
  } catch (e) {
    throw e
  }
}

export interface ConfigInterface {
  loading: boolean
  config?: ConfigData
  getConfig: () => Promise<void>
}

export const configSlice: StateCreator<ConfigInterface> = (set, get) => ({
  config: undefined,
  loading: false,
  getConfig: async () => {
    try {
      set(() => ({ loading: true }))
      const response = await getAppConfig()

      set(() => ({ loading: false, config: response }))
    } catch {
      set(() => ({ loading: false }))
    }
  },
})

const useConfigStore = create<ConfigInterface>()(
  persist(
    (...a) => ({
      ...configSlice(...a),
    }),
    { name: 'config-storage' },
  ),
)

export default useConfigStore
