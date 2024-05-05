import useSWR from 'swr'

import { ResponseModel } from '@/interface/General.model'

import API from '@/lib/api'
import axios from '@/lib/axios'

import { Province } from '../interface/resume/resume.data'

function useProvinces() {
  const { data, isLoading } = useSWR(API.DATA.PROVINCES, getProvinces, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  return { data, isLoading }
}

export default useProvinces

export async function getProvinces(url = ''): Promise<Province[]> {
  try {
    const res = await axios.get<ResponseModel<Province[]>>(url, { params: { perPage: 31 } })

    return res.data.data
  } catch (e) {
    throw e
  }
}
