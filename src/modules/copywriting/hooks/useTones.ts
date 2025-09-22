import useSWR from 'swr'

import API from '@/lib/api'
import axios from '@/lib/axios'

import type { Tone } from '@/interface/Category.model'
import type { ResponseModel } from '@/interface/General.model'

function useTones() {
  const { data, isLoading, mutate } = useSWR([API.TONE.LIST], ([url]) => getTones(url), { revalidateOnFocus: false })

  return { data, isLoading, mutate }
}

export default useTones

export async function getTones(url = ''): Promise<Tone[]> {
  const res = await axios.get<ResponseModel<Tone[]>>(url)

  return res.data.data
}
