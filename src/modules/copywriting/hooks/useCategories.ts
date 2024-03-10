import useSWR from 'swr'

import { Category } from '@/interface/Category.model'
import { ResponseModel } from '@/interface/General.model'

import axios from '@/lib/axios'
import ENDPOINTS from '@/lib/Endpoints'

function useCategories() {
  const { data, isLoading, mutate } = useSWR([ENDPOINTS.CATEGORY.LIST], ([url]) => getCategories(url))

  return { data, mutate, isLoading }
}

export default useCategories

export async function getCategories(url = ''): Promise<Category[]> {
  try {
    const res = await axios.get<ResponseModel<Category[]>>(url)

    return res.data.data
  } catch (e) {
    throw e
  }
}
