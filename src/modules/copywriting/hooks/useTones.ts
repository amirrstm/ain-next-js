import useSWR from 'swr'

import { Tone } from '@/interface/Category.model'
import { ResponseModel } from '@/interface/General.model'

import API from '@/lib/api'
import axios from '@/lib/axios'

function useTones() {
  const { data, isLoading, mutate } = useSWR([API.TONE.LIST], ([url]) => getTones(url), { revalidateOnFocus: false })

  return { data, mutate, isLoading }
}

export default useTones

export async function getTones(url = ''): Promise<Tone[]> {
  try {
    const res = await axios.get<ResponseModel<Tone[]>>(url)

    return res.data.data
  } catch (e) {
    throw e
  }
}
