import useSWR from 'swr'

import { AppCategory } from '@/interface/Category.model'
import { ResponseModel } from '@/interface/General.model'

import API from '@/lib/api'
import axios from '@/lib/axios'

function useCategory(categoryId?: string) {
  const { data, isLoading, mutate } = useSWR(!categoryId ? undefined : API.CATEGORY.GET(categoryId), getCategory)

  return { data, mutate, isLoading }
}

export default useCategory

export async function getCategory(url = ''): Promise<AppCategory> {
  try {
    const res = await axios.get<ResponseModel<AppCategory>>(url)

    return res.data.data
  } catch (e) {
    throw e
  }
}
