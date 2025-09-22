import useSWR from 'swr'

import API from '@/lib/api'
import axios from '@/lib/axios'

import type { Category } from '@/interface/Category.model'
import type { ResponseModel } from '@/interface/General.model'

function useCategories() {
  const { data, isLoading, mutate } = useSWR([API.CATEGORY.LIST], ([url]) => getCategories(url))

  return { data, isLoading, mutate }
}

export default useCategories

export async function getCategories(url = ''): Promise<Category[]> {
  const res = await axios.get<ResponseModel<Category[]>>(url)

  return res.data.data
}
