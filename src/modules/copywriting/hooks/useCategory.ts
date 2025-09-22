import useSWR from 'swr'

import API from '@/lib/api'
import axios from '@/lib/axios'

import type { AppCategory } from '@/interface/Category.model'
import type { ResponseModel } from '@/interface/General.model'

function useCategory(categoryId?: string) {
  const { data, isLoading, mutate } = useSWR(!categoryId ? undefined : API.CATEGORY.GET(categoryId), getCategory)

  return { data, isLoading, mutate }
}

export default useCategory

export async function getCategory(url = ''): Promise<AppCategory> {
  const res = await axios.get<ResponseModel<AppCategory>>(url)

  return res.data.data
}
