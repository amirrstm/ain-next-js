import useSWR from 'swr'

import { Category } from '@/interface/Category.model'
import { ResponseModel } from '@/interface/General.model'

import API from '@/lib/api'
import axios from '@/lib/axios'

function useCategories() {
  const { data, isLoading, mutate } = useSWR([API.CATEGORY.LIST], ([url]) => getCategories(url))

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
