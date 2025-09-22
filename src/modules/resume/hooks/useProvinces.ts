import useSWR from 'swr'

import API from '@/lib/api'
import axios from '@/lib/axios'

import type { ResponseModel } from '@/interface/General.model'
import type { Province } from '../interface/resume/resume.data'

function useProvinces() {
  const { data, isLoading } = useSWR(API.DATA.PROVINCES, getProvinces, {
    revalidateIfStale: false,
    revalidateOnFocus: false
  })

  return { data, isLoading }
}

export default useProvinces

export async function getProvinces(url = ''): Promise<Province[]> {
  const res = await axios.get<ResponseModel<Province[]>>(url, { params: { perPage: 31 } })

  return res.data.data
}
